// src/pages/EmbedSong.jsx
import { useParams } from "react-router-dom";
import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer";

export default function EmbedSong() {
  const { songId } = useParams();
  const allSongs = RosesOfRomeSongs();
  const song = allSongs.find((s) => s.songId === songId);

  if (!song) return <p>Song not found</p>;

  return (
    <div style={{ width: "400px", height: "120px", border: "1px solid #ccc" }}>
      <AudioComponent audioFile={song.songFile} title={song.songName.en} />
    </div>
  );
}
