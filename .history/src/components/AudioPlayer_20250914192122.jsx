import { useRef, useState, useEffect, useMemo} from "react";
import { FaPlay, FaPause, FaRetweet, FaSyncAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import "./AudioComponent.css";
import { useLanguage } from "./LanguageContext";
import { useLocation } from "react-router-dom";  // 👈 import this
import { RosesOfRomeSongs } from "./components/Songs.js";


export default function AudioComponent({ audioFile, title }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stalled, setStalled] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { language } = useLanguage();
  const location = useLocation(); // 👈 get current path
  const [isLooping, setIsLooping] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // get from local storage
  const audioComponentElement = useRef(null);
  const [songObj setSongObj] = useState(null);

  // On mount, check local storage for like status

 useEffect(() => {
   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
   setIsLiked(favorites.includes(audioFile));
 }, [audioFile]);

  
  useEffect(() => {
    const song = 
  }, [])


  // on current scroll audioComponentElement into view if isCurrent
  useEffect(() => {
    if (isCurrent && audioComponentElement.current) {
      audioComponentElement.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isCurrent]);

  // Toggle like status and save to local storage

  const handleLike = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(audioFile)) {
      // Already liked → remove from array
      favorites = favorites.filter((fav) => fav !== audioFile);
      setIsLiked(false);
    } else {
      // Not yet liked → add to array
      favorites.push(audioFile);
      setIsLiked(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };


  // Messages
  const errorMsg = language === "it" ? "Errore audio" : "Audio error";

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLoading(false);
      setStalled(false);
      setError(null);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setError(true);
      setLoading(false);
      setStalled(false);
      setIsPlaying(false);
      window.dispatchEvent(
        new CustomEvent("set-current-audio", { detail: null })
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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
     window.dispatchEvent(
       new CustomEvent("set-current-audio", { detail: null })
     );

     // also stop/pause audio if you want
     if (audioRef.current) {
       audioRef.current.pause();
       audioRef.current.currentTime = 0;
     }
     setIsPlaying(false);
     setCurrentTime(0);
     setProgress(0);
   }, [location.pathname]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("set-current-audio", { detail: null })
    );
    
    if (audioRef.current) {
      audioRef.current.pause();
       audioRef.current.currentTime = 0;
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

  useEffect(() => {
    const handleSetCurrent = (e) => {
      // if the event is from THIS audio element, mark current
      setIsCurrent(e.detail === audioRef.current);
    };
    window.addEventListener("set-current-audio", handleSetCurrent);
    return () =>
      window.removeEventListener("set-current-audio", handleSetCurrent);
  }, []);

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
    // Tell all AudioComponents who is the current one
    window.dispatchEvent(
      new CustomEvent("set-current-audio", { detail: audioRef.current })
    );

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

    if (!isLooping) {
      window.dispatchEvent(
        new CustomEvent("set-current-audio", { detail: null })
      );
    }
  };
  const handleError = () => {
    setError(true);
    setLoading(false);
    setStalled(false);
    setIsPlaying(false);
    window.dispatchEvent(
      new CustomEvent("set-current-audio", { detail: null })
    );
  };
  const handleCanPlayThrough = () => {
    setLoading(false);
    setStalled(false);
    setError(null);
  };

  const handleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  return (
    <div className={`audio-component ${isCurrent ? "current" : ""}`} ref={audioComponentElement}>
      {!isOnline ? (
        <div className="network-status">
          {language === "it" ? "Sei offline" : "You are offline"}
        </div>
      ) : (
        <>
          <div className="audio-header">
            <span className="audio-title">{title}</span>
          </div>

          <audio
            ref={audioRef}
            src={audioFile}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedMetadata}
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
            loop={isLooping}
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
                  className={`audio-progress ${isCurrent ? "active" : ""}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            <span className="audio-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          {isCurrent && (
          <div className="other-controls">
            {/*Loop button loop audio if it is current */}
            {isCurrent && (
              <button
                className="audio-playpause"
                onClick={handleLoop}
                aria-label={
                  language === "it"
                    ? "Attiva/disattiva ripetizione"
                    : "Toggle loop"
                }
                title={
                  isLooping
                    ? language === "it"
                      ? "Disattiva ripetizione"
                      : "Disable loop"
                    : language === "it"
                    ? "Attiva ripetizione"
                    : "Enable loop"
                }
              >
                {isLooping ? <FaSyncAlt /> : <FaRetweet />}
              </button>
            )}
            {/**like button */}
            {isCurrent && (
              <button
                className="audio-playpause"
                onClick={handleLike}
                aria-label={language === "it" ? "Mi piace" : "Like"}
                title={
                  isLiked
                    ? language === "it"
                      ? "Non mi piace più"
                      : "Dislike"
                    : language === "it"
                    ? "Mi piace"
                    : "Like"
                }
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </button>
            )}
          </div>
          )}

          {(loading || stalled || error) && (
            <div className="audio-overlay">
              {error ? errorMsg : null}
              {/* if is error a button to reload page*/}
              {error && (
                <button onClick={() => {
                  setError(null);
                  console.log("i was clicked to reload");
                  window.location.reload(true);
                }} className="share-button reload">
                  <FaSyncAlt />
                  {language === "it" ? "Ricarica" : "Reload"}
                </button>
              )}
              {/*Loading spinner for stalled state*/}
              {(stalled || loading) && (
                <div className="loading-bars">
                  <span className="bars"></span>
                  <span className="bars"></span>
                  <span className="bars"></span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function formatTime(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60); // if minute is less than 10 show leading zero
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m < 10 ? "0" : ""}${m}:${s}`;
}
