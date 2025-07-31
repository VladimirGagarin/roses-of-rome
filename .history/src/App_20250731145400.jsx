import { Outlet } from 'react-router-dom'
import Navs from './components/Header'
import BannerHead from './components/Banner';
import homePhoto from "./assets/images/banner.jpg";
import './App.css';
import AboutComponent from './components/About';
import { useEffect } from 'react';
import { useLanguage } from './components/LanguageContext';

function App() {
  
  useEffect(() => {
    const user
  }, [])
  

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
