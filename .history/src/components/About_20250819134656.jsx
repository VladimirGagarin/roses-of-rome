import Logo from "../assets/images/rorps.png";
import { useState } from "react";
import "./About.css"
import { FaBell, FaUserPlus, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";
import {useNavigate} from "react-router-dom"



export default function AboutComponent() {
    const { language } = useLanguage();
    const [showMore, setIsShowingMore] = useState(false);
  const navigate = useNavigate();

    const allTexts = {
      headerTitle: {
        en: "Roses Of Rome Pictures.",
        it: "Rosa Di Roma Immagini",
      },
        introText: { en: "Roses of Rome Pictures – Aeternum Floreamus...", it: "Rosa Di Roma Immagini – Aeternum Floreamus..." },
            moreText: {
                    en: `Roses of Rome Pictures – Aeternum Floreamus\n
                In the grand tradition of Rome’s eternal splendor, Roses of Rome Pictures stands as a beacon of timeless artistry.
                Like the roses that adorned the ancient villas, we flourish with passion, vision, and the undying pursuit of cinematic excellence.
                With every frame, we weave fabulae immortales—immortal stories—crafted with heart, precision, and the spirit of antiquity.
                Our creations, imbued with gratia et virtus (grace and strength), honor the past while shaping the future of storytelling.
                Per aspera ad astra—through hardships to the stars—we strive for artistic grandeur, capturing the beauty of fleeting moments and transforming them into eternal echoes.
                At Roses of Rome Pictures, we do not merely create. Nos aedificamus aeternitatem. We build eternity.
                Aeternum floreamus!`,
                    it: `Rosa Di Roma Immagini – Aeternum Floreamus\n
                Seguendo la grande tradizione dello splendore eterno di Roma, Rosa Di Roma Immagini si erge come faro di arte senza tempo.
                Come le rose che adornavano le antiche ville, fioriamo con passione, visione e la costante ricerca dell’eccellenza cinematografica.
                Con ogni fotogramma, intrecciamo fabulae immortales—storie immortali—create con cuore, precisione e spirito d’antichità.
                Le nostre creazioni, intrise di gratia et virtus (grazia e forza), onorano il passato mentre plasmano il futuro del racconto.
                Per aspera ad astra—attraverso le difficoltà fino alle stelle—puntiamo alla grandezza artistica, catturando la bellezza degli istanti fugaci e trasformandoli in echi eterni.
                In Rosa Di Roma Immagini, non creiamo soltanto. Nos aedificamus aeternitatem. Costruiamo l’eternità.
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
              <button onClick={() => setIsShowingMore(false)}>
                {language === "en" ? "Close" : "Chiudi"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
}