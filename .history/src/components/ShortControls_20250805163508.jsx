import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import Poster from "../assets/images/rorps.png";
import "../components/AllShortsStyles.css";

export default function ShortsControls({ videoFile }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div className="shorts-video-container">
      {isLoading && <div className="spinner"></div>}

      <video
        ref={videoRef}
        src={videoFile}
        poster={Poster}
        className="shorts-video"
        loop
        playsInline
        muted
      />

      {!isPlaying && !isLoading && (
        <button className="video-control" onClick={togglePlay}>
          <FaPlay />
        </button>
      )}
    </div>
  );
}
