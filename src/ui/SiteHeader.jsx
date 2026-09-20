import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import RosPic from "../assets/images/ros_pic.png";

const nav = [
  { to: "/", key: "home" },
  { to: "/films", key: "films" },
  { to: "/music", key: "music" },
  { to: "/shorts", key: "shorts" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
];

const labels = {
  home: { en: "Home", it: "Home" },
  films: { en: "Films", it: "Film" },
  music: { en: "Music", it: "Musica" },
  shorts: { en: "Shorts", it: "Corti" },
  about: { en: "The Studio", it: "Lo Studio" },
  contact: { en: "Contact", it: "Contatti" },
};

const menuLabels = {
  open: { en: "Open menu", it: "Apri il menu" },
  close: { en: "Close menu", it: "Chiudi il menu" },
};

export default function SiteHeader() {
  const { language } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const t = (key) => labels[key][language];

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Roses Of Rome Pictures — Home">
          <img className="brand-logo" src={RosPic} alt="Roses Of Rome Pictures" />
        </Link>

        <div className="header-actions">
          <nav id="site-nav" className={`site-nav ${open ? "open" : ""}`} aria-label="Main navigation">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <LanguageSwitcher />

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? menuLabels.close[language] : menuLabels.open[language]}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}