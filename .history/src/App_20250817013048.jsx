import { Outlet, useLocation } from 'react-router-dom'
import Navs from './components/Header'
import BannerHead from './components/Banner';
import homePhoto from "./assets/images/banner_01.jpeg";
import './App.css';
import AboutComponent from './components/About';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from './components/LanguageContext';
import WelcomeSongIt from "./assets/audios/welcome_it.mp3";
import WelcomeSongFemaleIntro from "./assets/audios/welcome_female_intro.mp3";
import AudioComponent from './components/AudioPlayer';
import { FaYoutube } from 'react-icons/fa';
import { WelcomeSongIntroLyrics, WelcomeSongItalian } from "./components/SongData";


function App() {
  const { setLanguage, language } = useLanguage();
  const location = useLocation();
  const isFromStart = location.pathname === "/";
  const [showSurprise, setShowSurprise] = useState(false);
  const lyricsArray =  language === "it" ? WelcomeSongItalian() :WelcomeSongIntroLyrics() ;
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [isPlaying, setPlaying] = useState(false);
  const [audioState, setAudioState] = useState("idle"); // 'idle' | 'loading' | 'stalled' | 'waiting
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



  useEffect(() => {
    const today = new Date().toDateString(); 
    const lastVisit = localStorage.getItem("lastVisitDate");

    if (lastVisit !== today) {
      // Clear videoPermissions for a new day
      localStorage.removeItem("videoPermissions");
      localStorage.setItem("lastVisitDate", today);
    }
  }, []);



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

  

  return (
    <div className="app-container">
      <header>
        <BannerHead mediaType="image" src={homePhoto} alt="Roses of Rome" />
        <AboutComponent />
        {isFromStart && (
          <div className="audio-wrapper">

            <AudioComponent
              audioFile={
                language === "it" ? WelcomeSongIt : WelcomeSongFemaleIntro
              }
              title={
                language === "it"
                  ? "🌹 Benvenuti a Roses of Rome"
                  : "🌹 Welcome to Roses of Rome"
              }
            />

            <button className="lyrics-btn">
              <FaYoutube /> {language === "it" ? "Liriche" : "Lyrics"}
            </button>
          </div>
        )}

        <Navs />
      </header>
      <Outlet />
      {/* <footer className="footer">
        <a
          href="https://vladimirgagarin.github.io/Cottolengo-Alumini/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === "it" ? "Incontra i Creatori" : "Meet the Creators"}
        </a>
      </footer> */}


      {showSurprise && (
              <SurpriseOverlay
                language={language}
                audioRef={audioRef}
                currentLine={currentLine}
                isPlaying={isPlaying}
                setPlaying={setPlaying}
                audioState={audioState}
                setSurprise={setSurprise}
                setCurrentLine={currentLine}
                title={
                  language === "it"
                    ? "Versione Speciale per Te"
                    : "Special Version for You"
                }
                dynamicBgImage={BgImg}
                song={SupriseSong}
              />
            )}
    </div>
  );
}

export default App
