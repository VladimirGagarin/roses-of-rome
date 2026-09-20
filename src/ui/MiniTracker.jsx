import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaArrowUp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useAudioStore } from "./audioStore";
import "./MiniTracker.css";

export default function MiniTracker() {
  const { language } = useLanguage();
  const activeId = useAudioStore((s) => s.activeId);
  const activeEl = useAudioStore((s) => s.activeEl);
  const [inView, setInView] = useState(true);
  const [playing, setPlaying] = useState(false);

  const t = {
    play: { en: "Play current song", it: "Riproduci la canzone corrente" },
    pause: { en: "Pause current song", it: "Metti in pausa la canzone corrente" },
    goTo: { en: "Go to current song", it: "Vai alla canzone corrente" },
    toolbar: { en: "Current song tracker", it: "Tracciante della canzone corrente" },
  };

  useEffect(() => {
    if (!activeEl) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(activeEl);
    return () => io.disconnect();
  }, [activeEl]);

  useEffect(() => {
    if (!activeEl) {
      setPlaying(false);
      return;
    }
    const audio = activeEl.querySelector("audio");
    if (!audio) {
      setPlaying(false);
      return;
    }
    const sync = () => setPlaying(!audio.paused);
    sync();
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    audio.addEventListener("ended", sync);
    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      audio.removeEventListener("ended", sync);
    };
  }, [activeEl]);

  if (!activeId || !activeEl || inView) return null;

  const toggle = () => {
    const audio = activeEl.querySelector("audio");
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const scrollToSong = () => {
    if (activeEl && typeof activeEl.scrollIntoView === "function") {
      activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="mini-tracker" role="toolbar" aria-label={t.toolbar[language]}>
      <button
        className="mini-tracker-btn"
        type="button"
        onClick={toggle}
        aria-label={playing ? t.pause[language] : t.play[language]}
        title={playing ? t.pause[language] : t.play[language]}
      >
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <button
        className="mini-tracker-btn mini-tracker-go"
        type="button"
        onClick={scrollToSong}
        aria-label={t.goTo[language]}
        title={t.goTo[language]}
      >
        <FaArrowUp />
      </button>
    </div>
  );
}