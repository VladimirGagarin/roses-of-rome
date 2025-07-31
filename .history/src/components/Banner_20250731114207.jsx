// src/components/BannerHead.jsx
import { useLanguage } from "./LanguageContext";
import "../index.css"; // create this file

export default function BannerHead({
  mediaType = "image",
  src,
  alt = "Event Banner",
}) {
    const { language, setLanguage } = useLanguage();
    

  return (
    <div className="banner-container">
      {mediaType === "image" && (
        <img src={src} alt={alt} className="banner-media" />
      )}
      {mediaType === "video" && (
        <video
          className="banner-media"
          src={src}
          autoPlay
          muted
          loop
          playsInline
        />
          )}
          {/*Top right switcher */}
          <div className="Switcher">
              <span>EN</span>
              <div cl></div>
          </div>
    </div>
  );
}
