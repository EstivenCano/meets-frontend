import { Feed } from "@/services/model/Feed";
import { create } from "zustand";
import { userStore } from "./useUser.store";
import { match } from "ts-pattern";

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
      ].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })),
  setPage: (page) => set(() => ({ page })),
  setPerPage: (perPage) => set(() => ({ perPage })),
  setSearchString: (searchString) => set(() => ({ searchString })),
  updateLike: (id, like) => {
    const feed = get().feed.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likedBy: match(like)
            .with(true, () => [
              ...post.likedBy,
              {
                id: Number(user?.id),
                name: user?.name || "",
                profile: {
                  picture: user?.picture || "",
                },
              },
            ])
            .otherwise(() =>
              post.likedBy.filter((user) => user.id !== Number(user?.id))
            ),
          _count: {
            ...post._count,
            likedBy: match(like)
              .with(true, () => post._count.likedBy + 1)
              .otherwise(() => post._count.likedBy - 1),
          },
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
