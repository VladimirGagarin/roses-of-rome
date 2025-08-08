import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import SWMAnthem from "../assets/audios/anthem.mp3";
import Splendor from "../assets/audios/splender.mp3";


// lyrics
import {AnthemLyrics, SonnetLyrics, sonnet2Lyrics, SplenderSongLyrics} from "./SongData";

export function RosesOfRomeSongs() {
    const songs = [
        {
            songId: "rorMusic_001",
            songFile: RomeOne,
            songName: {en: "Roses Of Rome: The Sonnet", it: "Rose Di Roma: Le Sonnet"},
            songLyrics: sonnet2Lyrics(), // i wll have a func for getting array here,
            songAlbum: "Roses Of Rome"

        },
         {
            songId: "rorMusic_002",
            songFile: RomeTwo,
            songName: {en: "Roses Of Rome: The Sonnet (Epic)", it: "Rose Di Roma: Le Sonnet (Epica)"},
            songLyrics: SonnetLyrics() , // i wll have a func for getting array here,
            songAlbum: "Roses Of Rome"

        },
         {
            songId: "rorMusic_003",
            songFile: SWMAnthem,
            songName: {en: "Anthem - Sing With Magdalene", it: "Utunno - Canti Con Magdalena"},
            songLyrics: AnthemLyrics() , // i wll have a func for getting array here,
            songAlbum: "Sing With Magdalene"

        },
         {
            songId: "rorMusic_004",
            songFile: Splendor,
            songName: {en: "Splendor | Splender", it: ""},
            songLyrics: [] , // i wll have a func for getting array here,
            songAlbum: "Roses Of Rome"

        },
    ];
    return songs
}