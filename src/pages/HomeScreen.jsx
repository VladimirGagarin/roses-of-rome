import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import ItalianOne from "../assets/audios/italianrome.mp3";
import ItalianTwo from "../assets/audios/italianrome2.mp3";
import Hybrid from "../assets/audios/hybrid2.mp3";
import HybridTwo from "../assets/audios/hybrid3.mp3";
import SupriseSong from "../assets/audios/yourome.mp3";
import { SupriseSongLyrics, TheVision , TheSonnet, ThePrayer, OurMotive, Theme } from "../components/Utils";
import { useLanguage } from "../components/LanguageContext";
import { useRef, useEffect, useState } from "react";
import BgImg from "../assets/images/txt_bg.jpg";
import SurpriseOverlay from "../components/SurpriseOverlay";
import VisionSong from "../assets/audios/vision.mp3"
import VisionShortSongIt from "../assets/audios/vision_it.mp3";
import VisionFemale from "../assets/audios/vision_female.mp3";
import VisonItSong from "../assets/audios/vision-italian-versione.mp3";
import VisionYouSong from "../assets/audios/venus.mp3";
import DirectorMessage from "../components/DirectorMsg";
import FormsComponent from "../components/FormsComponent.jsx";
import PrayerSong from "../assets/audios/prayer.mp3";
import PrayerSongSoftVersion from "../assets/audios/prayer_soft.mp3";
import Instrumental from "../assets/audios/rome2[music].mp3";
import MotiveSong from "../assets/audios/motive.mp3";
import ThemeSong from "../assets/audios/theme_song.wav";
import { FaPlay, FaPause } from "react-icons/fa";

import "../index.css";

export default function HomeScreen() {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const [showSurprise, setSurprise] = useState(false);
  const lyricsArray = SupriseSongLyrics();
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [isPlaying, setPlaying] = useState(false);
  const [audioState, setAudioState] = useState("idle"); // 'idle' | 'loading' | 'stalled' | 'waiting'
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, []); // ✅ only once on component mount

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

  const welcomeText = {
    en: {
      heading: "Welcome to Roses Of Rome Pictures",
      subheading: "Aeternum Floreamus - Let us Bloom Forever",
    },
    it: {
      heading: "Benvenuto a Immagini di Rosa di Roma",
      subheading: "Aeternum Floreamus - Fioriamo per sempre.",
    },
  };

  const audioTitles = {
    romeOne: {
      en: "The Blooming Sonnet Version",
      it: "Rose di Roma Inno (Versione Sbocciata)",
    },
    romeTwo: {
      en: "The Blooming Sonnet",
      it: "Rose di Roma Inno (Versione Epica)",
    },
    hybrid: {
      en: "The Blooming Anthem Duet (Male)",
      it: "Rose di Roma Inno Duetto (Male)",
    },
    hybrid2: {
      en: "Roses Of Rome Anthem Duet Italian (Female)",
      it: "Rose di Roma Inno Duetto  Italiano(Feminile)",
    },
    Inst: {
      en: "Anthem Instrumental",
      it: "Instrumentale Inno"
    },

    theme:{
      en: "Our Theme Song",
      it: ""
    }
  };

  const SurpriseMessage = {
    en: "We’ve composed a special version of the sonnet just for you — if you’d love to hear a bloom of verse and soul, it's waiting for you in song.",
    it: "Abbiamo composto una versione speciale del sonetto solo per te — se desideri ascoltare un fiore di versi e anima, ti sta aspettando in una canzone.",
  };

  const contentdisplay = [
    {sonnet: TheSonnet(), audio: RomeTwo, title: audioTitles.romeTwo[language]},
    {sonnet: TheVision(), audio: language === "it" ? VisionShortSongIt : VisionSong, title: language === "it" ? "La Nostra Visione" : "Our Vision"},
    {sonnet: OurMotive(), audio: MotiveSong, title: language === "it" ? "I Nostri Motivo" : "Our Motive"},
    {sonnet: ThePrayer(), audio: PrayerSong, title: language === "it" ? "Le Nostro Preghiera (Versione Originale)" : "Our Prayer (Original Version)"},
    {sonnet: Theme(), audio: ThemeSong, title: audioTitles.theme[language]}
  ]
  const contentWithNoSonnet = [
    {audio: language === "it" ? ItalianOne : RomeOne, title: audioTitles.romeOne[language]},
    {audio: language === "it" ? ItalianTwo : RomeTwo, title: audioTitles.romeTwo[language]},
    {audio: Hybrid, title: audioTitles.hybrid[language]},
    {audio: HybridTwo, title: audioTitles.hybrid2[language]},
    {audio: language === "it" ? VisonItSong : VisionYouSong, title: language === "it" ? "La Nostra Visione (Versione Italiana)" : "Our Vision (Italian Version)"},
    {audio: language === "it" ? VisionFemale : VisionSong, title: language === "it" ? "La Nostra Visione (Versione Femminile)" : "Our Vision (Female Version)"},
    {audio: Instrumental, title: language === "it" ? "Instrumentale del Sonetto Sbocciato" : "Blooming Sonnet Instrumental"}
  ]
  

  return (
    <div className="home-container">
      <section className="welcome-banner">
        <h1>{welcomeText[language].heading}</h1>
        <p>{welcomeText[language].subheading}</p>
      </section>

      <div className="suprise-div" ref={containerRef}>
        <p>{SurpriseMessage[language]}</p>
        <button
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("pause-all-audio", { detail: null })
            );
            setSurprise(true);
          }}
          disabled={showSurprise}
          className="Suprise-btn"
        >
          {language === "it"
            ? "Lascia sbocciare il Sonetto"
            : "Let the Sonnet Bloom"}
        </button>
      </div>


      {contentdisplay.map((item) => (
        <div className={`sonnet-wrapper ${item.title === currentAudio?.title && isPlaying ? "playing" : ""}`}>
        <Sonnet magic={item.sonnet} />
        <button
          className={`sonnet-play-btn ${currentAudio && isPlaying ? <FaPause /> : <FaPlay />}`}
          onClick={() => setCurrentAudio({file: item.audio, title: item.title})}
          aria-label={currentAudio && isPlaying ? (language === "it" ? "Pause" : "Pause" ): (language === "it" ? "Play" : "Play")}
        >
          {currentAudio && isPlaying ? <FaPause /> : <FaPlay />}
          <span className="play-text">
            {currentAudio && isPlaying
              ? (language === "it" ? "In riproduzione" : "Playing")
              : (language === "it" ? "Ascolta" : "Listen")}
          </span>
        </button>
      </div>
      ))}

      {contentWithNoSonnet.map((item) => (
        <div className={`sonnet-wrapper ${item.title === currentAudio?.title && isPlaying ? "playing" : ""}`}>
          <h3 className="sonnet-title">{item.title}</h3>
          <button onClick={() => setCurrentAudio({file: item.audio, title: item.title})} className={`sonnet-play-btn ${currentAudio && isPlaying ? <FaPause /> : <FaPlay />}`}>
            {currentAudio && isPlaying ? <FaPause /> : <FaPlay />}
            <span className="play-text">
              {currentAudio && isPlaying
                ? (language === "it" ? "In riproduzione" : "Playing")
                : (language === "it" ? "Ascolta" : "Listen")}
            </span>
          </button>
        </div>
      ))}


      <DirectorMessage />
      <FormsComponent language={language} section="home" />

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

      {currentAudio && (
        <div className="mini-player floating">
          <div className="audio-wrapper floating">
            <AudioComponent
              audioFile={currentAudio.file}
              title={currentAudio.title}
              autoplay={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
