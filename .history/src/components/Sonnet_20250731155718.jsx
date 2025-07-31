import { useLanguage } from "./LanguageContext";
import { TheSonnet } from "./Utils";
import "../index.css";

export default function Sonnet() {
  const { language } = useLanguage();
  const sonnet = TheSonnet();

  return (
    <div className="sonnet">
      <h2>{sonnet.title[language]}</h2>
      {sonnet.verses.map((section, idx) => (
        <div key={idx} className={`sonnet-section ${section.type}`}>
          {section.verse.map((line) => (
            <div key={line.lineId} className="sonnet-line">
              {line[language]}
            </div>
          ))}
          {section.type === "chorus" && (
            <div className="sonnet-chorus-label">Chorus</div>
          )}
        </div>
      ))}
    </div>
  );
}
