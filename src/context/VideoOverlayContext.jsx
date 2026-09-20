import { createContext, useContext, useState, useCallback } from "react";

const VideoOverlayContext = createContext();

export default function VideoOverlayProvider({ children }) {
  const [video, setVideo] = useState(null); // { url, title }

  const openVideo = useCallback((url, title = "") => setVideo({ url, title }), []);
  const closeVideo = useCallback(() => setVideo(null), []);

  return (
    <VideoOverlayContext.Provider value={{ video, openVideo, closeVideo }}>
      {children}
    </VideoOverlayContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useVideoOverlay = () => useContext(VideoOverlayContext);