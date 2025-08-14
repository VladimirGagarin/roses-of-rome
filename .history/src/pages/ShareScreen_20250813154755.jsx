import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer.jsx";
import { useState, useEffect, useRef } from "react";
import { FaHome, FaMusic, FaShareAlt, FaYoutube } from "react-icons/fa";
import { useLanguage } from "../components/LanguageContext";
import SurpriseOverlay from "../components/SurpriseOverlay";
import BgImg from "../assets/images/wh_sonnet_bg.jpg";
import "../App.css";

export default function ShareScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { language, setLanguage } = useLanguage();

  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [audioState, setAudioState] = useState("idle");
    const audioRef = useRef(null);
     const [currentTime, setCurrentTime] = useState(0);
    const [currentLine, setCurrentLine] = useState("");
     const [supriseSong, setSurpriseSong] = useState(null);
     const [showSurprise, setShowSurprise] = useState(false);
     const [lyricsArray, setLyricsArray] = useState([]);
     
    
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

    
    
    
       useEffect(() => {
         if (!showSurprise) {
           setPlaying(false);
           const audio = audioRef.current;
           if (audio) {
             audio.pause();
             audio.currentTime = 0;
             setCurrentLine("");
           }
         }
       }, [showSurprise]);
    
      
    
       useEffect(() => {
         const audio = audioRef.current;
         if (!audio || !showSurprise) return;
    
          const handlePlaying = () => {
            setAudioState("playing");
            setPlaying(true);
          };
    
          const handlePause = () => {
            setPlaying(false);
         };
         
         // Add all event listeners
         const handleTimeUpdate = () => {
           const timeMs = audio.currentTime * 1000;
           setCurrentTime(timeMs);
         };
    
    
         const handleWaiting = () => setAudioState("waiting");
         const handleStalled = () => setAudioState("stalled");
         const handleCanPlay = () => setAudioState("idle");
         const handleLoadStart = () => setAudioState("loading");
         const handleEnded = () => setPlaying(false);
         const handleError = () => setAudioState("error");
    
    
    
         audio.addEventListener("playing", handlePlaying);
         audio.addEventListener("pause", handlePause);
         audio.addEventListener("error", handleError);
         audio.addEventListener("timeupdate", handleTimeUpdate);
         audio.addEventListener("waiting", handleWaiting);
         audio.addEventListener("stalled", handleStalled);
         audio.addEventListener("canplay", handleCanPlay);
         audio.addEventListener("loadstart", handleLoadStart);
         audio.addEventListener("ended", handleEnded);
    
         // Initial play attempt
         const playPromise = audio.play();
         if (playPromise !== undefined) {
           playPromise
             .then(() => setPlaying(true))
             .catch(() => {
               setPlaying(false);
             });
         }
    
         return () => {
            audio.removeEventListener("playing", handlePlaying);
            audio.removeEventListener("pause", handlePause);
           audio.removeEventListener("timeupdate", handleTimeUpdate);
           audio.removeEventListener("waiting", handleWaiting);
           audio.removeEventListener("stalled", handleStalled);
           audio.removeEventListener("canplay", handleCanPlay);
           audio.removeEventListener("loadstart", handleLoadStart);
           audio.removeEventListener("ended", handleEnded);
           audio.removeEventListener("error", handleError);
           
           audio.pause();
           audio.currentTime = 0;
           setPlaying(false);
         };
       }, [showSurprise]); // Only re-run when showSurprise changes
    
       useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
    
        const handleWaiting = () => setAudioState("waiting");
        const handleStalled = () => setAudioState("stalled");
        const handleCanPlay = () => setAudioState("idle");
        const handleLoadStart = () => setAudioState("loading");
        const handleEnded = () => setPlaying(false);
    
        audio.addEventListener("waiting", handleWaiting);
        audio.addEventListener("stalled", handleStalled);
        audio.addEventListener("canplay", handleCanPlay);
        audio.addEventListener("loadstart", handleLoadStart);
        audio.addEventListener("ended", handleEnded);
    
        return () => {
          audio.removeEventListener("waiting", handleWaiting);
          audio.removeEventListener("stalled", handleStalled);
          audio.removeEventListener("canplay", handleCanPlay);
          audio.removeEventListener("loadstart", handleLoadStart);
          audio.removeEventListener("ended", handleEnded);
        };
      }, []);
    
       useEffect(() => {
        
        const current = lyricsArray.find(
          (lyric) => currentTime >= lyric.start && currentTime <= lyric.end
        );
        
        setCurrentLine(typeof current?.text === "string"
      ? current.text
      : current?.text?.[language] || current?.text?.en || ""
    );
      }, [currentTime, lyricsArray, language]);
    
    
      useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
    
        const handleEnded = () => setPlaying(false);
    
        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
      }, [])          ;
              
    
      const handleSurprise = (song) => {
         if (audioState === "waiting" || audioState === "stalled" || audioState === "error") return
    
         window.dispatchEvent(
            new CustomEvent("pause-all-audio", { detail: null })
        );
        setSurpriseSong(song.songFile);
        setShowSurprise(true);
        setLyricsArray(song.songLyrics)
      };

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
      <h1 className="share-title">
        {language === "it"
          ? "Rose Di Roma Immagini"
          : "Roses Of Rome  Pictures"}
      </h1>
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
        <h2>{songTitle}</h2>

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

          <div className="more-action-card">
            {/* Replace <p> with Share Button */}
            {song.songId && (
              <button
                className="share-button"
                onClick={() => handleShareSong(song)}
                title={language === "it" ? "Condividi canzone" : "Share song"}
                aria-label={
                  language === "it" ? "Condividi canzone" : "Share song"
                }
              >
                <FaShareAlt /> {/* Using react-icons' share icon */}
                <span>{language === "it" ? "Condividi" : "Share"}</span>
              </button>
            )}
            {/* Existing YouTube Button */}
            {Array.isArray(currentSongObj.songLyrics) &&
              currentSongObj.songLyrics.length > 0 && (
                <button
                  className="surprise-button"
                  onClick={() => handleSurprise(currentSongObj)}
                  title={language === "it" ? "Guarda i testi" : "View lyrics"}
                  aria-label={
                    language === "it" ? "Guarda i testi" : "View lyrics"
                  }
                >
                  <FaYoutube />
                  {language === "it" ? "Liriche" : "Lyrics"}
                </button>
              )}
          </div>
        </div>
      </div>

      {showSurprise && supriseSong && (
        <SurpriseOverlay
          language={language}
          audioRef={audioRef}
          currentLine={currentLine}
          isPlaying={isPlaying}
          setPlaying={setPlaying}
          audioState={audioState}
          setSurprise={setShowSurprise}
          title={
            language === "it"
              ? "Versione Speciale per Te"
              : "Special Version for You"
          }
          dynamicBgImage={BgImg}
          song={supriseSong}
        />
      )}
    </div>
  );
}
