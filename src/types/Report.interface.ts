import { UserInfo } from "./user.interface";

export interface IReport {
  id: string;
  reporterId: string;
  reportedId: string;
  reason: string;
  status: "PENDING" | "RESOLVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;

  reporter?: UserInfo;
  reported?: UserInfo;
}
