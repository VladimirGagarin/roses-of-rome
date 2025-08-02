import Video1 from "../assets/videos/vid_001.mp4";

export function RosesOfRomeVideos () {
    const videos = [
        {
            id: "rorvid001P",
      src: Video1,
      type: "long", // or "reel"
      title: {
        en: "Roses Of Rome Video",
        it: "Rose Di Roma Video"
      },
      description: {
        en: "A special presentation from Roses of Rome.",
        it: "Una presentazione speciale da Rose di Roma."
      },
        }
    ];

    return videos
}