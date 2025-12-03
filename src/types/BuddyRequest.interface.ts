import { ITrip } from "./trip.interface";
import { UserInfo } from "./user.interface";

export interface IBuddyRequest {
  id: string;
  tripId?: string | null;
  senderId: string;
  receiverId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;

  trip?: ITrip | null;
  sender?: UserInfo;
  receiver?: UserInfo;
}
