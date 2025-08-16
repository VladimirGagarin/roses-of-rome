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

   // In your component
  
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateProgress = () => {
    if (progressRef.current) {
      const progress = (audio.currentTime / audio.duration) * 360;
      progressRef.current.style.background = 
        `linear-gradient(#111, #111) content-box,
         conic-gradient(#ff4d4d ${progress}deg, transparent ${progress}deg 360deg) border-box`;
    }
  };

  const animate = () => {
    updateProgress();
    frameRef.current = requestAnimationFrame(animate);
  };

  if (isPlaying) {
    frameRef.current = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(frameRef.current);
  }

  return () => {
    cancelAnimationFrame(frameRef.current);
  };
}, [isPlaying]);

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateProgress = () => {
    if (progressRef.current) {
      const progress = (audio.currentTime / audio.duration) * 360;
      progressRef.current.style.background = 
        `linear-gradient(#111, #111) content-box,
         conic-gradient(#ff4d4d ${progress}deg, transparent ${progress}deg 360deg) border-box`;
    }
  };

  const handleSeek = () => {
    cancelAnimationFrame(frameRef.current);
    updateProgress();
    if (isPlaying) {
      frameRef.current = requestAnimationFrame(animate);
    }
  };

  const animate = () => {
    updateProgress();
    frameRef.current = requestAnimationFrame(animate);
  };

  audio.addEventListener('seeked', handleSeek);
  return () => audio.removeEventListener('seeked', handleSeek);
}, [isPlaying]);

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
              gap: "4px"
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
            {audioState === "loading" || audioState === "waiting" ? (
              <FaSpinner className="spinner-icon" />
            ) : isPlaying ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
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
              
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
