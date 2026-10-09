"use client";

import React, { useEffect, useState } from "react";
import { Asset, NfcTag } from "@/types/models.types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteNfcTag, getAllNfcTag, searchNfcTags } from "@/api/nfc-tag.api";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pen, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { Field, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types
type SearchValues = "assetId" | "uid" | "status";
type SelectMenuItem = { label: string; value: SearchValues };

export default function SamplePage() {
  // Constants
  const pageSize = 20;
  const searchSelectItems: SelectMenuItem[] = [
    { label: "Search by Asset ID", value: "assetId" },
    { label: "Search by UID", value: "uid" },
    { label: "Search by Status", value: "status" },
  ];

  // States
  const [selectedSearchFilter, setSelectedSearchFilter] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedNfcTag, setSelectedNfcTag] = useState<NfcTag | null>(null);
  const [nfcTags, setNfcTags] = useState<NfcTag[]>([]);
  const [pageInfo, setPageInfo] = useState({ totalElements: 0, totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  // Utils and event functions
  async function fetchNfcTags() {
    setNfcTags([]);

    try {
      const response = await getAllNfcTag(currentPage, pageSize);
      const { totalPages, totalElements } = response.page;

      setNfcTags(response.content);
      setPageInfo({ totalPages, totalElements })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong while fetching the NFC Tags.")
    }
  }

  async function searchNfcTagsSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setNfcTags([]);

    if (!searchValue || !selectedSearchFilter)
      return await fetchNfcTags().then().catch();

    const parsedAssetId = Number.parseInt(searchValue);

    try {
      const response = await searchNfcTags({
        ...(selectedSearchFilter === "assetId" && { assetId: !isNaN(parsedAssetId) ? parsedAssetId : -1 }),
        ...(selectedSearchFilter === "uid" && { uid: searchValue }),
        ...(selectedSearchFilter === "status" && { status: searchValue })
      });
      const { totalPages, totalElements } = response.page;

      setNfcTags(response.content);
      setPageInfo({ totalPages, totalElements });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong while fetching the NFC Tags.");
    }
  }

  function generatePages(): (string | number)[] {
    const pages = new Set<string | number>();
    const { totalPages } = pageInfo;

    for (let i = 1; i <= totalPages; i++)
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1)
        pages.add(i);
      else
        pages.add("...");

    return [...pages];
  }

  function toggleAssetModal(asset: Asset | null) {
    if (!selectedAsset)
      return setSelectedAsset(asset)
    setSelectedAsset(null);
  }

  function toggleNfcTagDeleteModal(nfcTag: NfcTag | null) {
    if (!selectedNfcTag)
      return setSelectedNfcTag(nfcTag);
    return setSelectedNfcTag(null);
  }

  async function deleteNfcTagFunction() {
    if (!selectedNfcTag)
      return toast.error("NFC Tag ID is required.");

    try {
      const response = await deleteNfcTag(selectedNfcTag.id);

      if (response) {
        await fetchNfcTags().then().catch();
        setSelectedNfcTag(null);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong while deleting the NFC Tag.");
    }
  }

  async function changePage(page: number) {
    setNfcTags([]);
    setCurrentPage(page);

    const response = await getAllNfcTag(page, pageSize);
    const { totalPages, totalElements } = response.page;

    setNfcTags(response.content);
    setPageInfo({ totalPages, totalElements });
  }

  // Use effects
  useEffect(() => {
    async function main() {
      try {
        const response = await getAllNfcTag(currentPage, pageSize);
        const { totalElements, totalPages } = response.page;

        setNfcTags(response.content);
        setPageInfo({ totalPages, totalElements });
      } catch (error) {
        console.error("Failed to fetch NFC Tags:", error);
      }
    }

    main();
  }, []);

  return (
    <>
      <Dialog open={!!selectedNfcTag}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Deletion Confirmation</DialogTitle>
          </DialogHeader>

          <p>Are you sure you want to delete this NFC Tag? This action can&#39;t be undone.</p>

          <DialogFooter>
            <Button variant="secondary" onClick={() => toggleNfcTagDeleteModal(null)}>No</Button>
            <Button variant="destructive" onClick={deleteNfcTagFunction}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedAsset}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>NFC Tag Asset</DialogTitle>
          </DialogHeader>

          <ul className="space-y-4">
            <li><span className="font-semibold">ID: </span>{selectedAsset?.id}</li>
            <li><span className="font-semibold">Created At: </span>{selectedAsset?.createdAt}</li>
            <li><span className="font-semibold">Name: </span>{selectedAsset?.name}</li>

            <li><span className="font-semibold">Brand: </span>{selectedAsset?.brand ?? "No brand."}</li>
            <li><span className="font-semibold">Model: </span>{selectedAsset?.model ?? "No Model."}</li>
            <li><span className="font-semibold">Serial Number: </span>{selectedAsset?.serialNumber ?? "No serial number."}</li>

            <li><span className="font-semibold">Category: </span>{selectedAsset?.category}</li>
            <li><span className="font-semibold">Condition: </span>{selectedAsset?.condition}</li>
            <li><span className="font-semibold">Criticality: </span>{selectedAsset?.criticality}</li>
            <li><span className="font-semibold">Status: </span>{selectedAsset?.status}</li>

          </ul>

          <DialogFooter>
            <Button variant="secondary" onClick={() => toggleAssetModal(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="py-12">

        <section className="max-w-7xl mx-auto space-y-12">
          <h1 className="text-xl md:text-2xl font-heading font-semibold uppercase tracking-wider">This is a sample read all</h1>

          <Card>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Link href="/sample/create">
                  <Button><Plus /> Create</Button>
                </Link>
              </div>

              <div>
                <form onSubmit={searchNfcTagsSubmit}>
                  <FieldSet className="flex flex-row gap-2">
                    <Field>
                      <Input type="text" placeholder="Search here..." value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)} />
                    </Field>

                    <div className="inline-flex gap-2">
                      <Select items={searchSelectItems} value={selectedSearchFilter} onValueChange={setSelectedSearchFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {searchSelectItems.map(item => (
                              <SelectItem key={`search-filter-item-${item.value}`} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Button type="submit">Search</Button>
                    </div>
                  </FieldSet>
                </form>
              </div>

              <Table>
                <TableCaption>List of NFC tags with page</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>UID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {nfcTags.length > 0 && nfcTags.map(item => {
                    const formattedCreatedAt = new Date(item.createdAt)
                      .toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      });

                    return (
                      <TableRow key={`nfc-tag-item-id-${item.id}`}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{formattedCreatedAt}</TableCell>
                        <TableCell>{item.uid}</TableCell>
                        <TableCell className="font-semibold">
                          {item.status === "ACTIVE" && <label className="text-green-500">{item.status}</label>}
                          {(item.status === "DAMAGED" || item.status === "LOST") && <label className="text-red-500">{item.status}</label>}
                          {item.status === "INACTIVE" && <label className="text-gray-500">{item.status}</label>}
                          {item.status === "REPLACED" && <label className="text-yellow-500">{item.status}</label>}
                        </TableCell>
                        <TableCell>
                          <Button variant="link" onClick={() => toggleAssetModal(item.asset)}>
                            {item.asset.name}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="grid grid-cols-2 gap-2">
                            <Link href={`/sample/update/${item.id}`}>
                              <Button className="w-full"><Pen/> Edit</Button>
                            </Link>
                            <Button variant="destructive" onClick={() => toggleNfcTagDeleteModal(item)}><Trash/> Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem onClick={() => changePage(currentPage - 1)}>
                      <PaginationPrevious />
                    </PaginationItem>
                  )}

                  {generatePages().map((item, index) =>
                    typeof item === "number" ? (
                      <PaginationItem key={`page-item-index-${index}`}
                                      onClick={() => { if (item !== currentPage) changePage(item).then().catch() }}
                                      className={`${item === currentPage && "bg-primary text-white rounded-full"}`}>
                        <PaginationLink>{item}</PaginationLink>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-item-elipsis-index-${index}`}>
                        <PaginationEllipsis/>
                      </PaginationItem>
                    )
                  )}

                  {currentPage < pageInfo.totalPages && (
                    <PaginationItem onClick={() => changePage(currentPage + 1)}>
                      <PaginationNext />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </section>

      </main>
    </>
  )
}