import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Poster from "../assets/images/rorps.png";
import "../components/AllShortsStyles.css";

export default function ShortsControls({ videoFile, language }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Handle intersection (auto play/pause)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          videoRef.current
            ?.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {});
        } else {
          videoRef.current?.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Tap to pause/play
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div className="short-container">
      <video
        ref={videoRef}
        src={videoFile}
        className="short-video"
        loop
        playsInline
        poster={Poster}
        onClick={togglePlay}
      />

      {!isPlaying && isInView && (
        <div className="short-play-overlay">
          <FaPlay className="play-icon" />
        </div>
      )}
    </div>
  );
}
