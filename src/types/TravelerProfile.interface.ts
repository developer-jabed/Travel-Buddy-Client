import { UserInfo } from "./user.interface";

export interface ITravelerProfile {
  id: string;
  name: string;
  email: string;
  userId: string;
  bio?: string | null;
  age?: number | null;
  profilePhoto?: string | null;
  gender?: string | null;
  travelStyle: "BUDGET" | "LUXURY" | "BACKPACKER" | "STANDARD"; // adjust to your enum
  interests: string[];
  languages: string[];
  city?: string | null;
  country?: string | null;
  isDeleted?: boolean | null;
  createdAt: string;
  updatedAt: string;

  user?: UserInfo; // relation
}
