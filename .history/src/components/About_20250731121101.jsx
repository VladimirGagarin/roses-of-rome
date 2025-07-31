import Logo from "../assets/images/rome";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";


export default function AboutComponent() {
    const { language } = useLanguage();
    const [showMore, setIsShowingMore] = useState(false);

    const allTexts = {
      headerTitle: {
        en: "Roses Of Rome Pictures.",
        it: "Rosa Di Roma Immagini",
      },
      introText: { en: "Roses of Rome Pictures – Aeternum Floreamus...", it: "Rosa Di Roma Immagini – Aeternum Floreamus..." },
    };

    return (
      <div className="about-container">
        <div className="left-side-about">
          <img />
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
                    <p>{language === "en" ? allTexts.introText.en : allTexts.introText.it}</p>
                    <button>{language === "en" ? ...more}</button>
                </div>
        </div>
      </div>
    );
}