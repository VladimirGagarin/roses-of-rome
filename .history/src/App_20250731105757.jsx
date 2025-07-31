import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import BannerHead from './components/Banner';
import homePhoto  from "./assets"
import './App.css';

function App() {
  

  return (
    <div className="app-container">
      <header>
        <BannerHead mediaType=''/>
        <Header />
      </header>
      <Outlet />
    </div>
  );
}

export default App
