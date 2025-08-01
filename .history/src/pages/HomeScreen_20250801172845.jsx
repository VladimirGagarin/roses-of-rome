import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import ItalianOne from "../assets/audios/italianrome.mp3";
import ItalianTwo from "../assets/audios/italianrome2.mp3";
import Hybrid from "../assets/audios/hybrid2.mp3";
import HybridTwo from "../assets/audios/hybrid3.mp3";
import SupriseSong from "../assets/audios/yourome.mp3";
import { SupriseSongLyrics } from "../components/Utils";
import { useLanguage } from "../components/LanguageContext";
import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import BgVid from "../assets/videos/bg_vid.mp4"
import "../index.css"

export default function HomeScreen() {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const [showSurprise, setSurprise] = useState(0);
  const lyricsArray = SupriseSongLyrics();
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [isPlaying, setPlaying] = useState(false);
  const [audioState, setAudioState] = useState("idle"); // 'idle' | 'loading' | 'stalled' | 'waitin
  const audioRef = useRef(null);

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
      setPlaying(false); // reset play state when modal closes
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
      heading: "Benvenuto a Roses Of Rome Pictures",
      subheading: "Aeternum Floreamus - Fioriamo per sempre.",
    },
  };

  const audioTitles = {
    romeOne: {
      en: "Roses Of Rome",
      it: "Rose di Roma",
    },
    romeTwo: {
      en: "Roses Of Rome (Epic Version)",
      it: "Rose di Roma (Versione Epica)",
    },
    hybrid: {
      en: "Hybrid (Male)",
      it: "Ibrido",
    },
    hybrid2: {
      en: "Hybrid (Female)",
      it: "Ibrida",
    },
  };

  const SurpriseMessage = {
    en: "We’ve composed a special version of the sonnet just for you — if you’d love to hear a bloom of verse and soul, it's waiting for you in song.",
    it: "Abbiamo composto una versione speciale del sonetto solo per te — se desideri ascoltare un fiore di versi e anima, ti sta aspettando in una canzone.",
  };

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
            setSurprise(true)
          }}
          disabled={showSurprise}
          className="Suprise-btn"
        >
          {language === "it"
            ? "Lascia sbocciare il Sonetto"
            : "Let the Sonnet Bloom"}
        </button>
      </div>

      <Sonnet />

 

      <AudioComponent
        audioFile={language === "it" ? ItalianOne : RomeOne}
        title={audioTitles.romeOne[language]}
      />
      <AudioComponent
        audioFile={language === "it" ? ItalianTwo : RomeTwo}
        title={audioTitles.romeTwo[language]}
      />
      <AudioComponent audioFile={Hybrid} title={audioTitles.hybrid[language]} />
      <AudioComponent
        audioFile={HybridTwo}
        title={audioTitles.hybrid2[language]}
      />
      {showSurprise && (
        <div className="overlay-modal-suprise">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="video-background"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={BgVid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay-content-surprise">
            <h3>
              {language === "it" ? "Versione Speciale" : "Special Version"}
            </h3>
            {/* 🎵 Audio element with ref */}
            <audio ref={audioRef}>
              <source src={SupriseSong} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>

            {/* Loading/Waiting Indicator */}
            {(audioState === "loading" ||
              audioState === "stalled" ||
              audioState === "waiting") && (
              <div className="audio-state-indicator">
                <div className="loading-spinner"></div>
                <p>
                  {language === "it"
                    ? "Caricamento in corso..."
                    : audioState === "waiting"
                    ? "Buffering audio..."
                    : "Loading audio..."}
                </p>
              </div>
            )}

            {/* 🎤 Synced Lyrics */}
            <div className="lyrics synced">
              <p>{currentLine}</p>
            </div>

            <div className="actions-btn">
              <button
                className="play-pause-btn"
                onClick={() => {
                  if (!audioRef.current) return;
                  if (isPlaying) {
                    audioRef.current.pause();
                    setPlaying(false);
                  } else {
                    audioRef.current.play();
                    setPlaying(true);
                  }
                }}
                disabled
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button
                className="close-btn-overlay"
                aria-label="Close surprise message"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setPlaying(false);
                  }
                  setSurprise(false);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
