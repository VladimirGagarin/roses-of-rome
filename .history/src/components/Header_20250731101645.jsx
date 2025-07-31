import { FaHome, FaVideo, } from "react-icons/fa";
export default function Header() {
    const tabs = [
        {tabName: "Home", icon: <FaHome/>, path: "pages"}
    ]
    return <h1>Hello how are you Header</h1>;
}