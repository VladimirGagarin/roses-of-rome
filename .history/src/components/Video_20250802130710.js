import Video1 from "../assets/videos/vid_001.mp4";

export function RosesOfRomeVideos () {
    const videos = [
        {
            videoDetails: {
                title: {en :"Roses Of Rome Video ", it: "Rose Di Roma Video"},
                id: "rorvid001P",
                src: Video1,

            },
            videoLanguage: [{ en: "English", it: "Inglese" }],
            videoType
        }
    ];

    return videos
}