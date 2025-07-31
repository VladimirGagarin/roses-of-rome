import { FaHome, FaVideo, FaListUl, FaBolt, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { useLanguage } from "./useLanguage";

export default function Header() {
  const navigate = useNavigate();
    const location = useLocation();
    const { language } = useLanguage();

  const tabs = [
    {
      tabName: { en: "Home", it: "Casa" },
      icon: <FaHome />,
      path: "/pages/home",
    },
    {
      tabName: { en: "Videos", it: "Video" },
      icon: <FaVideo />,
      path: "/pages/videos",
    },
    {
      tabName: { en: "Playlist", it: "Playlist" },
      icon: <FaListUl />,
      path: "/pages/playlist",
    },
    {
      tabName: { en: "Shorts", it: "Corti" },
      icon: <FaBolt />,
      path: "/pages/shorts",
    },
    {
      tabName: { en: "Search", it: "Cerca" },
      icon: <FaSearch />,
      path: "/pages/search",
    },
  ];


  return (
    <nav className="yt-header-nav">
      {tabs.map((tab, idx) => {
        const isActive = location.pathname.includes(tab.path);
        return (
          <div
            key={idx}
            className={`yt-tab ${isActive ? "active" : ""}`}
            onClick={() => navigate(tab.path)}
          >
            <span className="yt-icon">{tab.icon}</span>
            <span className="yt-text">{language === "en " ? tab.tabName.en : tab.tabName.it}</span>
          </div>
        );
      })}
    </nav>
  );
}
