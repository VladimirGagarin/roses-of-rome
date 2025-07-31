import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import { useLanguage } from "../components/LanguageContext";
import "../index.css"

export default function HomeScreen() {
  const { language } = useLanguage();

  const welcomeText = {
    en: {
      heading: "Welcome to Roses Of Rome Pictures",
      subheading: "Where poetry becomes vision.",
    },
    it: {
      heading: "Benvenuto a Roses Of Rome Pictures",
      subheading: "Dove la poesia diventa visione.",
    },
  };

  return (
    <div className="home-container">
      <section className="welcome-banner">
        <h1>{welcomeText[language].heading}</h1>
        <p>{welcomeText[language].subheading}</p>
      </section>

      <Sonnet />
      <AudioComponent audioFile={RomeOne} title="Roses Of Rome" />
      <AudioComponent
        audioFile={RomeTwo}
        title="Roses Of Rome (Epic Version)"
      />
    </div>
  );
}
