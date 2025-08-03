import { useLanguage } from "./LanguageContext";
import Thumbnail from "../assets/images/ror.png"; // fallback thumbnail
import "./AllVideoStyles.css"

export function VideoCard({ details }) {
  const { language } = useLanguage();

  const { title, thumbnail, author, datePublished} = details;

  return (
    <div
      className="video-card"
      style={{ width: "100%", maxWidth: "500px" }}
    >
      <div className>
      <img
        src={thumbnail || Thumbnail}
        className="card-img"
        alt={title[language] || title.en}
        
      />
      <div className="card-body">
        <h5 className="card-title">
          {title[language] || title.en}
        </h5>
        <p className="card-text">
          {author}
        </p>
        {datePublished && (
          <p className="card-text">
            <small>
              {new Date(datePublished).toLocaleDateString(language)}
            </small>
          </p>
        )}
      </div>
    </div>
  );
}
