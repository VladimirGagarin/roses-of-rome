import Logo from "../assets/images/rorps.png";
import { useState, useEffect, useRef } from "react";
import "./About.css"
import { FaBell, FaUserPlus, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";
import { useNavigate } from "react-router-dom";
import AboutHymn from "../assets/audios/about_roses.mp3";
import AudioComponent from "./AudioPlayer";
import { AboutRosesLyrics } from "../components/SongData";
import SurpriseOverlay from "./SurpriseOverlay.jsx";
import BgImg from "../assets/images/wh_sonnet_bg.jpg";



export default function AboutComponent() {
  const { language } = useLanguage();
  const [showMore, setIsShowingMore] = useState(false);
  const navigate = useNavigate();
  const [aboutIsPlaying, setAboutIsPlaying] = useState(false);
  const lyricsArray = AboutRosesLyrics();
  const [showSurprise, setSurprise] = useState(false);
  const [currentLine, setCurrentLine] = useState("");
  const [isPlaying, setPlaying] = useState(false);
  const [audioState, setAudioState] = useState("idle"); // 'idle' | 'loading' | 'stalled' | 'waiting' | 'playing'
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  

   useEffect(() => {
     const audio = audioRef.current;

     if (!audio) return;

     const handleTimeUpdate = () => {
       setCurrentTime(audio.currentTime * 1000); // Convert to milliseconds
     };

     // Add event listener
     audio.addEventListener("timeupdate", handleTimeUpdate);

     // Cleanup
     return () => {
       audio.removeEventListener("timeupdate", handleTimeUpdate);
     };
   }, []);

   useEffect(() => {
     if (!showSurprise) {
       setPlaying(false);
     }
   }, [showSurprise]);

   useEffect(() => {
     const audio = audioRef.current;
     if (!audio || !showSurprise) return;

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
           setSurprise(false);
         });
     }

     return () => {
       audio.removeEventListener("timeupdate", handleTimeUpdate);
       audio.removeEventListener("waiting", handleWaiting);
       audio.removeEventListener("stalled", handleStalled);
       audio.removeEventListener("canplay", handleCanPlay);
       audio.removeEventListener("loadstart", handleLoadStart);
       audio.removeEventListener("ended", handleEnded);
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

     setCurrentLine(current?.text?.[language] || "");
   }, [currentTime, lyricsArray, language]);

   useEffect(() => {
     const audio = audioRef.current;
     if (!audio) return;

     const handleEnded = () => setPlaying(false);

     audio.addEventListener("ended", handleEnded);
     return () => audio.removeEventListener("ended", handleEnded);
   }, []);
  
   useEffect(() => {
     const handleSetCurrent = (e) => {
       // Check if the current audio is the About Hymn
       if (e.detail && e.detail.src?.includes("about_roses.mp3")) {
         setAboutIsPlaying(true);
       } else {
         setAboutIsPlaying(false);
       }
     };

     window.addEventListener("set-current-audio", handleSetCurrent);
     return () =>
       window.removeEventListener("set-current-audio", handleSetCurrent);
   }, []);

    const allTexts = {
         headerTitle: {
          en: "Roses Of Rome Pictures.",
          it: "Rosa Di Roma Immagini",
        },
      introText: {
        en: "Roses of Rome Pictures – Aeternum Floreamus...",
        it: "Rose di Roma Immagini – Aeternum Floreamus...",
      },
      moreText: {
        en: `Roses of Rome Pictures – Aeternum Floreamus\n
             A creative sanctuary where stories bloom like roses, timeless and radiant. 
            We rise with love, beauty, and kindness, crafting epics that inspire hearts across generations.\n
            Aeternum floreamus!`,
        it: `Rose di Roma Immagini – Aeternum Floreamus\n
            Un santuario creativo dove le storie sbocciano come rose, eterne e splendenti. 
            Ci eleviamo con amore, bellezza e gentilezza, creando epiche che ispirano i cuori attraverso le generazioni.\n
            Aeternum floreamus!`,
      },
    };

    return (
      <div className="about-container">
        <div className="left-side-about" onClick={() => navigate("/")}>
          <img src={Logo} alt="Rose_Of_Rome_logo" />
        </div>
        <div className="right-side-about">
          <div className="top">
            <h1>
              {language === "it"
                ? allTexts.headerTitle.it
                : allTexts.headerTitle.en}
            </h1>
          </div>
          <div className="center">
            <p>
              {language === "en"
                ? allTexts.introText.en
                : allTexts.introText.it}

              <button
                onClick={() => setIsShowingMore(true)}
                disabled={showMore}
              >
                {language === "en" ? "Read" : "Leggi"}
              </button>
            </p>
          </div>

          <div className="bottom">
            <a
              href="https://youtube.com/@rosesofrome?si=LdDEaj0eJVdHpITm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaBell /> {language === "en" ? "Subscribe" : "Iscriviti"}
            </a>
            <a
              href="https://www.tiktok.com/@roses_of_rome"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaUserPlus />
              {language === "en" ? "Follow" : "Seguici"}
            </a>
            <a
              href="https://chat.whatsapp.com/IoJTdMJyJPpFjEOL8yFxWa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
              {language === "it" ? "Unisciti" : "Join"}
            </a>
          </div>
        </div>

        {/** Show modal */}

        {/* ✅ Overlay with full text */}
        {showMore && (
          <div className="overlay">
            <div className="overlay-content">
              {allTexts.moreText[language].split("\n").map((line, i) => (
                <p key={i} style={{ textAlign: "justify" }}>
                  {line.trim()}
                </p>
              ))}
              <div className="audio-wrapper">
                <AudioComponent
                  audioFile={AboutHymn}
                  title={
                    language === "it"
                      ? "Rosa Di Roma about"
                      : "About Roses Of Rome"
                  }
                />
              </div>

              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("pause-all-audio", { detail: null })
                  );
                  setSurprise(true);
                }}
                disabled={showSurprise}
                className="surprise-btn"
              >
                {language === "en" ? "Lyric" : "Testo"}
              </button>

              <button
                className="exit-btn"
                onClick={() => {
                  // ✅ Only stop About Hymn if it was playing
                  if (aboutIsPlaying) {
                    window.dispatchEvent(
                      new CustomEvent("pause-all-audio", { detail: null })
                    );
                  }
                  setIsShowingMore(false);
                }}
              >
                {language === "en" ? "Close" : "Chiudi"}
              </button>
            </div>

            {showSurprise && (
              <SurpriseOverlay
                language={language}
                audioRef={audioRef}
                currentLine={currentLine}
                isPlaying={isPlaying}
                setPlaying={setPlaying}
                audioState={audioState}
                setSurprise={setSurprise}
                dynamicBgImage={BgImg}
                song={AboutHymn}
              />
            )}
          </div>
        )}
      </div>
    );
}