import { GetAllNfcTagResponse } from "@/types/response.types";
import apiClient from "@/api/client.api";
import { CreateNfcTagRequest, SearchNfcTagsRequest, UpdateNfcTagRequest } from "@/types/request.types";
import { NfcTag } from "@/types/models.types";

// Create
export async function createNfcTag(body: CreateNfcTagRequest): Promise<NfcTag> {
  const response = await apiClient.post<NfcTag>(`/nfc-tags`, body);
  return response.data;
}

// Get all
export async function getAllNfcTag(page: number = 1, size: number = 20, sort: string = "createdAt,desc"): Promise<GetAllNfcTagResponse> {
  const response = await apiClient.get<GetAllNfcTagResponse>(`/nfc-tags`, {
    params: { page, size, sort }
  });
  return response.data;
}

// Get
export async function getNfcTag(id: number): Promise<NfcTag> {
  const response = await apiClient.get<NfcTag>(`/nfc-tags/${id}`);
  return response.data;
}

// Search
export async function searchNfcTags(params: SearchNfcTagsRequest, page: number = 1, size: number = 20, sort: string = "createdAt,desc"): Promise<GetAllNfcTagResponse> {
  const response = await apiClient.get<GetAllNfcTagResponse>(`/nfc-tags/search`, {
    params: { ...params, page, size, sort }
  });
  return response.data;
}

// Update
export async function updateNfcTag(id: number, body: UpdateNfcTagRequest): Promise<NfcTag> {
  const response = await apiClient.patch<NfcTag>(`/nfc-tags/${id}`, body);
  return response.data;
}

// Delete
export async function deleteNfcTag(id: number): Promise<boolean> {
  const response = await apiClient.delete(`/nfc-tags/${id}`);
  return response.status === 204;
}