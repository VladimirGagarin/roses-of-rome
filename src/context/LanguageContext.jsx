import { createContext, useState, useContext, useEffect, useCallback } from "react";

const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    // Persisted choice wins; otherwise auto-detect browser/region.
    const saved = localStorage.getItem("roLanguage");
    if (saved === "it" || saved === "en") {
      setLanguageState(saved);
      return;
    }
    const browserLang = (navigator.language || "en").toLowerCase();
    const userCountry = Intl.DateTimeFormat().resolvedOptions().locale.split("-")[1];
    const itCountries = ["IT", "CH", "SM", "VA"];
    if (browserLang.startsWith("it") || itCountries.includes(userCountry)) {
      setLanguageState("it");
    } else {
      setLanguageState("en");
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    if (lang === "it" || lang === "en") {
      setLanguageState(lang);
      localStorage.setItem("roLanguage", lang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);