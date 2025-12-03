import { IChat } from "./Chat.interface";
import { UserInfo } from "./user.interface";

export interface IChatParticipant {
  id: string;
  chatId: string;
  userId: string;
  lastSeen: string;

  chat?: IChat;
  user?: UserInfo;
}
