import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaRedoAlt,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useVideoStore } from "./videoStore";
import "./VideoPlayer.css";

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * Custom stylized video player with studio controls.
 * Only one video plays at a time — starting any video pauses the rest.
 */
export default function VideoPlayer({ uid, src }) {
  const { language } = useLanguage();
  const activeId = useVideoStore((s) => s.activeId);
  const setActive = useVideoStore((s) => s.setActive);

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const hideTimer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const ended = duration > 0 && !isPlaying && currentTime >= duration - 0.3;

  const t = {
    play: language === "it" ? "Play" : "Play",
    pause: language === "it" ? "Pausa" : "Pause",
    mute: language === "it" ? "Disattiva audio" : "Mute",
    unmute: language === "it" ? "Attiva audio" : "Unmute",
    fullscreen: language === "it" ? "Schermo intero" : "Fullscreen",
    replay: language === "it" ? "Riproduci di nuovo" : "Play again",
    seek: language === "it" ? "Cerca" : "Seek",
  };

  // Pause when any OTHER video becomes the active one.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (activeId !== null && activeId !== uid && !video.paused) {
      video.pause();
    }
  }, [activeId, uid]);

  // Clear the global active id when this player unmounts.
  useEffect(
    () => () => {
      if (activeId && activeId === uid) setActive(null);
    },
    [activeId, uid] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const poke = () => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (isPlaying) hideTimer.current = setTimeout(() => setControlsVisible(false), 2600);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (ended) video.currentTime = 0;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const seek = (e) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * duration;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen?.();
  };

  const updateBuffered = (v) => {
    const b = v.buffered;
    if (b && b.length) {
      const end = b.end(b.length - 1);
      setBuffered(duration ? end / duration : 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`video-player ${controlsVisible ? "controls-on" : "controls-off"} ${isFullscreen ? "fullscreen" : ""}`}
      onMouseMove={poke}
      onMouseLeave={() => {
        if (isPlaying) setControlsVisible(false);
      }}
    >
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        muted={muted}
        playsInline
        onClick={() => {
          if (isPlaying) poke();
          else togglePlay();
        }}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          setDuration(v.duration || 0);
          setCurrentTime(v.currentTime);
          updateBuffered(v);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setCurrentTime(v.currentTime);
          setProgress(duration ? v.currentTime / duration : 0);
        }}
        onProgress={(e) => updateBuffered(e.currentTarget)}
        onPlay={() => {
          setIsPlaying(true);
          setActive(uid);
          poke();
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => {
          setIsPlaying(true);
          setLoading(false);
        }}
        onCanPlay={() => setLoading(false)}
        onEnded={() => {
          setIsPlaying(false);
          setControlsVisible(true);
        }}
      />

      {!isPlaying && (
        <button
          className="video-center-btn"
          onClick={togglePlay}
          aria-label={ended ? t.replay : t.play}
          title={ended ? t.replay : t.play}
        >
          {loading ? (
            <span className="video-spinner" />
          ) : ended ? (
            <FaRedoAlt />
          ) : (
            <FaPlay />
          )}
        </button>
      )}

      <div className="video-controls">
        <button className="video-ctrl-btn" onClick={togglePlay} aria-label={isPlaying ? t.pause : t.play}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="video-progress" onClick={seek} role="slider" aria-label={t.seek}>
          <div className="video-progress-buffer" style={{ width: `${buffered * 100}%` }} />
          <div className="video-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>

        <span className="video-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <button className="video-ctrl-btn" onClick={toggleMute} aria-label={muted ? t.unmute : t.mute}>
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <button className="video-ctrl-btn" onClick={toggleFullscreen} aria-label={t.fullscreen}>
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
    </div>
  );
}