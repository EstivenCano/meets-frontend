import { Message } from "./Message";
import { UserInfo } from "./UserInfo";

export interface Chat {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  participants: UserInfo[];
  messages: Message[];
  _count: {
    messages: number;
  };
}
