import { FaYoutube } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import VideoPlayer from "../ui/VideoPlayer";
import { RosesOfRomeVideos } from "../data/videos";
import "./Films.css";

export default function Films() {
  const { language } = useLanguage();
  const isIt = language === "it";
  const videos = RosesOfRomeVideos();

  useSeo({
    title: "Films & Cinema — Roses Of Rome Pictures",
    description: isIt
      ? "Esplora i film di Roses of Rome Pictures: cinema poetico, mistico e senza tempo, diretto dal cuore dello studio."
      : "Explore the films of Roses of Rome Pictures: poetic, mystical, timeless cinema directed from the heart of the studio.",
    keywords: "Roses of Rome films, art cinema, mystical film, independent film, Roses of Rome Pictures cinema",
    path: "/films",
    type: "video.movie",
    lang: language,
  });

  const t = {
    title: { en: "Our Films", it: "I Nostri Film" },
    sub: {
      en: "Each film is a verse, each frame a petal. Step into the screenings of Roses of Rome.",
      it: "Ogni film è un verso, ogni inquadratura un petalo. Entra nelle proiezioni delle Rose di Roma.",
    },
    watch: { en: "Watch on YouTube", it: "Guarda su YouTube" },
    inStudio: { en: "Roses of Rome Pictures", it: "Roses of Rome Pictures" },
  };

  return (
    <div className="container page-section films-page">
      <div className="section-head">
        <span className="kicker">{t.inStudio[language]}</span>
        <h1>{t.title[language]}</h1>
        <p className="section-sub">{t.sub[language]}</p>
      </div>

      <div className="films-grid">
        {videos.map((vid) => (
          <article className="film-card" key={vid.id}>
            <VideoPlayer uid={vid.id} src={vid.src} />
            <div className="film-card-body">
              <h2 className="film-card-title">{vid.title[language] || vid.title.en}</h2>
              <p className="film-card-desc">{vid.description?.[language] || vid.description?.en}</p>
              {vid.playlist && (
                <p className="film-card-collection">{vid.playlist}</p>
              )}
              {vid.externalLink && (
                <a className="film-card-link" href={vid.externalLink} rel="noopener noreferrer" target="_blank">
                  <FaYoutube /> {t.watch[language]}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}