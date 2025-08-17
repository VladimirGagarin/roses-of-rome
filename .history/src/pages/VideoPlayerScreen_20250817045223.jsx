import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState, useCallback } from "react";
import VideoPlayer from "../components/VideoPlayer";
import "../components/AllVideoStyles.css";
import { useLanguage } from "../components/LanguageContext";
import { FaArrowLeft, FaEllipsisV, FaShareAlt } from "react-icons/fa";

function getPlayCount(id) {
  return parseInt(sessionStorage.getItem(`play_${id}`) || "0");
}

export default function VideoPlayerScreen() {
  const { id } = useParams();
  const allVideos = RosesOfRomeVideos();
  const [currentVideoObj, setCurrentVideoObj] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => setShowDetail(!showDetail);

  const [playCount, setPlayCount] = useState(getPlayCount(id));
  


  useEffect(() => {
    const foundVid = allVideos.find((vid) => vid.id === id);
    setCurrentVideoObj(foundVid || null);

    
    if (foundVid) {
      const count = getPlayCount(id);
      setPlayCount(count);
    }

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

const ShareLink = (e) => {
  const button = e.target;
  button.disabled = true;
  const link = window.location.href;

  navigator.clipboard
    .writeText(link)
    .then(() => {
      button.textContent = language === "it" ? "Copiata" : "Link Copied";

      setTimeout(() => {
        button.textContent = language === "it" ? "Condividi" : "Share";
        button.disabled = false;
      }, 3000);
    })
    .catch(() => {
      button.textContent = language === "it" ? "Fallito" : "Failed";

      setTimeout(() => {
        button.textContent = language === "it" ? "Condividi" : "Share";
        button.disabled = false;
      }, 3000);
    });
};



  if (!currentVideoObj) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/pages/videos");
      }
  }

  console.log(playcount)

    return (
      <div className="video-player-screen">
        <div className="more-actions">
          <button className="back-btn" onClick={GoBack}>
            <FaArrowLeft /> {language === "it" ? "Torna" : "Back"}
          </button>
          <button onClick={(e) => ShareLink(e)} className="more-btn">
            <FaShareAlt /> {language === "it" ? "Condividi" : "Share"}
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
            ytLink={currentVideoObj?.externalLink}
            videoId={currentVideoObj?.id}
          />
        </div>
        {showDetail && currentVideoObj && (
          <div className="video-overlay-screen">
            <div className="video-overlay-content">
              <h3
                style={{ marginBottom: "0.5rem", textDecoration: "underline" }}
              >
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

                {currentVideoObj.description && (
                  <p>
                    {language === "it" ? "Descrizione" : "Description"}:<br />
                    {currentVideoObj.description?.[language] ||
                      currentVideoObj.description?.en}
                  </p>
                )}
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
