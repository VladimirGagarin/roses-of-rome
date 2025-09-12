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
import Boomerang5 from "../assets/audios/boomerang (airwave).mp3";
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
import CottolengoSisters from "../assets/audios/suor.mp3";
import CottolengoSistersRMX from "../assets/audios/suor _rmx.mp3";
import CottolengoSistersIT from "../assets/audios/suor_it.mp3";
import ForeverBlessed from "../assets/audios/bless.mp3";
import CompassSong from "../assets/audios/compass.mp3";
import SWMAnthem2 from "../assets/audios/soft_anthem.mp3";
import SomewhereSong from "../assets/audios/somewea.mp3";
import SoulSong from "../assets/audios/soul.mp3";
import Danube from "../assets/audios/danube.mp3";
import SecondWaltz from "../assets/audios/waltz2.mp3";
import Spring from "../assets/audios/spring.mp3";
import Figaro from "../assets/audios/figaro.mp3";
import Kleine from "../assets/audios/kleine.mp3";
import Offenbach from "../assets/audios/offenbach.mp3";
import NearerMyGod from "../assets/audios/nearer.mp3";
import ForeverSong from "../assets/audios/forever.mp3";
import DeoGratias5 from "../assets/audios/DEOGRATIAS5.mp3";
import FriendSong from "../assets/audios/jess.mp3";
import CottolengoSistersDuet from "../assets/audios/suor_duet.mp3";
import CinemaGratias from "../assets/audios/gratias2.mp3"; // album Piccola Casa della Gioia
import SingingBird from "../assets/audios/singing_bird.mp3";
import PrayerSongVersion2 from "../assets/audios/prayer2.mp3";

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
  EverythingDuetLyrics,
  ReputationLyrics,
  EverythingRMXLyrics,
  ReputationDuetLyrics,
  CottolengoSisterRMXLyrics,
  CottolengoSisterRMXLyricsIT,
  BoomerangAirwaveLyrics,
  CongratsLyrics,
  BoomerangFemaleLyrics,
  BoomerangITLyrics,
  softAnthemLyrics,
  SomewhereFemLy,
  BoomerangLyricsCountry,
  ReputationVocalLyrics,
  DeoGratias5Lyrics,
  EverythingsLyrics,
  JessLyrics,
  CinemaGratiasLyrics,
  SuorLyrics,
  CottolengoSistersDuetLyrics,
  ForeverLyrics,
  SingingBirdSongLyrics,
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
  rorMusic_041: "e2f6a8b0-2c3d-86e9-b7f0-g5h6i7j8k9l0",
  rorMusic_042: "f3g7h8i9-j0k1-2345-6789-0abcdef12345",
  rorMusic_043: "a2b3c4d5-e6f7-8901-2345-67890abcdef2",
  rorMusic_044: "b3c4d5e6-f7g8-9012-3456-7890abcdef23",
  rorMusic_045: "c4d5e6f7-g8h9-0123-4567-890abcdef234",
  rorMusic_046: "d5e6f7g8-h9i0-1234-5678-90abcdef2345",
  rorMusic_047: "e6f7g8h9-i0j1-2345-6789-0abcdef23456",
  rorMusic_048: "f7g8h9i0-j1k2-3456-7890-abcdef234567",
  rorMusic_049: "g8h9i0j1-k2l3-4567-8901-bcdef2345678",
  rorMusic_050: "h9i0j1k2-l3m4-5678-9012-cdef23456789",
  rorMusic_051: "i0j1k2l3-m4n5-6789-0123-def234567890",
  rorMusic_052: "j1k2l3m4-n5o6-7890-1234-ef2345678901",
  rorMusic_053: "k2l3m4n5-o6p7-8901-2345-f23456789012",
  rorMusic_054: "l3m4n5o6-p7q8-9012-3456-234567890123",
  rorMusic_055: "m4n5o6p7-q8r9-0123-4567-345678901234",
  rorMusic_056: "n5o6p7q8-r9s0-1234-5678-456789012345",
  rorMusic_057: "o6p7q8r9-s0t1-2345-6789-567890123456",
  rorMusic_058: "p7q8r9s0-t1u2-3456-7890-678901234567",
  rorMusic_059: "q8r9s0t1-u2v3-4567-8901-789012345678",
  rorMusic_060: "r9s0t1u2-v3w4-5678-9012-890123456789",
  
};

export function RosesOfRomeSongs() {
  const songs = [
    {
      songId: SONG_UUIDS.rorMusic_001,
      songFile: RomeOne,
      songName: {
        en: "Roses Of Rome: The Sonnet",
        it: "Rose Di Roma: Il Sonetto",
      },
      songLyrics: sonnet2Lyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_002,
      songFile: RomeTwo,
      songName: {
        en: "Roses Of Rome: The Sonnet (Epic)",
        it: "Rose Di Roma: Il Sonetto (Epico)",
      },
      songLyrics: SonnetLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_003,
      songFile: SWMAnthem,
      songName: {
        en: "Anthem - Sing With Magdalene",
        it: "Inno - Canta con Maddalena",
      },
      songLyrics: AnthemLyrics(),
      songAlbum: "SWM",
    },
    {
      songId: SONG_UUIDS.rorMusic_004,
      songFile: Splendor,
      songName: {
        en: "Splendor I",
        it: "Splendore I",
      },
      songLyrics: SplenderSongLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_005,
      songFile: Splendor2,
      songName: {
        en: "The Splendor II",
        it: "Lo Splendore II",
      },
      songLyrics: SplenderSong2Lyrics(),
      songAlbum: "Cantabile",
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
      songId: SONG_UUIDS.rorMusic_047,
      songFile: DeoGratias5,
      songName: {
        en: "Deo Gratias (choir)",
        it: "Deo Gratias (coro)",
      },
      songLyrics: DeoGratias5Lyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_054,
      songFile: CinemaGratias,
      songName: {
        en: "Cinema Gratias",
        it: "Cinema Gratias",
      },
      songLyrics: CinemaGratiasLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_009,
      songFile: Divine,
      songName: {
        en: "Divine Providence",
        it: "Divina Provvidenza",
      },
      songLyrics: DivenProvLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_010,
      songFile: Divine2,
      songName: {
        en: "Divine Providence (Soft version)",
        it: "Divina Provvidenza (Versione soft)",
      },
      songLyrics: DivineFMVLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_011,
      songFile: DivineIt,
      songName: {
        en: "Divine Providence (Italian)",
        it: "Divina Provvidenza (Italiano)",
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
      songLyrics: CongratsLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_013,
      songFile: Boomerang3,
      songName: {
        en: "Boomerang Love",
        it: "Amore Boomerang",
      },
      songLyrics: BoomerangLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_016,
      songFile: Boomerang4,
      songName: {
        en: "Boomerang Love (Italian)",
        it: "Amore Boomerang (Italiano)",
      },
      songLyrics: BoomerangITLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_014,
      songFile: Boomerang2,
      songName: {
        en: "Boomerang Love (Soft version)",
        it: "Amore Boomerang (versione soft)",
      },
      songLyrics: BoomerangFemaleLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_015,
      songFile: Boomerang,
      songName: {
        en: "Boomerang Love (Country version)",
        it: "Amore Boomerang (versione country)",
      },
      songLyrics: BoomerangLyricsCountry(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_033,
      songFile: Boomerang5,
      songName: {
        en: "Boomerang of Love (EDM)",
        it: "Boomerang dell'Amore (EDM)",
      },
      songLyrics: BoomerangAirwaveLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_017,
      songFile: VisionShortSong,
      songName: {
        en: "Roses of Rome Vision",
        it: "Visione delle Rose di Roma",
      },
      songLyrics: VisionShortLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_018,
      songFile: VisionShortSongIt,
      songName: {
        en: "Roses of Rome Vision (Italian)",
        it: "Visione delle Rose di Roma (Italiano)",
      },
      songLyrics: VisionItalianLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_019,
      songFile: WelcomSongMale,
      songName: {
        en: "Welcome (Male version)",
        it: "Benvenuto (Versione maschile)",
      },
      songLyrics: WelcomeSongMaleLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_020,
      songFile: WelcomeSongFemale,
      songName: {
        en: "Welcome (Female version)",
        it: "Benvenuta (Versione femminile)",
      },
      songLyrics: WelcomeSongFemaleLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_021,
      songFile: WelcomeSongIt,
      songName: {
        en: "Welcome (Italian)",
        it: "Benvenuto (Italiano)",
      },
      songLyrics: WelcomeSongItalian(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_022,
      songFile: VisionFemale,
      songName: {
        en: "Roses Of Rome Vision (Female)",
        it: "Visione delle Rose di Roma (Femminile)",
      },
      songLyrics: VisionFemaleLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_023,
      songFile: VisionDuet,
      songName: {
        en: "Roses Of Rome Vision (Duet)",
        it: "Visione delle Rose di Roma (Duetto)",
      },
      songLyrics: VisionDuetLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_024,
      songFile: Everything,
      songName: {
        en: "Everything to see you again (Remix)",
        it: "Tutto per rivederti (Remix)",
      },
      songLyrics: EverythingRMXLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_025,
      songFile: Tutto,
      songName: {
        en: "Everything to see you again",
        it: "Tutto per rivederti",
      },
      songLyrics: EverythingsLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_029,
      songFile: Everythings,
      songName: {
        en: "Everything to see you again (Duet)",
        it: "Tutto per rivederti (Duetto)",
      },
      songLyrics: EverythingDuetLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_026,
      songFile: Reputation,
      songName: {
        en: "Reputation",
        it: "Reputazione",
      },
      songLyrics: ReputationLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_027,
      songFile: ReputationDuet,
      songName: {
        en: "Reputation Duet",
        it: "Reputazione Duetto",
      },
      songLyrics: ReputationDuetLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_028,
      songFile: ReputationVocal,
      songName: {
        en: "Reputation vocal",
        it: "Reputazione vocale",
      },
      songLyrics: ReputationVocalLyrics(),
      songAlbum: "Cantabile",
    },
    {
      songId: SONG_UUIDS.rorMusic_030,
      songFile: CottolengoSisters,
      songName: {
        en: "Cottolengo Sisters",
        it: "Suore Cottolengo",
      },
      songLyrics: SuorLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_049,
      songFile: CottolengoSistersDuet,
      songName: {
        en: "Cottolengo Sisters (Duet)",
        it: "Suore Cottolengo (Duetto)",
      },
      songLyrics: CottolengoSistersDuetLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_031,
      songFile: CottolengoSistersRMX,
      songName: {
        en: "Cottolengo Sisters (RMX)",
        it: "Suore Cottolengo (RMX)",
      },
      songLyrics: CottolengoSisterRMXLyrics(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_032,
      songFile: CottolengoSistersIT,
      songName: {
        en: "Cottolengo Sisters (Italian)",
        it: "Suore Cottolengo (Italiano)",
      },
      songLyrics: CottolengoSisterRMXLyricsIT(),
      songAlbum: "Piccola Casa della Gioia",
    },
    {
      songId: SONG_UUIDS.rorMusic_035,
      songFile: CompassSong,
      songName: {
        en: "Compass",
        it: "Bussola",
      },
      songLyrics: [],
      songAlbum: "Merito",
      songLink: "https://youtu.be/GR3qkECLJbw?list=RDGR3qkECLJbw",
    },
    {
      songId: SONG_UUIDS.rorMusic_036,
      songFile: SWMAnthem2,
      songName: {
        en: "Anthem - Sing With Magdalene (soft version)",
        it: "Inno - Canta con Maddalena (versione soft)",
      },
      songLyrics: softAnthemLyrics(),
      songAlbum: "SWM",
    },
    {
      songId: SONG_UUIDS.rorMusic_037,
      songFile: SomewhereSong,
      songName: {
        en: "Somewhere",
        it: "Da qualche parte",
      },
      songLyrics: SomewhereFemLy(),
      songAlbum: "SWM",
    },
    {
      songId: SONG_UUIDS.rorMusic_038,
      songFile: SoulSong,
      songName: {
        en: "How great thou art",
        it: "Quanto sei grande",
      },
      songLyrics: [],
      songAlbum: "Merito",
      songLink: "https://youtu.be/awiFgicTP8E?list=RDawiFgicTP8E",
    },
    {
      songId: SONG_UUIDS.rorMusic_039,
      songFile: Danube,
      songName: {
        en: "Danube",
        it: "Danubio",
      },
      songLyrics: [],
      songAlbum: "Merito",
      songLink: "https://youtu.be/_CTYymbbEL4?list=RD_CTYymbbEL4",
    },
    {
      songId: SONG_UUIDS.rorMusic_040,
      songFile: SecondWaltz,
      songName: {
        en: "The Second Waltz",
        it: "Il Secondo Valzer",
      },

      songAlbum: "Merito",
      songLink: "https://www.youtube.com/watch?v=mmCnQDUSO4I",
    },
    {
      songId: SONG_UUIDS.rorMusic_041,
      songFile: Spring,
      songName: {
        en: "Voice of Spring",
        it: "Voce di Primavera",
      },
      songAlbum: "Merito",
      songLink: "https://youtu.be/qqm9jaM5UPA?list=RDqqm9jaM5UPA",
    },
    {
      songId: SONG_UUIDS.rorMusic_042,
      songFile: Figaro,
      songName: {
        en: "The Marriage of Figaro",
        it: "Le nozze di Figaro",
      },
      songAlbum: "Merito",
      songLink: "https://youtu.be/lT7iLG-UCdE?list=RDlT7iLG-UCdE",
    },
    {
      songId: SONG_UUIDS.rorMusic_043,
      songFile: Kleine,
      songName: {
        en: "Eine Kleine Nachtmusik",
        it: "Eine Kleine Nachtmusik",
      },
      songLyrics: [],
      songAlbum: "Merito",
      songLink: "https://youtu.be/oy2zDJPIgwc?list=RDoy2zDJPIgwc",
    },
    {
      songId: SONG_UUIDS.rorMusic_044,
      songFile: NearerMyGod,
      songName: { en: "Nearer My God To Thee", it: "Avvicinati, o Dio" },
      songLyrics: [],
      songAlbum: "Merito",
      songLink: "https://youtu.be/gWz4feHp0ko?list=RDgWz4feHp0ko",
    },
    {
      songId: SONG_UUIDS.rorMusic_045,
      songFile: Offenbach,
      songName: { en: "Offenbach Can Can Music", it: "Offenbach Can Can" },
      songLyrics: [],
      songAlbum: "Merito",
      songLink: "https://youtu.be/4Diu2N8TGKA?list=RD4Diu2N8TGKA",
    },
    {
      songId: SONG_UUIDS.rorMusic_046,
      songFile: ForeverSong,
      songName: { en: "Forever", it: "Per Sempre" },
      songLyrics: ForeverLyrics(),
      songAlbum: "Rosa",
    },
    {
      songId: SONG_UUIDS.rorMusic_048,
      songFile:FriendSong,
      songName: {
        en:"Friend (Jessica's Song)",
        it:"Amica (Canzone di Jessica)"
      },
      songLyrics: JessLyrics(),
      songAlbum: "Cantabile",
      
    },
    {
      songId: SONG_UUIDS.rorMusic_050,
      songFile: SingingBird,
      songName: {
        en: "The Singing Bird",
        it: "L'uccello che canta",
      },
      songLyrics: SingingBirdSongLyrics(),
      songAlbum: "SWM",
    },
    {
      songId: SONG_UUIDS.rorMusic_051,
      songFile: PrayerSongVersion2,
      
    //  {
    //     songId:SONG_UUIDS.rorMusic_034,
    //     songFile: ForeverBlessed,
    //     songName: {
    //       en: "Forever Blessed",
    //       it: "Per Sempre Benedetto",
    //     },
    //     songLyrics: [],
    //     songAlbum: "Rosa",
    //   },
  ];
  return songs;
}
