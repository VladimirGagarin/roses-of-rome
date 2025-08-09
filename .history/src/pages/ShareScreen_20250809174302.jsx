import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer.jsx";
import { useState, useEffect, useRef } from "react";
import { FaHome, FaMusic, FaShareAlt } from "react-icons/fa";
import { useLanguage } from "../components/LanguageContext";
import BannerHead from "../components/Banner.jsx";
import "../App.css";

export default function ShareScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { language } = useLanguage();

  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [audioState, setAudioState] = useState("idle");
    const audioRef = useRef(null);
    
    

  // Load song by ID
  useEffect(() => {
    const allSongs = RosesOfRomeSongs();
    const foundSong = allSongs.find(
      (song) => String(song.songId) === String(id)
    );

    if (foundSong) {
      setCurrentSongObj(foundSong);
    } else {
      navigate("/pages/home");
    }
  }, [id, navigate]);

  // Handle sharing
  const handleShare = async () => {
    if (!currentSongObj) return;

    const songTitle =
      currentSongObj.songName[language] || currentSongObj.songName.en;
    const shareData = {
      title: songTitle,
      text:
        language === "it"
          ? `Ascolta "${songTitle}" 🎶`
          : `Listen to "${songTitle}" 🎶`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        alert(
          language === "it"
            ? "Link copiato negli appunti!"
            : "Link copied to clipboard!"
        );
      }
    } catch (err) {
      console.error("Sharing failed:", err);
    }
  };

  // Fallback UI if song not found
  if (!currentSongObj) {
    return (
      <div className="song-error">
        <h2>{language === "it" ? "Canzone non trovata" : "Song Not Found"}</h2>
        <p>
          {language === "it"
            ? "La canzone che stai cercando potrebbe essere stata rimossa o il link è errato."
            : "The song you are looking for might have been removed or the link is incorrect."}
        </p>
        <button onClick={() => navigate("/pages/home")}>
          {language === "it" ? "Torna alla Home" : "Go Home"}
        </button>
      </div>
    );
  }

  const songTitle =
    currentSongObj.songName[language] || currentSongObj.songName.en;

  return (
    <div className="share-screen">
      {/* Header */}
    

      {/* Navigation */}
      <nav className="share-nav">
        <button
          className="nav-button"
          onClick={() => navigate("/pages/home")}
          aria-label={language === "it" ? "Torna alla Home" : "Go to Home"}
        >
          <FaHome />
          <span>{language === "it" ? "Home" : "Home"}</span>
        </button>

        <button
          className="nav-button"
          onClick={() => navigate("/pages/playlist")}
          aria-label={
            language === "it" ? "Vai alla Playlist" : "Go to Playlist"
          }
        >
          <FaMusic />
          <span>{language === "it" ? "Playlist" : "Playlist"}</span>
        </button>
      </nav>

      {/* Song Player */}
      <div className="share-content">
        <h1>{songTitle}</h1>

        {currentSongObj.songAlbum && (
          <p className="song-album">
            {language === "it" ? "Dall'album" : "From album"}:{" "}
            {currentSongObj.songAlbum}
          </p>
        )}

        <div className="audio-wrapper">
          <AudioComponent
            audioFile={currentSongObj.songFile}
            title={songTitle}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setPlaying={setPlaying}
            setAudioState={setAudioState}
          />
        </div>

        <button
          className="share-button"
          onClick={handleShare}
          disabled={audioState === "waiting" || audioState === "stalled"}
        >
          <FaShareAlt />
          <span>{language === "it" ? "Condividi" : "Share"}</span>
        </button>
      </div>
    </div>
  );
}
