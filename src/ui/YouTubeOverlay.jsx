import { useEffect } from "react";
import { FaTimes, FaYoutube } from "react-icons/fa";
import { useVideoOverlay } from "../context/VideoOverlayContext";
import "./YouTubeOverlay.css";

function embedUrlWithAutoplay(url) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}autoplay=1`;
}

/**
 * Underline-style inline link that opens the video in an overlay.
 * Usage: <VideoLink url="https://www.youtube.com/embed/..." title="...">text</VideoLink>
 */
export function VideoLink({ url, title, children, className = "" }) {
  const { openVideo } = useVideoOverlay();
  const label = title || (typeof children === "string" ? children : "");
  return (
    <button
      type="button"
      className={`video-link ${className}`}
      onClick={() => openVideo(url, label)}
      aria-label={`Watch video: ${label}`}
    >
      {children}
    </button>
  );
}

export default function YouTubeOverlay() {
  const { video, closeVideo } = useVideoOverlay();

  useEffect(() => {
    if (!video) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [video, closeVideo]);

  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [video]);

  if (!video) return null;

  return (
    <div
      className="yt-overlay"
      onClick={closeVideo}
      role="dialog"
      aria-modal="true"
      aria-label={video.title || "YouTube video"}
    >
      <div className="yt-panel" onClick={(e) => e.stopPropagation()}>
        <button className="yt-close" onClick={closeVideo} aria-label="Close video" title="Close video">
          <FaTimes />
        </button>

        <div className="yt-head">
          <FaYoutube className="yt-icon" />
          {video.title && <span className="yt-title">{video.title}</span>}
        </div>

        <div className="yt-frame">
          <iframe
            key={video.url}
            src={embedUrlWithAutoplay(video.url)}
            title={video.title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}