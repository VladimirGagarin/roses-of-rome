import { Outlet } from 'react-router-dom'
import Navs from './components/Header'
import BannerHead from './components/Banner';
import homePhoto from "./assets/images/flag.jpeg";
import './App.css';
import AboutComponent from './components/About';
import { useEffect } from 'react';
import { useLanguage } from './components/LanguageContext';

function App() {
  const { setLanguage } = useLanguage();
  
 useEffect(() => {
   const userLanguage = navigator.language.toLowerCase();

   // Accept Italian variants like it, it-IT, it-CH
   if (userLanguage.startsWith("it")) {
     setLanguage("it");
   } else {
     setLanguage("en");
   }
 }, [setLanguage]);

  

  return (
    <div className="app-container">
      <header>
        <BannerHead mediaType="image" src={homePhoto} alt='Roses of Rome' />
        <AboutComponent/>
        <Navs />
      </header>
      <Outlet />
    </div>
  );
}

export default App
