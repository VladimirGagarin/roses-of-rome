import { useParams, useNavigate } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";
import { useEffect } from "react";

export default function EmbedSong() {
    const { songId } = useParams();
      const navigate = useNavigate();
    const songs = RosesOfRomeSongs();
   const { language, setLanguage } = useLanguage();
    const song = songs.find((s) => s.songId === songId);
    

     useEffect(() => {
           const userLanguage = navigator.language.toLowerCase();
        
           // Accept Italian variants like it, it-IT, it-CH
           if (userLanguage.startsWith("it")) {
             setLanguage("it");
           } else {
             setLanguage("en");
           }
     }, [setLanguage]);
    

    if (!song) {
      navigate
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#111",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "10px",
          background: "#222",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        <h4>{song.songName[language]}</h4>
        <AudioComponent audioFile={song.songFile} title={song.songName[language]} />
      </div>
    </div>
  );
}
