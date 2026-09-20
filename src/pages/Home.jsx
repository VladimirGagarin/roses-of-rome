import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import AudioPlayer from "../ui/AudioPlayer";
import { RosesOfRomeSongs } from "../data/songs";
import { RosesOfRomeVideos } from "../data/videos";
import { WelcomeIntroSongLyrics } from "../data/lyrics";
import WelcomeSong from "../assets/audios/welcome_female_intro.mp3";
import HeroImg from "../assets/images/ros_pic.png";
import "./Home.css";

function shuffleList(source) {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const { language } = useLanguage();
  const isIt = language === "it";

  useSeo({
    title: isIt
      ? "Roses Of Rome Pictures — Studio di Cinema, Musica e Animazione"
      : "Roses Of Rome Pictures — Connoisseurs of Film, Music & Animation",
    description: isIt
      ? "Benvenuto in Roses of Rome Pictures. Uno studio poetico che crea cinema mistico, musica lirica e narrazione senza tempo — Aeternum Floreamus."
      : "Welcome to Roses of Rome Pictures. A poetic studio curating mystical cinema, lyrical music, and timeless storytelling — Aeternum Floreamus.",
    keywords:
      "Roses Of Rome, film studio, Rome film music animation, poetic films, mystical cinema, Roses of Rome Pictures",
    path: "/",
    lang: language,
  });

  const t = {
    kicker: { en: "Roses of Rome Pictures Presents", it: "Roses of Rome Pictures presenta" },
    name: { en: "Roses of Rome", it: "Roses of Rome" },
    tagline: { en: "Connoisseurs of Film, Music & Animation", it: "Esperti di Cinema, Musica e Animazione" },
    motto: { en: "Aeternum Floreamus — Let us bloom forever", it: "Aeternum Floreamus — Fioriamo per sempre" },
    welcomeTitle: { en: "Welcome to the Studio", it: "Benvenuto nello Studio" },
    welcomeText: {
      en: "Dreamer, you've come home. Step into the garden of Roses of Rome, where every frame is a painting, every melody a prayer, and every story a bloom that never fades. We are a film studio that lives for beauty — weaving cinema, music, and animation into timeless works of art.",
      it: "Sognatore, sei tornato a casa. Entra nel giardino delle Rose di Roma, dove ogni inquadratura è un quadro, ogni melodia una preghiera e ogni storia un fiore che non sfiorisce mai. Siamo uno studio cinematografico che vive di bellezza — intessendo cinema, musica e animazione in opere d'arte senza tempo.",
    },
    songTitle: { en: "A Hymn of Welcome", it: "Un Inno di Benvenuto" },
    films: { en: "Featured Films", it: "Film in Vetrina" },
    viewFilms: { en: "View All Films", it: "Vedi Tutti i Film" },
    listen: { en: "Listen to the Music", it: "Ascolta la Musica" },
    albumKicker: { en: "From Our Collections", it: "Dalle Nostre Raccolte" },
    visit: { en: "Visit the Studio", it: "Visita lo Studio" },
    charts: { en: "Cinema, Music, Animation", it: "Cinema, Musica, Animazione" },
    likedKicker: { en: "From Your Garden", it: "Dal Tuo Giardino" },
    liked: { en: "Your Loved Songs", it: "Le Tue Canzoni Preferite" },
  };

  const featured = useMemo(() => shuffleList(RosesOfRomeVideos()).slice(0, 3), []);
  const highlightSongs = useMemo(
    () =>
      shuffleList(RosesOfRomeSongs())
        .filter((s) => s.songLyrics && s.songLyrics.length)
        .slice(0, 4),
    []
  );
  const [likedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("roFavorites") || "[]");
    } catch {
      return [];
    }
  });
  const likedSongs = useMemo(() => {
    const ids = new Set(likedIds);
    return RosesOfRomeSongs().filter((s) => ids.has(s.songId) || (s.songFile && ids.has(s.songFile)));
  }, [likedIds]);

  return (
    <div className="home-page">
      {/* ============ HERO ============ */}
      <section className="home-hero">
        <img className="home-hero-bg" src={HeroImg} alt="" />
        <div className="home-hero-grain grain" aria-hidden="true" />
        <div className="container home-hero-inner">
          <p className="home-kicker">{t.kicker[language]}</p>
          <h1 className="home-title">{t.name[language]}</h1>
          <p className="home-subtitle">{t.tagline[language]}</p>
          <p className="home-motto">{t.motto[language]}</p>
          <div className="home-hero-actions">
            <Link to="/films" className="gold-btn">
              <FaPlay /> {t.films[language]}
            </Link>
            <Link to="/about" className="crimson-btn">
              {t.visit[language]}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WELCOME + SONG ============ */}
      <section className="container page-section home-welcome">
        <div className="home-welcome-grid">
          <div className="home-welcome-text">
            <span className="kicker">{t.welcomeTitle[language]}</span>
            <h2>{t.name[language]}</h2>
            <p>{t.welcomeText[language]}</p>
            <div className="home-pillars">
              {t.charts[language].split(",").map((p) => (
                <span key={p} className="home-pillar">{p.trim()}</span>
              ))}
            </div>
          </div>

          <div className="home-welcome-player">
            <h3>{t.songTitle[language]}</h3>
            <AudioPlayer
              song={{
                songFile: WelcomeSong,
                songName: t.songTitle,
                songAlbum: "Roses of Rome",
                songLyrics: WelcomeIntroSongLyrics(),
              }}
            />
          </div>
        </div>
      </section>

      {/* ============ FEATURED FILMS ============ */}
      <section className="container page-section home-films">
        <div className="section-head">
          <span className="kicker">{t.films[language]}</span>
          <h2>{t.name[language]} — <em>{t.charts[language]}</em></h2>
          <Link to="/films" className="gold-btn small">{t.viewFilms[language]}</Link>
        </div>

        <div className="home-film-grid">
          {featured.map((vid) => (
            <article className="film-card" key={vid.id}>
              <video className="film-card-video" src={vid.src} muted playsInline preload="metadata">
                {vid.title?.[language]}
              </video>
              <div className="film-card-body">
                <h3 className="film-card-title">{vid.title[language] || vid.title.en}</h3>
                <p className="film-card-desc">
                  {(vid.description?.[language] || vid.description?.en || "").slice(0, 150)}…
                </p>
                {vid.externalLink && (
                  <a className="film-card-link" href={vid.externalLink} rel="noopener noreferrer" target="_blank">
                    <FaYoutube /> YouTube
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ MUSIC HIGHLIGHT ============ */}
      <section className="container page-section home-music">
        <div className="section-head">
          <span className="kicker">{t.albumKicker[language]}</span>
          <h2>{t.listen[language]}</h2>
        </div>
        <div className="home-song-grid">
          {highlightSongs.map((song) => (
            <article className="home-song" key={song.songId}>
              <AudioPlayer song={song} />
            </article>
          ))}
        </div>
      </section>

      {/* ============ LIKED SONGS ============ */}
      {likedSongs.length > 0 && (
        <section className="container page-section home-liked">
          <div className="section-head">
            <span className="kicker">{t.likedKicker[language]}</span>
            <h2>{t.liked[language]}</h2>
          </div>
          <div className="home-song-grid">
            {likedSongs.map((song) => (
              <article className="home-song" key={song.songId || song.songFile}>
                <AudioPlayer song={song} />
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}