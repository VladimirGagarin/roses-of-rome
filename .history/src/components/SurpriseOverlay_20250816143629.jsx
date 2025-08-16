// SurpriseOverlay.jsx
import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa6";
import BgVid from "../assets/videos/bg_vid2.mp4";
import BgImg from "../assets/images/ror.png";
import "../index.css";


export default function SurpriseOverlay({
  language,
  audioRef,
  currentLine,
  isPlaying,
  setPlaying,
  audioState,
  setSurprise,
  dynamicBgImage,
  song,
  setCurrentLine
}) {
    const [isSlowNetwork, setIsSlowNetwork] = useState(true);
   
    const progressRef = useRef(null);
    const frameRef = useRef();
    // const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 800);

  useEffect(() => {
    if ("connection" in navigator) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      const checkNetworkSpeed = () => {
        if (connection.effectiveType) {
          // Mark as slow if 3g, 2g, or slow-2g
          setIsSlowNetwork(
            ["slow-2g", "2g", "3g"].includes(connection.effectiveType)
          );
        }
      };

      checkNetworkSpeed();
      connection.addEventListener("change", checkNetworkSpeed);

      return () => {
        connection.removeEventListener("change", checkNetworkSpeed);
      };
    }
  }, []);

 useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!progressRef.current) return;
      
      const progress = Math.min((audio.currentTime / audio.duration) * 360, 360);
      const color = audioState === "stalled" ? "#ff4d4d" : "#00ffff"; // Red when stalled, cyan when playing
      
      progressRef.current.style.background = 
        `linear-gradient(#111, #111) content-box,
         conic-gradient(${color} 0deg, ${color} ${progress}deg, transparent ${progress}deg 360deg) border-box`;
    };

    const animate = () => {
      updateProgress();
      frameRef.current = requestAnimationFrame(animate);
    };

    const handlePlay = () => {
      frameRef.current = requestAnimationFrame(animate);
    };

    const handlePause = () => {
      cancelAnimationFrame(frameRef.current);
      updateProgress();
    };

    const handleEnded = () => {
      cancelAnimationFrame(frameRef.current);
      if (progressRef.current) {
        progressRef.current.style.background = 
          `linear-gradient(#111, #111) content-box,
           conic-gradient(#00ffff 0deg, #00ffff 360deg, transparent 360deg) border-box`;
      }
    };

    const handleSeek = () => {
      cancelAnimationFrame(frameRef.current);
      updateProgress();
      if (isPlaying) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

   audio.addEventListener('play', handlePlay);
    audio.addEventListener("playing", handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('seeked', handleSeek);

    // Initialize progress
    updateProgress();

    return () => {
      cancelAnimationFrame(frameRef.current);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('seeked', handleSeek);
    };
  }, [isPlaying, audioState, audioRef]);


  return (
    <div className="overlay-modal-suprise">
      {isSlowNetwork ? (
        <img
          src={BgImg}
          key={BgImg}
          alt="Background"
          className="video-background"
          onContextMenu={(e) => e.preventDefault()}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-background"
          onContextMenu={(e) => e.preventDefault()}
          disablePictureInPicture
          onStalled={() => {
            console.warn("Video stalled — switching to image fallback.");
            setIsSlowNetwork(true); // fallback to image
          }}
          onPlaying={() => {
            console.log("Video playing — keeping video background.");
            setIsSlowNetwork(false); // keep video
          }}
        >
          <source src={BgVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="overlay-content-surprise">
        <audio ref={audioRef}>
          <source src={song} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {(audioState === "loading" ||
          audioState === "stalled" ||
          audioState === "waiting") && (
          <div className="audio-state-indicator">
            <div className="loading-spinner"></div>
            <p>
              {language === "it"
                ? "Caricamento in corso..."
                : audioState === "waiting"
                ? "Buffering audio..."
                : "Loading audio..."}
            </p>
          </div>
        )}

        <div className="progress-border" ref={progressRef}></div>

        <div className="lyrics synced">
          <p
            key={dynamicBgImage}
            style={{
              backgroundImage: `url(${dynamicBgImage})`,
              gap: "4px",
            }}
          >
            {currentLine || "🎵"}
          </p>
        </div>

        <div className="actions-btn">
          <button
            className="play-pause-btn"
            onClick={() => {
              if (!audioRef.current) return;
              if (isPlaying) {
                audioRef.current.pause();
                setPlaying(false);
              } else {
                audioRef.current.play();
                setPlaying(true);
              }
            }}
            disabled={
              audioState === "loading" ||
              audioState === "stalled" ||
              audioState === "waiting"
            }
          >
            {/* Progress indicator (positioned absolutely behind the icon) */}
            <div
              className="button-progress"
              
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "3px solid transparent",
                boxSizing: "border-box",
                background: `
                  linear-gradient(135deg, #ff8a00, #e52e71) content-box,
                  conic-gradient(
                    ${audioState === "stalled" ? "#fc1504ff" : "#0066ffff"} 0deg, 
                    ${audioState === "stalled" ? "#fc1504ff" : "#0066ffff"} ${
                  (audioRef.current?.currentTime / audioRef.current?.duration ||
                    0) * 360
                }deg, 
                    transparent ${
                      (audioRef.current?.currentTime /
                        audioRef.current?.duration || 0) * 360
                    }deg
                  ) border-box`,
              }}
            ></div>

            {/* Icon (positioned relatively above the progress) */}
            <span className="button-icon">
              {audioState === "loading" || audioState === "waiting" ? (
                <FaSpinner className="spinner-icon" />
              ) : isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </span>
          </button>

          <button
            className="close-btn-overlay"
            aria-label="Close surprise message"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setPlaying(false);
              }
              setSurprise(false);
              setCurrentLine("");
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
