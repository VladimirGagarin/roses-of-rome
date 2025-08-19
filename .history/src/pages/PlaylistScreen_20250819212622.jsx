import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";
import { FaYoutube, FaShareAlt, FaCode, FaLink } from "react-icons/fa";
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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareMenuPosition, setShareMenuPosition] = useState({ x: 0, y: 0 });
  const [currentSongForShare, setCurrentSongForShare] = useState(null);
  const [isSharing, setIsSharing] = useState(false);


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
  const handleShareClick = (song, event) => {
    setCurrentSongForShare(song);
    setShareMenuPosition({
      x: event.clientX,
      y: event.clientY
    });
    setShowShareMenu(true);
  };

  const closeShareMenu = () => {
    setShowShareMenu(false);
  };



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
     const baseUrl = `${
       window.location.origin
     }${import.meta.env.BASE_URL.replace(/\/$/, "")}`;
     const songUrl = `${baseUrl}/#/pages/share/${song.songId}`;
     const songTitle = song.songName[language] || song.songName.en;
     const albumName = song.songAlbum || "";
     const textTemplates = {
       it: `Ascolta "${songTitle}"${
         albumName ? ` dall'album ${albumName}` : ""
       } 🎶`,
       en: `Listen to "${songTitle}"${
         albumName ? ` from ${albumName}` : ""
       } 🎶`,
     };
     const shareText = textTemplates[language] || textTemplates.en;

     if (navigator.share) {
       try {
         setIsSharing(true); // 🔒 disable button while share sheet is open
         await navigator.share({
           title: songTitle,
           text: shareText,
           url: songUrl,
         });
       } catch (err) {
         fallbackCopyToClipboard(songUrl);
         console.warn(err)
       }
       finally {
      setIsSharing(false); // 🔓 re-enable button when done/cancelled
    }
     } else {
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
    const embedUrl = `${baseUrl}/#/pages/embed/${song.songId}?autoplay=1&theme=dark`;
    const iframeCode = `<iframe width="600px" height="300px" src="${embedUrl}" loading="lazy" frameborder="0" allow="autoplay" style="border:none" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>`;

    navigator.clipboard.writeText(iframeCode).catch(() => {
      // Fallback for browsers without clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = iframeCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    });
  };


  const handleCopyLink = async () => {
    if (!currentSongForShare) return;
    await handleShareSong(currentSongForShare);
    closeShareMenu();
  };

  const handleCopyEmbed = () => {
    if (!currentSongForShare) return;
    handleEmbedSong(currentSongForShare);
    closeShareMenu();
  };


    return (
      <div className="playlist-container">
        {shuffledSongs.map((song) => (
          <div className="song-card" key={song.songId}>
            {song.songAlbum && (
              <p style={{ textAlign: "left" }}>
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
              {/* Single Share Button that will show the menu */}
              {song.songId && (
                <button
                  className="share-button"
                  onClick={(e) => handleShareClick(song, e)}
                  title={language === "it" ? "Condividi canzone" : "Share song"}
                  aria-label={
                    language === "it" ? "Condividi canzone" : "Share song"
                  }
                >
                  <FaShareAlt />
                 <span>
  {isSharing
    ? (language === "it" ? "Condivisione..." : "Sharing...")
    : (language === "it" ? "Condividi" : "Share")}
</span>

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
            </div>
          </div>
        ))}

        {/* Share Menu Overlay */}
        {showShareMenu && (
          <div className="share-menu-overlay" onClick={closeShareMenu}>
            <div
              className="share-menu"
              style={{
                position: "fixed",
                left: `${Math.min(
                  shareMenuPosition.x,
                  window.innerWidth - 200
                )}px`,
                top: `${shareMenuPosition.y}px`,
                transform:
                  shareMenuPosition.y > window.innerHeight - 150
                    ? "translateY(-100%)"
                    : "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleCopyLink}>
                <FaLink />
                {language === "it" ? "Copia link" : "Copy link"}
              </button>
              <button onClick={handleCopyEmbed}>
                <FaCode />
                {language === "it" ? "Codice embed" : "Embed code"}
              </button>
            </div>
          </div>
        )}

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

            dynamicBgImage={bgsImg[currentImg]}
            song={supriseSong}
          />
        )}
      </div>
    );
}
