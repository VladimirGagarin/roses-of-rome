import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/ audios/ rome2.mp3"

export default function HomeScreen() {

    return (
      <div className="home-container">
        <Sonnet />
        <AudioComponent audioFile={RomeOne} title="Roses Of Rome" />
        <AudioComponent audioFile={RomeTwo} title="Roses Of Rome" />
      </div>
    );
}