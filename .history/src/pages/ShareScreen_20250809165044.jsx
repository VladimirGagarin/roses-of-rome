import {useParams, useNavigate} from "react-router0dom";
import { RosesOfRomeSongs } from "../components/Songs.js";
import AudioComponent from "../components/AudioPlayer.jsx";

import { useState, useEffect } from "react";

export default function ShareScreen() {
    const navigate = useNavigate();
    const { id } = useParams();


    return ()
}