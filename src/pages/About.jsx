import { FaYoutube, FaEnvelope, FaTiktok } from "react-icons/fa";
import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import { TheSonnet, TheVision, OurMotive, ThePrayer } from "../data/studio";
import { creativePlaylists } from "../data/playlists";
import { VideoLink } from "../ui/YouTubeOverlay";
import RosPic from "../assets/images/ros_pic.png";
import TransparentLogo from "../assets/images/transparent_logo.png";
import OfficialFlag from "../assets/images/official_flag.png";
import OfficialMotto from "../assets/images/official_motto.png";
import "./About.css";

function Poem({ data, language, className = "", titleLink }) {
  const title = data.title[language] || data.title.en;
  return (
    <section className={`poem ${className}`}>
      <h2 className="poem-title">
        {titleLink ? (
          <VideoLink url={titleLink.url} title={titleLink.ytTitle} className="poem-title-link">
            {title}
          </VideoLink>
        ) : (
          title
        )}
      </h2>
      {data.verses.map((block, bi) => (
        <div className={`poem-block ${block.type}`} key={bi}>
          {block.verse.map((line) => (
            <p className="poem-line" key={line.lineId}>
              {line[language] || line.en}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}

const INFOBOX_ROWS = [
  ["Abbreviation", "RORP"],
  ["Type", "Creative studio / publishing identity"],
  ["Industry", "Film, music, animation, digital media"],
  ["Founded", "31 July 2025"],
  ["Based in", "Kenya"],
  ["Founder", "Roses Of Rome Pictures"],
  ["Production identity", "Aeternum Floreamus Production"],
  ["Motto", "AETERNUM FLOREAMUS"],
  ["English", "&ldquo;Let us bloom forever.&rdquo;"],
  ["Slogan", "&ldquo;Connoisseurs of Film, Music & Animation&rdquo;"],
  ["Primary platforms",
    '<a class="infobox-link" href="https://youtube.com/@rosesofrome" target="_blank" rel="noopener noreferrer">YouTube</a>, <a class="infobox-link" href="https://tiktok.com/@roses_of_rome" target="_blank" rel="noopener noreferrer">TikTok</a>'],
  ["Visual emblem", "Golden rose and laurel wreath"],
];

export default function About() {
  const { language } = useLanguage();

  useSeo({
    title: "Roses Of Rome Pictures — Independent Kenyan Creative Studio | Wikipedia-Style Profile",
    description: "Roses Of Rome Pictures (abbreviated RORP) is an independent creative studio and publishing identity associated with film, music, animation, and visual storytelling. Founded 31 July 2025 in Kenya. Motto: AETERNUM FLOREAMUS, Latin for 'Let us bloom forever.'",
    keywords:
      "Roses Of Rome Pictures, RORP, Kenyan film studio, independent studio, Aeternum Floreamus, Let us bloom forever, Roses of Rome Pictures music, film animation music studio, golden rose laurel wreath",
    path: "/about",
    lang: "en",
    customLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Roses Of Rome Pictures",
      alternateName: "RORP",
      description:
        "Independent creative studio and publishing identity associated with film, music, animation, and visual storytelling. Founded 31 July 2025 in Kenya. Motto: Aeternum Floreamus.",
      slogan: "Connoisseurs of Film, Music & Animation",
      motto: "AETERNUM FLOREAMUS — Let us bloom forever.",
      foundingDate: "2025-07-31",
      url: "https://vladimirgagarin.github.io/roses-of-rome/",
      logo: "https://vladimirgagarin.github.io/roses-of-rome/transparent_logo.png",
      image: "https://vladimirgagarin.github.io/roses-of-rome/official_motto.png",
      email: "rosesofromepictures@gmail.com",
      location: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "KE" } },
      sameAs: ["https://youtube.com/@rosesofrome", "https://tiktok.com/@roses_of_rome"],
    },
  });

  const t = {
    connect: { en: "Stay Connected", it: "Resta Connesso" },
    youtube: { en: "Join us on YouTube", it: "Unisciti a noi su YouTube" },
    tiktok: { en: "Follow us on TikTok", it: "Seguici su TikTok" },
    email: { en: "rosesofromepictures@gmail.com", it: "rosesofromepictures@gmail.com" },
    symbols: { en: "Official Symbols", it: "Simboli Ufficiali" },
    symbolsSub: {
      en: "Our flag, our motto, and our emblem — the eternal bloom of the studio.",
      it: "La nostra bandiera, il nostro motto e il nostro emblema — il fiorire eterno dello studio.",
    },
    logo: { en: "The Official Logo", it: "Il Logo Ufficiale" },
    flag: { en: "The Official Flag", it: "La Bandiera Ufficiale" },
    motto: { en: "The Official Motto", it: "Il Motto Ufficiale" },
    landscape: { en: "Roses of Rome Pictures — landscape", it: "Roses of Rome Pictures — paesaggio" },
    playlists: { en: "YouTube Playlists", it: "Playlist YouTube" },
    playlistsSub: {
      en: "Curated musical collections of the studio, gathered on YouTube.",
      it: "Raccolte musicali curate dello studio, raccolte su YouTube.",
    },
    episodes: { en: "Episode", it: "Puntata" },
    openYouTube: { en: "Playlist on YouTube", it: "Playlist su YouTube" },
  };

  const sonnet = TheSonnet();
  const vision = TheVision();
  const motive = OurMotive();
  const prayer = ThePrayer();

  const shuffledPlaylists = useMemo(() => {
    const arr = [...creativePlaylists];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <div className="container page-section about-page">
      {/* ============ WIKIPEDIA-STYLE PROFILE ============ */}
      <article className="wiki-article">
        <h1 className="wiki-title">Roses Of Rome Pictures</h1>

        <p className="wiki-shortdesc">
          RORP is an independent Kenyan creative studio and publishing identity founded in 2025,
          producing film, music, animation, visual storytelling, and literary works. Its motto is
          Aeternum Floreamus (“Let us bloom forever”).
        </p>

        <table className="infobox">
          <caption className="infobox-cap">
            <span className="infobox-name">Roses Of Rome Pictures</span>
            <img
              className="infobox-img"
              src={TransparentLogo}
              alt="Roses Of Rome Pictures logo"
              loading="lazy"
              decoding="async"
            />
            <span className="infobox-tagline">Connoisseurs of Film, Music & Animation</span>
          </caption>
          <tbody>
            {INFOBOX_ROWS.map(([k, v]) => (
              <tr key={k}>
                <th>{k}</th>
                <td dangerouslySetInnerHTML={{ __html: v }} />
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Website</th>
              <td>
                <a href="https://vladimirgagarin.github.io/roses-of-rome/" rel="noopener noreferrer">
                  roses-of-rome
                </a>
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="wiki-layout">
          <div className="wiki-body">
            <p className="wiki-lead">
              <strong>Roses Of Rome Pictures</strong> (abbreviated <strong>RORP</strong>) is an
              independent creative studio and publishing identity associated with film, music,
              animation, and visual storytelling. The studio was established on{" "}
              <strong>31 July 2025</strong> and is based in <strong>Kenya</strong>. Its stated motto
              is <em>“AETERNUM FLOREAMUS,”</em> Latin for <em>“Let us bloom forever.”</em>
            </p>

            <p className="wiki-lead">
              RORP describes itself as{" "}
              <em>“Connoisseurs of Film, Music &amp; Animation.”</em>
            </p>

            <section className="wiki-section" aria-labelledby="wiki-history">
              <h2 id="wiki-history">History</h2>
              <p>
                <VideoLink
                  url="https://www.youtube.com/embed/c4eIkTO2ZMI"
                  title="Roses of Rome | Let Us Bloom Forever 🌹 (Official Lyrics Video)"
                >
                  Roses Of Rome Pictures
                </VideoLink>{" "}
                was established on 31 July 2025 as a creative project centered
                on film, music, animation, and artistic storytelling.
              </p>
              <p>
                The name combines the imagery of the rose, traditionally associated with beauty, and
                Rome, associated with artistic, cultural, and historical heritage. The organization's
                visual identity subsequently developed around a golden rose enclosed by a laurel
                wreath.
              </p>
              <p>
                The studio marked its{" "}
                <VideoLink
                  url="https://www.youtube.com/embed/y81jZ1Ic4OU"
                  title="ROSES OF ROME PICTURES | 1st Anniversary Anthem 🌹 | AETERNUM FLOREAMUS | July 31"
                >
                  first anniversary on 31 July 2026
                </VideoLink>{" "}
                with anniversary-related creative work, including the project{" "}
                <VideoLink
                  url="https://www.youtube.com/embed/9w8Y7toPJjw?list=RD9w8Y7toPJjw"
                  title="ASANTE SANA 🌹 | Roses Of Rome Pictures 1st Anniversary Anthem | Official Lyric Video"
                >
                  “ASANTE SANA.”
                </VideoLink>
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-name">
              <h2 id="wiki-name">Name and motto</h2>
              <p>The organization's principal motto is:</p>
              <blockquote className="wiki-quote">AETERNUM FLOREAMUS</blockquote>
              <p>The phrase is translated by RORP as <em>“Let us bloom forever.”</em></p>
              <p>
                The concept of blooming is used as a recurring metaphor for creativity, human
                potential, beauty, kindness, artistic development, and the continuation of ideas
                through time.
              </p>
              <p>
                Its associated expression{" "}
                <VideoLink
                  url="https://www.youtube.com/embed/Y3vFuRG6edE?list=PLqHrzzLZzTgvh-UetjP_26ekPVhgXOnzH"
                  title="AETERNUM FLOREAMUS - Let Us Bloom Forever | Roses Of Rome Pictures Theme Song"
                >
                  “May You Bloom Forever”
                </VideoLink>{" "}
                is also used as part of the organization's creative language.
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-work">
              <h2 id="wiki-work">Creative work</h2>
              <p>Roses Of Rome Pictures works across several creative fields, including:</p>
              <ul className="wiki-list">
                <li>Film</li>
                <li>Original music</li>
                <li>Animation</li>
                <li>Visual storytelling</li>
                <li>Poetry and philosophy</li>
                <li>Digital creative media</li>
                <li>Publishing</li>
              </ul>
              <p>
                <VideoLink
                  url="https://www.youtube.com/embed/7OZCpB1vauE"
                  title="Roses Of Rome Pictures | Official Video | The Blooming Sonnet (Female vocals)"
                >
                  Its musical work includes original songs
                </VideoLink>{" "}
                and themed creative productions ranging from
                children's and animated music to celebration songs, inspirational works, and cinematic
                material.
              </p>
              <p>
                The studio also produces material intended for digital platforms, particularly YouTube
                and TikTok.
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-visual">
              <h2 id="wiki-visual">Visual identity</h2>
              <p>
                The RORP emblem consists of a golden rose surrounded by a laurel wreath, accompanied by
                the words <em>AETERNUM FLOREAMUS</em>.
              </p>
              <p>The symbolism associated with the emblem is:</p>
              <ul className="wiki-list">
                <li><strong>Rose</strong> — beauty</li>
                <li><strong>Laurel</strong> — love and kindness</li>
                <li><strong>Gold</strong> — enduring value and aspiration</li>
              </ul>
              <p>
                The organization's visual language frequently incorporates Roman and classical imagery,
                including laurel, roses, architectural motifs, and cinematic environments.
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-production">
              <h2 id="wiki-production">Aeternum Floreamus Production</h2>
              <p>
                Aeternum Floreamus Production is the production identity associated with Roses Of Rome
                Pictures.
              </p>
              <p>The expression is used in credits and creative works in the form:</p>
              <blockquote className="wiki-quote">An Aeternum Floreamus Production</blockquote>
              <p>
                The identity extends the organization's central idea of Aeternum Floreamus beyond a
                motto into a broader creative philosophy.
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-publishing">
              <h2 id="wiki-publishing">Publishing</h2>
              <p>
                Roses Of Rome Pictures has also developed a literary and philosophical publishing
                component.
              </p>
              <p>
                One of its major literary projects is{" "}
                <em>AETERNUM FLOREAMUS 101 – The Art of Blooming Forever</em>, a planned 101-theme work
                exploring ideas surrounding the concept of flourishing or “blooming forever.”
              </p>
              <p>
                The themes include concepts such as love, beauty, kindness, music, life, joy, and
                eternity. The work combines short poetic passages with philosophical questions and
                quotations.
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-philosophy">
              <h2 id="wiki-philosophy">Philosophy</h2>
              <p>
                The recurring philosophy of Roses Of Rome Pictures centers on the idea that creative
                work can continue beyond its immediate creator and audience.
              </p>
              <p>The metaphor of the flower is consequently used to represent the development of:</p>
              <ul className="wiki-list wiki-chain">
                <li>love → beauty → kindness → creativity → joy → life → lasting influence</li>
              </ul>
              <p>
                Rather than treating art solely as entertainment, RORP's creative projects frequently
                present art as a means of encouraging reflection, connection, hope, and human
                expression.
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-digital">
              <h2 id="wiki-digital">Digital presence</h2>
              <p>
                Roses Of Rome Pictures maintains a digital presence through platforms including
                YouTube and TikTok, where it publishes music, animation, short-form videos, and other
                creative material.
              </p>
              <p>Its YouTube presence operates under the Roses Of Rome identity.</p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-brand">
              <h2 id="wiki-brand">Brand structure</h2>
              <p>
                RORP has also explored a broader organizational structure incorporating creative,
                educational, and philanthropic dimensions:
              </p>
              <ul className="wiki-list">
                <li>Roses Of Rome
                  <ul className="wiki-sublist">
                    <li>→ Roses Of Rome Pictures (RORP)</li>
                    <li>→ Roses Of Rome Academy</li>
                    <li>→ Roses Of Rome Foundation</li>
                  </ul>
                </li>
              </ul>
              <p>
                Within this concept, the Pictures identity represents creative production, the Academy
                represents art and learning, and the Foundation represents service and broader social
                impact.
              </p>
            </section>

            <section className="wiki-section" aria-labelledby="wiki-motto">
              <h2 id="wiki-motto">Motto</h2>
              <blockquote className="wiki-quote">
                AETERNUM FLOREAMUS — “Let us bloom forever.”
              </blockquote>
              <p>
                The motto summarizes the central creative idea of Roses Of Rome Pictures: that beauty,
                art, kindness, creativity, and human expression should continue to flourish beyond the
                moment in which they are created.
              </p>
            </section>

            {/* ============ YOUTUBE PLAYLISTS (last section) ============ */}
            <section className="wiki-section wiki-playlists" aria-labelledby="wiki-playlists">
              <h2 id="wiki-playlists">{t.playlists[language]}</h2>
              <p className="section-sub">{t.playlistsSub[language]}</p>
              <div className="playlists-grid">
                {shuffledPlaylists.map((pl) => (
                  <a
                    className="playlist-card"
                    href={pl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={pl.url}
                    aria-label={`${t.openYouTube[language]}: ${pl.title[language] || pl.title.en}`}
                  >
                    <span className="playlist-cat">{pl.category[language] || pl.category.en}</span>
                    <h3 className="playlist-title">{pl.title[language] || pl.title.en}</h3>
                    <p className="playlist-desc">{pl.description[language] || pl.description.en}</p>
                    <span className="playlist-open">
                      <FaYoutube /> {t.openYouTube[language]}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      {/* ============ LANDSCAPE BANNER ============ */}
      <figure className="about-banner">
        <img src={RosPic} alt={t.landscape[language]} loading="lazy" decoding="async" />
      </figure>

      {/* ============ OFFICIAL SYMBOLS ============ */}
      <section className="about-emblems" aria-label={t.symbols[language]}>
        <div className="section-head">
          <span className="kicker">Roses Of Rome</span>
          <h2>{t.symbols[language]}</h2>
          <p className="section-sub">{t.symbolsSub[language]}</p>
        </div>
        <div className="emblems-grid">
          <figure className="emblem-card">
            <img src={TransparentLogo} alt={t.logo[language]} loading="lazy" decoding="async" />
            <figcaption>{t.logo[language]}</figcaption>
          </figure>
          <figure className="emblem-card">
            <img src={OfficialFlag} alt={t.flag[language]} loading="lazy" decoding="async" />
            <figcaption>{t.flag[language]}</figcaption>
          </figure>
          <figure className="emblem-card">
            <img src={OfficialMotto} alt={t.motto[language]} loading="lazy" decoding="async" />
            <figcaption>{t.motto[language]}</figcaption>
          </figure>
        </div>
      </section>

      {/* ============ POETRY ============ */}
      <Poem
        data={sonnet}
        language={language}
        className="poem-sonnet"
        titleLink={{
          url: "https://www.youtube.com/embed/7_Vfg95Ejpk?list=PLqHrzzLZzTgvh-UetjP_26ekPVhgXOnzH",
          ytTitle: "Roses Of Rome Pictures Anthem | The Blooming Sonnet | With Official Flag",
        }}
      />
      <Poem data={motive} language={language} className="poem-motive" />
      <Poem
        data={vision}
        language={language}
        className="poem-vision"
        titleLink={{
          url: "https://www.youtube.com/embed/mm_YE8V6HZM?list=PLqHrzzLZzTgvh-UetjP_26ekPVhgXOnzH",
          ytTitle: "Roses of Rome Vision | Rosa Di Roma Visione",
        }}
      />
      <Poem data={prayer} language={language} className="poem-prayer" />

      <div className="about-release">
        <h2>{t.connect[language]}</h2>
        <div className="about-actions">
          <a className="gold-btn" href="https://youtube.com/@rosesofrome" rel="noopener noreferrer" target="_blank">
            <FaYoutube /> {t.youtube[language]}
          </a>
          <a className="crimson-btn" href="https://tiktok.com/@roses_of_rome" rel="noopener noreferrer" target="_blank">
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