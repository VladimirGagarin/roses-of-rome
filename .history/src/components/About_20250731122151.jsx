import Logo from "../assets/images/rome";
import { useState } from "react";
import {Modal} from ""
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";
import Logo


export default function AboutComponent() {
    const { language } = useLanguage();
    const [showMore, setIsShowingMore] = useState(false);

    const allTexts = {
      headerTitle: {
        en: "Roses Of Rome Pictures.",
        it: "Rosa Di Roma Immagini",
      },
        introText: { en: "Roses of Rome Pictures – Aeternum Floreamus...", it: "Rosa Di Roma Immagini – Aeternum Floreamus..." },
        moreText: {
            en: "Roses of Rome Pictures – Aeternum Floreamus In the grand tradition of Rome’s eternal splendor, Roses of Rome Pictures stands as a beacon of timeless artistry. \n Like the roses that adorned the ancient villas, we flourish with passion, vision, and the undying pursuit of cinematic excellence.\n With every frame, we weave fabulae immortales—immortal stories—crafted with heart, precision, and the spirit of antiquity. Our creations, imbued with gratia et virtus (grace and strength), honor the past while shaping the future of storytelling.\n Per aspera ad astra—through hardships to the stars—we strive for artistic grandeur, capturing the beauty of fleeting moments and transforming them into eternal echoes.\n At Roses of Rome Pictures, we do not merely create. Nos aedificamus aeternitatem. We build eternity.\n Aeternum floreamus!",
            it: ""
      }
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
            <p>
              {language === "en"
                ? allTexts.introText.en
                : allTexts.introText.it}
            </p>
            <button onClick={setIsShowingMore(true)} disabled={showMore}>
              {language === "en" ? "...more" : ""}
            </button>
          </div>

          <div className="bottom">
            <Link
              to={"https://youtube.com/@rosesofrome?si=LdDEaj0eJVdHpITm"}
                    >
                        <FaBell/> {language === "en" ? "Subscribe" : ""}
            </Link>
          </div>
            </div>
            
            {/** Show modal */}
            {showMore && (
                
            )}
      </div>
    );
}