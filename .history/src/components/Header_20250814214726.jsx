import { FaHome, FaVideo, FaListUl, FaBolt, FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { useLanguage } from "./LanguageContext";
import { useState } from "react";

export default function Navs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
      const handleOnline = () => {
        setIsOnline(true);
         setLoading(false);
         setStalled(false);
         setError(null);
      };
      const handleOffline = () => {
        setIsOnline(false);
        
      };
  
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
  
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }, []);

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
    // {
    //   tabName: {
    //     en: "Notifications",
    //     it: "Notifiche",
    //   },
    //   icon: <FaBell />,
    //   path: "/pages/notifications",
    // },
  ];

  const shouldShowNav = tabs.some(
    (tab) => location.pathname === tab.path || location.pathname === "/" // Show on home if using root
  );

  if (!shouldShowNav) return null; // Hide nav completely

  return (
    <nav className="yt-header-nav">
      <div className="yt-tab-container">
        {tabs.map((tab, idx) => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <div
              key={idx}
              className={`yt-tab ${isActive ? "active" : ""}`}
              onClick={() => navigate(tab.path)}
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
      </div>
    </nav>
  );
}
