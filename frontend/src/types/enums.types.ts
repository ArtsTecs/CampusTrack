// Nfc Tag Enums
export type NfcTagStatusEnum = "ACTIVE" | "INACTIVE" | "LOST" | "DAMAGED" | "REPLACED";

// Asset Enums
export type AssetCategoryEnum = "COMPUTER" | "PROJECTOR" | "AIRCONDITIONER" | "FURNITURE" | "NETWORK_EQUIPMENT" | "LAB_EQUIPMENT" | "ELECTRICAL_EQUIPMENT" | "OFFICE_EQUIPMENT" | "OTHER";
export type AssetStatusEnum = "IN_USE" | "AVAILABLE" | "UNDER_MAINTENANCE" | "OUT_OF_SERVICE" | "RETIRED";
export type AssetConditionEnum = "GOOD" | "FAIR" | "DAMAGED" | "POOR";
export type AssetCriticalityEnum = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";