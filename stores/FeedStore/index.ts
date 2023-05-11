import { Feed } from "@/model/Feed";
import { create } from "zustand";
import { userStore } from "../useUser.store";
import { dateSort } from "@/utils/dateSort";
import { produce } from "immer";
import { match } from "ts-pattern";

export interface FeedStoreType {
  feed: Feed[];
  perPage: number;
  searchString: string;
  setFeed: (post: Feed[]) => void;
  setPerPage: (perPage: number) => void;
  setSearchString: (searchString: string) => void;
  updateLike: (id: number) => void;
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
    updateLike: (id) => {
      set(
        produce((state: FeedStoreType) => {
          let toUpdate = state.feed.find((post) => post.id === id) as Feed;
          let liked = toUpdate.likedBy.length > 0;
          toUpdate.likedBy = match(liked)
            .with(false, () => [{ id: Number(userStore.getState().user?.id) }])
            .otherwise(() => []);
          toUpdate._count.likedBy = match(liked)
            .with(false, () => toUpdate._count.likedBy + 1)
            .otherwise(() => toUpdate._count.likedBy - 1);
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
