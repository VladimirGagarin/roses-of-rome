
import ShortsControls from "../components/ShortControls";
import ShortVideo1 from "../assets/videos/short_001.mp4";
import ShortVideo2 from "../assets/videos/short_002.mp4";
import ShortVideo3 from "../assets/videos/short_003.mp4";
import ShortVideo4 from "../assets/videos/short_004.mp4";
import ShortVideo5 from "../assets/videos/short_005.mp4";
import ShortVideo6 from "../assets/videos/short_006.mp4";

import "../components/AllShortsStyles.css";
import { useEffect, useRef } from "react";

export default function ShortsScreen() {
  const containerRef = useRef(null);

  const shortsVid = [
    ShortVideo1,
    ShortVideo2,
    ShortVideo3,
    ShortVideo4,
    ShortVideo5,
    ShortVideo6,
  ];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth", // optional, adds smooth scroll
      });
    }
  }, []);


  return (
    <div className="shorts-container" ref={containerRef}>
      {shortsVid.map((video, index) => (
        <div className="short-wrapper" key={index}>
          <ShortsControls videoFile={video} />
        </div>
      ))}
    </div>
  );
}
