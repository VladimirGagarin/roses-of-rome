import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from "";

export default function HomeScreen() {

    return (
      <div className="home-container">
        <Sonnet />
        <AudioComponent audioFile={RomeOne}  title= "Roses Of Rome"/>
      </div>
    );
}