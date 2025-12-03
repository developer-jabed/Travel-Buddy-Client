import { IChatParticipant } from "./ChatParticipant.interface";
import { IMessage } from "./Message.interface";

export interface IChat {
  id: string;
  tripId?: string | null;
  createdAt: string;
  updatedAt: string;

  participants: IChatParticipant[];
  messages: IMessage[];
}
