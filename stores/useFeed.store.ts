import { Feed } from "@/services/model/Feed";
import { create } from "zustand";

interface feedStore {
  feed: Feed[];
  perPage: number;
  page: number;
  searchString: string;
  setFeed: (post: Feed[]) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setSearchString: (searchString: string) => void;
}

export const feedStore = create<feedStore>()((set, get) => ({
  feed: [],
  page: 1,
  perPage: 3,
  searchString: "",
  setFeed: (feed) =>
    set(() => ({
      feed: [
        ...get().feed,
        ...feed.filter((f) => !get().feed.some((p) => p.id === f.id)),
      ],
    })),
  setPage: (page) => set(() => ({ page })),
  setPerPage: (perPage) => set(() => ({ perPage })),
  setSearchString: (searchString) => set(() => ({ searchString })),
}));
