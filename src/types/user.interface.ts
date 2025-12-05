import { UserRole } from "@/lib/auth-utils";
import { IBuddyRequest } from "./BuddyRequest.interface";
import { IReport } from "./Report.interface";
import { IPayment } from "./Payment.interface";
import { IMessage } from "./Message.interface";
import { IReview } from "./Review.interface";
import { IChatParticipant } from "./ChatParticipant.interface";
import { IMeetupParticipant } from "./MeetupParticipant.interface";
import { INotification } from "./Notification.interface";
import { IModerator } from "./Moderator.interface";
import { IAdmin } from "./Admin.interface";
import { ITrip } from "./trip.interface";
import { ISubscription } from "./Subscription.interface";
import { ITravelerProfile } from "./TravelerProfile.interface";



export interface UserInfo {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status: any;

  // Relations
  sentBuddyRequests: IBuddyRequest[];
  receivedBuddyRequests: IBuddyRequest[];

  safetyScore: number;
  reportsMade: IReport[];
  reportsReceived: IReport[];

  interests: string[];
  isVerified: boolean;

  payments: IPayment[];
  messages: IMessage[];

  trips: ITrip[];

  reviewsGiven: IReview[];
  reviewsReceived: IReview[];

  createdAt: string;
  updatedAt: string;

  ChatParticipant: IChatParticipant[];
  MeetupParticipant: IMeetupParticipant[];
  Subscription: ISubscription[];
  Notification: INotification[];

  TravelerProfile?: ITravelerProfile | null;
  Moderator?: IModerator | null;
  Admin?: IAdmin | null;
}
