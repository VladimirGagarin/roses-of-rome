import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import LanguageProvider from './components/LanguageContext.jsx';
import  {createHashRouter, RouterProvider } from "react-router-dom"
import { HomeScreen } from './pages/HomeScreen.jsx';


const routes = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "home" element: <HomeScreen /> },
      {path: "videos"}
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={routes}/>
    </LanguageProvider>
  </StrictMode>,
)
