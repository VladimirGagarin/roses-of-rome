import { useLanguage } from "./LanguageContext";
import "../components/sonnet.css";

export default function Sonnet({magic}) {
  const { language } = useLanguage();
  const sonnet = magic;

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
          
        </div>
      ))}
    </div>
  );
}
