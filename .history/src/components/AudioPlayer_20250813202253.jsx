import { useRef, useState, useEffect} from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./AudioComponent.css";
import { useLanguage } from "./LanguageContext";

export default function AudioComponent({ audioFile, title }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stalled, setStalled] = useState(false);
  const [error, setError] = useState(null);

  const { language } = useLanguage();

  const loadingMsg = language === "it" ? "Caricamento..." : "Loading...";
  const stalledMsg = language === "it" ? "Un momento..." : "A moment...";
  const errorMsg = language === "it" ? "Errore audio" : "Audio error";

  // Listen for "pause-all-audio" event
  useEffect(() => {
    const handler = (e) => {
      if ((audioRef.current && !e.detail) || e.detail !== audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
      }
    };
    window.addEventListener("pause-all-audio", handler);
    return () => window.removeEventListener("pause-all-audio", handler);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    }
  }, [language]); // Runs when language changes

  // Pause audio if audioFile changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      setError(null);
    }
  }, [audioFile]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (loading || error || stalled) return;

    if (isPlaying) {
      audio.pause();
    } else {
      window.dispatchEvent(
        new CustomEvent("pause-all-audio", { detail: audio })
      );
      audio.play();
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(audioRef.current.currentTime / audioRef.current.duration);
    }
  };

  const handleProgressBarClick = (e) => {
    if (!audioRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handlePlaying = () => {
    setIsPlaying(true);
    setLoading(false);
    setStalled(false);
    setError(null);
  };
  const handlePause = () => setIsPlaying(false);
  const handleWaiting = () => {
    setLoading(true);
    setStalled(false);
    setIsPlaying(false);
  };
  const handleStalled = () => {
    setLoading(false);
    setStalled(true);
    setIsPlaying(false);
  };
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
  };
  const handleError = () => {
    setError(true);
    setLoading(false);
    setStalled(false);
    setIsPlaying(false);
  };
  const handleCanPlayThrough = () => {
    setLoading(false);
    setStalled(false);
    setError(null);
   
  };

  return (
    <div className={ `audio-component ${isPlaying ? "active" : ""}`}>
      <div className="audio-header">
        <span className="audio-title">{title}</span>
      </div>
      <audio
        ref={audioRef}
        src={audioFile}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlaying}
        onPause={handlePause}
        onWaiting={handleWaiting}
        onStalled={handleStalled}
        onEnded={handleEnded}
        onPlaying={handlePlaying}
        onError={handleError}
        onCanPlay={handleCanPlayThrough}
        onCanPlayThrough={handleCanPlayThrough}
        preload="auto"
      />
      <div className="audio-controls">
        <button
          className="audio-playpause"
          onClick={handlePlayPause}
          aria-label={
            isPlaying
              ? language === "it"
                ? "Pausa"
                : "Pause"
              : language === "it"
              ? "Riproduci"
              : "Play"
          }
          title={
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
        <div
          className="audio-progress-container"
          onClick={handleProgressBarClick}
        >
          <div className="audio-progress-bar">
            <div
              className={"audio-progress"}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
        <span className="audio-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      {(loading || stalled || error) && (
        <div className="audio-overlay">
          {error ? errorMsg : loading ? loadingMsg : stalledMsg}
        </div>
      )}
    </div>
  );
}

function formatTime(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
