import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne 

export default function HomeScreen() {

    return (
      <div className="home-container">
        <Sonnet />
        <AudioComponent />
      </div>
    );
}