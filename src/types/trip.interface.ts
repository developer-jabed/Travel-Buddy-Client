import { IBuddyRequest } from "./BuddyRequest.interface";
import { IMeetup } from "./Meetup.interface";
import { UserInfo } from "./user.interface";



export enum TripStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}


export interface ITrip {
  id: string;
  userId: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget?: number | null;
  description?: string | null;
  tripStatus: TripStatus;          // enum

  interests: string[];             // []
  travelStyle?: string | null;
  safetyScore?: number | null;     // default 50

  createdAt: Date;
  updatedAt: Date;

  user: UserInfo;                     // relation
  buddyRequests: IBuddyRequest[];
  meetups: IMeetup[];
}
