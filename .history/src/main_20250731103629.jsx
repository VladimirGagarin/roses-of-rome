import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import LanguageProvider from './components/LanguageContext.jsx';
import  {createHashRouter, RouterProvider } from "react-router-dom"
import  HomeScreen from './pages/HomeScreen.jsx';
import VideoScreen from './pages/VideoScreen.jsx';
import PlaylistScreen from './pages/PlaylistScreen.jsx';


const routes = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "pages/home", element: <HomeScreen /> },
      { path: "pages/videos", element: <VideoScreen /> },
      { path: "pages/playlist", element: <PlaylistScreen /> },
      { path: "pages/shorts"}
    ],
  },
  {
    path: "*",
    element: <App/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={routes}/>
    </LanguageProvider>
  </StrictMode>,
)
