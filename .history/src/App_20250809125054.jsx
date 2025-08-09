import { Outlet } from 'react-router-dom'
import Navs from './components/Header'
import BannerHead from './components/Banner';
import homePhoto from "./assets/images/banner_01.jpeg";
import './App.css';
import AboutComponent from './components/About';
import { useEffect } from 'react';
import { useLanguage } from './components/LanguageContext';

function App() {
  const { language ,setLanguage } = useLanguage();
  
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
    const today = new Date().toDateString(); // e.g. "Wed Aug 06 2025"
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
        <Navs />
      </header>
      <Outlet />
      <footer>
        <a href="https://vladimirgagarin.github.io/Cottolengo-Alumini/">{ language === "it" : }</a>
      </footer>
    </div>
  );
}

export default App
