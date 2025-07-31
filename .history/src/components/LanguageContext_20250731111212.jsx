// LanguageContext.jsx
import { createContext, useState, useContext } from "react";

// ✅ Export the context
 const LanguageContext = createContext();

// ✅ Export the provider
export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("it"); // default to Italian

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);