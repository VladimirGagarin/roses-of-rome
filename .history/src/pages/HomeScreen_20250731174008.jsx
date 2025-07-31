import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import RomeOne from 

export default function HomeScreen() {

    return (
      <div className="home-container">
        <Sonnet />
        <AudioComponent />
      </div>
    );
}