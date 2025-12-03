import { IMeetupParticipant } from "./MeetupParticipant.interface";
import { ITrip } from "./trip.interface";

export interface IMeetup {
  id: string;
  tripId?: string | null;
  title: string;
  location: string;
  date: string;
  description?: string | null;

  createdAt: string;
  updatedAt: string;

  trip?: ITrip | null;
  participants: IMeetupParticipant[];
}
