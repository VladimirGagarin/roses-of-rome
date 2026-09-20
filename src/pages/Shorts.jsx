import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import VideoPlayer from "../ui/VideoPlayer";
import { RosesOfRomeShorts } from "../data/shorts";
import "./Shorts.css";

export default function Shorts() {
  const { language } = useLanguage();
  const isIt = language === "it";
  const shorts = RosesOfRomeShorts();

  useSeo({
    title: "Shorts & Animations — Roses Of Rome Pictures",
    description: isIt
      ? "Cortometraggi e animazioni dalle Rose di Roma: piccoli fiori di cinema creati dal cuore dello studio."
      : "Shorts and animations from Roses of Rome: small blooms of cinema crafted by the heart of the studio.",
    keywords: "Roses of Rome shorts, animation, short films, cinematic shorts, Roses of Rome studio",
    path: "/shorts",
    type: "video.movie",
    lang: language,
  });

  const t = {
    title: { en: "Shorts & Animations", it: "Corti e Animazioni" },
    sub: {
      en: "Tiny petals of wonder — stories in miniature, grown in the rose garden.",
      it: "Piccoli petali di meraviglia — storie in miniatura, coltivate nel roseto.",
    },
    short: { en: "Short", it: "Corto" },
    animation: { en: "Animation", it: "Animazione" },
  };

  return (
    <div className="container page-section shorts-page">
      <div className="section-head">
        <span className="kicker">Roses Of Rome Pictures</span>
        <h1>{t.title[language]}</h1>
        <p className="section-sub">{t.sub[language]}</p>
      </div>

      <div className="shorts-grid">
        {shorts.map((s) => (
          <article className="short-card" key={s.id}>
            <VideoPlayer uid={s.id} src={s.src} />
            <div className="short-card-body">
              <span className={`short-kind ${s.kind}`}>{s.kind === "animation" ? t.animation[language] : t.short[language]}</span>
              <h2 className="short-card-title">{s.title[language]}</h2>
              <p className="short-card-desc">{s.description[language]}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}