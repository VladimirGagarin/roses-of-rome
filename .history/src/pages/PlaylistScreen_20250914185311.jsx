import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";
import { FaYoutube, FaShareAlt, FaCode, FaLink, FaMusic } from "react-icons/fa";
import { useRef, useEffect, useState, useMemo } from "react";
import SurpriseOverlay from "../components/SurpriseOverlay";
import BgImg from "../assets/images/wh_sonnet_bg.jpg";
import BgImg2 from "../assets/images/txt_bg2.jpg";
import BgImg3 from "../assets/images/txt_bg3.jpg";
import BgImg4 from "../assets/images/txt_bg4.jpg";
import BgImg5 from "../assets/images/txt_bg5.jpg";
import "../App.css";
import AlbumFilter from "../components/Album.jsx";
import {useLocation, useNavigate} from "react-router-dom";



export default function PlaylistScreen() {
 const allSongs = useMemo(() => RosesOfRomeSongs(), []);
  const { language } = useLanguage();
  const [filteredSongs, setFilteredSongs] = useState(allSongs);
  const [selectedAlbum, setSelectedAlbum] = useState("Rosa");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const [albums, setAlbums] = useState([]);
  const [meritoAlbum, setIsMerito] = useState(false);
  const location = useLocation();
  const  navigate = useNavigate();

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

  // Album descriptions with improved clarity, consistency, and completeness
  const albumDescriptions = {
    Rosa: {
      it: "Dalla raccolta 'Rosa' (2024) — Brani che esplorano amore, speranza e fede, con melodie delicate e testi profondi.",
      en: "From the album 'Rosa' (2024) — Songs exploring love, hope, and faith, featuring gentle melodies and thoughtful lyrics.",
    },
    Merito: {
      it: "Dalla raccolta 'Merito' — Canzoni apprezzate e utilizzate da Rose of Rome, ma non di loro proprietà.",
      en: "From the album 'Merito' — Songs appreciated and used by Rose of Rome, but not owned by them.",
    },
    SWM: {
      it: "Dalla raccolta 'Sing With Magdalene' (2025) — Un invito a cantare insieme e condividere la gioia della musica.",
      en: "From the album 'Sing With Magdalene' (2025) — An invitation to sing together and share the joy of music.",
    },
    all: {
      it: "Tutte le canzoni disponibili — Esplora l'intera collezione musicale di Rose of Rome.",
      en: "All available songs — Explore the complete musical collection from Rose of Rome.",
    },
    "Piccola Casa della Gioia": {
      it: "Dalla raccolta 'Piccola casa della Gioia' (2024) — Brani ispirati alla spiritualità e alla comunità di Cottolengo.",
      en: "From the album 'Piccola casa della Gioia' (2024) — Songs inspired by the spirituality and community of Cottolengo.",
    },
    Cantabile: {
      it: "Dalla raccolta 'Cantabile' — Un inno all'amore, alla bellezza e alla gentilezza, con arrangiamenti raffinati.",
      en: "From the album 'Cantabile' — A hymn to love, beauty, and kindness, featuring refined arrangements.",
    },
    Figli: {
      it: "Dalla raccolta 'Figli' — Canzoni dedicate all'intrattenimento e alla gioia dei bambini.",
      en: "From the album 'Figli' — A collection dedicated to children's entertainment and joy.",
    },
  };

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
    const uniqueAlbums = [...new Set(allSongs.map((song) => song.songAlbum))];
    setAlbums(uniqueAlbums);
  }, [allSongs]);

  useEffect(() => {
  // read ?type=... from URL
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  if (type) {
    setSelectedAlbum(type);
  } else {
    setSelectedAlbum("all"); // default
    navigate("?type=all")
  }
}, [location.search]);

  // Filter songs based on selected album
  useEffect(() => {
    if (selectedAlbum === "all") {
      setFilteredSongs(allSongs);
    }else if (selectedAlbum === "Splendore") {
      setFilteredSongs(allSongs.filter(song => favorites.includes(song.songFile)));
    }
    else {
      setFilteredSongs(
        allSongs.filter((song) => song.songAlbum === selectedAlbum)
      );
    }

    setIsMerito(selectedAlbum === "Merito");
  }, [selectedAlbum, allSongs, favorites]);

 

  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
    // update the query string
    navigate(`?type=${album}`);
  };

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




  const handleShareClick = (song, event) => {
    setCurrentSongForShare(song);
    setShareMenuPosition({
      x: event.clientX,
      y: event.clientY,
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

    setCurrentLine(
      typeof current?.text === "string"
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
  }, []);

  const handleSurprise = (song) => {
    window.dispatchEvent(new CustomEvent("pause-all-audio", { detail: null }));

    setSurpriseSong(song.songFile);
    setShowSurprise(true);
    setLyricsArray(song.songLyrics);

    // Change background every new song
    const randomIndex = Math.floor(Math.random() * bgsImg.length);
    setCurrentImg(randomIndex);
  };

  const handleShareSong = async (song) => {
    const baseUrl = `${
      window.location.origin
    }${import.meta.env.BASE_URL.replace(/\/$/, "")}`;
    const songUrl = `${baseUrl}/#/pages/share/${song.songId}?utm_source=app&utm_medium=share&utm_campaign=song_share`;
    const songTitle = song.songName[language] || song.songName.en;
    const albumName = song.songAlbum || "";
    const textTemplates = {
      it: `Ascolta "${songTitle}"${
        albumName ? ` dall'album ${albumName}` : ""
      } 🎶`,
      en: `Listen to "${songTitle}"${albumName ? ` from ${albumName}` : ""} 🎶`,
    };
    const shareText = textTemplates[language] || textTemplates.en;

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: songTitle,
          text: shareText,
          url: songUrl,
        });
      } catch (err) {
        fallbackCopyToClipboard(songUrl);
        console.warn(err);
      } finally {
        setIsSharing(false);
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
    const embedUrl = `${baseUrl}/#/pages/embed/${song.songId}`;
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

  const handleMerito = (song) => {
    // Handle direction to youtube  on blank page
    if (song && song.songLink) {
      window.open(song.songLink, "_blank");
    }
  };  

  const handleYoutubeLink = () => {
    if (!currentSongForShare) return;
   

    if (currentSongForShare.songLink) {
      if (navigator.share) {
        navigator.share({
          title: currentSongForShare.songName[language] || currentSongForShare.songName.en,
          url: currentSongForShare.songLink,
        });
      }
      else {
        // copy to clipboard
        navigator.clipboard.writeText(currentSongForShare.songLink);
      }

      // close share menu
      closeShareMenu();
    }
  };

  return (
    <>
      {selectedAlbum && (
        <div className="album-description">
          <p>
            {albumDescriptions[selectedAlbum]?.[language] ||
              albumDescriptions[selectedAlbum]?.en ||
              ""}
          </p>
          {/*A button to copy url for the selected button*/}
          {selectedAlbum !== "all"  && (
          <button
            className="share-button"
            onClick={() => {
              const text = window.location.href;
              navigator.clipboard.writeText(text);
              alert(
                language === "it"
                  ? `Link copiato negli appunti! ${selectedAlbum}`
                  : `Link copied to clipboard! ${selectedAlbum}`
              );
            }}
            title={
              language === "it" ? "Condividi questo album" : "Share this album"
            }
            aria-label={
              language === "it" ? "Condividi questo album" : "Share this album"
            }
          >
            {language === "it" ? "Condividi questo album" : "Share this album"}
          </button>
          )}
        </div>
      )}

      <AlbumFilter
        albums={albums}
        selectedAlbum={selectedAlbum}
        onSelectAlbum={handleAlbumSelect}
      />

      <div className="playlist-container">
        {/* Album filter component */}

        {filteredSongs.map((song) => (
          <div className="song-card" key={song.songId}>
            <div className="audio-wrapper">
              <AudioComponent
                audioFile={song.songFile}
                title={song.songName[language] || ""}
              />
            </div>

            <div className="more-action-card">
              {/* Single Share Button that will show the menu */}
              {song.songId && isOnline && (
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
                      ? language === "it"
                        ? "Condivisione..."
                        : "Sharing..."
                      : language === "it"
                      ? "Condividi"
                      : "Share"}
                  </span>
                </button>
              )}

              {/*Check if song is in merito album */}
              {song.songAlbum === "Merito" && isOnline && (
                <button
                  className="share-button"
                  onClick={() => handleMerito(song)}
                  title={language === "it" ? "Youtube" : "View on Youtube"}
                  aria-label={language === "it" ? "Youtube" : "View on Youtube"}
                >
                  <FaYoutube />
                  {language === "it" ? "Youtube" : "Youtube"}
                </button>
              )}

              {/* Existing YouTube Button */}
              {Array.isArray(song.songLyrics) &&
                song.songLyrics.length > 0 &&
                isOnline &&
                !meritoAlbum && (
                  <button
                    className="surprise-button"
                    onClick={() => handleSurprise(song)}
                    title={language === "it" ? "Guarda i testi" : "View lyrics"}
                    aria-label={
                      language === "it" ? "Guarda i testi" : "View lyrics"
                    }
                  >
                    <FaMusic />
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
              <button onClick={handleCopyLink} disabled={isSharing}>
                <FaLink />
                <span>
                  {isSharing
                    ? language === "it"
                      ? "Copia..."
                      : "Copying..."
                    : language === "it"
                    ? "Copia link"
                    : "Copy link"}
                </span>
              </button>

              <button onClick={handleCopyEmbed}>
                <FaCode />
                {language === "it" ? "Codice embed" : "Embed code"}
              </button>

              {/*if is from merito add share youtube link */}
              {currentSongForShare.songAlbum === "Merito" && (
                <button onClick={handleYoutubeLink}>
                  <FaYoutube />
                  {language === "it"
                    ? "Copia link Youtube"
                    : "Copy Youtube Link"}
                </button>
              )}
            </div>
          </div>
        )}

        {showSurprise && supriseSong && (
          <SurpriseOverlay
            language={language}
            audioRef={audioRef}
            currentLine={currentLine}
            isPlaying={isPlaying}
            setPlaying={setPlaying}
            audioState={audioState}
            setSurprise={setShowSurprise}
            dynamicBgImage={bgsImg[currentImg]}
            song={supriseSong}
          />
        )}
      </div>
    </>
  );
}
