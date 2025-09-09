import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";

export default function Quotes() {
    const { language } = useLanguage();
    const RosesOfRomeQuotes = [
    // life
        { quote: { en: "Life is a journey, not a destination.", it: "La vita è un viaggio, non una destinazione." }, type: { en: "Life", it: "Vita" } },
        
        {quote: {en: "Love knows no bounds.", it: "L'amore non conosce confini."}, type: {en:"Love", it:"Amore"}},
        { quote: { en: "In the end, we only regret the chances we didn't take.", it: "Alla fine, ci pentiamo solo delle opportunità che non abbiamo colto." }, type: { en: "Regret", it: "Rimpianto" } },
        // music
        { quote: { en: "Where words fail, music speaks.", it: "Dove le parole falliscono, la musica parla." }, type: { en: "Music", it: "Musica" } },
        { quote: { en: "Music is the universal language of mankind.", it: "La musica è il linguaggio universale dell'umanità." }, type: { en: "Music", it: "Musica" } },
        { quote: { en: "Music can change the world because it can change people.", it: "La musica può cambiare il mondo perché può cambiare le persone." }, type: { en: "Music", it: "Musica" } },
        // art
        { quote: { en: "Art enables us to find ourselves and lose ourselves at the same time.", it: "L'arte ci permette di trovarci e perderci allo stesso tempo." }, type: { en: "Art", it: "Arte" } },
        { quote: { en: "Every artist was first an amateur.", it: "Ogni artista è stato prima un dilettante." }, type: { en: "Art", it: "Arte" } },
        { quote: { en: "Art is not what you see, but what you make others see.", it: "L'arte non è ciò che vedi, ma ciò che fai vedere  agli altri." }, type: { en: "Art", it: "Arte" } },
        // dreams
        { quote: { en: "The future belongs to those who believe in the beauty of their dreams.", it: "Il futuro appartiene a coloro che credono nella bellezza dei propri sogni." }, type: { en: "Dreams", it: "Sogni" } },
    ]
 }