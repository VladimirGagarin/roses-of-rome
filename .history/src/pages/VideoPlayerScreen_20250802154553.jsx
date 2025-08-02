import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";


export default function VideoPlayerScreen() {
  const { id } = useParams();
  const allVideos = RosesOfRomeVideos();
  const [currentVideoObj, setCurrentVideoObj] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const foundVid = allVideos.find((vid) => vid.id === id);
    setCurrentVideoObj(foundVid || null);
  }, [id, allVideos]);
    
    const GoBack = () => {
        if (history.length > 1 && history !== "default") {
            navigate(-1)
        }
        else
    }

  if (!currentVideoObj) {
    return (
      <div className="Video-player-screen">
        <p>Video not found or loading... <span className="back-btn" onClick={() => GoBack}>Go back</span></p>
      </div>
    );
  }

  return (
    <div className="Video-player-screen">
      <VideoPlayer videoFile={currentVideoObj.src} />
    </div>
  );
}
