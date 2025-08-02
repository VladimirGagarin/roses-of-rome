import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import "../components/AllVideoStyles.css";
import { useLanguage } from "../components/LanguageContext";
import { FaArrowLeft } from "react-icons/fa";

export default function VideoPlayerScreen() {
  const { id } = useParams();
  const allVideos = RosesOfRomeVideos();
  const [currentVideoObj, setCurrentVideoObj] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

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
      <div className="Video-player-screen">
          <header></header>
          <h1>{language === "it" ? "Rosa Di Roma": "Roses Of Rome" }</h1>
      <VideoPlayer videoFile={currentVideoObj.src} />
      <button className="btn" onClick={GoBack}>
        <FaArrowLeft />{" "}
        {language === "it" ? "Torna ai video" : "Back to Videos"}
      </button>
    </div>
  );
}
