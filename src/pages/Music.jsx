import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import { useAudioStore } from "../ui/audioStore";
import AudioPlayer from "../ui/AudioPlayer";
import { RosesOfRomeSongs } from "../data/songs";
import { NewSongs } from "../data/newSongs";
import { songSlug } from "../data/songSlug";
import "./Music.css";

const SITE_URL = "https://vladimirgagarin.github.io/roses-of-rome";

function shuffleList(source) {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CATEGORY_INFO = {
  Rosa: {
    en: "The heart of the label: the signature sonnets, vision and theme songs of Roses Of Rome Pictures.",
    it: "Il cuore dell'etichetta: i sonetti, le visioni e le canzoni caratteristiche di Roses Of Rome Pictures.",
  },
  SWM: {
    en: "Songs born with the Sing With Magdalene project — hymns of courage, faith and joy.",
    it: "Canzoni nate con il progetto Sing With Magdalene — inni di coraggio, fede e gioia.",
  },
  Cantabile: {
    en: "Artistic pop and classical-inspired melodies that linger long after the last note.",
    it: "Melodie artistiche e classicheggianti che restano a lungo dopo l'ultima nota.",
  },
  "Piccola Casa della Gioia": {
    en: "Hymns and songs written for the Piccola Casa della Gioia community.",
    it: "Inni e canti scritti per la comunità della Piccola Casa della Gioia.",
  },
  Merito: {
    en: "Inspired classical and instrumental pieces of merit and beauty.",
    it: "Pezzi strumentali e classici ispirati, di merito e bellezza.",
  },
  Figli: {
    en: "Songs for the children — tender, light and full of love.",
    it: "Canzoni per i figli — tenere, leggere e piene d'amore.",
  },
  Disney: {
    en: "Motivated cover versions of \"When the going gets tough\", sung in many languages.",
    it: "Versioni cover motivate di \"When the going gets tough\", cantate in molte lingue.",
  },
  Sports: {
    en: "Anthems of sport and celebration — unity on the field of play.",
    it: "Inni di sport e celebrazione — unità nel campo di gioco.",
  },
  Melodia: {
    en: "Melodies that linger like perfume in an old Roman garden.",
    it: "Melodie che permangono come profumo in un antico giardino romano.",
  },
  "Unlisted": {
    en: "Fresh arrivals from the studio, still waiting to be placed in their proper category.",
    it: "Nuovi arrivi dallo studio, ancora in attesa di essere collocati nella loro categoria.",
  },
};

export default function Music() {
  const { language } = useLanguage();
  const { songSlug: slugParam } = useParams();
  const navigate = useNavigate();
  const isIt = language === "it";

  const t = {
    title: { en: "Our Music", it: "La Nostra Musica" },
    sub: {
      en: "Melodies that linger like perfume in an old Roman garden.",
      it: "Melodie che permangono come profumo in un antico giardino romano.",
    },
    all: { en: "All Songs", it: "Tutte le Canzoni" },
    noAlbum: { en: "Songs", it: "Canzoni" },
    count: { en: "songs", it: "canzoni" },
    back: { en: "All Albums", it: "Tutti gli Album" },
    about: { en: "About this Album", it: "Info su questo Album" },
    info: { en: "Album info", it: "Info album" },
    close: { en: "Close", it: "Chiudi" },
  };

  const songs = useMemo(() => [...RosesOfRomeSongs(), ...NewSongs()], []);

  const slugSong = useMemo(
    () => (slugParam ? songs.find((s) => songSlug(s) === slugParam) : null),
    [songs, slugParam]
  );

  const [shareId, setShareId] = useState(() => {
    const fromShare = new URLSearchParams(window.location.search).get("from_share");
    if (fromShare) return fromShare;
    return slugSong ? slugSong.songId || slugSong.songFile : null;
  });

  const clearShareParam = () => {
    if (slugParam) {
      navigate({
        pathname: "/music",
        search: category ? `?category=${encodeURIComponent(category)}` : "",
      });
      setShareId(null);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("from_share");
    window.history.replaceState({}, "", url);
    setShareId(null);
  };

  const albums = useMemo(() => {
    const map = new Map();
    for (const song of songs) {
      const album = song.songAlbum || t.noAlbum.en;
      if (!map.has(album)) map.set(album, []);
      map.get(album).push(song);
    }
    return shuffleList(
      Array.from(map.entries()).map(([album, albumSongs]) => [
        album,
        shuffleList(albumSongs),
      ])
    );
  }, [songs]); // eslint-disable-line react-hooks/exhaustive-deps

  const [category, setCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && albums.some(([album]) => album === cat)) return cat;
    if (shareId) {
      const match = albums.find(([, albumSongs]) =>
        albumSongs.some((song) => (song.songId || song.songFile) === shareId)
      );
      if (match) {
        if (!slugSong) {
          const url = new URL(window.location.href);
          url.searchParams.set("category", match[0]);
          url.searchParams.delete("from_share");
          window.history.replaceState({}, "", url);
        }
        return match[0];
      }
    }
    return null;
  });

  const selectCategory = (cat) => {
    if (slugParam) {
      navigate({
        pathname: "/music",
        search: cat ? `?category=${encodeURIComponent(cat)}` : "",
      });
      setCategory(cat);
      setShareId(null);
      return;
    }
    const url = new URL(window.location.href);
    if (cat) {
      url.searchParams.set("category", cat);
    } else {
      url.searchParams.delete("category");
    }
    url.searchParams.delete("from_share");
    window.history.replaceState({}, "", url);
    setCategory(cat);
    setShareId(null);
  };

  const [infoAlbum, setInfoAlbum] = useState(null);
  const closeInfo = () => setInfoAlbum(null);

  const activeId = useAudioStore((s) => s.activeId);
  const activeSong = songs.find(
    (s) => (s.songId || s.songFile) === activeId
  );
  const activeSongName = activeSong?.songName?.[language] || "";
  const activeCategory = category || null;

  const focusedSong = useMemo(
    () =>
      slugSong ||
      (shareId
        ? songs.find((s) => (s.songId || s.songFile) === shareId)
        : null) ||
      null,
    [slugSong, shareId, songs]
  );
  const focusedName =
    focusedSong?.songName?.[language] || focusedSong?.songName?.en || "";

  const seoTitle = focusedName
    ? `${focusedSong.songAlbum || t.noAlbum[language]} | ${focusedName}`
    : activeCategory
      ? activeSongName
        ? `${activeCategory} | ${activeSongName}`
        : activeCategory
      : t.title[language];

  const seoDescription = focusedName
    ? isIt
      ? `Ascolta "${focusedName}" di Roses of Rome Pictures — dall'album ${focusedSong.songAlbum || t.noAlbum[language]}.`
      : `Listen to "${focusedName}" by Roses of Rome Pictures — from the album ${focusedSong.songAlbum || t.noAlbum[language]}.`
    : activeCategory
      ? (CATEGORY_INFO[activeCategory]?.[language] || "") || t.sub[language]
      : isIt
        ? "Ascolta la musica di Roses of Rome Pictures: inni, sonetti e canti senza tempo raccolti in album poetici."
        : "Listen to the music of Roses of Rome Pictures: timeless hymns, sonnets, and songs collected in poetic albums.";

  const songLd = useMemo(() => {
    if (!focusedSong) return null;
    const albumName =
      focusedSong.songAlbum || (language === "it" ? "Canzoni" : "Songs");
    return {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      name: focusedName || focusedSong.songName?.en || "",
      byArtist: { "@type": "MusicGroup", name: "Roses Of Rome Pictures" },
      inAlbum: { "@type": "MusicAlbum", name: albumName },
      url: `${SITE_URL}/music/${songSlug(focusedSong)}`,
      ...(focusedSong.songLink ? { sameAs: focusedSong.songLink } : {}),
    };
  }, [focusedSong, focusedName, language]);

  useSeo({
    title: `${seoTitle} — Roses Of Rome Pictures`,
    description: seoDescription,
    keywords: "Roses of Rome music, Rome anthem, poetic songs, hymns, spiritual music, SWM anthem",
    path: focusedSong ? `/music/${songSlug(focusedSong)}` : "/music",
    type: focusedSong ? "music.song" : "music.playlist",
    lang: language,
    customLd: songLd,
  });

  const total = songs.length;

  const visibleAlbums = useMemo(
    () => albums.filter(([album]) => album === category),
    [albums, category]
  );

  return (
    <div className="container page-section music-page">
      <div className="section-head">
        <span className="kicker">{total} {t.count[language]}</span>
        <h1>{t.title[language]}</h1>
        <p className="section-sub">{t.sub[language]}</p>
      </div>

      {category ? (
        <>
          <button
            type="button"
            className="music-back"
            onClick={() => selectCategory(null)}
          >
            {t.back[language]}
          </button>

          {visibleAlbums.map(([album, albumSongs]) => (
            <section className="music-album" key={album}>
              <h2 className="music-album-title">
                <span className="music-album-rule" aria-hidden="true" />
                {album}
                <span className="music-album-count">{albumSongs.length}</span>
              </h2>
              <div className="music-album-grid">
                {albumSongs.map((song) => {
                  const songUid = song.songId || song.songFile;
                  const isShared = !!shareId && !!songUid && songUid === shareId;
                  return (
                    <AudioPlayer
                      key={song.songId || song.songFile}
                      song={song}
                      autoExpand={isShared}
                      onExitFocus={isShared ? clearShareParam : undefined}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </>
      ) : (
        <div className="music-cats-grid">
          {albums.map(([album]) => (
            <div className="music-cat-card" key={album}>
              <button
                type="button"
                className="music-cat-card-select"
                onClick={() => selectCategory(album)}
              >
                <span className="music-cat-card-name">{album}</span>
              </button>
              <button
                type="button"
                className="music-cat-card-info"
                onClick={() => setInfoAlbum(album)}
                aria-label={`${t.info[language]}: ${album}`}
                title={t.info[language]}
              >
                <FaInfoCircle />
              </button>
            </div>
          ))}
        </div>
      )}

      {infoAlbum && (
        <div
          className="music-info-overlay"
          onClick={closeInfo}
          role="dialog"
          aria-modal="true"
        >
          <div className="music-info-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="music-info-close"
              onClick={closeInfo}
              aria-label={t.close[language]}
              title={t.close[language]}
            >
              <FaTimes />
            </button>
            <span className="music-info-kicker">{t.about[language]}</span>
            <h3 className="music-info-title">{infoAlbum}</h3>
            <p className="music-info-text">
              {(CATEGORY_INFO[infoAlbum] || { en: "", it: "" })[language] ||
                t.sub[language]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}