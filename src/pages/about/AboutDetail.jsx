import { Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useSeo } from "../../hooks/useSeo";
import {
  ABOUT_PAGES,
  ABOUT_POEMS,
  ABOUT_SYMBOLS,
} from "../../data/aboutPages";
import { AboutBreadcrumb, AboutRelated } from "./AboutNav";
import Poem from "./Poem";
import OfficialFlag from "../../assets/images/official_flag.png";
import TransparentLogo from "../../assets/images/transparent_logo.png";
import OfficialMotto from "../../assets/images/official_motto.png";
import "../About.css";

const SYMBOL_MEDIA = {
  "our-flag": OfficialFlag,
  "our-logo": TransparentLogo,
  "our-motto": OfficialMotto,
};

function SymbolSection({ slug, language }) {
  const symbol = ABOUT_SYMBOLS[slug];
  const image = SYMBOL_MEDIA[slug];
  const paragraphs = symbol.paragraphs[language] || symbol.paragraphs.en;

  return (
    <>
      <h1 className="about-detail-title">
        {symbol.heading[language] || symbol.heading.en}
      </h1>
      <p className="about-detail-intro">{symbol.intro[language] || symbol.intro.en}</p>

      <div className="about-symbol-detail">
        <figure className="about-symbol-figure">
          <img
            src={image}
            alt={symbol.imageAlt[language] || symbol.imageAlt.en}
            loading="eager"
            decoding="async"
          />
        </figure>
        <div className="about-symbol-text">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
}

function PoemSection({ slug, language }) {
  const poem = ABOUT_POEMS[slug];
  const className =
    slug === "our-anthem"
      ? "poem-sonnet"
      : slug === "our-motive"
        ? "poem-motive"
        : slug === "our-vision"
          ? "poem-vision"
          : "poem-prayer";

  return (
    <>
      <p className="about-detail-intro">{poem.intro[language] || poem.intro.en}</p>
      <Poem
        data={poem.data}
        language={language}
        className={className}
        titleLink={poem.video}
        titleAs="h1"
      />
    </>
  );
}

export default function AboutDetail() {
  const { language } = useLanguage();
  const { section } = useParams();
  const page = ABOUT_PAGES[section];

  useSeo({
    title: page ? page.title : "About Roses Of Rome Pictures",
    description: page ? page.description : undefined,
    keywords: page ? page.keywords : undefined,
    path: page ? page.path : "about/",
    lang: "en",
    customLd: page ? page.jsonLd : null,
  });

  if (!page) {
    return <Navigate to="/about/" replace />;
  }

  return (
    <div className="container page-section about-page about-detail">
      <AboutBreadcrumb currentLabel={page.label[language] || page.label.en} />

      {page.kind === "poem" ? (
        <PoemSection slug={page.slug} language={language} />
      ) : (
        <SymbolSection slug={page.slug} language={language} />
      )}

      <AboutRelated exclude={page.slug} />
    </div>
  );
}
