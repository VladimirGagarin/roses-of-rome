import Video1 from "../assets/videos/vid_001.mp4";

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
        thumbnail: ,
        duration: 240, // duration in seconds
        author: "John Doe",
        datePublished: "2023-05-01",
        tags: ["presentation", "poetry", "nature"],
        quality: "1080p",
        captions: "/captions/rorsubtitles.vtt",
        views: 5000,
        featured: true,
        relatedAudio: "someAudioId",
        category: "documentary",
        aspectRatio: "16:9",
        permissions: "CC BY-NC-SA",
        externalLink: "https://youtube.com/...",
      },
    ];

    return videos
}