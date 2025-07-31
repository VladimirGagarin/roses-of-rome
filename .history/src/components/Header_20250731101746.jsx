import { FaHome, FaVideo, } from "react-icons/fa";
export default function Header() {
    const tabs = [
        { tabName: "Home", icon: <FaHome />, path: "pages/home" },
        {tabName: "Videos", icon: <FaVideo/>, path: "pages/home"}
    ]
    return <h1>Hello how are you Header</h1>;
}