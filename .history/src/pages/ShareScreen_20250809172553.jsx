import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer.jsx";
import { useState, useEffect, useRef } from "react";
import { FaHome, FaMusic, FaShareAlt } from "react-icons/fa";
import { useLanguage } from "../components/LanguageContext";
import "../App.css";

export default function ShareScreen() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentSongObj, setCurrentSongObj] = useState(null);
    const [isPlaying, setPlaying] = useState(false);
    const [audioState, setAudioState] = useState("idle");
    const audioRef = useRef(null);
    const {language} = useLanguage(); // Default to English

    useEffect(() => {
        const allSongs = RosesOfRomeSongs();
        const foundSong = allSongs.find(song => song.songId === id);
        
        if (foundSong) {
            setCurrentSongObj(foundSong);
        } else {
            // Redirect to 404 or home if song not found
            navigate("/pages/home");
        }
    }, [id, navigate]);

    const handleShare = async () => {
        if (!currentSongObj) return;
        
        const shareData = {
            title: currentSongObj.songName[language] || currentSongObj.songName.en,
            text: language === "it" 
                ? `Ascolta "${currentSongObj.songName[language] || currentSongObj.songName.en}" 🎶` 
                : `Listen to "${currentSongObj.songName[language] || currentSongObj.songName.en}" 🎶`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for desktop browsers
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                alert(language === "it" 
                    ? "Link copiato negli appunti!" 
                    : "Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Sharing failed:", err);
        }
    };

    if (!currentSongObj) {
    return (
      <div className={}>
        <h2>Song Not Found</h2>
        <p>The song you are looking for might have been removed or the link is incorrect.</p>
        <button onClick={() => navigate("/pages/home")}>Go Home</button>
      </div>
    );
  }


    return (
        <div className="share-screen">
            {/* Navigation Bar */}
            <nav className="share-nav">
                <button 
                    className="nav-button"
                    onClick={() => navigate("/pages/home")}
                    aria-label={language === "it" ? "Torna alla home" : "Go to home"}
                >
                    <FaHome />
                    <span>{language === "it" ? "Home" : "Home"}</span>
                </button>
                
                <button 
                    className="nav-button"
                    onClick={() => navigate("/pages/playlist")}
                    aria-label={language === "it" ? "Vai alla playlist" : "Go to playlist"}
                >
                    <FaMusic />
                    <span>{language === "it" ? "Playlist" : "Playlist"}</span>
                </button>
            </nav>

            {/* Song Content */}
            <div className="share-content">
                <h1>{currentSongObj.songName[language] || currentSongObj.songName.en}</h1>
                
                {currentSongObj.songAlbum && (
                    <p className="song-album">
                        {language === "it" ? "Dall'album" : "From album"}: {currentSongObj.songAlbum}
                    </p>
                )}

                <div className="audio-wrapper">
                    <AudioComponent
                        audioFile={currentSongObj.songFile}
                        title={currentSongObj.songName[language] || currentSongObj.songName.en}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setPlaying={setPlaying}
                        setAudioState={setAudioState}
                    />
                </div>

                <button 
                    className="share-button"
                    onClick={handleShare}
                    disabled={audioState === "waiting" || audioState === "stalled"}
                >
                    <FaShareAlt />
                    <span>{language === "it" ? "Condividi" : "Share"}</span>
                </button>
            </div>

            {/* Language Toggle */}
            <div className="language-toggle">
                <button onClick={() => setLanguage("en")} className={language === "en" ? "active" : ""}>
                    EN
                </button>
                <button onClick={() => setLanguage("it")} className={language === "it" ? "active" : ""}>
                    IT
                </button>
            </div>
        </div>
    );
}