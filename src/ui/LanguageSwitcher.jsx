import { useLanguage } from "../context/LanguageContext";

const langs = [
  { code: "en", label: "EN", native: "English" },
  { code: "it", label: "IT", native: "Italiano" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="lang-pill"
      role="group"
      aria-label="Language / Lingua"
    >
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-pill-btn ${language === l.code ? "active" : ""}`}
          onClick={() => setLanguage(l.code)}
          aria-pressed={language === l.code}
          title={l.native}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}