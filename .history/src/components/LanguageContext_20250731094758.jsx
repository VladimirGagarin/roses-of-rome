// LanguageContext.js
import { createContext, useContext, useState } from "react";

// 1. Create the context
const LanguageContext = createContext();

// 2. Provider component
export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("it"); // default to Italian

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}


