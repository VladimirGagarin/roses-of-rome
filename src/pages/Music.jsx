import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import AudioPlayer from "../ui/AudioPlayer";
import { RosesOfRomeSongs } from "../data/songs";
import "./Music.css";

function shuffleList(source) {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Music() {
  const { language } = useLanguage();
  const isIt = language === "it";

  useSeo({
    title: "Music & Albums — Roses Of Rome Pictures",
    description: isIt
      ? "Ascolta la musica di Roses of Rome Pictures: inni, sonetti e canti senza tempo raccolti in album poetici."
      : "Listen to the music of Roses of Rome Pictures: timeless hymns, sonnets, and songs collected in poetic albums.",
    keywords: "Roses of Rome music, Rome anthem, poetic songs, hymns, spiritual music, SWM anthem",
    path: "/music",
    type: "music.playlist",
    lang: language,
  });

  const t = {
    title: { en: "Our Music", it: "La Nostra Musica" },
    sub: {
      en: "Melodies that linger like perfume in an old Roman garden.",
      it: "Melodie che permangono come profumo in un antico giardino romano.",
    },
    all: { en: "All Songs", it: "Tutte le Canzoni" },
    noAlbum: { en: "Songs", it: "Canzoni" },
    count: { en: "songs", it: "canzoni" },
  };

  const songs = useMemo(() => RosesOfRomeSongs(), []);
  const [shareId, setShareId] = useState(() =>
    new URLSearchParams(window.location.search).get("from_share")
  );

  const clearShareParam = () => {
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
    return Array.from(map.entries()).map(([album, albumSongs]) => [
      album,
      shuffleList(albumSongs),
    ]);
  }, [songs]); // eslint-disable-line react-hooks/exhaustive-deps

  const total = songs.length;

  return (
    <div className="container page-section music-page">
      <div className="section-head">
        <span className="kicker">{total} {t.count[language]}</span>
        <h1>{t.title[language]}</h1>
        <p className="section-sub">{t.sub[language]}</p>
      </div>

      {albums.map(([album, albumSongs]) => (
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
    </div>
  );
}