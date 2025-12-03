import { UserInfo } from "./user.interface";

export interface IModerator {
  id: string;
  name: string;
  email: string;
  userId: string;
  profilePhoto?: string | null;
  isActive: boolean;
  assignedDate: string;
  isDeleted?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  user?: UserInfo;
}
