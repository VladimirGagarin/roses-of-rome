import Logo from "../assets/images/rorps.png";
import Logo2 from "../assets/images/rorps2.png";
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
        en: "Roses of Rome Pictures — Connoisseurs of Film, Music & Animation...",
        it: "Rose di Roma Immagini – Connoisseur di Cinema, Musica e Animazione...",
      },
      moreText: {
        en: `Roses of Rome Pictures – Aeternum Floreamus\n
            A sanctuary of artistry where vision meets mastery,\n 
            and every creation blooms like a rose — radiant, eternal, unforgettable. \n \n

            We are more than creators; we are connoisseurs of beauty. \n
            In film, we craft visions that breathe with truth and wonder. \n
            In music, we weave harmonies that awaken memory and stir the soul. \n
            In animation, we give spirit to motion, turning imagination into timeless form. \n \n

            Every frame, every note, every gesture is chosen with care — \n
            not merely to entertain, but to illuminate, to inspire, to endure. \n
            As roses carry fragrance long after their bloom, so too shall our works \n
            carry meaning long after their first encounter. \n \n

            This is our calling, this is our vow: \n
            to curate, to refine, to elevate art with love, beauty, and kindness. \n
            To be keepers of wonder, guardians of timeless legacy. \n \n

            Aeternum floreamus — may we forever bloom.`,
        it: `Rose di Roma Immagini – Aeternum Floreamus\n
            Un santuario di arte dove la visione incontra la maestria,\n
            e ogni creazione sboccia come una rosa — radiosa, eterna, indimenticabile. \n \n

            Siamo più che creatori; siamo connoisseur della bellezza. \n
            Nel cinema, plasmiamo visioni che respirano di verità e meraviglia. \n
            Nella musica, intrecciamo armonie che risvegliano la memoria e scuotono l’anima. \n
            Nell’animazione, doniamo spirito al movimento, trasformando l’immaginazione in forma eterna. \n 

            Ogni fotogramma, ogni nota, ogni gesto è scelto con cura — 
            non soltanto per intrattenere, ma per illuminare, ispirare, durare. 
            Come le rose che portano il profumo ben oltre la loro fioritura, 
            così le nostre opere porteranno significato ben oltre il loro primo incontro. 

            Questa è la nostra chiamata, questo è il nostro voto: 
            curare, affinare, elevare l’arte con amore, bellezza e gentilezza. 
            Essere custodi della meraviglia, guardiani di un’eredità senza tempo. 

            Aeternum floreamus — che possiamo fiorire per sempre.`,
      },

    };

    return (
      <div className="about-container">
        <div className="left-side-about" onClick={() => navigate("/")}>
          <img src={language === "it" ? Logo2 : Logo} alt="Rose_Of_Rome_logo" />
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