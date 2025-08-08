import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";
import { FaYoutube } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import SurpriseOverlay from "../components/SurpriseOverlay";
import BgImg from "../assets/images/wh_sonnet_bg.jpg";
import "../App.css";

export default function PlaylistScreen() {
  const allSongs = RosesOfRomeSongs();
  const { language } = useLanguage();

  const [supriseSong, setSurpriseSong] = useState(null);
  const [showSurprise, setShowSurprise] = useState(false);
   const [lyricsArray, setLyricsArray] = useState([]);

  // Placeholder audioRef etc. (should ideally come from AudioComponent or be centralized)
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [audioState, setAudioState] = useState({});


  useEffect(() => {
    if (!showSurprise) {
      setPlaying(false); 
    }
  }, [showSurprise]);

   useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !showSurprise) return;

    // Add all event listeners
    const handleTimeUpdate = () => {
      const timeMs = audio.currentTime * 1000;
      setCurrentTime(timeMs);
      
    };

    const handleWaiting = () => setAudioState("waiting");
    const handleStalled = () => setAudioState("stalled");
    const handleCanPlay = () => setAudioState("idle");
    const handleLoadStart = () => setAudioState("loading");
    const handleEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("stalled", handleStalled);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("ended", handleEnded);

    // Initial play attempt
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setPlaying(true))
        .catch(() => {
          setPlaying(false);
          
        });
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("stalled", handleStalled);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    };
  }, [showSurprise]); // Only re-run when showSurprise changes

   useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleWaiting = () => setAudioState("waiting");
    const handleStalled = () => setAudioState("stalled");
    const handleCanPlay = () => setAudioState("idle");
    const handleLoadStart = () => setAudioState("loading");
    const handleEnded = () => setPlaying(false);

    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("stalled", handleStalled);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("stalled", handleStalled);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

   useEffect(() => {
    
    const current = lyricsArray.find(
      (lyric) => currentTime >= lyric.start && currentTime <= lyric.end
    );
    
    setCurrentLine(typeof current?.text === "string"
  ? current.text
  : current?.text?.[language] || current?.text?.en || ""
);
  }, [currentTime, lyricsArray, language]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setPlaying(false);

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);


  const handleSurprise = (song) => {
     window.dispatchEvent(
        new CustomEvent("pause-all-audio", { detail: null })
    );
    setSurpriseSong(song.songFile);
    setShowSurprise(true);
    setLyricsArray(song.songLyrics)
  };

  return (
    <div className="playlist-container">
      {allSongs.map((song) => (
        <div className="song-card" key={song.songId}>
          <div className="audio-wrapper">
            <AudioComponent
              audioFile={song.songFile}
              title={song.songName[language] || song.songName?.en}
              audioRef={audioRef}
              isPlaying={isPlaying}
              setPlaying={setPlaying}
              setCurrentLine={setCurrentLine}
              setAudioState={setAudioState}
            />
          </div>
          
          {Array.isArray(song.songLyrics) && song.songLyrics.length > 0 && (
            <div className="more-action-card">
              {song.songAlbum && (
                <p className="song-album">🎵 {song.songAlbum}</p>
              )}

              <button
                className="surprise-button"
                onClick={() => handleSurprise(song)}
                title={language === "it" ? "Guarda i testi" : "View lyrics"}
                aria-label={language === "it" ? "Guarda i testi" : "View lyrics"}
              >
                <FaYoutube />
              </button>
            </div>
          )}
        </div>
      ))}

      {showSurprise && supriseSong && (
        <SurpriseOverlay
          language={language}
          audioRef={audioRef}
          currentLine={currentLine}
          isPlaying={isPlaying}
          setPlaying={setPlaying}
          audioState={audioState}
          setSurprise={setShowSurprise}
          title={
            language === "it"
              ? "Versione Speciale per Te"
              : "Special Version for You"
          }
          dynamicBgImage={BgImg}
          song={supriseSong}
        />
      )}
    </div>
);
}
