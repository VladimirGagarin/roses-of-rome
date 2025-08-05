
import ShortsControls from "../components/ShortControls";
import ShortVideo1 from "../assets/videos/short_001.mp4";
import ShortVideo2 from "../assets/videos/short_002.mp4";
import ShortVideo3 from "../assets/videos/short_003.mp4";
import ShortVideo4 from "../assets/videos/short_004.mp4";
import ShortVideo5 from "../assets/videos/short_005.mp4";
import ShortVideo6 from "../assets/videos/short_006.mp4";

import "../components/AllShortsStyles.css";
import { useEffect, useRef, useState } from "react";

 const videos = [
   ShortVideo1,
   ShortVideo2,
   ShortVideo3,
   ShortVideo4,
   ShortVideo5,
   ShortVideo6,
 ];

export default function ShortsScreen() {
  const containerRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setCurrentIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    containerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="shorts-feed">
      {videos.map((videoSrc, index) => (
        <div
          key={index}
          ref={(el) => (containerRefs.current[index] = el)}
          data-index={index}
          className="short-wrapper "
        >
          <ShortsControls
            videoFile={videoSrc}
            isCurrent={currentIndex === index}
          />
        </div>
      ))}
    </div>
  );
}
