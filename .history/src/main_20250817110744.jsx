import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import LanguageProvider from './components/LanguageContext.jsx';
import  {createHashRouter, RouterProvider, Navigate } from "react-router-dom"
import  HomeScreen from './pages/HomeScreen.jsx';
import VideoScreen from './pages/VideoScreen.jsx';
import PlaylistScreen from './pages/PlaylistScreen.jsx';
import ShortsScreen from './pages/Shorts.jsx';
import SearchScreen from './pages/Search.jsx';
import VideoPlayerScreen from "./pages/VideoPlayerScreen.jsx";
import ShareScreen from './pages/ShareScreen.jsx';
import EmbedSong from './pages/EmbededSong.jsx';

const routes = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "pages/home", element: <HomeScreen replace /> },
      { path: "pages/videos", element: <VideoScreen /> },
      { path: "pages/playlist", element: <PlaylistScreen /> },
      { path: "pages/shorts", element: <ShortsScreen /> },
      { path: "pages/notifications", element: <SearchScreen /> },
      { path: "pages/vid/:id", element: <VideoPlayerScreen /> },
    ],
  },
  {
    path: "pages/share/:id",
    element: <ShareScreen/>
  },
  {},
  { path: '*', element: <Navigate to="pages/home" replace /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={routes}/>
    </LanguageProvider>
  </StrictMode>,
)
