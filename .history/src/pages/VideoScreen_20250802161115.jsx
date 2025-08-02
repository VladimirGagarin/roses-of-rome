import { Link } from "react-router-dom"; // link to videos/:id
import { RosesOfRomeVideos } from "../components/Video";
import { VideoCard } from "../components/VideoCard";
import "../components/AllVideoStyles.css";

export default function VideoScreen() {
  const allVideos = RosesOfRomeVideos();
  const LongVideos = allVideos.filter((vid) => vid.type === "long");

  return (
    <div className="video-container">
      {LongVideos.map((vid) => (
        <Link key={vid.id} to={`/pages/er-screen/${vid.id}`} className="video-link">
          <VideoCard details={vid} />
        </Link>
      ))}
    </div>
  );
}
