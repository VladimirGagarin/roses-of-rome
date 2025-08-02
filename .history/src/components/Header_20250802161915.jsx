import { FaHome, FaVideo, FaListUl, FaBolt, FaBell } from "react-icons/fa";
import { useNavigate, useLocation,Link } from "react-router-dom";
import "./Header.css";
import { useLanguage } from "./LanguageContext";

export default function Navs() {
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
      tabName: { en: "Songs", it: "Canzoni" },
      icon: <FaListUl />,
      path: "/pages/playlist",
    },
    {
      tabName: { en: "Shorts", it: "Corti" },
      icon: <FaBolt />,
      path: "/pages/shorts",
    },
    {
      tabName: {
        en: "Notifications",
        it: "Notifiche",
      },
      icon: <FaBell />,
      path: "/pages/notifications",
    },
  ];


  return (
    <nav className="yt-header-nav">
      <div className="yt-tab-container">
        {tabs.map((tab, idx) => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <Link to={}>
            <div
              key={idx}
              className={`yt-tab ${isActive ? "active" : ""}`}
              
            >
              <span className="yt-icon">{tab.icon}</span>
              <span className="yt-text">
                {typeof tab.tabName === "string"
                  ? tab.tabName
                  : language === "it"
                  ? tab.tabName.it
                  : tab.tabName.en}
              </span>
            </div>
          );
        })}
        <div
          className="yt-slider"
          style={{
            transform: `translateX(${
              tabs.findIndex((t) => location.pathname.includes(t.path)) * 100
            }%)`,
          }}
        />
      </div>
    </nav>
  );
}
