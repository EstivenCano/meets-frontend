import { Chat } from "@/model/Chat";
import { Message } from "@/model/Message";
import { produce } from "immer";
import { create } from "zustand";

interface ChatState {
  chats: Chat[];
  actualRoom: string;
  tempMessages: Message[];
  setChat: (chat: Chat) => void;
  setActualRoom: (room: string) => void;
  setMessage: (message: Message & { chatName?: string }) => void;
  setTempMessages: (message: Message) => void;
  setChats: (chats: Chat[]) => void;
}

export const chatStore = create<ChatState>()((set, get) => ({
  chats: [],
  actualRoom: "",
  tempMessages: [],
  setChats: (chats) => set(() => ({ chats })),
  setChat: (chat) => set(() => ({ chats: [...get().chats, chat] })),
  setActualRoom: (room) => set(() => ({ actualRoom: room })),
  setMessage: (message) => {
    const index = get().chats.findIndex(
      (chat) => chat.name === message.chatName
    );
    set(
      produce((state: ChatState) => {
        state.chats[index].messages = [...state.chats[index].messages, message];
      })
    );
  },
  setTempMessages: (message) =>
    set(() => ({ tempMessages: [...get().tempMessages, message] })),
}));
