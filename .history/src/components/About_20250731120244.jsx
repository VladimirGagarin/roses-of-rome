import Logo from "../assets/images/rome";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";


export default function AboutComponent() {
    const { language } = useLanguage();

    const allTexts = {
        headerTitle: { en: "Roses Of Rome Pictures.", it: "Rosa Di Roma Immagini" },
        
    }

    return (
        <div className="about-container">
            <div className="left-side-about">
                <img/>
            </div>
            <div className="right-side-about">
                <div className="top">
                    
                </div>
            </div>
        </div>
    )
}