import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";

export default function Quotes() {
    const { language } = useLanguage();
    const RosesOfRomeQuotes = [
        {quote: {en: "Life is a journey, not a destination.", it: "La vita è un viaggio, non una destinazione."}, type: {en:"Life", it:"Vita"}},
        {quote: {en: "Love knows no bounds.", it: "L'amore non conosce confini."}, type: {en:"Love", it:"Amore"}},
        { quote: { en: "In the end, we only regret the chances we didn't take.", it: "Alla fine, ci pentiamo solo delle opportunità che non abbiamo colto." }, type: { en: "Regret", it: "Rimpianto" } },
        // music
        { quote: { en: "Where words fail, music speaks.", it: "Dove le parole falliscono, la musica parla." }, type: { en: "Music", it: "Musica" } }
    ]
 }