import { Link } from "react-router-dom";
import { FaYoutube, FaEnvelope, FaTiktok } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import {
  ABOUT_HUB,
  ABOUT_PAGES,
  ABOUT_SECTIONS,
} from "../data/aboutPages";
import RosPic from "../assets/images/ros_pic.png";
import TransparentLogo from "../assets/images/transparent_logo.png";
import OfficialFlag from "../assets/images/official_flag.png";
import OfficialMotto from "../assets/images/official_motto.png";
import "./About.css";

const SYMBOL_IMAGES = {
  "our-flag": OfficialFlag,
  "our-logo": TransparentLogo,
  "our-motto": OfficialMotto,
};

export default function About() {
  const { language } = useLanguage();

  useSeo({
    title: ABOUT_HUB.title,
    description: ABOUT_HUB.description,
    keywords: ABOUT_HUB.keywords,
    path: ABOUT_HUB.path,
    lang: "en",
    customLd: ABOUT_HUB.jsonLd,
  });

  const t = {
    kicker: { en: "Roses Of Rome Pictures", it: "Roses Of Rome Pictures" },
    title: { en: "About Roses Of Rome Pictures", it: "Chi Sono le Rose di Roma" },
    lead: {
      en: "Roses Of Rome Pictures (RORP) is an independent Kenyan creative studio and publishing identity founded on 31 July 2025. Its motto is AETERNUM FLOREAMUS — “Let us bloom forever.”",
      it: "Roses Of Rome Pictures (RORP) è uno studio creativo indipendente keniota e un'identità editoriale fondata il 31 luglio 2025. Il suo motto è AETERNUM FLOREAMUS — “Fioriamo per sempre.”",
    },
    explore: { en: "Explore the Studio", it: "Esplora lo Studio" },
    exploreSub: {
      en: "Each part of our identity has its own page — history, anthem, flag, logo, motto, motive, vision, and prayer.",
      it: "Ogni parte della nostra identità ha la sua pagina — storia, inno, bandiera, logo, motto, motivo, visione e preghiera.",
    },
    symbols: { en: "Official Symbols", it: "Simboli Ufficiali" },
    symbolsSub: {
      en: "Our flag, logo, and motto — the eternal bloom of the studio.",
      it: "La nostra bandiera, il logo e il motto — il fiorire eterno dello studio.",
    },
    landscape: {
      en: "Roses of Rome Pictures — landscape",
      it: "Roses of Rome Pictures — paesaggio",
    },
    connect: { en: "Stay Connected", it: "Resta Connesso" },
    youtube: { en: "Join us on YouTube", it: "Unisciti a noi su YouTube" },
    tiktok: { en: "Follow us on TikTok", it: "Seguici su TikTok" },
    email: { en: "rosesofromepictures@gmail.com", it: "rosesofromepictures@gmail.com" },
    open: { en: "Read more", it: "Scopri di più" },
  };

  return (
    <div className="container page-section about-page about-hub">
      <header className="about-hub-hero">
        <span className="kicker">{t.kicker[language]}</span>
        <h1 className="about-hub-title">{t.title[language]}</h1>
        <p className="about-hub-lead">{t.lead[language]}</p>
      </header>

      <section className="about-hub-section" aria-labelledby="about-explore">
        <div className="section-head">
          <span className="kicker">Roses Of Rome</span>
          <h2 id="about-explore">{t.explore[language]}</h2>
          <p className="section-sub">{t.exploreSub[language]}</p>
        </div>

        <div className="about-hub-grid">
          {ABOUT_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              to={`/${section.path}`}
              className="about-hub-card"
            >
              <span className="about-hub-card-label">
                {section.label[language] || section.label.en}
              </span>
              <p className="about-hub-card-summary">
                {section.summary[language] || section.summary.en}
              </p>
              <span className="about-hub-card-open">{t.open[language]} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-emblems" aria-labelledby="about-symbols">
        <div className="section-head">
          <span className="kicker">Roses Of Rome</span>
          <h2 id="about-symbols">{t.symbols[language]}</h2>
          <p className="section-sub">{t.symbolsSub[language]}</p>
        </div>
        <div className="emblems-grid">
          {["our-logo", "our-flag", "our-motto"].map((slug) => {
            const section = ABOUT_PAGES[slug];
            return (
              <Link key={slug} to={`/${section.path}`} className="emblem-card emblem-card-link">
                <img
                  src={SYMBOL_IMAGES[slug]}
                  alt={section.label[language] || section.label.en}
                  loading="lazy"
                  decoding="async"
                />
                <span className="emblem-card-caption">
                  {section.label[language] || section.label.en}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <figure className="about-banner">
        <img src={RosPic} alt={t.landscape[language]} loading="lazy" decoding="async" />
      </figure>

      <div className="about-release">
        <h2>{t.connect[language]}</h2>
        <div className="about-actions">
          <a
            className="gold-btn"
            href="https://youtube.com/@rosesofrome"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaYoutube /> {t.youtube[language]}
          </a>
          <a
            className="crimson-btn"
            href="https://tiktok.com/@roses_of_rome"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTiktok /> {t.tiktok[language]}
          </a>
          <a className="crimson-btn" href="mailto:rosesofromepictures@gmail.com">
            <FaEnvelope /> {t.email[language]}
          </a>
        </div>
      </div>
    </div>
  );
}
