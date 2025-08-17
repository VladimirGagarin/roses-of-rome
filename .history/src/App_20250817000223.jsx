import { Outlet } from 'react-router-dom'
import Navs from './components/Header'
import BannerHead from './components/Banner';
import homePhoto from "./assets/images/banner_01.jpeg";
import './App.css';
import AboutComponent from './components/About';
import { useEffect, useState } from 'react';
import { useLanguage } from './components/LanguageContext';
import WelcomeSongIt from "./assets/audios/welcome_it.mp3";
import WelcomeSongFemaleIntro from "./assets/audios/welcome_female_intro.mp3";
import AudioComponent from './components/AudioPlayer';

function App() {
  const { setLanguage, language } = useLanguage();
  const [isFromStart, setIsFromStart] = useState(window.location.pathname === "/");
  
 useEffect(() => {
   const userLanguage = navigator.language.toLowerCase();

   // Accept Italian variants like it, it-IT, it-CH
   if (userLanguage.startsWith("it")) {
     setLanguage("it");
   } else {
     setLanguage("en");
   }
 }, [setLanguage]);



  useEffect(() => {
    const today = new Date().toDateString(); 
    const lastVisit = localStorage.getItem("lastVisitDate");

    if (lastVisit !== today) {
      // Clear videoPermissions for a new day
      localStorage.removeItem("videoPermissions");
      localStorage.setItem("lastVisitDate", today);
    }
  }, []);

  

  return (
    <div className="app-container">
      <header>
        <BannerHead mediaType="image" src={homePhoto} alt="Roses of Rome" />
        <AboutComponent />
        {isFromStart && (
        <div className="audio-wrapper">
          <AudioComponent
            audioFile={
              language === "it" ? WelcomeSongIt : WelcomeSongFemaleIntro
            }
            title={language === "it" ? "Benvenuti" : "Welcome"}
          />
        </div>
          
        <Navs />
      </header>
      <Outlet />
      {/* <footer className="footer">
        <a
          href="https://vladimirgagarin.github.io/Cottolengo-Alumini/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === "it" ? "Incontra i Creatori" : "Meet the Creators"}
        </a>
      </footer> */}
    </div>
  );
}

export default App
