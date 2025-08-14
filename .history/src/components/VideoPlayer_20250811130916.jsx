import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FaSpinner,
  FaPlay,
  FaPause,
  FaExpand,
  FaMinimize,
  FaYoutube,
} from "react-icons/fa6";
import {FaShareAlt} from "react-icons/fa"
import { useLanguage } from "./LanguageContext";
import "../components/AllVideoStyles.css";
import {Link} from "react-router-dom";



function getPlayCount(id) {
  return parseInt(sessionStorage.getItem(`play_${id}`) || "0");
}

function incrementPlayCount(id) {
  const current = getPlayCount(id);
  sessionStorage.setItem(`play_${id}`, current + 1);
  return current + 1;
}


export default function VideoPlayer({ videoFile, type = "video/mp4", autoPlay = false, ytLink , videoId }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const containerRef = useRef(null);
  

  const { language } = useLanguage();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activityTimeout, setActivityTimeout] = useState(null);

  const [localPermission, setLocalPermission] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

    
useEffect(() => {
  const permissions = JSON.parse(localStorage.getItem("videoPermissions") || "{}");
  const allowed = permissions[videoId] !== false; // Default to true if not set
  setLocalPermission(allowed);
}, [videoId]);



  useEffect(() => {
  const video = videoRef.current;
  if (autoPlay && video && localPermission) {
    const tryPlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay was blocked:", err);
        setIsPlaying(false);
      }
    };
    tryPlay();

    video.scrollIntoView({ block: "center", behavior: "smooth" });
  }
}, [autoPlay, videoFile, localPermission]); // ✅ include localPermission in dependencies

  // Video event listeners
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
      setDuration(video.duration);
    };
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setHasError(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleStalled = () => setIsLoading(true);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };
    const handleTimeUpdate = () => {
      // Calculate progress percentage
      if (video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("error", handleError);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("error", handleError);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoFile]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      setIsFullscreen(!!isFullscreen);
      // You can update state here if needed
    };

    // Add event listener
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // Clean up
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Add these inside your component

  const resetActivityTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(activityTimeout);

    setActivityTimeout(
      setTimeout(() => {
        setShowControls(false);
      }, 3000)
    ); // Hide after 3 seconds of inactivity
  }, [activityTimeout]);

  useEffect(() => {
    const videoContainer = containerRef.current;
    if (!videoContainer) return;

    // Set up event listeners
    videoContainer.addEventListener("mousemove", resetActivityTimer);
    videoContainer.addEventListener("touchstart", resetActivityTimer);
    videoContainer.addEventListener("click", resetActivityTimer);

    return () => {
      videoContainer.removeEventListener("mousemove", resetActivityTimer);
      videoContainer.removeEventListener("touchstart", resetActivityTimer);
      videoContainer.removeEventListener("click", resetActivityTimer);
      clearTimeout(activityTimeout);
    };
  }, [resetActivityTimer, activityTimeout]);

  // Toggle play/pause
 const togglePlayPause = () => {
  if (!videoRef.current || isLoading || !localPermission) return;

  if (isPlaying) {
    videoRef.current.pause();
    setShowControls(true);
  } else {
    videoRef.current.play().catch((err) => {
      console.warn("Playback failed:", err);
      setIsPlaying(false);
    });
    resetActivityTimer();
  }
};


  // Handle user seeking via progress bar
  const handleProgressChange = (e) => {
    if (!videoRef.current || !localPermission) return;
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    const newTime = (newProgress / 100) * duration;
    videoRef.current.currentTime = newTime;
  };

  // Fullscreen toggling
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {
          /* ignore errors */
        });
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {
          /* ignore errors */
        });
    }
  };

  // Format seconds to mm:ss
  const formatTime = (sec) => {
    if (isNaN(sec)) return "00:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const CopyLink = () => {
    navigator.clipboard.writeText(ytLink).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }catch((err) => {
      
    })
    )
    
  }

  return (
    <div
      className={`video-player-container ${!isPlaying ? "paused" : ""} ${
        isLoading ? "loading" : ""
      }`}
      ref={containerRef}
    >
      {!localPermission ? (
        <div
          style={{
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: "8px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            {language === "it"
              ? "Hai raggiunto il limite di visualizzazioni."
              : "You’ve reached the viewing limit."}
          </p>
          <a
            href={ytLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#ff0000",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-flex", // ✅ Aligns icon and text
              alignItems: "center", // ✅ Vertically centers them
              gap: "0.5rem", // ✅ Adds space between text and icon
            }}
          >
            <span>{language === "it" ? "Guarda su" : "Watch on"}</span>
            <FaYoutube size={20} />
            <span>YouTube</span>
          </a>

          <button
            style={{
              backgroundColor: "#ff0000",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              marginTop: "20px",
              border: "none",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-flex", // ✅ Aligns icon and text
              alignItems: "center", // ✅ Vertically centers them
              gap: "0.8rem", // ✅ Adds space between text and icon
              cursor: "pointer",
            }}
            onClick={() => CopyLink()}
          >
             <FaShareAlt /> 
            {language === "it" ? ( isCopied ? "Copiata!" : "Copiata link condividi video") : ( isCopied ? "Copied" : "Copy link to share video")}
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={videoFile}
            type={type}
            playsInline
            autoPlay={autoPlay}
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onClick={togglePlayPause}
            onDoubleClick={toggleFullscreen}
            onEnded={() => {
              const id = videoFile; // Or pass the video ID as a prop if needed
              const count = incrementPlayCount(id);
              if (count >= 2) {
                setLocalPermission(false);
                // Fetch existing permissions from localStorage
                const existingPermissions = JSON.parse(
                  localStorage.getItem("videoPermissions") || "{}"
                );

                // Update the permission for the specific videoId
                existingPermissions[videoId] = false;

                // Save updated permissions back to localStorage
                localStorage.setItem(
                  "videoPermissions",
                  JSON.stringify(existingPermissions)
                );

                videoRef.current.pause();
              }
            }}
            preload="auto"
            className="video-player"
          />

          {/* Loading / error overlay */}
          {(isLoading || hasError) && (
            <div
              className={`video-controls ${
                showControls || !isPlaying || isLoading ? "visible" : ""
              }`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              {!hasError ? (
                <>
                  <FaSpinner
                    className="spinner-icon"
                    style={{
                      fontSize: "2rem",
                      animation: "spin 1.5s linear infinite",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    {language === "it"
                      ? "Caricamento video..."
                      : "Loading video..."}
                  </p>
                </>
              ) : (
                <p className="error-message">
                  {language === "it"
                    ? "Errore nel caricamento video"
                    : "Error loading video"}
                </p>
              )}
            </div>
          )}

          {/* Controls below video */}
          <div className="video-controls">
            {/* Play/Pause button */}
            {!isLoading && (
              <button
                onClick={togglePlayPause}
                aria-label={
                  isPlaying
                    ? language === "it"
                      ? "Pausa"
                      : "Pause"
                    : language === "it"
                    ? "Riproduci"
                    : "Play"
                }
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            )}

            {/* Progress bar */}
            <input
              type="range"
              ref={progressBarRef}
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={handleProgressChange}
              aria-label={
                language === "it"
                  ? "Barra di avanzamento video"
                  : "Video progress bar"
              }
            />

            {/* Time elapsed / duration */}
            <div className="progress-duration">
              {formatTime((progress / 100) * duration)} / {formatTime(duration)}
            </div>

            <Link
              to={ytLink}
              style={{
                textDecoration: "none",
                display: "inline-flex", // ✅ Aligns icon and text
                alignItems: "center", // ✅ Vertically centers them
                gap: "0.5rem", // ✅ Adds space between text and icon
              }}
            >
              {" "}
              <FaYoutube /> YouTube
            </Link>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen
                  ? language === "it"
                    ? "Riduci a schermo normale"
                    : "Exit Fullscreen"
                  : language === "it"
                  ? "Schermo intero"
                  : "Fullscreen"
              }
            >
              {isFullscreen ? <FaMinimize /> : <FaExpand />}
            </button>
          </div>
        </>
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
