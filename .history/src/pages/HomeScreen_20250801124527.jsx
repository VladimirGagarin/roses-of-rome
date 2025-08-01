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
import "../index.css"

export default function HomeScreen() {
    const { language } = useLanguage();
  const containerRef = useRef(null);
  const [showSurprise, setSurprise] = useState(0);
  const lyricsArray = SupriseSongLyrics();
const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [isPlaying, setPlaying] = useState(false);
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
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime * 1000); // to match ms
      }
    }, 300); // every 300ms

    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const current = lyricsArray.find(
    (lyric) => currentTime >= lyric.start && currentTime <= lyric.end
  );
  setCurrentLine(current?.text || "");
}, [currentTime, lyricsArray]);


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
        it: "Ibrido"
      },
      hybrid2: {
        en: "Hybrid (Female)",
        it: "Ibrida"
      }
  };
  
  const SurpriseMessage = {
    en: "We’ve composed a special version of the sonnet just for you — if you’d love to hear a bloom of verse and soul, it's waiting for you in song.",
    it: "Abbiamo composto una versione speciale del sonetto solo per te — se desideri ascoltare un fiore di versi e anima, ti sta aspettando in una canzone.",
  };



 return (
   <div className="home-container" ref={containerRef}>
     <section className="welcome-banner">
       <h1>{welcomeText[language].heading}</h1>
       <p>{welcomeText[language].subheading}</p>
     </section>

     <div className="suprise-div">
       <p>{SurpriseMessage[language]}</p>
       <button onClick={() => setSurprise(true)} disabled={showSurprise}>
         {language === "it"
           ? "Lascia sbocciare il Sonetto"
           : "Let the Sonnet Bloom"}
       </button>
     </div>

     <Sonnet />

     {/* 🎵 Add a language-specific notice above the audio components */}
     {language === "it" && (
       <p className="audio-notice">
         🎧 Le canzoni sono in inglese. Assicurati di attivare i sottotitoli o
         di seguire il testo.
       </p>
     )}
     {language === "en" && (
       <p className="audio-notice">
         🎧 Songs are in English. Subtitles or lyrics may help you follow along.
       </p>
     )}

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
       <div className="overlay-modal">
         <div className="overlay-content">
           <h3>
             {language === "it" ? "Versione Speciale" : "Special Version"}
           </h3>
           {/* 🎵 Audio element with ref */}
           <audio ref={audioRef}>
             <source src={SupriseSong} type="audio/mp3" />
             Your browser does not support the audio element.
           </audio>

           {/* 🎤 Synced Lyrics */}
           <div className="lyrics synced">
             <p>{currentLine}</p>
           </div>
           <div className="actions-btn">
             <button>{ }</button>
           <button
             className="close-btn"
             aria-label="Close surprise message"
             onClick={() => {
               if (audioRef) {
                 audioRef.current.pause();
                 audioRef.current.currentTime = 0;
               }
               setSurprise(false);
             }}
           >
             ✕
             </button>
             </div>
         </div>
         {!isPlaying && ()}
       </div>
     )}
   </div>
 );

}
