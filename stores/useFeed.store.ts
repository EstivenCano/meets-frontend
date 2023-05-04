import { Feed } from "@/services/model/Feed";
import { create } from "zustand";
import { userStore } from "./useUser.store";
import { match } from "ts-pattern";
import { dateSort } from "@/utils/dateSort";

const user = userStore.getState().user;

interface feedStore {
  feed: Feed[];
  perPage: number;
  page: number;
  searchString: string;
  setFeed: (post: Feed[]) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setSearchString: (searchString: string) => void;
  updateLike: (id: number, like: boolean) => void;
  deletePost: (id: number) => void;
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
      ].sort((a, b) => dateSort(a.createdAt, b.createdAt)),
    })),
  setPage: (page) => set(() => ({ page })),
  setPerPage: (perPage) => set(() => ({ perPage })),
  setSearchString: (searchString) => set(() => ({ searchString })),
  updateLike: (id, like) => {
    const feed = get().feed.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          ...match(like)
            .with(true, () => ({
              likedBy: [...post.likedBy, { id: Number(user?.id) }],
              _count: {
                ...post._count,
                likedBy: post._count.likedBy + 1,
              },
            }))
            .otherwise(() => ({
              likedBy: post.likedBy.filter(({ id }) => id !== Number(user?.id)),
              _count: {
                ...post._count,
                likedBy: post._count.likedBy - 1,
              },
            })),
        };
      }
      return post;
    });
    set(() => ({ feed }));
  },
  deletePost: (id) => {
    const feed = get().feed.filter((post) => post.id !== id);
    set(() => ({ feed }));
  },
}));
