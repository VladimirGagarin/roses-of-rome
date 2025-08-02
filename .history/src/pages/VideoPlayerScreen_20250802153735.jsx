import { useParams } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState } from "react";

export default function VideoPlayerScreen() {
    const { id } = useParams();
    const allVideos = RosesOfRomeVideos();
    const [currentVideo, setCurrentVideo] = useState(0);
    

    useEffect(() => {
        const foundedVid = allVideos.find(vid => vid.id === id);
        set
    }, [id])

}