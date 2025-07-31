import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from "../assets/audios/";

export default function HomeScreen() {

    return (
      <div className="home-container">
        <Sonnet />
        <AudioComponent audioFile={RomeOne}  title= "Roses Of Rome"/>
      </div>
    );
}