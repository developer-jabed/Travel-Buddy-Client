import { UserInfo } from "./user.interface";

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  userId: string;
  profilePhoto?: string | null;
  isDeleted?: boolean | null;
  isActive: boolean;
  superAdmin: boolean;
  permissions: string[];
  createdAt?: string | null;
  updatedAt?: string | null;

  user?: UserInfo;
}
