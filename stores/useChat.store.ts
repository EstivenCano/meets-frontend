import { Chat } from "@/model/Chat";
import { Message } from "@/model/Message";
import { produce } from "immer";
import { create } from "zustand";

interface ChatState {
  chats: Chat[];
  actualRoom: string;
  setActualRoom: (room: string) => void;
  setChats: (chats: Chat[]) => void;
  setMessage: (message: Message & { chatName?: string }) => void;
}

export const chatStore = create<ChatState>()((set, get) => ({
  chats: [],
  actualRoom: "",
  setChats: (chats) => set(() => ({ chats })),
  setActualRoom: (room) => set(() => ({ actualRoom: room })),
  setMessage: (message) => {
    const index = get().chats.findIndex(
      (chat) => chat.name === message.chatName
    );
    set(
      produce((state: ChatState) => {
        state.chats[index].messages = [message, ...state.chats[index].messages];
        state.chats.sort(
          (a, b) =>
            new Date(b.messages.at(0)?.createdAt || 0).getTime() -
            new Date(a.messages.at(0)?.createdAt || 0).getTime()
        );
      })
    );
  },
}));
