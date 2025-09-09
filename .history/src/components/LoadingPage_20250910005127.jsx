import  {useLanguage} from "../context/LanguageContext";
import "../index.css";

export default function LoadingPage() {
    const { language } = useLanguage();
    const sweetLoadingTexts = [
        { en: "Loading... A sweet surprise is on its way!", it: "Caricamento... Una dolce sorpresa è in arrivo!" },
        
    ]
}