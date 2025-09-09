// src/components/BannerHead.jsx
import { useLanguage } from "./LanguageContext";
import "../index.css"; // create this file
import { useNavigate } from "react-router-dom";
import Quotes from "./Quotes";
import { useState } from 'react';

export default function BannerHead({
  mediaType = "image",
  src,
  alt = "Event Banner",
}) {
    const { language, setLanguage } = useLanguage();
    const navigate = useNavigate();
    const [sho]

  return (
    <div className="banner-container" onClick={() => navigate("/")}>
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
      <div
        className="Switcher"
        onClick={(e) => {
          e.stopPropagation();
          setLanguage(language === "en" ? "it" : "en");
        }}
      >
        <span
          style={{
            color: language === "en" ? "black" : "#888",
            opacity: language === "en" ? "1" : "0.3",
          }}
        >
          EN
        </span>
        <div className={`switch ${language === "it" ? "on" : ""}`}></div>
        <span
          style={{
            color: language === "it" ? "black" : "#888",
            opacity: language === "it" ? "1" : "0.3",
          }}
        >
          IT
        </span>
      </div>
      <div className="quote-house">
        <Quotes />
      </div>
    </div>
  );
}
