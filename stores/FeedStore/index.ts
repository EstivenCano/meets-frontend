import { Feed } from "@/services/model/Feed";
import { create } from "zustand";
import { userStore } from "../useUser.store";
import { dateSort } from "@/utils/dateSort";
import { updateLike } from "@/utils/updateLike";
import { produce } from "immer";

const user = userStore.getState().user;

export interface FeedStoreType {
  feed: Feed[];
  perPage: number;
  searchString: string;
  setFeed: (post: Feed[]) => void;
  setPerPage: (perPage: number) => void;
  setSearchString: (searchString: string) => void;
  updateLike: (id: number, like: boolean) => void;
  deletePost: (id: number) => void;
  updateCommentCount: (id: number) => void;
}

export const feedStore = () =>
  create<FeedStoreType>()((set, get) => ({
    feed: [],
    perPage: 15,
    searchString: "",
    setFeed: (feed) => {
      set(
        produce((state: FeedStoreType) => {
          state.feed = [...state.feed, ...feed].sort(dateSort);
        })
      );
    },
    setPerPage: (perPage) => set(() => ({ perPage })),
    setSearchString: (searchString) => set(() => ({ searchString })),
    updateLike: (id, like) => {
      set(
        produce((state: FeedStoreType) => {
          const toUpdate = state.feed.findIndex((post) => post.id === id);
          state.feed[toUpdate] = updateLike(
            state.feed[toUpdate],
            like,
            Number(user?.id)
          );
        })
      );
    },
    deletePost: (id) => {
      const feed = get().feed.filter((post) => post.id !== id);
      set(() => ({ feed }));
    },
    updateCommentCount: (id) => {
      const index = get().feed.findIndex((post) => post.id === id);
      set(
        produce((state: FeedStoreType) => {
          ++state.feed[index]._count.comments;
        })
      );
    },
  }));
