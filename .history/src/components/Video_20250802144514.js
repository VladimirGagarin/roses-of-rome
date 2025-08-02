import Video1 from "../assets/videos/vid_001.mp4";
import Video2 from "../assets/videos/vid_002.mp4";
import Video3 from "../assets/videos/vid_003.mp4";

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
          en: "Lydia",
          it: "Lydia",
        },
        description: {
          en: `A visual hymn that embraces Lydia in 99 names —
            Lightkeeper, Starborn, Flame of Morning, Dew of Silence,
            Beloved Voice, Song in the Shadows, Moon of Mercy,
            Keeper of Psalms, Daughter of Wildflowers, Veil of Grace,
            Scribe of Sorrows, Heir of Lilies, Guardian of Joy,
            ...and  more radiant whispers.

            This video honors the sacred spell of her presence —
            each name a doorway to her divine mystery.`,

          it: `Un inno visivo che abbraccia Lydia con 99 nomi —
            Custode della Luce, Nata dalle Stelle, Fiamma del Mattino, Rugiada del Silenzio,
            Voce Amata, Canto tra le Ombre, Luna della Misericordia,
            Custode dei Salmi, Figlia dei Fiori Selvatici, Velo di Grazia,
            Scrittrice dei Dolori, Erede dei Gigli, Guardiana della Gioia,
            ...e altri 86 sussurri radiosi.

            Questo video onora l’incantesimo sacro della sua presenza —
            ogni nome è una porta verso il suo mistero divino.`,
        },

        thumbnail: null,
        author: "Roses Of  Rome",
        datePublished: null,
        captions: null,
        copyright: false,
        playlist: "Roses Of Rome",
        externalLink: null,
      },
      {
        id: "rorvid003P",
        src: Video3,
        type: "long",
        title: {
          en: "Sing With Magdalene",
          it: "",
        },
        description: {
          en: "",
          it: "",
        },
        thumbnail: null,
        author: "Roses Of  Rome",
        datePublished: null,
        captions: null,
        copyright: false,
        playlist: "Roses Of Rome",
        externalLink: "https://youtu.be/7OZCpB1vauE",
      },
    ];

    return videos
}