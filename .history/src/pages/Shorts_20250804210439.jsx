import { useState, useRef, useEffect } from "react";
import ShortsControls from "../components/ShortControls";
import ShortVideo1 from "../assets/videos/short_001.mp4";
import ShortVideo2 from "../assets/videos/short_002.mp4";
import ShortVideo3 from "../assets/videos/short_003.mp4";
import ShortVideo4 from "../assets/videos/short_004.mp4";
import ShortVideo5 from "../assets/videos/short_005.mp4";
import ShortVideo6 from "../assets/videos/short_006.mp4";
import { useLanguage } from "../components/LanguageContext";
import "../components/AllShortsStyles.css";

export default function ShortsScreen() {
  const shortsVid = [
    ShortVideo1,
    ShortVideo2,
    ShortVideo3,
    ShortVideo4,
    ShortVideo5,
    ShortVideo6,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const { language } = useLanguage();

  useEffect(() => {
    if(curre)
    containerRef?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [])
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setCurrentIndex((prev) => Math.min(prev + 1, shortsVid.length - 1));
      } else if (e.key === "ArrowUp") {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortsVid.length]);

  // Handle wheel/touch navigation
  const handleScroll = (e) => {
    // Prevent horizontal scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      return;
    }

    if (e.deltaY > 0) {
      // Scrolling down
      setCurrentIndex((prev) => Math.min(prev + 1, shortsVid.length - 1));
    } else if (e.deltaY < 0) {
      // Scrolling up
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Scroll to current video
  useEffect(() => {
    if (containerRef.current) {
      const videoHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: currentIndex * videoHeight,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div
      className="shorts-screen"
      ref={containerRef}
      onWheel={handleScroll}
     
    >
      {shortsVid.map((video, index) => (
        <div
          key={index}
        >
          <ShortsControls videoFile={video} language={language} />
        </div>
      ))}
    </div>
  );
}
