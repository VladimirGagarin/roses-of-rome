import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";
import { useEffect, useMemo } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function EmbedSong() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  // Memoize songs to prevent unnecessary recalculations
  const songs = useMemo(() => RosesOfRomeSongs(), []);
  const song = useMemo(
    () => songs.find((s) => s.songId === songId),
    [songId, songs]
  );

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

  // Handle missing songs more gracefully
  useEffect(() => {
    if (!song) {
      // navigate("/", { replace: true }); // Prevent back navigation to invalid embed
    }
  }, [song, navigate]);

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
      <div style={styles.container}>
        <div style={styles.errorBox}>
          {language === "it" ? "Canzone non trovata" : "Song not found"}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.playerContainer}>
        <AudioComponent
          audioFile={song.songFile}
          title={song.songName[language]}
          ariaLabel={`Audio player for ${song.songName[language]}`}
        />
        <div style={styles.footer}>
          <a
            href="https://vladimirgagarin.github.io/roses-of-rome/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              language === "it"
                ? "Vai a Roses of Rome (si apre in una nuova scheda)"
                : "Go to Roses of Rome (opens in new tab)"
            }
          >
            <FaExternalLinkAlt style={{ marginRight: 8 }} />
            {language === "it"
              ? "Ascolta su Roses of Rome"
              : "Listen on Roses of Rome"}
          </a>
        </div>
      </div>
    </div>
  );
}

// Styles extracted for better maintainability
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden", // Prevent scrollbars in iframe
    fontFamily: "system-ui, sans-serif",
  },
  playerContainer: {
    width: "0%",
    padding: " 10px ",
    background: "var(--embed-player-bg, #222)",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    textAlign: "center",
    overflow: "hidden",
  },
  title: {
    margin: "0 0 15px 0",
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  errorBox: {
    padding: "20px",
    background: "#f44336",
    color: "white",
    borderRadius: "8px",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.7)",
    transition: "all 0.3s ease",

    a: {
      display: "inline-flex",
      alignItems: "center",
      color: "rgba(255, 255, 255, 0.8)",
      textDecoration: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      transition: "all 0.2s ease",
      underline: "none",

      "&:hover": {
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
      },

      "&:active": {
        transform: "scale(0.98)",
      },
    },
  },
};
