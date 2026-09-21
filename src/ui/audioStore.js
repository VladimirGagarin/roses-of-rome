import { create } from "zustand";

/** Tracks the single currently-playing song across the whole app
 * so that starting one automatically pauses every other player.
 * `activeEl` is the AudioPlayer root node, kept after pause so the
 * floating mini-tracker can offer play/pause + scroll-to-song. */
export const useAudioStore = create((set) => ({
  activeId: null,
  activeEl: null,
  setActive: (id, el) => set({ activeId: id, activeEl: el }),
  clearActive: () => set({ activeId: null, activeEl: null }),
  endedUid: null,
  endedCount: 0,
  markEnded: (uid) =>
    set((s) => ({ endedUid: uid, endedCount: s.endedCount + 1 })),
  playNextUid: null,
  playNextCount: 0,
  sendPlay: (uid) =>
    set((s) => ({ playNextUid: uid, playNextCount: s.playNextCount + 1 })),
  ackPlay: () => set({ playNextUid: null, playNextCount: 0 }),
}));