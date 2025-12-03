import { UserInfo } from "./user.interface";

export interface INotification {
  id: string;
  userId: string;
  type: "SYSTEM" | "BUDDY" | "TRIP" | "CHAT"; // adjust to your enum
  message: string;
  isRead: boolean;
  link?: string | null;

  createdAt: string;
  updatedAt: string;

  user?: UserInfo;
}
