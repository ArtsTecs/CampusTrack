"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NfcTagStatusEnum } from "@/types/enums.types";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createNfcTag } from "@/api/nfc-tag.api";
import { toast } from "sonner";
import { ApiError } from "@/lib/errors";
import { useRouter } from "next/navigation";

// Types
type SelectMenuItem = { label: string; value: NfcTagStatusEnum };

export default function SampleCreatePage() {
  // Constants
  const statusSelectItems: SelectMenuItem[] = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Lost", value: "LOST" },
    { label: "Damaged", value: "DAMAGED" },
    { label: "Replaced", value: "REPLACED" },
  ];

  // Hooks
  const router = useRouter();

  // Refs
  const saveButton = useRef<HTMLButtonElement | null>(null);

  // Form states
  const [assetId, setAssetId] = useState<number | undefined>(undefined);
  const [uid, setUid] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<NfcTagStatusEnum | null>(null);

  // Utils and event functions
  async function submitForm(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!saveButton.current)
      return;

    saveButton.current.disabled = true;

    if (!assetId) {
      toast.error("Asset ID is required.");
      return saveButton.current.disabled = false;
    }
    if (!uid) {
      toast.error("UID is required.");
      return saveButton.current.disabled = false;
    }
    if (!status) {
      toast.error("UID is required.");
      return saveButton.current.disabled = false;
    }

    try {
      const response = await createNfcTag({ assetId, uid, status });

      if (!("message" in response))
        router.push("/sample");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Something went wrong while creating the NFC Tag.");
    } finally {
      saveButton.current.disabled = false;
    }
  }

  return (
    <main className="py-12">

      <section className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-xl md:text-2xl font-heading font-semibold uppercase tracking-wider">This is a sample create</h1>

        <Card>
          <CardContent>
            <form onSubmit={submitForm}>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Asset</FieldLabel>
                    <Input type="number" value={assetId ?? ""} onChange={e => {
                      const parsedValue = Number.parseInt(e.target.value);

                      setAssetId(!isNaN(parsedValue) ? parsedValue : 0);
                    }} placeholder="Enter the Asset ID" />
                    <FieldDescription>Sample rani sya ang pag choose sa asset, during development ilisan ni nato.</FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel>UID</FieldLabel>
                    <Input type="text" value={uid ?? ""} onChange={e => setUid(e.target.value)} placeholder="Enter the UID" />
                  </Field>

                  <Field>
                    <FieldLabel>Status</FieldLabel>
                    <Select items={statusSelectItems} value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {statusSelectItems.map(item => (
                            <SelectItem key={`status-item-${item.value}`} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <FieldSeparator />

                  <Field>
                    <div className="flex gap-2 justify-end">
                      <Link href="/sample">
                        <Button variant="secondary">Go Back</Button>
                      </Link>
                      <Button type="submit" ref={saveButton}>Save</Button>
                    </div>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </form>
          </CardContent>
        </Card>
      </section>

    </main>
  )
}