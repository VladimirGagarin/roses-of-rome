import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import LanguageProvider from "./context/LanguageContext.jsx";
import VideoOverlayProvider from "./context/VideoOverlayContext.jsx";
import YouTubeOverlay from "./ui/YouTubeOverlay.jsx";
import Home from "./pages/Home.jsx";
import Films from "./pages/Films.jsx";
import Music from "./pages/Music.jsx";
import Shorts from "./pages/Shorts.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "films", element: <Films /> },
        { path: "music", element: <Music /> },
        { path: "music/:songSlug", element: <Music /> },
        { path: "shorts", element: <Shorts /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL || "/" }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <VideoOverlayProvider>
        <RouterProvider router={router} />
        <YouTubeOverlay />
      </VideoOverlayProvider>
    </LanguageProvider>
  </StrictMode>
);