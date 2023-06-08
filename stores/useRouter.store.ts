import { create } from "zustand";

interface RouterState {
  loadingRoute: boolean;
  setLoadingRoute: (value: boolean) => void;
}

export const routerStore = create<RouterState>()((set) => ({
  loadingRoute: false,
  setLoadingRoute: (value) => set({ loadingRoute: value }),
}));
