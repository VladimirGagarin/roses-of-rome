import { useRef, useState, useEffect, useMemo} from "react";
import { FaPlay, FaPause, FaRetweet, FaSyncAlt, FaRegHeart, FaHeart,FaMusic } from "react-icons/fa";
import "./AudioComponent.css";
import { useLanguage } from "./LanguageContext";
import { useLocation } from "react-router-dom";  // 👈 import this
import { RosesOfRomeSongs } from "./Songs.js";


export default function AudioComponent({ audioFile, title, autoplay = false }) {
  const allSongs = useMemo(() => RosesOfRomeSongs(), []);
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
  const [songHasId, setSongHasId] = useState(null);

  // On mount, check local storage for like status

 useEffect(() => {
   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
   setIsLiked(favorites.includes(audioFile));
 }, [audioFile]);

 useEffect(() => {
   const saved = sessionStorage.getItem("currentAudioFile");
   if (saved === audioFile && audioRef.current) {
     // 🔥 re-dispatch as if this audio just became current
     window.dispatchEvent(
       new CustomEvent("set-current-audio", { detail: audioRef.current })
     );
   }
 }, [audioFile]);



  
  useEffect(() => {
    const song = allSongs.find(s => s.songFile === audioFile);

    if (song) {
      setSongHasId(true);
    }
    else{
      setSongHasId(false);
    }
  }, [allSongs, audioFile])


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
    favorites = favorites.filter((fav) => fav !== audioFile);
    setIsLiked(false);
  } else {
    favorites.push(audioFile);
    setIsLiked(true);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  // 🔥 Let other components know
  window.dispatchEvent(new Event("favoritesUpdated"));
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

    // Save current audio file in sessionStorage instead of localStorage
    sessionStorage.setItem("currentAudioFile", audioFile);
    
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
      sessionStorage.removeItem("currentAudioFile");
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
  <div className={`audio-component ${isCurrent ? "current" : ""} ${isPlaying ? "playing" : ""}`} ref={audioComponentElement}>
    {!isOnline ? (
      <div className="network-status">
        <FaWifi className="network-icon" />
        <span>{language === "it" ? "Sei offline" : "You are offline"}</span>
      </div>
    ) : (
      <>
        {/* Hidden audio element */}
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
          autoPlay={autoplay}
        />

        {/* Song Info Section */}
        <div className="audio-info-section">
    
          <div className="audio-header">
            <span className="audio-title">{title}</span>
          </div>
        </div>

        {/* Main Controls Section */}
        <div className="audio-controls-section">
          {/* Play/Pause Button */}
          <button
            className="audio-playpause"
            onClick={handlePlayPause}
            aria-label={isPlaying ? (language === "it" ? "Pausa" : "Pause") : (language === "it" ? "Riproduci" : "Play")}
            title={isPlaying ? (language === "it" ? "Pausa" : "Pause") : (language === "it" ? "Riproduci" : "Play")}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Progress Bar */}
          <div className="audio-progress-container" onClick={handleProgressBarClick}>
            <div className="audio-time">
              <span className="current-time">{formatTime(currentTime)}</span>
              <span className="time-separator"></span>
              <span className="total-time">{formatTime(duration)}</span>
            </div>
            <div className="audio-progress-bar">
              <div
                className={`audio-progress-fill ${isCurrent ? "active" : ""}`}
                style={{ width: `${progress * 100}%` }}
              >
                <div className="progress-handle"></div>
              </div>
            </div>
          </div>

          {/* Additional Controls (only for current playing song) */}
          {isCurrent && (
            <div className="audio-extra-controls">
              <button
                className={`control-btn loop-btn ${isLooping ? "active" : ""}`}
                onClick={handleLoop}
                aria-label={language === "it" ? "Attiva/disattiva ripetizione" : "Toggle loop"}
                title={isLooping ? (language === "it" ? "Disattiva ripetizione" : "Disable loop") : (language === "it" ? "Attiva ripetizione" : "Enable loop")}
              >
                {isLooping ? <FaSyncAlt /> : <FaRetweet />}
              </button>

              {songHasId && (
                <button
                  className={`control-btn like-btn ${isLiked ? "active" : ""}`}
                  onClick={handleLike}
                  aria-label={language === "it" ? "Mi piace" : "Like"}
                  title={isLiked ? (language === "it" ? "Non mi piace più" : "Dislike") : (language === "it" ? "Mi piace" : "Like")}
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Loading/Error Overlay */}
        {(loading || stalled || error) && (
          <div className="audio-overlay">
            <div className="overlay-content">
              {error ? (
                <>
                  <div className="error-icon">⚠️</div>
                  <p className="error-message">{errorMsg}</p>
                  <button onClick={() => {
                    setError(null);
                    window.location.reload(true);
                  }} className="reload-btn">
                    <FaSyncAlt />
                    <span>{language === "it" ? "Ricarica" : "Reload"}</span>
                  </button>
                </>
              ) : (
                <div className="loading-bars">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="loading-text">
                    {language === "it" ? "Caricamento..." : "Loading..."}
                  </span>
                </div>
              )}
            </div>
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
