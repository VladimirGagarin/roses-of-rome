import Logo from "../assets/images/rome";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";


export default function AboutComponent() {
    const { language } = useLanguage();

    const allTexts = {
        headerTitle: { en: "Roses Of Rome Pictures.", it: "Rosa Di Roma Immagini" },
        introText: {en}
        
    }

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

                </div>
        </div>
      </div>
    );
}