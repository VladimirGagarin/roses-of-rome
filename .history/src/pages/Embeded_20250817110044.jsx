// EmbeddedAudio.jsx
import React from "react";
import AudioComponent from "./AudioComponent";

export default function EmbeddedAudio({ audioFile, title }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111", // dark bg like YouTube embed
        color: "#fff",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <AudioComponent audioFile={audioFile} title={title} />
    </div>
  );
}
