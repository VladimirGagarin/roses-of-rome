import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import Poster from "../assets/images"

export default function ShortsControls({ videoFile, language }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStalled, setIsStalled] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isError, setIsErrored] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  const AudioRef = useRef(null);

  // add src on mount
  useEffect(() => {});

  // play in view
  useEffect(() => {});

  // handle  event listeners
  useEffect(() => {});

  // handle  pause/play
    useEffect(() => { });
    

    return (
        <div className="shor-control">
            {isError || isLoading || isWaiting || isStalled ? (
                <div className="notification-alert-overlay">
                    {isError ? (language === "it" ? "" : "") :  (language === "it" ? "" : "Video Loading...")}
            </div>
            ) : (
                    <video
                        loop={true}
                        src={videoFile}
                        type="mp4"
                        playsInline
                        disablePictureInPicture
                        onClick={ }
                        onContextMenu={}
                    />      
            )}
        </div>
    )
}
