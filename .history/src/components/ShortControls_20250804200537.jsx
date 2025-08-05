import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

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
    

    ret
}
