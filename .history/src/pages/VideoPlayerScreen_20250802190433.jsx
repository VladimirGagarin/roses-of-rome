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
        <header>
          <BannerHead
            mediaType="video"
            alt="Roses Of Rome"
            src={BannerVid}
          ></BannerHead>
          <AboutComponent />
        </header>

        <h1>{language === "it" ? "Rosa Di Roma" : "Roses Of Rome"}</h1>

        <VideoPlayer videoFile={currentVideoObj.src} />

        <div className="more-actions">
          <button className="back-btn" onClick={GoBack}>
            <FaArrowLeft />{" "}
            {language === "it" ? "Torna ai video" : "Back to Videos"}
          </button>
          <button onClick={toggleDetail} className="more-btn">
            <FaEllipsisV /> {showDetail ? "Close" : "Details"}
          </button>
        </div>

        {showDetail && (
          <div className="video-overlay-screen">
            <div className="video-overlay-content">
              <h2>{"Video Title"}</h2>
              <p>🌟 Uploaded: Aug 2, 2025</p>
              <p>👁️ 1,200 views</p>
              <p>📄 Description: A poetic journey into light and song...</p>

              <button onClick={toggleDetail} className="close-overlay">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
}
