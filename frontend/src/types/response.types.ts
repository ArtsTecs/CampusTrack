import { NfcTag } from "@/types/models.types";

// Page Response
type PageResponse = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

// Nfc Tag Responses
export type GetAllNfcTagResponse = {
  content: NfcTag[];
  page: PageResponse;
};