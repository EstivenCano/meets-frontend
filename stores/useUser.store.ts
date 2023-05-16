import { User } from "@/model/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const userStore = create<userStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
    }),
    {
      name: "user-storage",
    }
  )
);
