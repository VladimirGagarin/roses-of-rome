import { create } from "zustand";

/** Tracks the single currently-playing video across the whole app
 * so that starting one automatically pauses every other player. */
export const useVideoStore = create((set) => ({
  activeId: null,
  setActive: (id) => set({ activeId: id }),
}));