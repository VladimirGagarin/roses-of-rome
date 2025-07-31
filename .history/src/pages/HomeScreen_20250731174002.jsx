import AudioComponent from "../components/AudioPlayer";
import Sonnet from "../components/Sonnet";
import Rome

export default function HomeScreen() {

    return (
      <div className="home-container">
        <Sonnet />
        <AudioComponent />
      </div>
    );
}