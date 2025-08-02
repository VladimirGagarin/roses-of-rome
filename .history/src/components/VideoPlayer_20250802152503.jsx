import React, { useState, useRef, useEffect } from "react";
import { FaSpinner, FaPlay, FaPause, FaExpand, FaMinimize } from "react-icons/fa6";

export default function VideoPlayer({ videoFile, type = "video/mp4", }) {
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
    <div className={`video-player-container`}>
      <video
        ref={videoRef}
        src={videoFile}
        type={type}
        playsInline
        preload="auto"
       className="full"
          />
              

          {isPlaying && (
              <div >
                  <div className="top-progress-truck">
                      <input type="range"  ref={progressBarRef}/>
                  </div>
              </div>
          )}
      {(isLoading || hasError) && (
        <div className="video-loading-overlay">
          {!hasError ? (
            <>
              <FaSpinner className="spinner-icon" />
            </>
          ) : (
            <p className="erro-message">{language === "en" ? "Error loading video" : ""}</p>
          )}
        </div>
      )}

    </div>
  );
}


