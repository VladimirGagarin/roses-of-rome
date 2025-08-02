import { useLanguage } from "./LanguageContext";
import Thumbnail from "../assets/images/ror.png"; // fallback thumbnail

export function VideoCard({ details }) {
  const { language } = useLanguage();

  const { title, thumbnail, author, datePublished} = details;

  return (
    <div
      className="video-card"
      style={{ width: "100%", maxWidth: "500px" }}
    >
      <img
        src={thumbnail || Thumbnail}
        className="card-img"
        alt={title[language] || title.en}
        
      />
      <div className="card-body">
        <h5 className="card-title mb-1">
          {title[language] || title.en}
        </h5>
        <p className="card-text">
          {author}
        </p>
        {datePublished && (
          <p className="card-text text-muted" style={{ fontSize: "0.8rem" }}>
            <small>
              {new Date(datePublished).toLocaleDateString(language)}
            </small>
          </p>
        )}
      </div>
    </div>
  );
}
