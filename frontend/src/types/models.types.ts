import { AssetCategoryEnum, AssetConditionEnum, AssetCriticalityEnum, AssetStatusEnum, NfcTagStatusEnum } from "@/types/enums.types";

// Nfc Tag Model
export type NfcTag = {
  id: number;
  createdAt: string;
  uid: string;
  status: NfcTagStatusEnum;
  asset: Asset;
};

// Asset Model
export type Asset = {
  brand: string | null;
  model: string | null;
  serialNumber: string | null;

  category: AssetCategoryEnum;
  condition: AssetConditionEnum;
  criticality: AssetCriticalityEnum;
  status: AssetStatusEnum;

  createdAt: string;
  id: number;
  name: string;
  room: null;
  roomId: number | null;
};