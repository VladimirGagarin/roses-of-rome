import { useLanguage } from "./LanguageContext";
import Thumbnail from "../assets/images/ror.png"; // fallback thumbnail
import "./AllVideoStyles.css";
import {useState, useEffect} from "react";


function getPermission(id) {
  const permissions = JSON.parse(localStorage.getItem("videoPermissions") || "{}");
  return permissions[id] !== false; // default is true
}


export function VideoCard({ details }) {
  const { language } = useLanguage();
  const { title, thumbnail, datePublished} = details;
   const [hasPermission, setHasPermission] = useState(() => getPermission(details.id));

  // Sync with localStorage updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHasPermission(getPermission(details.id));
    }, 1000); // Poll every second if needed

    return () => clearInterval(interval);
  }, [details.id]);
  

  return (
    <div className="video-card">
      {/* Premium Ribbon - only shown if permission is true */}
      {!hasPermission && ( // Explicitly check for true
        <div className="premium-ribbon">
          {language === "it" ? "Premium" : "Premium"}
        </div>
      )}

      <div className="card-image-container">
        <img
          src={thumbnail || Thumbnail}
          className="card-img"
          alt={title[language] || title.en}
          loading="lazy" // Lazy loading for better performance
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{title[language] || title.en}</h5>
       
        {datePublished && (
          <p className="card-text">
            <small>
              {new Date(datePublished).toLocaleDateString(language, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </small>
          </p>
        )}
      </div>
    </div>
  );
}
