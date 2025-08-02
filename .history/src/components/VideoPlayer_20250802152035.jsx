import React, { useState, useRef, useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";

export default function VideoPlayer({ videoFile, type = "video/mp4", className = "" }) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const progressBarRef = useRef(null);

  // Event Handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setHasError(false);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };
    const handleStalled = () => {
      setIsLoading(true);
    };
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("error", handleError);
    };
  }, [videoFile]);

  return (
    <div className={`video-player-container `}>
      <video
        ref={videoRef}
        src={videoFile}
        type={type}
        playsInline
        preload="auto"
        style={{ width: "100%", height: "auto", display: "block" }}
          />
              

          {isPlaying && (
              <div >
                  <div className="top-progress-truck">
                      <input type="range"  ref={progressBarRef}/>
                  </div>
              </div>
          )}
      {(isLoading || hasError) && (
        <div className="video-loading-overlay" style={overlayStyles}>
          {!hasError ? (
            <>
              <FaSpinner className="spinner-icon" style={{ fontSize: "2rem", animation: "spin 1.5s linear infinite" }} />
              <p style={{ marginTop: "10px" }}>Loading video...</p>
            </>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>Error loading video</p>
          )}
        </div>
      )}

      {/* Spinner animation CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

const overlayStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  zIndex: 10,
  userSelect: "none",
};
