import Video1 from "../assets/videos/vid_001.mp4";
import Video2 from "../assets/videos/vid_002.mp4";

export function RosesOfRomeVideos () {
    const videos = [
      {
        id: "rorvid001P",
        src: Video1,
        type: "long",
        title: {
          en: "Roses Of Rome Video",
          it: "Rose Di Roma Video",
        },
        description: {
          en: "A special presentation from Roses of Rome.",
          it: "Una presentazione speciale da Rose di Roma.",
        },
        thumbnail: null,
        author: "Roses Of  Rome",
        datePublished: null,
        captions: null,
        copyright: false,
        playlist: "Roses Of Rome",
        externalLink: "https://youtu.be/7OZCpB1vauE",
      },
      {
        id: "rorvid002P",
        src: Video2,
        type: "long",
        title: {
          en: "",
          it: "Rose Di Roma Video",
        },
        description: {
          en: "A special presentation from Roses of Rome.",
          it: "Una presentazione speciale da Rose di Roma.",
        },
        thumbnail: null,
        author: "Roses Of  Rome",
        datePublished: null,
        captions: null,
        copyright: false,
        playlist: "Roses Of Rome",
        externalLink: null,
      },
    ];

    return videos
}