import { useEffect, useState, useRef } from "react";

export default function ShortControls({ videoFile, language }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isStalled, setIsStalled] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [isError, setIsErrored] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);

    const AudioRef = useRef(null);


    use
    
}
