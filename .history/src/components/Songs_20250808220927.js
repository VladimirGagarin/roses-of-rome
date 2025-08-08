import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import SWMAnthem from "../assets/audios/anthem.mp3";
import Splendor from "../assets/audios/splender.mp3";
import Splendor2 from "../assets/audios/splender2.mp3";
import  DeoGratias from "../assets/audios/DEOGRATIAS.mp3";
import DeoGratiasIt from "../assets/audios/gratias.mp3";

// lyrics
import {AnthemLyrics, SonnetLyrics, sonnet2Lyrics, SplenderSongLyrics, SplenderSong2Lyrics, CottolengoAnthemLyrics,} from "./SongData";

export function RosesOfRomeSongs() {
    const songs = [
      {
        songId: "rorMusic_001",
        songFile: RomeOne,
        songName: {
          en: "Roses Of Rome: The Sonnet",
          it: "Rose Di Roma: Le Sonnet",
        },
        songLyrics: sonnet2Lyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: "rorMusic_002",
        songFile: RomeTwo,
        songName: {
          en: "Roses Of Rome: The Sonnet (Epic)",
          it: "Rose Di Roma: Le Sonnet (Epica)",
        },
        songLyrics: SonnetLyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: "rorMusic_003",
        songFile: SWMAnthem,
        songName: {
          en: "Anthem - Sing With Magdalene",
          it: "Utunno - Canti Con Magdalena",
        },
        songLyrics: AnthemLyrics(),
        songAlbum: "Sing With Magdalene",
      },
      {
        songId: "rorMusic_004",
        songFile: Splendor,
        songName: {
          en: "Splendor | Splender",
          it: "Splendore | Splendere",
        },
        songLyrics: SplenderSongLyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: "rorMusic_005",
        songFile: Splendor2,
        songName: {
          en: "Splendor || - Splender ||",
          it: "Splendore || - Splendere ||",
        },
        songLyrics: SplenderSong2Lyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: "rorMusic_006",
        songFile: DeoGratias,
        songName: {
          en: "Deo Gratias",
          it: "Deo Gratias",
        },
        songLyrics: CottolengoAnthemLyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: "rorMusic_007",
        songFile: DeoGratiasIt,
        songName: {
          en: "Deo Gratias (italian)",
          it: "Deo Gratias (italiano",
        },
        songLyrics: CottolengoAnthemItalianLyrics(),
        songAlbum: "Roses Of Rome",
      },
    ];
    return songs
}