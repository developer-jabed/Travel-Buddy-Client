import { IChat } from "./Chat.interface";
import { UserInfo } from "./user.interface";

export interface IMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;

  sender?: UserInfo;
  chat?: IChat;
}
