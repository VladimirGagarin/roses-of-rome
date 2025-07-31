// src/components/BannerHead.jsx
import React from "react";
import "../BannerHead.css"; // create this file

export default function BannerHead({
  mediaType = "image",
  src,
  alt = "Event Banner",
}) {
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
    </div>
  );
}
