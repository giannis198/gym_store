// src/lib/types.ts

export interface Tier {
  name: string;
  price: string;
  features: string[];
  recommended: boolean;
}

export interface PricingData {
  tiers: Tier[];
}