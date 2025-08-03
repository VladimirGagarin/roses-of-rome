import Video1 from "../assets/videos/vid_001.mp4";
import Video2 from "../assets/videos/vid_002.mp4";
import Video3 from "../assets/videos/vid_003.mp4";
import Video4 from "../assets/videos/vid_004.mp4";
import Video5 from "../assets/videos/vid_005.mp4";
import Video6 from "../assets/videos/vid_006.mp4";

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
          en: "A special presentation from Roses of Rome. This sonnet speaks gently on behalf of the studio, offering a poetic glimpse into its artistic soul.",
          it: "Una presentazione speciale da Rose di Roma. Questo sonetto parla dolcemente a nome dello studio, offrendo uno sguardo poetico nella sua anima artistica.",
        },
        thumbnail: null,
        author: "Roses Of Rome",
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
          en: "99 names of Lydia",
          it: "99 nomi di Lydia",
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
          it: "Canta con Maddalena",
        },
        description: {
          en: `A sacred space where songs bloom like roses, and Magdalene's voice
            guides hearts through healing, memory, and light. Each melody is a prayer,
            each lyric a candle flickering in the temple of longing.

            Join in the symphony — where silence listens, and love defends the last hope.`,

          it: `Uno spazio sacro dove i canti sbocciano come rose, e la voce di Maddalena
            guida i cuori attraverso guarigione, memoria e luce. Ogni melodia è una preghiera,
            ogni parola un lume che tremola nel tempio del desiderio.

            Unisciti alla sinfonia — dove il silenzio ascolta e l’amore difende l’ultima speranza.`,
        },
        thumbnail: null,
        author: "Roses Of  Rome",
        datePublished: null,
        captions: null,
        copyright: false,
        playlist: "SWM",
        externalLink: null,
      },
      {
        id: "rorvid002E",
        src: V, // assuming you've imported the epic video as EpicVideo1
        type: "long",
        title: {
          en: "Roses Of Rome: Epic Cut",
          it: "Rose Di Roma: Versione Epica",
        },
        description: {
          en: "An epic rendition from Roses of Rome. This sonnet speaks boldly on behalf of the studio, unveiling the grandeur behind every poetic vision.",
          it: "Una versione epica da Rose di Roma. Questo sonetto parla con audacia a nome dello studio, svelando la grandezza dietro ogni visione poetica.",
        },
        thumbnail: null,
        author: "Roses Of Rome",
        datePublished: null,
        captions: null,
        copyright: false,
        playlist: "Roses Of Rome",
        externalLink: "https://youtu.be/dpU6eQyzXfo",
      },
    ];

    return videos
}