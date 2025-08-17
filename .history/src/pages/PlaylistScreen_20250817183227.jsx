import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";
import { FaYoutube, FaShareAlt, } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import SurpriseOverlay from "../components/SurpriseOverlay";
import BgImg from "../assets/images/wh_sonnet_bg.jpg";
import BgImg2 from "../assets/images/txt_bg2.jpg";
import BgImg3 from "../assets/images/txt_bg3.jpg";
import BgImg4 from "../assets/images/txt_bg4.jpg";
import BgImg5 from "../assets/images/txt_bg5.jpg";
import "../App.css";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function PlaylistScreen() {
  const allSongs = RosesOfRomeSongs();
  const { language } = useLanguage();
  const [shuffledSongs, setShuffledSongs] = useState([]);

  const [supriseSong, setSurpriseSong] = useState(null);
  const [showSurprise, setShowSurprise] = useState(false);
   const [lyricsArray, setLyricsArray] = useState([]);

  // Placeholder audioRef etc. (should ideally come from AudioComponent or be centralized)
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [audioState, setAudioState] = useState({});
  const [currentImg, setCurrentImg] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const bgsImg = [BgImg, BgImg2, BgImg3, BgImg4, BgImg5];


  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    setShuffledSongs(shuffleArray(allSongs));
  }, [])

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
  setCurrentImg(prev => (prev + 1) % bgsImg.length);
}, [currentLine]);


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
    const handleEnded = () => {
      setCurrentImg(0);
      setPlaying(false);
      setCurrentLine("");
    };

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

     const handleEnded = () => {
      setCurrentImg(0);
      setPlaying(false);
      setCurrentLine("");
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []) ;
          

  const handleSurprise = (song) => {
    

     window.dispatchEvent(
        new CustomEvent("pause-all-audio", { detail: null })
    );
    
    setSurpriseSong(song.songFile);
    setShowSurprise(true);
    setLyricsArray(song.songLyrics)
  };

  const handleShareSong = async (song) => {
   
   const baseUrl = `${window.location.origin}${import.meta.env.BASE_URL.replace(
     /\/$/,
     ""
   )}`;
   const songUrl = `${baseUrl}/#/pages/share/${song.songId}`;
const songTitle = song.songName[language] || song.songName.en;
    const albumName = song.songAlbum || "";
    const textTemplates = {
      it: `Ascolta "${songTitle}"${
        albumName ? ` dall'album ${albumName}` : ""
      } 🎶`,
      en: `Listen to "${songTitle}"${albumName ? ` from ${albumName}` : ""} 🎶`,
    };
    const shareText = textTemplates[language] || textTemplates.en;


    // Web Share API (mobile/Chrome)
    if (navigator.share) {
      try {
        await navigator.share({
          title: songTitle,
          text: shareText,
          url: songUrl, // Uses the dynamic URL
        });
      } catch (err) {
        console.error("Sharing failed:", err);
        fallbackCopyToClipboard(songUrl);
      }
    } else {
      // Clipboard fallback
      fallbackCopyToClipboard(songUrl);
    }
  };

  // Clipboard fallback (unchanged)
  const fallbackCopyToClipboard = (url) => {
    navigator.clipboard
      .writeText(`${url}`)
      .then(() => {
        alert(
          language === "it"
            ? "Link copiato negli appunti! 🎶"
            : "Link copied to clipboard! 🎶"
        );
      })
      .catch(() => {
        alert(
          language === "it"
            ? "Impossibile copiare il link."
            : "Failed to copy link."
        );
      });
  };

  const handleEmbedSong = (song) => {
    const baseUrl = `${
      window.location.origin
    }${import.meta.env.BASE_URL.replace(/\/$/, "")}`;
    const embedUrl = `${baseUrl}/#/pages/embed/${song.songId}`;

    const iframeCode = `<iframe width="400" height="300" src="${embedUrl}" frameborder="0" allow="autoplay"></iframe>`;

    navigator.clipboard
      .writeText(iframeCode)
      .then(() => {
        alert(
          language === "it"
            ? "Codice embed copiato negli appunti! 📋"
            : "Embed code copied to clipboard! 📋"
        );
      })
      .catch(() => {
        alert(
          language === "it"
            ? "Impossibile copiare il codice."
            : "Failed to copy embed code."
        );
      });
  };


  return (
    <div className="playlist-container">
      {shuffledSongs.map((song) => (
        <div className="song-card" key={song.songId}>
          {song.songAlbum && (
            <p style={{ textAlign: "left" }}>
              {" "}
              {language === "it" ? "Dall'album" : "From album"}:{" "}
              {song.songAlbum}
            </p>
          )}
          <div className="audio-wrapper">
            <AudioComponent
              audioFile={song.songFile}
              title={song.songName[language] || ""}
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
            {Array.isArray(song.songLyrics) &&
              song.songLyrics.length > 0 &&
              isOnline && (
                <button
                  className="surprise-button"
                  onClick={() => handleSurprise(song)}
                  title={language === "it" ? "Guarda i testi" : "View lyrics"}
                  aria-label={
                    language === "it" ? "Guarda i testi" : "View lyrics"
                  }
                >
                  <FaYoutube />
                  {language === "it" ? "Liriche" : "Lyrics"}
                </button>
              )}

            {song.songId && (
              <button
                className="share-button"
                onClick={() => handleEmbedSong(song)}
                title={language === "it" ? "Incorpora canzone" : "Embed song"}
                aria-label={
                  language === "it" ? "Incorpora canzone" : "Embed song"
                }
              >
                <FaCode />
                <span>{language === "it" ? "Incorpora" : "Embed"}</span>
              </button>
            )}
          </div>
        </div>
      ))}

      {showSurprise && supriseSong && (
        <SurpriseOverlay
          language={language}
          audioRef={audioRef}
          currentLine={currentLine}
          setCurrentLine={currentLine}
          isPlaying={isPlaying}
          setPlaying={setPlaying}
          audioState={audioState}
          setSurprise={setShowSurprise}
          title={
            language === "it"
              ? "Versione Speciale per Te"
              : "Special Version for You"
          }
          dynamicBgImage={bgsImg[currentImg]}
          song={supriseSong}
        />
      )}
    </div>
  );
}
