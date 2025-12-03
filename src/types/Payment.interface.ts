import { UserInfo } from "./user.interface";

export interface IPayment {
  id: string;
  userId: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED"; // adjust as needed
  createdAt: string;
  updatedAt: string;

  user?: UserInfo;
}
