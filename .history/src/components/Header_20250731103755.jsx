import { FaHome, FaVideo, FaListUl, FaBolt, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { useLanguage } from "./useLanguage";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { tabName: "Home", icon: <FaHome />, path: "/pages/home" },
    { tabName: "Videos", icon: <FaVideo />, path: "/pages/videos" },
    { tabName: "Playlist", icon: <FaListUl />, path: "/pages/playlist" },
    { tabName: "Shorts", icon: <FaBolt />, path: "/pages/shorts" },
    { tabName: "Search", icon: <FaSearch />, path: "/pages/search" },
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
            <span className="yt-text">{tab.tabName}</span>
          </div>
        );
      })}
    </nav>
  );
}
