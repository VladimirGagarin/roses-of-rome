import { Link } from "react-router-dom"; // link to videos/:id
import { RosesOfRomeVideos } from "../components/Video";
import { VideoCard } from "../components/VideoCard";

export default function VideoScreen() {
    const allVideos = RosesOfRomeVideos();
    const LongVideos = allVideos.filter(vid => vid.type === "long");
    return <div className="video -container">
        {
            LongVideos.map(vid => (
                <Link to={`/video`}
            ))

    }</div>;
}