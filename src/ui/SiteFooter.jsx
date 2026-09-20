import { Link } from "react-router-dom";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function SiteFooter() {
  const { language } = useLanguage();
  const t = {
    tagline: {
      en: "Connoisseurs of Film, Music & Animation — Aeternum Floreamus.",
      it: "Conoscitori di Cinema, Musica e Animazione — Aeternum Floreamus.",
    },
    explore: { en: "Explore", it: "Esplora" },
    reach: { en: "Reach Us", it: "Contattaci" },
    youtube: { en: "YouTube Channel", it: "Canale YouTube" },
    tiktok: { en: "TikTok Channel", it: "Canale TikTok" },
    email: { en: "Email the Studio", it: "Scrivi allo Studio" },
    rights: { en: "All rights reserved.", it: "Tutti i diritti riservati." },
  };

  const nav = [
    { to: "/", label: t.explore[language], aria: t.explore[language] },
    { to: "/films", label: language === "it" ? "Film" : "Films" },
    { to: "/music", label: language === "it" ? "Musica" : "Music" },
    { to: "/shorts", label: language === "it" ? "Corti" : "Shorts" },
    { to: "/about", label: t.reach[language] === "Contattaci" ? "Lo Studio" : "The Studio" },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <p className="footer-tagline">{t.tagline[language]}</p>
          <p className="footer-motto">Roses of Rome Pictures</p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{t.explore[language]}</h4>
          <ul className="footer-links">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{t.reach[language]}</h4>
          <ul className="footer-links">
            <li>
              <a href="https://youtube.com/@rosesofrome" rel="noopener noreferrer" target="_blank">
                <FaYoutube /> {t.youtube[language]}
              </a>
            </li>
            <li>
              <a href="https://tiktok.com/@roses_of_rome" rel="noopener noreferrer" target="_blank">
                <FaTiktok /> {t.tiktok[language]} (@roses_of_rome)
              </a>
            </li>
            <li>
              <a href="mailto:rosesofromepictures@gmail.com">{t.email[language]}</a>
            </li>
            <li>
              <a href="https://vladimirgagarin.github.io/roses-of-rome/Support.html" rel="noopener noreferrer" target="_blank">
                {language === "it" ? "Aiuta le Rose di Roma" : "Support Roses of Rome"}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Roses Of Rome Pictures. {t.rights[language]}</p>
      </div>
    </footer>
  );
}