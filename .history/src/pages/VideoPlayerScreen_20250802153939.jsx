import { useParams } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState } from "react";

export default function VideoPlayerScreen() {
    const { id } = useParams();
    const allVideos = RosesOfRomeVideos();
    const [currentVideoObj, setCurrentVideoObj] = useState(null);
    

    useEffect(() => {
        const foundedVid = allVideos.find(vid => vid.id === id);
        setCurrentVideoObj(foundedVid ? foundedVid : null);
    }, [id, allVideos])


    return (
        <div className="Video-player-screen">
            
        </div>
    )

}