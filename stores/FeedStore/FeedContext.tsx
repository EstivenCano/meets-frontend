"use client";

import { FC, ReactNode, createContext, useContext } from "react";
import { feedStore, FeedStoreType } from ".";
import { useStore } from "zustand";

const FeedContext = createContext(feedStore());

export const FeedProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <FeedContext.Provider value={feedStore()}>{children}</FeedContext.Provider>
);

export const useFeedStore = <T,>(selector: (state: FeedStoreType) => T) =>
  useStore(useContext(FeedContext), selector);

export default FeedProvider;
