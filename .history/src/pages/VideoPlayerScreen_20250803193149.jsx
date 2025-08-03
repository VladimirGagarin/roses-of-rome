import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState, useCallback } from "react";
import VideoPlayer from "../components/VideoPlayer";
import "../components/AllVideoStyles.css";
import { useLanguage } from "../components/LanguageContext";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";

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

    return () => {
      setCurrentVideoObj(null); // Cleanup on unmount
    };
  }, [id, allVideos]);

 const GoBack = useCallback(() => {
   if (window.history.length > 1) {
     navigate(-1);
   } else {
     navigate("/videos");
   }
 }, [navigate]);


  if (!currentVideoObj) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/pages/videos");
      }
  }

    return (
      <div className="video-player-screen">
        <div className="more-actions">
          <button className="back-btn" onClick={GoBack}>
            <FaArrowLeft /> {language === "it" ? "Torna" : "Back"}
          </button>
          <button onClick={toggleDetail} className="more-btn">
            <FaEllipsisV /> {language === "it" ? "Dettagli" : "Details"}
          </button>
        </div>

        <h1>
          {currentVideoObj?.title?.[language] || currentVideoObj?.title?.en}
        </h1>

        <div className="video-s-container">
          <VideoPlayer
            videoFile={currentVideoObj?.src}
            autoPlay={true}
            permission={currentVideoObj?.permission}
          />
        </div>
        {showDetail && currentVideoObj && (
          <div className="video-overlay-screen">
            <div className="video-overlay-content">
              <h3 style={{ marginBottom: "0.5rem", textDecoration: }}>
  
                {currentVideoObj.title?.[language] || currentVideoObj.title?.en}
              </h3>

              <div
                style={{
                  fontFamily: "monospace",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                }}
              >
                {currentVideoObj.datePublished && (
                  <p>
                    {" "}
                    {language === "it"
                      ? "Data di pubblicazione"
                      : "Date Published"}
                    : {currentVideoObj.datePublished}
                  </p>
                )}
                <p>
                  {language === "it" ? "Autore" : "Author"}:{" "}
                  {currentVideoObj.author}
                </p>
                <p>
                  {language === "it" ? "Playlist" : "Playlist"}:{" "}
                  {currentVideoObj.playlist}
                </p>
                {currentVideoObj.externalLink && (
                  <p>
                    🔗 {language === "it" ? "Link Esterno" : "External Link"}:{" "}
                    <a
                      href={currentVideoObj.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "#77DD77" }}
                    >
                      {currentVideoObj.externalLink}
                    </a>
                  </p>
                )}
                <p>
                 
                  {language === "it"
                    ? "Accesso consentito"
                    : "Permission Granted"}
                  : {currentVideoObj.permission ? "✔️" : "❌"}
                </p>

                <p>
                  {language === "it" ? "Descrizione" : "Description"}:<br />
                  {currentVideoObj.description?.[language] ||
                    currentVideoObj.description?.en}
                </p>
              </div>

              <button onClick={toggleDetail} className="close-overlay">
                {language === "it" ? "Chiudi" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
}
