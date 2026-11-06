import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { ABOUT_SECTIONS } from "../../data/aboutPages";

const navText = {
  home: { en: "Home", it: "Home" },
  about: { en: "About", it: "Chi Siamo" },
  explore: { en: "Explore the studio", it: "Esplora lo studio" },
};

export function AboutBreadcrumb({ currentLabel }) {
  const { language } = useLanguage();

  return (
    <nav className="about-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">{navText.home[language]}</Link>
      <span aria-hidden="true">/</span>
      <Link to="/about/">{navText.about[language]}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{currentLabel}</span>
    </nav>
  );
}

export function AboutRelated({ exclude }) {
  const { language } = useLanguage();

  return (
    <nav className="about-related" aria-label={navText.explore[language]}>
      <h2 className="about-related-title">{navText.explore[language]}</h2>
      <div className="about-related-links">
        {ABOUT_SECTIONS.filter((section) => section.slug !== exclude).map((section) => (
          <Link key={section.slug} to={`/${section.path}`} className="about-related-link">
            {section.label[language] || section.label.en}
          </Link>
        ))}
      </div>
    </nav>
  );
}
