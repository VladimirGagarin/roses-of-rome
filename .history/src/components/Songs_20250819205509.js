import RomeOne from "../assets/audios/rome.mp3";
import RomeTwo from "../assets/audios/rome2.mp3";
import SWMAnthem from "../assets/audios/anthem.mp3";
import Splendor from "../assets/audios/splender.mp3";
import Splendor2 from "../assets/audios/splender2.mp3";
import DeoGratias from "../assets/audios/DEOGRATIAS.mp3";
import DeoGratiasIt from "../assets/audios/gratias.mp3";
import DeoGratiasFM from "../assets/audios/DEOGRATIAS3.mp3";
import Divine from "../assets/audios/divine.mp3";
import Divine2 from "../assets/audios/divine_female.mp3";
import DivineIt from "../assets/audios/divine_it.mp3";
import Congrats from "../assets/audios/Congrats.mp3";
import Boomerang from "../assets/audios/boomerang.mp3";
import Boomerang2 from "../assets/audios/boomerang_female.mp3";
import Boomerang3 from "../assets/audios/boomerang3.mp3";
import Boomerang4 from "../assets/audios/boomerang3_it.mp3";
import VisionShortSong from "../assets/audios/vision_short.mp3";
import VisionShortSongIt from "../assets/audios/vision_it.mp3";
import WelcomSongMale from "../assets/audios/welcome.mp3";
import WelcomeSongFemale from "../assets/audios/welcome_female.mp3";
import WelcomeSongIt from "../assets/audios/welcome_it.mp3";
import VisionFemale from "../assets/audios/vision_female.mp3";
import VisionDuet from "../assets/audios/vision_duet.mp3";
import Everything from "../assets/audios/Everything(Remix).mp3";
import Tutto from "../assets/audios/tutto.mp3";
import Reputation from "../assets/audios/reputations.mp3";
import ReputationDuet from "../assets/audios/reputations_duet.mp3";
import ReputationVocal from "../assets/audios/reputations_vocal.mp3";
import Everythings from "../assets/audios/everythings.mp3";
// lyrics
import {
  AnthemLyrics,
  SonnetLyrics,
  sonnet2Lyrics,
  SplenderSongLyrics,
  SplenderSong2Lyrics,
  CottolengoAnthemLyrics,
  CottolengoAnthemItalianLyrics,
  DeoGratiasFMVLyrics,
  DivenProvLyrics,
  DivineFMVLyrics,
  DivneITLyrics,
  BoomerangLyrics,
WelcomeSongItalian,
VisionShortLyrics,
VisionItalianLyrics,
WelcomeSongFemaleLyrics,
WelcomeSongMaleLyrics,
VisionFemaleLyrics,
VisionDuetLyrics,
EverythingDuetLyrics
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
  rorMusic_008: "h8i9j0k1-l2m3-4567-8901-bcdef1234567",
  rorMusic_009: "i9j0k1l2-m3n4-5678-9012-cdef12345678",
  rorMusic_010: "j0k1l2m3-n4o5-6789-0123-def123456789",
  rorMusic_011: "k1l2m3n4-o5p6-7890-1234-ef1234567890",
  rorMusic_012: "3f9b2c1a-4d6e-4a8f-9b2c-0e1f2d3c4b5a",
  rorMusic_013: "f9470c44-6e57-4d91-9d83-5fb6f9493db7",
  rorMusic_014: "4d9303d8-79e3-46ea-a7c3-9b9db58b4c1e",
  rorMusic_015: "dee7092d-f34042998-5aec-8184bd247a2h",
  rorMusic_016: "a8b9c0d1-e2f3-4956-789a-bcdef0123456",
  rorMusic_017: "1b2a3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  rorMusic_018: "9c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f",
  rorMusic_019: "8a8c9c1d-2y3z-2a4b-6c7d-0x9z9y1a2b3d",
  rorMusic_020: "6b8e9d0g-7b2c-1d3e-5f6g-7b8c9d0e1f2g",
  rorMusic_021: "7A9B2E1D-4F8C-3D6A-9E2B-1C4F3FJY6HGd",
  rorMusic_022: "f0406d2b-e7a3-4cf5-9f56-5b081bba2dbb",
  rorMusic_023: "64e0015c-f4a9-4b93-8352-795e464736af",
  rorMusic_024: "cfcc80ce-bce3-445e-ab37-78409520338f",
  rorMusic_025: "3e4e6a60-fa63-484d-a777-0c0c8924f2c3",
  rorMusic_026: "02aec31e-8575-43e5-ba37-ac704da49524",
  rorMusic_027: "e1955d40-6c0b-4c97-a6c7-30e03c440188",
  rorMusic_028: "18ebf2ac-adde-4a17-8366-e6c7c121bf99",
  rorMusic_029: "7cb080c7-6988-4eaa-a9a5-5a34341f9288",
  rorMusic_030: "9e281028-d9e5-4557-b8ec-a61e74eebc87",
  rorMusic_031: "3029d759-7473-469e-a244-2304458d573e",
  rorMusic_032: "1576ec78-11e7-496e-9a6a-e0848d560ef7",
  rorMusic_033: "9429e9a0-1b0b-426c-890e-45004584e381",
  rorMusic_034: "1c5bbc52-515a-4d9a-be98-cbc2845cb8c8",
  rorMusic_035: "35ee11b6-fe8f-410f-8a02-2f01c4fe7d8d",
  rorMusic_036: "c954bd7f-c2fb-4838-9d94-2e1f2c18f270",
  rorMusic_037: "a8b2c4d6-e8f0-42a5-93b7-c1d3e5f7a9b1",
  rorMusic_038: "b9c3d5e7-f9e1-53b6-84c9-d2e4f6a8b0c2",
  rorMusic_039: "c0d4e6f8-0a2b-64c7-95d8-e3f5a7b9c1d3",
  rorMusic_040: "d1e5f7a9-1b2c-75d8-a6e9-f4a6b8c0d2e4",
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
        it: "Inno - Canti Con Magdalena",
      },
      songLyrics: AnthemLyrics(),
      songAlbum: "Sing With Magdalene",
    },
    {
      songId: SONG_UUIDS.rorMusic_004,
      songFile: Splendor,
      songName: {
        en: "Splendor I",
        it: "Splendore I",
      },
      songLyrics: SplenderSongLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_005,
      songFile: Splendor2,
      songName: {
        en: "The Splendor II",
        it: "Un Splendore II",
      },
      songLyrics: SplenderSong2Lyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_006,
      songFile: DeoGratias,
      songName: {
        en: "Deo Gratias - Cottolengo",
        it: "Deo Gratias - Cottolengo",
      },
      songLyrics: CottolengoAnthemLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_007,
      songFile: DeoGratiasIt,
      songName: {
        en: "Deo Gratias (italian)",
        it: "Deo Gratias (italiano)",
      },
      songLyrics: CottolengoAnthemItalianLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_008,
      songFile: DeoGratiasFM,
      songName: {
        en: "Deo Gratias (Female voice)",
        it: "Deo Gratias (voce femminile)",
      },
      songLyrics: DeoGratiasFMVLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_009,
      songFile: Divine,
      songName: {
        en: "Divine Providence",
        it: "Divinia Providenzza",
      },
      songLyrics: DivenProvLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_010,
      songFile: Divine2,
      songName: {
        en: "Divine Providence (Soft version)",
        it: "Divinia Providenzza (Versione soft)",
      },
      songLyrics: DivineFMVLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_011,
      songFile: DivineIt,
      songName: {
        en: "Divine Providence (Italian)",
        it: "Divinia Providenzza(Italiano)",
      },
      songLyrics: DivneITLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_012,
      songFile: Congrats,
      songName: {
        en: "Congratulations",
        it: "Congratulazioni",
      },
      songLyrics: [],
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_013,
      songFile: Boomerang3,
      songName: {
        en: "Boomerang Love",
        it: "Amore Boomerang",
      },
      songLyrics: BoomerangLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_016,
      songFile: Boomerang4,
      songName: {
        en: "Boomerang Love (Italian)",
        it: "Amore Boomerang(Italiano)",
      },
      songLyrics: [],
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_014,
      songFile: Boomerang2,
      songName: {
        en: "Boomerang Love (Soft version)",
        it: "Amore Boomerang (versione soft)",
      },
      songLyrics: [],
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_015,
      songFile: Boomerang,
      songName: {
        en: "Boomerang Love (Country version)",
        it: "Amore Boomerang (versione country)",
      },
      songLyrics: [],
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_017,
      songFile: VisionShortSong,
      songName: {
        en: "Roses of Rome Vision",
        it: "Visione delle Rose di Roma",
      },
      songLyrics: VisionShortLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_018,
      songFile: VisionShortSongIt,
      songName: {
        en: "Roses of Rome Vision (Italian)",
        it: "Visione delle Rose di Roma (Italiano)",
      },
      songLyrics: VisionItalianLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_019,
      songFile: WelcomSongMale,
      songName: {
        en: "Welcome (Male version)",
        it: "Benvenuti (Versione Male",
      },
      songLyrics: WelcomeSongMaleLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_020,
      songFile: WelcomeSongFemale,
      songName: {
        en: "Welcome (Female version)",
        it: "Benvenuti(Versione feminile)",
      },
      songLyrics: WelcomeSongFemaleLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_021,
      songFile: WelcomeSongIt,
      songName: {
        en: "Welcome (Italian)",
        it: "Benvenuti(Italiano)",
      },
      songLyrics: WelcomeSongItalian(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_022,
      songFile: VisionFemale,
      songName: {
        en: "Roses Of Rome Vision (Female)",
        it: "Rosa Di Roma Visione (Feminile)",
      },
      songLyrics: VisionFemaleLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_023,
      songFile: VisionDuet,
      songName: {
        en: "Roses Of Rome Vision (Duet)",
        it: "Rosa Di Roma Visione (Duet)",
      },
      songLyrics: VisionDuetLyrics(),
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_024,
      songFile: Everything,
      songName: {
        en: "Everything to see you again (Remix)",
        it: "Tutto per rivederti (RMX)",
      },
      songLyrics: [],
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_025,
      songFile: Tutto,
      songName: {
        en: "Everything to see you again",
        it: "Tutto per rivederti",
      },
      songLyrics: [],
      songAlbum: "Roses Of Rome",
    },
    {
      songId: SONG_UUIDS.rorMusic_026,
      songFile: Reputation,
      songName: {
        en: "Reputation",
        it: "Reputazione",
      },
      songLyrics: ,
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_027,
      songFile: ReputationDuet,
      songName: {
        en: "Reputation Duet",
        it: "Reputazione Duetto",
      },
      songLyrics: [],
      songAlbum: "Cantabile",
    },
     {
      songId: SONG_UUIDS.rorMusic_028,
      songFile: ReputationVocal,
      songName: {
        en: "Reputation vocal",
        it: "Reputazione vocale",
      },
      songLyrics: [],
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_029,
      songFile: Everythings,
      songName: {
        en: "Everything to see you again (Duet)",
        it: "Tutto per rivederti (Duettto)",
      },
      songLyrics: EverythingDuetLyrics(),
      songAlbum: "Cantabile",
    },
  ];
  return songs;
}
 