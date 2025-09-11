import { useLanguage } from "../components/LanguageContext";
import {useState, useEffect} from "react";
import "../index.css";

export default function LoadingPage() {
    const { language } = useLanguage();
    const sweetLoadingTexts = [
        { en: "Loading... A sweet surprise is on its way!", it: "Caricamento... Una dolce sorpresa è in arrivo!" },
        { en: "Preparing something special for you...", it: "Preparando qualcosa di speciale per te..." },
        { en: "Almost there... A treat is coming!", it: "Quasi pronto... Una sorpresa sta arrivando!" },
        { en: "Just a moment... Sweetness is on its way!", it: "Solo un momento... La dolcezza è in arrivo!" },
        { en: "Hang tight ... Roses Of Rome is blooming!", it: "Tieniti forte ... Le Rose di Roma stanno fiorendo!" },
        { en: "Aeternum Floreamus!", it: "Aeternum Floreamus!" },
        { en: "Loading... Good things take time!", it: "Caricamento... Le cose buone richiedono tempo!" },
    ];

   const [currentText, setCurrentText] = useState(0);

   useEffect(() => {
       const interval = setInterval(() => {
           setCurrentText((prevText) => (prevText + 1) % sweetLoadingTexts.length);
       }, 6000); // Change text every 6 seconds

       return () => clearInterval(interval);
   }, []);
    
    return (
        <div className="loading-page">
            <div className="loading-spinners"></div>
            <div className="loading-text">{sweetLoadingTexts[currentText][language]}</div>
        </div>
    );
}