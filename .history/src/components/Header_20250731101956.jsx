import { FaHome, FaVideo, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css"
export default function Header() {
    const tabs = [
        { tabName: "Home", icon: <FaHome />, path: "pages/home" },
        { tabName: "Videos", icon: <FaVideo />, path: "pages/home" },
        {tabName: "Playlist", icon: , path: "pages/playlist"}
    ]
    return <h1>Hello how are you Header</h1>;
}