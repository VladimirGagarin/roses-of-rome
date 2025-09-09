import  {useLanguage} from "../context/LanguageContext";
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

    
}