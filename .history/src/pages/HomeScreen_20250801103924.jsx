import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import ItalianOne from "../assets/audios/italianrome.mp3";
import ItalianTwo from "../assets/audios/italianrome2.mp3";
import Hybrid from "../assets/audios/hybrid.mp3";
import { useLanguage } from "../components/LanguageContext";
import { useRef, useEffect } from "react";
import "../index.css"

export default function HomeScreen() {
    const { language } = useLanguage();
    const containerRef = useRef(null);

   useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }
}, []); // ✅ only once on component mount


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
        en: "Hybrid",
        it: "Ibrida"
      }
    };


 return (
   <div className="home-container" ref={containerRef}>
     <section className="welcome-banner">
       <h1>{welcomeText[language].heading}</h1>
       <p>{welcomeText[language].subheading}</p>
     </section>

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

     <AudioComponent audioFile={language === "it" ? ItalianOne :RomeOne} title={audioTitles.romeOne[language]} />
    <AudioComponent audioFile={language === "it" ? ItalianTwo :RomeTwo} title={audioTitles.romeTwo[language]} />
    <AudioComponent audioFile={language === "it" ? }
   </div>
 );

}
