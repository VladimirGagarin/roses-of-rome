import { useParams } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs";
import AudioComponent from "../components/AudioPlayer";
import { useLanguage } from "../components/LanguageContext";

export default function EmbedSong() {
  const { songId } = useParams();
    const songs = RosesOfRomeSongs();
    const { language } = useLanguage();
  const song = songs.find((s) => s.songId === songId);

  if (!song) return <div>{language === "it"? "" : "Song not found"}</div>;

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
        <h4>{song.songName.en}</h4>
        <AudioComponent audioFile={song.songFile} title={song.songName.en} />
      </div>
    </div>
  );
}
