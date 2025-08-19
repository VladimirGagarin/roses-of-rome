import Logo from "../assets/images/rorps.png";
import { useState } from "react";
import "./About.css"
import { FaBell, FaUserPlus, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";
import { useNavigate } from "react-router-dom";
import AboutHymn from "../assets/audios/about_roses.mp3";
import AudioComponent from "./AudioPlayer";



export default function AboutComponent() {
    const { language } = useLanguage();
    const [showMore, setIsShowingMore] = useState(false);
  const navigate = useNavigate();

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
              <AudioComponent audioFile={AboutHymn} title={language === "it" ? "Roses Of "}
              <button onClick={() => setIsShowingMore(false)}>
                {language === "en" ? "Close" : "Chiudi"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
}