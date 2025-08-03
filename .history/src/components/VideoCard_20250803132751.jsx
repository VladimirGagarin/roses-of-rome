import { useLanguage } from "./LanguageContext";
import Thumbnail from "../assets/images/ror.png"; // fallback thumbnail
import "./AllVideoStyles.css";

export function VideoCard({ details }) {
  const { language } = useLanguage();
  const { title, thumbnail, author, datePublished } = details;

  return (
    <div className="video-card">
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
        {author && <p className="card-text">{author}</p>}
        {datePublished && (
          <p className="card-text">
            <small>
              {new Date(datePublished).toLocaleDateString(language, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </small>
          </p>
        )}
      </div>
    </div>
  );
}
