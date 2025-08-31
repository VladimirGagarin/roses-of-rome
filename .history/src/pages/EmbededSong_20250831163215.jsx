import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";
import { useEffect, useMemo, useState, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./Embed.css"

export default function EmbedSong() {
  const { songId } = useParams();
  
  const { language, setLanguage } = useLanguage();
  const [url, setUrl] = useState(null);
  const audioRef = useRef(null);
  const [currentLine, setCurrentLine] = useState("");

  // Memoize songs to prevent unnecessary recalculations
  const songs = useMemo(() => RosesOfRomeSongs(), []);
  const song = useMemo(
    () => songs.find((s) => s.songId === songId),
    [songId, songs]
  );

  useEffect(() => {
    if (song) {
       const baseUrl = `${
         window.location.origin
       }${import.meta.env.BASE_URL.replace(/\/$/, "")}`;
      setUrl(`${baseUrl}/#/pages/share/${song.songId}`);
      // assign audio ref
      audioRef.current = new Audio(song.songFile);
    }
  }, [song])

  //check audio activity and sync with song.songLyrics
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime * 1000; // Convert to milliseconds
      const currentLyric = song.songLyrics.find(
        (lyric) => currentTime >= lyric.start && currentTime <= lyric.end
      );
      if (currentLyric) {
        setCurrentLine(currentLyric.text);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  // Improved language detection with localStorage persistence
  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith("it") ? "it" : "en");
    }
  }, [setLanguage]);

 

  // In your route loader or useEffect:
  useEffect(() => {
    if (song) {
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", song.songName[language]);
      document
        .querySelector('meta[property="og:audio"]')
        ?.setAttribute("content", song.songFile);
    }
  }, [song, language]);

  // In your main layout component:
  useEffect(() => {
    if (window !== window.top) {
      document.body.style.display = "block"; // Only show if allowed
    } else {
      window.location.href = "/"; // Redirect if not in iframe
    }
  }, []);

  if (!song) {
    return (
      <div className="embed-container">
        <div className="error-message">
          {language === "it" ? "Canzone non trovata" : "Song not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="embed-container">
      <AudioComponent
        audioFile={song.songFile}
        title={song.songName[language]}
        ariaLabel={`Audio player for ${song.songName[language]}`}
        className="audio-player" // Pass className instead of style
      />
      <div className="embed-footer">
        <a
          href="https://vladimirgagarin.github.io/roses-of-rome/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            language === "it"
              ? "Visita il sito principale di Roses of Rome (si apre in nuova scheda)"
              : "Visit Roses of Rome main site (opens in new tab)"
          }
          className="footer-link"
        >
          {language === "it" ? "Visita Rosa Di Roma" : "Visit Roses Of Rome"}
          <FaExternalLinkAlt className="link-icon" />
        </a>

        {url && song.songId && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              language === "it"
                ? "Ascolta questa canzone su Roses of Rome (nuova scheda)"
                : "Listen to this song on Roses of Rome (new tab)"
            }
            className="footer-link"
          >
           
            {language === "it" ? "Ascolta la canzone" : "Listen to Song"}
            <FaExternalLinkAlt className="link-icon" />
          </a>
        )}
      </div>
    </div>
  );
}

