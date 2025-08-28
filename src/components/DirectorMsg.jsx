import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import "./DirectorMsgs.css";
import { ThePaintMessage } from "./Utils";
import PaintSong from "../assets/audios/paint.mp3";
import PaintSongIt from "../assets/audios/paint_it.mp3";
import AudioComponent from "./AudioPlayer";

export default function DirectorMessage() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const titles = [
    { 
      title: { en: "Believe in Yourself", it: "Credi in Te Stesso" }, 
      lyricsArray: null, 
      songFile: null 
    },
    { 
      title: { en: "Make Your Life Colorful", it: "Rendi la Tua Vita Colorata" }, 
      lyricsArray: null, 
      songFile: null 
    },
    { 
      title: { en: "Paint Tomorrow with Your Ambitions", it: "Dipingi il Domani con le Tue Ambizioni" }, 
      lyricsArray: ThePaintMessage(), 
      songFile: language === "it" ? PaintSongIt : PaintSong 
    },
  ];

  const handleLyricsToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

   return (
    <section className="director-message">
      <h2>{language === "it" ? "Messaggi del Regista" : "Director's Messages"}</h2>
      <div className="messages-grid">
        {titles.map((msg, index) => (
          // Moved the conditional rendering to the correct position
          msg.songFile ? (
            <div
              key={index}
              className={`message-card ${activeIndex === index ? "active" : ""}`}
             
            >
              <div className="card-header">
               
                <div className="audio-wrapper">
                  <AudioComponent
                    audioFile={msg.songFile}
                    title={msg.title[language]}
                  />
                </div>
              </div>

              <button  className="lyrics-btn" onClick={() => handleLyricsToggle(index)}> {language === "it" ? "Canzon Liriche" : "Song lyrics"}</button>

              {activeIndex === index && msg.lyricsArray && (
                <div className="lyrics-content">
                  {msg.lyricsArray.verses.map((verse, vIndex) => (
                    <div key={vIndex} className={`lyrics-verse ${verse.type}`}>
                      {verse.lines.map((line) => (
                        <p key={line.lineId} className="lyrics-line">
                          {line[language] || line.en}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null
        ))}
      </div>
    </section>
  );
}