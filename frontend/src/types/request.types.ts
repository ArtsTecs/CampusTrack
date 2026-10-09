// Nfc Tag Requests
import { NfcTagStatusEnum } from "@/types/enums.types";

export type CreateNfcTagRequest = {
  assetId: number;
  uid: string;
  status: NfcTagStatusEnum;
};

export type UpdateNfcTagRequest = {
  assetId?: number;
  uid?: string;
  status?: NfcTagStatusEnum;
};

export type SearchNfcTagsRequest = {
  from?: string;
  to?: string;
  assetId?: number;
  uid?: string;
  status?: NfcTagStatusEnum | string;
};