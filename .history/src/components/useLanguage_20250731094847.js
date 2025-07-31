import { useContext } from "react";
import { LanguageContext } from  "../components/"; // adjust path as needed

export const useLanguage = () => useContext(LanguageContext);
