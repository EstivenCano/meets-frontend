import { Chat } from "@/model/Chat";
import { Message } from "@/model/Message";
import { produce } from "immer";
import { create } from "zustand";

interface ChatState {
  chats: Chat[];
  chatPages: { chatName: string; page: number }[];
  perPage: number;
  actualRoom: string;
  setActualRoom: (room: string) => void;
  setChatPages: (chatName: string, page: number) => void;
  setChats: (chats: Chat[]) => void;
  setMessage: (message: Message & { chatName?: string }) => void;
  loadMoreMessages: (messages: Message[]) => void;
}

export const chatStore = create<ChatState>()((set, get) => ({
  chats: [],
  chatPages: [],
  perPage: 15,
  actualRoom: "",
  setChatPages: (chatName, page) => {
    const index = get().chatPages.findIndex(
      (chat) => chat.chatName === chatName
    );
    set(
      produce((state: ChatState) => {
        if (index !== -1) {
          state.chatPages[index] = { chatName, page };
        } else {
          state.chatPages = [...state.chatPages, { chatName, page }];
        }
      })
    );
  },
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
  loadMoreMessages: (messages) => {
    const index = get().chats.findIndex(
      (chat) => chat.name === get().actualRoom
    );
    set(
      produce((state: ChatState) => {
        state.chats[index].messages = [
          ...state.chats[index].messages,
          ...messages,
        ];
      })
    );
  },
}));
