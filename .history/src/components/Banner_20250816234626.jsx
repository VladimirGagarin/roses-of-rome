// src/components/BannerHead.jsx
import { useLanguage } from "./LanguageContext";
import "../index.css";
import WelcomeSongIt from "../assets/audios/welcome_it.mp3";
import WelcomeSongFemaleIntro from "../assets/audios/welcome_female_intro.mp3";
import AudioComponent from "./AudioPlayer";

export default function BannerHead({
  mediaType = "image",
  src,
  alt = "Event Banner",
}) {
    const { language, setLanguage } = useLanguage();
    

  return (
    <div className="banner-container">
      {mediaType === "image" && (
        <img src={src} alt={alt} className="banner-media" />
      )}
      {mediaType === "video" && (
        <video
          className="banner-media"
          src={src}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {/*Top right switcher */}
      <div className="Switcher" onClick={() => setLanguage(language === "en" ? "it" : "en")}>
        <span
          style={{
            color: language === "en" ? "black" : "#888",
            opacity: language === "en" ? "1" : "0.3",
          }}
        >
          EN
        </span>
        <div
          className={`switch ${language === "it" ? "on" : ""}`}
          
        ></div>
        <span
          style={{
            color: language === "it" ? "black" : "#888",
            opacity: language === "it" ? "1" : "0.3",
          }}
        >
          IT
        </span>
      </div>

      <div className="audio-wrapper">
              <AudioComponent
                audioFile={language === "it" ? WelcomeSongIt : WelcomeSongFemaleIntro}
                title={language === "" "Benvenuti"}
              />
            </div>
    </div>
  );
}
