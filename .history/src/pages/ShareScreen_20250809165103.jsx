import {useParams, useNavigate} from "react-router0dom";
import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer.jsx";

import { useState, useEffect } from "react";

export default function ShareScreen() {
    const navigate = useNavigate();
    const { id } = useParams();
    const []


    return (
        <div className="audio-wrapper">
                    <AudioComponent
                      audioFile={song.songFile}
                      title={song.songName[language] || ""}
                      audioRef={audioRef}
                      isPlaying={isPlaying}
                      setPlaying={setPlaying}
                      setCurrentLine={setCurrentLine}
                      setAudioState={setAudioState}
                    />
                  </div>
    )
}