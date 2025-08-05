import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import Poster from "../assets/images/rorps.png";
import "../components/AllShortsStyles.css";

export default function ShortsControls({ videoFile, language }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStalled, setIsStalled] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isError, setIsErrored] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  const videoRef = useRef(null);

  // add src on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoFile;
    }
  }, [videoFile]);

  useEffect(() => {
    let timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        setIsLoading(false);
        setIsWaiting(false);
      }, 5000); // 5 seconds max wait
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);


  // play when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsCurrent(entry.isIntersecting);
            if (entry.isIntersecting) {
              entry.target.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
          
             entry.target.play().catch((error) => {
               console.error("Autoplay failed:", error);
               setIsErrored(true);
             });
            
              setIsPlaying(true);
              
              
          } else {
                videoRef.current?.pause();
                videoRef.current.currentTime = 0;
              setIsPlaying(false);
              setIsWaiting(false);
              setIsLoading(false);
              setIsStalled(false);
              setIsEnded(false);
              setIsErrored(false);

          }
        });
      },
      { threshold: 0.4 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // handle event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => {
      setIsWaiting(true);
      setIsLoading(true);
    };
    const handlePlaying = () => {
      setIsWaiting(false);
      setIsLoading(false);
      setIsStalled(false);
    };
    const handleStalled = () => setIsStalled(true);
    const handleEnded = () => setIsEnded(true);
    const handleError = () => setIsErrored(true);

    video.addEventListener("play", handlePlay);
    <div className="short-controls">
    
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, []);

  // handle pause/play
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch((error) => {
        console.error("Play failed:", error);
        setIsErrored(true);
      });
    }
  };

  return (
    <div className="short-control">
      {isError || isLoading || isWaiting || isStalled ? (
        <div className="notification-alert-overlay">
          {isError
            ? language === "it"
              ? "Errore nel caricamento del video"
              : "Error loading video"
            : language === "it"
            ? "Caricamento video..."
            : "Video Loading..."}
        </div>
      ) : (
        <div className="short-container">
          <video
            loop={true}
            src={videoFile}
            type="mp4"
            playsInline
            disablePictureInPicture
            onClick={togglePlayPause}
            onContextMenu={(e) => e.preventDefault()}
            ref={videoRef}
            className="short-video"
            poster={Poster}
          />

          {!isPlaying && (
            <div className="short-controls">
              <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
