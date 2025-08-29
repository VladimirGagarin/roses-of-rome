import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import "./DirectorMsgs.css";
import { ThePaintMessage, MakeYourLifeColorful } from "./Utils";
import PaintSong from "../assets/audios/paint.mp3";
import PaintSongIt from "../assets/audios/paint_it.mp3";
import ColorfulSong from "../assets/audios/colorful.mp3";
import BelieveSong from "../assets/audios/believe.mp3";
import AudioComponent from "./AudioPlayer";

export default function DirectorMessage() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const titles = [
    { 
      title: { en: "Believe in Yourself", it: "Credi in Te Stesso" }, 
      lyricsArray: BelieveSongLyrics(), 
      songFile: BelieveSong
    },
    { 
      title: { en: "Make Your Life Colorful", it: "Rendi la Tua Vita Colorata" }, 
      lyricsArray: MakeYourLifeColorful(), 
      songFile: ColorfulSong 
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
              {msg.lyricsArray.length > 0 && Array.isArray(msg.lyricsArray) && (
              <button  className="lyrics-btn" onClick={() => handleLyricsToggle(index)}> {language === "it" ? "Testo della Canzone" : "Song Lyrics"}</button>
              )}

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