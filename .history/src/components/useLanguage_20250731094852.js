import { useContext } from "react";
import { LanguageContext } from  "../components/LanguageContext"; // adjust path as needed

export const useLanguage = () => useContext(LanguageContext);
