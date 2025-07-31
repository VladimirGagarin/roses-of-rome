import { Outlet } from 'react-router-dom'
import Navs from './components/Header'
import BannerHead from './components/Banner';
import homePhoto from "./assets/images/banner4_chane";
import './App.css';
import AboutComponent from './components/About';

function App() {
  
  

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
