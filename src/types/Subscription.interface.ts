import { UserInfo } from "./user.interface";


export enum SubscriptionPlan {
  FREE = "FREE",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
  SUSPENDED = "SUSPENDED",
}
export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}



export interface ISubscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;          // enum
  startDate: Date;
  endDate?: Date | null;
  status: SubscriptionStatus;      // enum
  user: UserInfo;                     // relation
}

export interface ISubscriptionPlanPricing {
  id: string;
  plan: SubscriptionPlan;     // enum
  durationDays: number;
  basePrice: number;
  discountType?: DiscountType | null;   // enum
  discountValue?: number | null;
  finalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
