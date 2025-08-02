import { useParams } from "react-router-dom";
import { RosesOfRomeVideos } from "../components/Video";
import { useEffect, useState } from "react";

export default function VideoPlayerScreen() {
    const { id } = useParams();
    const allVideos = RosesOfRomeVideos();
    const [currentVideo, set]
    

    useEffect(() => {
        const 
    }, [id])

}