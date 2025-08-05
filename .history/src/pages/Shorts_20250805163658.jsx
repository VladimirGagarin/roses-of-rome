
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
  const { language } = useLanguage();

  const shortsVid = [
    ShortVideo1,
    ShortVideo2,
    ShortVideo3,
    ShortVideo4,
    ShortVideo5,
    ShortVideo6,
  ];

  return (
    <div className="shorts-container">
      {shortsVid.map((video, index) => (
        <div className="short-wrapper" key={index}>
          <ShortsControls videoFile={video} />
        </div>
      ))}
    </div>
  );
}
