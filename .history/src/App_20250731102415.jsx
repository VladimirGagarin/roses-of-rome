import { Outlet } from 'react-router-dom'
import  Header  from './components/Header'
import './App.css'

function App() {
  

  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
}

export default App
