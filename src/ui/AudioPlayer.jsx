import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaSyncAlt, FaRegHeart, FaHeart, FaMusic, FaTimes, FaShareAlt, FaCheck, FaYoutube } from "react-icons/fa";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useAudioStore } from "./audioStore";
import { songUrl } from "../data/songSlug";
import "./Player.css";

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function lyricText(line, language) {
  if (!line || !line.text) return "";
  if (typeof line.text === "string") return line.text;
  return line.text[language] || line.text.en || "";
}

/**
 * Clean audio + synchronized lyrics player.
 * song = { songFile, songName: {en,it}, songAlbum?, songLyrics?: [] }
 */
export default function AudioPlayer({
  song,
  autoExpand = false,
  autoPrompt = false,
  loopDisabled = false,
  onExitFocus,
}) {
  const { language } = useLanguage();
  const audioRef = useRef(null);
  const rootRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lyricsExpanded, setLyricsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [retryPrompt, setRetryPrompt] = useState(false);

  const lyrics = Array.isArray(song?.songLyrics) ? song.songLyrics : [];
  const hasLyrics = lyrics.some((l) => lyricText(l, language));
  const title = song?.songName?.[language] || "";
  const album = song?.songAlbum || "";
  const uid = song?.songId || song?.songFile || "";
  const hasId = Boolean(song?.songId);

  const activeId = useAudioStore((s) => s.activeId);
  const setActive = useAudioStore((s) => s.setActive);
  const clearActive = useAudioStore((s) => s.clearActive);
  const markEnded = useAudioStore((s) => s.markEnded);
  const playNextUid = useAudioStore((s) => s.playNextUid);
  const playNextCount = useAudioStore((s) => s.playNextCount);
  const ackPlay = useAudioStore((s) => s.ackPlay);

  const t = {
    open: { en: "Open lyrics in focus mode", it: "Apri le liriche in modalità focus" },
    close: { en: "Close lyrics focus mode", it: "Chiudi la modalità focus" },
    focus: { en: "Focus Lyrics", it: "Liriche a Schermo" },
    pause: { en: "Pause", it: "Pausa" },
    play: { en: "Play", it: "Play" },
    loop: { en: "Loop", it: "Ripeti" },
    unloop: { en: "Disable loop", it: "Disattiva ripeti" },
    fav: { en: "Favorite", it: "Preferito" },
    unfav: { en: "Remove favorite", it: "Rimuovi preferito" },
    seek: { en: "Seek", it: "Vai a" },
    error: { en: "Audio error", it: "Errore audio" },
    retry: { en: "Retry", it: "Riprova" },
    share: { en: "Share this song", it: "Condividi questa canzone" },
    copied: { en: "Link copied!", it: "Link copiato!" },
    confirmCta: {
      en: "Oops, the song tried to play...",
      it: "Ops, la canzone ha provato a riprodursi...",
    },
    confirmText: {
      en: "Your browser blocked autoplay. Do you wish to play it?",
      it: "Il tuo browser ha bloccato la riproduzione automatica. Vuoi riprodurla?",
    },
    yes: { en: "Yes", it: "Sì" },
    no: { en: "No", it: "No" },
    openYt: { en: "Open on YouTube", it: "Apri su YouTube" },
  };

  const current = lyrics.find(
    (l) => currentTime * 1000 >= l.start && currentTime * 1000 <= l.end
  );
  const currentLine = lyricText(current, language);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("roFavorites") || "[]");
    setIsLiked(favs.includes(uid));
  }, [uid]);

  useEffect(() => {
    if (!autoExpand) return;
    if (autoPrompt) {
      if (rootRef.current && typeof rootRef.current.scrollIntoView === "function") {
        rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setRetryPrompt(true);
      return;
    }
    if (hasLyrics) {
      setLyricsExpanded(true);
      return;
    }
    if (rootRef.current && typeof rootRef.current.scrollIntoView === "function") {
      rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => setRetryPrompt(true));
    }
  }, [autoExpand, hasLyrics, autoPrompt]);

  useEffect(() => {
    if (playNextCount === 0 || playNextUid !== uid) return;
    const audio = audioRef.current;
    if (!audio) return;
    ackPlay();
    if (rootRef.current && typeof rootRef.current.scrollIntoView === "function") {
      rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    audio.play().catch(() => setRetryPrompt(true));
  }, [playNextUid, playNextCount, uid, ackPlay]);

  useEffect(() => {
    if (loopDisabled) setIsLooping(false);
  }, [loopDisabled]);

  const confirmPlay = () => {
    setRetryPrompt(false);
    const audio = audioRef.current;
    if (!audio) return;
    if (rootRef.current && typeof rootRef.current.scrollIntoView === "function") {
      rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    audio.play().catch(() => setError(true));
  };

  useEffect(() => {
    return () => {
      if (useAudioStore.getState().activeId === uid) clearActive();
    };
  }, [uid, clearActive]);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeId && activeId !== uid && audioRef.current) {
      audioRef.current.pause();
    }
  }, [activeId, uid, isPlaying]);

  const prevActiveRef = useRef(null);
  useEffect(() => {
    const prev = prevActiveRef.current;
    if (prev === uid && activeId !== uid && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
    prevActiveRef.current = activeId;
  }, [activeId, uid]);

  useEffect(() => {
    if (!lyricsExpanded) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLyricsExpanded(false);
        if (typeof onExitFocus === "function") onExitFocus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lyricsExpanded, onExitFocus]);

  const closeFocus = () => {
    setLyricsExpanded(false);
    if (typeof onExitFocus === "function") onExitFocus();
    if (rootRef.current && typeof rootRef.current.scrollIntoView === "function") {
      rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const shareUrl = song && uid ? songUrl(song) : "";

  const handleShare = async () => {
    const shareData = {
      title: title ? `Roses Of Rome Pictures — ${title}` : "Roses Of Rome Pictures",
      text: title || "A song from Roses Of Rome Pictures",
      url: shareUrl,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    const favs = JSON.parse(localStorage.getItem("roFavorites") || "[]");
    const next = favs.includes(uid)
      ? favs.filter((f) => f !== uid)
      : [...favs, uid];
    localStorage.setItem("roFavorites", JSON.stringify(next));
    setIsLiked(!isLiked);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setError(true));
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const renderControls = (big) => (
    <>
      {big && (
        <div className="player-progress-row">
          <span className="player-time">{formatTime(currentTime)}</span>
          <div
            className="player-progress"
            onClick={seek}
            role="slider"
            aria-label={t.seek[language]}
          >
            <div
              className="player-progress-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="player-time">{formatTime(duration)}</span>
        </div>
      )}

      <div className="player-controls">
        <button
          className="player-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? t.pause[language] : t.play[language]}
          disabled={loading}
        >
          {loading ? <span className="player-spinner" /> : isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {!loopDisabled && (
          <button
            className={`player-btn ${big ? "expand" : "small"} ${isLooping ? "active" : ""}`}
            onClick={() => setIsLooping(!isLooping)}
            aria-label={t.loop[language]}
            title={isLooping ? t.unloop[language] : t.loop[language]}
          >
            <FaSyncAlt />
          </button>
        )}

        {hasId && (
          <button
            className={`player-btn ${big ? "expand" : "small"} ${isLiked ? "active" : ""}`}
            onClick={handleLike}
            aria-label={t.fav[language]}
            title={isLiked ? t.unfav[language] : t.fav[language]}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}

        {hasId && (
          <button
            className={`player-btn ${big ? "expand" : "small"} ${copied ? "active" : ""}`}
            onClick={handleShare}
            aria-label={copied ? t.copied[language] : t.share[language]}
            title={copied ? t.copied[language] : t.share[language]}
          >
            {copied ? <FaCheck /> : <FaShareAlt />}
          </button>
        )}

        {song?.songLink && (
          <a
            className={`player-btn ${big ? "expand" : "small"} yt-link`}
            href={song.songLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.openYt[language]}
            title={t.openYt[language]}
          >
            <FaYoutube />
          </a>
        )}

        {hasLyrics && (
          <button
            className={`player-btn ${big ? "expand" : "small fullscreen"} ${lyricsExpanded ? "active" : ""}`}
            onClick={() => (lyricsExpanded ? closeFocus() : setLyricsExpanded(true))}
            aria-label={lyricsExpanded ? t.close[language] : t.open[language]}
            aria-expanded={lyricsExpanded}
            title={lyricsExpanded ? t.close[language] : t.open[language]}
          >
            {lyricsExpanded && big ? <FiMinimize2 /> : <FiMaximize2 />}
          </button>
        )}
      </div>
    </>
  );

  const renderLyricDisplay = (big) => {
    const text = currentLine;
    if (text) {
      return (
        <p className={`lyric-display ${big ? "big" : ""}`} key={text}>
          {text}
        </p>
      );
    }
    return (
      <p className="lyric-placeholder" aria-hidden="true">
        <FaMusic />
      </p>
    );
  };

  return (
    <div ref={rootRef} className={`player ${isPlaying ? "playing" : ""}`}>
      <audio
        ref={audioRef}
        src={song?.songFile}
        loop={isLooping}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          setDuration(audio.duration || 0);
          const idx = Math.floor(audio.currentTime * 1000);
          setCurrentTime(idx / 1000);
        }}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          setCurrentTime(audio.currentTime);
          setProgress(duration ? audio.currentTime / duration : 0);
        }}
        onPlay={() => {
          setIsPlaying(true);
          setActive(uid, rootRef.current);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setLoading(true)}
        onStalled={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onCanPlayThrough={() => setLoading(false)}
        onPlaying={() => {
          setIsPlaying(true);
          setLoading(false);
          setActive(uid, rootRef.current);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setLyricsExpanded(false);
          markEnded(uid);
          if (activeId === uid) clearActive();
        }}
        onError={() => setError(true)}
      />

      <div className="player-head">
        <div className="player-title">{title}</div>
        {album && <div className="player-album">{album}</div>}
      </div>

      {error ? (
        <div className="player-error">
          {t.error[language]} —{" "}
          <button onClick={() => { setError(false); togglePlay(); }} className="player-retry">
            {t.retry[language]}
          </button>
        </div>
      ) : (
        renderControls(false)
      )}

      {/* ============ FOCUS MODE — centered ~60% panel ============ */}
      {lyricsExpanded && hasLyrics && (
        <div
          className="lyrics-overlay"
          onClick={closeFocus}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="lyrics-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="lyrics-close"
              onClick={closeFocus}
              aria-label={t.close[language]}
              title={t.close[language]}
            >
              <FaTimes />
            </button>

            <div className="lyrics-head">
              <span className="lyrics-caption">{t.focus[language]}</span>
              <h3 className="lyrics-title">{title}</h3>
              {album && <span className="lyrics-album">{album}</span>}
            </div>

            <div className="lyrics-stage">{renderLyricDisplay(true)}</div>

            {error ? (
              <div className="player-error">
                {t.error[language]} —{" "}
                <button onClick={() => { setError(false); togglePlay(); }} className="player-retry">
                  {t.retry[language]}
                </button>
              </div>
            ) : (
              renderControls(true)
            )}
          </div>
        </div>
      )}

      {/* ============ AUTOPLAY BLOCKED — yes/no confirmation ============ */}
      {retryPrompt && (
        <div
          className="player-confirm"
          role="alertdialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="player-confirm-panel">
            <span className="player-confirm-icon" aria-hidden="true">
              <FaMusic />
            </span>
            <p className="player-confirm-title">{t.confirmCta[language]}</p>
            <p className="player-confirm-text">{t.confirmText[language]}</p>
            <div className="player-confirm-actions">
              <button
                type="button"
                className="player-confirm-yes"
                onClick={confirmPlay}
                autoFocus
              >
                {t.yes[language]}
              </button>
              <button
                type="button"
                className="player-confirm-no"
                onClick={() => setRetryPrompt(false)}
              >
                {t.no[language]}
              </button>
            </div>
          </div>
        </div>
      )}

      {isPlaying && <div className="page-disco-border" aria-hidden="true" />}
    </div>
  );
}