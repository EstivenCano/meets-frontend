import { User } from "@/services/model/User";
import { create } from "zustand";

interface userStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const userStore = create<userStore>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
