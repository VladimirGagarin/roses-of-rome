import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import SWMAnthem from "../assets/audios/anthem.mp3";
import Splendor from "../assets/audios/splender.mp3";
import Splendor2 from "../assets/audios/splender2.mp3";
import  DeoGratias from "../assets/audios/DEOGRATIAS.mp3";
import DeoGratiasIt from "../assets/audios/gratias.mp3";

// lyrics
import {
    AnthemLyrics,
    SonnetLyrics,
    sonnet2Lyrics,
    SplenderSongLyrics,
    SplenderSong2Lyrics,
    CottolengoAnthemLyrics,
    CottolengoAnthemItalianLyrics
} from "./SongData";

// utils/songUUIDs.js
 const SONG_UUIDS = {
  rorMusic_001: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  rorMusic_002: "b2c3d4e5-f6g7-8901-2345-67890abcdef1",
  rorMusic_003: "c3d4e5f6-g7h8-9012-3456-7890abcdef12",
  rorMusic_004: "d4e5f6g7-h8i9-0123-4567-890abcdef123",
  rorMusic_005: "e5f6g7h8-i9j0-1234-5678-90abcdef1234",
  rorMusic_006: "f6g7h8i9-j0k1-2345-6789-0abcdef12345",
  rorMusic_007: "g7h8i9j0-k1l2-3456-7890-abcdef123456",
};


export function RosesOfRomeSongs() {
    const songs = [
      {
        songId: SONG_UUIDS.rorMusic_001,
        songFile: RomeOne,
        songName: {
          en: "Roses Of Rome: The Sonnet",
          it: "Rose Di Roma: Le Sonnet",
        },
        songLyrics: sonnet2Lyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: SONG_UUIDS.rorMusic_002,
        songFile: RomeTwo,
        songName: {
          en: "Roses Of Rome: The Sonnet (Epic)",
          it: "Rose Di Roma: Le Sonnet (Epica)",
        },
        songLyrics: SonnetLyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: SONG_UUIDS.rorMusic_003,
        songFile: SWMAnthem,
        songName: {
          en: "Anthem - Sing With Magdalene",
          it: "Utunno - Canti Con Magdalena",
        },
        songLyrics: AnthemLyrics(),
        songAlbum: "Sing With Magdalene",
      },
      {
        songId: SONG_UUIDS.rorMusic_004,
        songFile: Splendor,
        songName: {
          en: "Splendor | Splender",
          it: "Splendore | Splendere",
        },
        songLyrics: SplenderSongLyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: SONG_UUIDS.rorMusic_005,
        songFile: Splendor2,
        songName: {
          en: "The Splendor",
          it: "UnSplendore",
        },
        songLyrics: SplenderSong2Lyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: SONG_UUIDS.rorMusic_006,
        songFile: DeoGratias,
        songName: {
          en: "Deo Gratias",
          it: "Deo Gratias",
        },
        songLyrics: CottolengoAnthemLyrics(),
        songAlbum: "Roses Of Rome",
      },
      {
        songId: SONG_UUIDS.rorMusic_007,
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