import { UserInfo } from "./user.interface";

export interface IReview {
  id: string;
  reviewerId: string;
  receiverId: string;
  rating: number;
  comment?: string | null;

  createdAt: string;
  updatedAt: string;

  reviewer?: UserInfo;
  receiver?: UserInfo;
}
