import { IMeetup } from "./Meetup.interface";
import { UserInfo } from "./user.interface";

export interface IMeetupParticipant {
  id: string;
  meetupId: string;
  userId: string;

  meetup?: IMeetup;
  user?: UserInfo;
}
