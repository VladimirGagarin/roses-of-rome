import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import "../components/AllVideoStyles.css";
import { useLanguage } from "../components/LanguageContext";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import BannerHead from "../components/Banner";
import BannerVid from "../assets/videos/bannerIntro.mp4";
import AboutComponent from "../components/About";

export default function VideoPlayerScreen() {
  const { id } = useParams();
  const allVideos = RosesOfRomeVideos();
  const [currentVideoObj, setCurrentVideoObj] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => setShowDetail(!showDetail);

  useEffect(() => {
    const foundVid = allVideos.find((vid) => vid.id === id);
    setCurrentVideoObj(foundVid || null);
  }, [id, allVideos]);

  const GoBack = () => {
    if (history.length > 1 && history !== "default") {
      navigate(-1);
    } else {
      navigate("/videos");
    }
  };

  if (!currentVideoObj) {
    return (
      <div className="Video-player-screen">
        <p>
          {language === "it"
            ? "Video non trovato o in fase di caricamento.."
            : "Video not found or loading.."}{" "}
          <span className="back-btn" onClick={GoBack}>
            <FaArrowLeft /> {language === "it" ? "Torna indietro" : "Go back"}
          </span>
        </p>
      </div>
    );
  }

    return (
      <div className="video-player-screen">
       

        <h1>
          {currentVideoObj.title?.[language] || currentVideoObj.title?.en}
        </h1>

        <VideoPlayer videoFile={currentVideoObj.src} />

        <div className="more-actions">
          <button className="back-btn" onClick={GoBack}>
            <FaArrowLeft />{" "}
            {language === "it" ? "Torna ai video" : "Back to Videos"}
          </button>
          <button onClick={toggleDetail} className="more-btn">
            <FaEllipsisV /> {language === "it" ? "Dettagli" : "Details"}
          </button>
        </div>

        {showDetail && currentVideoObj && (
          <div className="video-overlay-screen">
            <div className="video-overlay-content">
              {currentVideoObj.datePublished && (
                <p>
                  🌟 {language === "it" ? "Caricato il" : "Uploaded"}:{" "}
                  {currentVideoObj.datePublished}
                </p>
              )}

              <p>
                📄 {language === "it" ? "Descrizione" : "Description"}:<br />
                {currentVideoObj.description?.[language] ||
                  currentVideoObj.description?.en}
              </p>

              <button onClick={toggleDetail} className="close-overlay">
                {language === "it" ? "Chiudi" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
}
