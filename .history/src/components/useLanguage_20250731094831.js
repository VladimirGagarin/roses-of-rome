import { useContext } from "react";
import { LanguageContext } from "./LanguageContext"; // adjust path as needed

export const useLanguage = () => useContext(LanguageContext);
