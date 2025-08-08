import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import SWMAnthem from "../assets/audios/anthem.mp3";
import Splendor from "../assets/audios/sp"


// lyrics
import {AnthemLyrics, SonnetLyrics, sonnet2Lyrics} from "./SongData";

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
            songId: "rorMusic_001",
            songFile: RomeTwo,
            songName: {en: "Roses Of Rome: The Sonnet (Epic)", it: "Rose Di Roma: Le Sonnet (Epica)"},
            songLyrics: SonnetLyrics() , // i wll have a func for getting array here,
            songAlbum: "Roses Of Rome"

        },
         {
            songId: "rorMusic_001",
            songFile: SWMAnthem,
            songName: {en: "Anthem - Sing With Magdalene", it: "Utunno - Canti Con Magdalena"},
            songLyrics: AnthemLyrics() , // i wll have a func for getting array here,
            songAlbum: "Sing With Magdalene"

        },
    ];
    return songs
}