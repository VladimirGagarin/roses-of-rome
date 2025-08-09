import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer.jsx";
import { useState, useEffect, useRef } from "react";
import { FaHome, FaMusic, FaShareAlt } from "react-icons/fa";
import { useLanguage } from "../components/LanguageContext";
import "../App.css";

export default function ShareScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { language, setLanguage } = useLanguage();

  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [audioState, setAudioState] = useState("idle");
    const audioRef = useRef(null);
    
     useEffect(() => {
       const userLanguage = navigator.language.toLowerCase();
    
       // Accept Italian variants like it, it-IT, it-CH
       if (userLanguage.startsWith("it")) {
         setLanguage("it");
       } else {
         setLanguage("en");
       }
     }, [setLanguage]);

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
 const handleShare = async (song) => {
   // Always use the correct path with '/roses-of-rome/'
   const shareUrl = `${window.location.origin}/roses-of-rome/#/pages/share/${song.songId}`;

   const shareData = {
     title: song.songName[language] || song.songName.en,
     text:
       language === "it"
         ? `Ascolta "${song.songName[language]}" 🎶`
         : `Listen to "${song.songName[language]}" 🎶`,
     url: shareUrl,
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
     console.error("Sharing failed Try agin:", err);
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

        <button
          className="share-button"
          onClick={handleShare}
          disabled={audioState === "waiting" || audioState === "stalled"}
        >
          <FaShareAlt />
          <span>{language === "it" ? "Condividi" : "Share"}</span>
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

        <div className="song-card">
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
          {Array.isArray(currentSongObj.songLyrics) &&
          currentSongObj.songLyrics.length > 0 &&
          !["waiting", "stalled"].includes(audioState) ? (
            <div className="more-action-card">
              {/* Replace <p> with Share Button */}
              {currentSongObj.songAlbum && (
                <button
                  className="share-button"
                  onClick={() => handleShareSong(currentSongObj.songId)}
                  title={language === "it" ? "Condividi canzone" : "Share song"}
                  aria-label={
                    language === "it" ? "Condividi canzone" : "Share song"
                  }
                >
                  <FaShareAlt /> {/* Using react-icons' share icon */}
                  <span>{currentSongObj.songAlbum}</span>
                </button>
              )}

              {["waiting", "stalled", "error"].includes(audioState) && (
                <div className="audio-state-warning">
                  {language === "it" ? "Problema audio" : "Audio issue"}
                </div>
              )}
              {/* Existing YouTube Button */}
              <button
                className="surprise-button"
                onClick={() => handleSurprise(scurrentSongObj)}
                title={language === "it" ? "Guarda i testi" : "View lyrics"}
                aria-label={
                  language === "it" ? "Guarda i testi" : "View lyrics"
                }
              >
                <FaYoutube />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
