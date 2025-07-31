import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import LanguageProvider from './components/LanguageContext.jsx';
import  {createHashRouter, RouterProvider } from "react-router-dom"


const routes = createHashRouter([
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App/>
    </LanguageProvider>
  </StrictMode>,
)
