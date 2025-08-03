// SurpriseOverlay.jsx
// import { useRef, useEffect } from "react";
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa6";
import BgVid from "../assets/videos/bg_vid.mp4";
import BgVid2 from "../assets/videos/bg_vid2.mp4";
import { useEffect, useState } from "react";

export default function SurpriseOverlay({
  language,
  audioRef,
  currentLine,
  isPlaying,
  setPlaying,
  audioState,
  setSurprise,
  title,
    dynamicBgImage,
  song,
}) {

  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const [env, setEnv] = useState({
    isMobile: false,
    isTouch: false,
    isPortrait: false,
  });

  useEffect(() => {
    const handleEnvironment = () => {
      setEnv({
        isMobile: window.innerWidth <= 800,
        isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
        isPortrait: window.innerHeight > window.innerWidth,
      });
    };

    // Call once at mount
    handleEnvironment();

    // Listen to resize
    window.addEventListener("resize", handleEnvironment);

    // Optional: check every 500ms if needed (not usually necessary)
    const interval = setInterval(handleEnvironment, 500);

    return () => {
      window.removeEventListener("resize", handleEnvironment);
      clearInterval(interval);
    };
  }, []);

  console.log(env); // You should now see real-time changes

  return (
    <div className="overlay-modal-suprise">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
        onContextMenu={(e) => e.preventDefault()}
        disablePictureInPicture
      >
        <source
          src={!isMobile && !isTouch && !isPortrait ? BgVid : BgVid2}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="overlay-content-surprise">
        <h3>{title}</h3>

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

        <div className="lyrics synced">
          <p
            style={{
              backgroundImage: `url(${dynamicBgImage})`,
            }}
          >
            {" "}
            {currentLine}
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
