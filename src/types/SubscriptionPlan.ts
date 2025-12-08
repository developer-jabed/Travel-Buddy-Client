// components/modules/Admin/SubscriptionPlan/types.ts

export enum SubscriptionPlan {
  FREE = "FREE",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FLAT = "FLAT",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

// ---------------------------------------------------------------------------------
// PRICING MODEL
// ---------------------------------------------------------------------------------

export interface ISubscriptionPlanPricing {
  id: string;
  plan: SubscriptionPlan;
  durationDays: number;
  basePrice: number;
  discountType?: DiscountType | null;
  discountValue?: number | null;
  finalPrice: number;
  createdAt: string;
  updatedAt: string;
}


export interface ICreateSubscriptionPlanPricing {
  plan: SubscriptionPlan;
  durationDays: number;
  basePrice: number;
  discountType: DiscountType | null;
  discountValue: number | null;
  finalPrice: number;
}