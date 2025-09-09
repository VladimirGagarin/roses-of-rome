import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "./LanguageContext";
import "../index.css";

export default function Quotes() {
    const { language } = useLanguage();
    const RosesOfRomeQuotes = [
        // life
        { quote: { en: "Life is a journey, not a destination.", it: "La vita è un viaggio, non una destinazione." }, type: { en: "Life", it: "Vita" } },
        { quote: { en: "To live is the rarest thing in the world. Most people exist, that is all.", it: "Vivere è la cosa più rara al mondo. La maggior parte delle persone esiste, tutto qui." }, type: { en: "Life", it: "Vita" } },
        { quote: { en: "Life is really simple, but we insist on making it complicated.", it: "La vita è davvero semplice, ma noi insistiamo a renderla complicata." }, type: { en: "Life", it: "Vita" } },
        { quote: { en: "Life is what happens when you're busy making other plans.", it: "La vita è ciò che accade mentre sei occupato a fare altri piani." }, type: { en: "Life", it: "Vita" } },
        { quote: { en: "Life is either a daring adventure or nothing at all.", it: "La vita è o un'audace avventura o niente di tutto ciò." }, type: { en: "Life", it: "Vita" } },
        // friendship
        { quote: { en: "A real friend is one who walks in when the rest of the world walks out.", it: "Un vero amico è colui che entra quando il resto del mondo esce." }, type: { en: "Friendship", it: "Amicizia" } },
        { quote: { en: "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'", it: "L'amicizia nasce nel momento in cui una persona dice a un'altra: 'Cosa! Anche tu? Pensavo di essere l'unico.'" }, type: { en: "Friendship", it: "Amicizia" } },
        { quote: { en: "True friendship comes when the silence between two people is comfortable.", it: "La vera amicizia arriva quando il silenzio tra due persone è confortevole." }, type: { en: "Friendship", it: "Amicizia" } },
        // love
        { quote: { en: "Love knows no bounds.", it: "L'amore non conosce confini." }, type: { en: "Love", it: "Amore" } },
        { quote: { en: "Where there is love there is life.", it: "Dove c'è amore c'è vita." }, type: { en: "Love", it: "Amore" } },
        { quote: { en: "Love is composed of a single soul inhabiting two bodies.", it: "L'amore è composto da un'unica anima che abita due corpi." }, type: { en: "Love", it: "Amore" } },
        { quote: { en: "The best thing to hold onto in life is each other.", it: "La cosa migliore a cui aggrapparsi nella vita è l'un l'altro." }, type: { en: "Love", it: "Amore" } },
        // hope
        { quote: { en: "Hope is being able to see that there is light despite all of the darkness.", it: "La speranza è essere in grado di vedere che c'è luce nonostante tutta l'oscurità." }, type: { en: "Hope", it: "Speranza" } },
        { quote: { en: "Once you choose hope, anything's possible.", it: "Una volta che scegli la speranza, tutto è possibile." }, type: { en: "Hope", it: "Speranza" } },
        { quote: { en: "Hope is the thing with feathers that perches in the soul—and sings the tunes without the words—and never stops at all.", it: "La speranza è la cosa con le piume che si posa nell'anima e canta le melodie senza le parole e non si ferma mai." }, type: { en: "Hope", it: "Speranza" } },
        // choices and courage
        { quote: { en: "It takes courage to grow up and become who you really are.", it: "Ci vuole coraggio per crescere e diventare chi sei veramente." }, type: { en: "Courage", it: "Coraggio" } },
        { quote: { en: "Courage is not the absence of fear, but rather the judgment that something else is more important than fear.", it: "Il coraggio non è l'assenza di paura, ma piuttosto il giudizio che qualcos'altro è più importante della paura." }, type: { en: "Courage", it: "Coraggio" } },
        { quote: { en: "You cannot swim for new horizons until you have courage to lose sight of the shore.", it: "Non puoi nuotare verso nuovi orizzonti finché non hai il coraggio di perdere di vista la riva." }, type: { en: "Courage", it: "Coraggio" } },
        // choices and Regret
        { quote: { en: "In the end, we only regret the chances we didn't take.", it: "Alla fine, ci pentiamo solo delle opportunità che non abbiamo colto." }, type: { en: "Regret", it: "Rimpianto" } },
        { quote: { en: "Regret for the things we did can be tempered by time; it is regret for the things we did not do that is inconsolable.", it: "Il rimpianto per le cose che abbiamo fatto può essere mitigato dal tempo; è il rimpianto per le cose che non abbiamo fatto che è inconsolabile." }, type: { en: "Regret", it: "Rimpianto" } },
        { quote: { en: "Never regret anything that made you smile.", it: "Non rimpiangere mai nulla che ti abbia fatto sorridere." }, type: { en: "Regret", it: "Rimpianto" } },
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
        { quote: { en: "All our dreams can come true, if we have the courage to pursue them.", it: "Tutti i nostri sogni possono diventare realtà, se abbiamo il coraggio di perseguirli." }, type: { en: "Dreams", it: "Sogni" } },
        { quote: { en: "You are never too old to set another goal or to dream a new dream.", it: "Non sei mai troppo vecchio per fissare un altro obiettivo o per sognare un nuovo sogno." }, type: { en: "Dreams", it: "Sogni" } },
        { quote: { en: "Dreams are the touchstones of our character.", it: "I sogni sono i punti di riferimento del nostro carattere." }, type: { en: "Dreams", it: "Sogni" } }
    ];

    const [currentQuote, setCurrentQuote] = useState({ quote: { en: "", it: "" }, type: { en: "", it: "" } });
    const allQuotesTypes = useMemo(() => {
        const types = RosesOfRomeQuotes.map(q => q.type.en);
        return ["All", ...new Set(types)];
    }, []);

    const [currentType, setCurrentType] = useState("All");

    //display one  quote at a time in every 10 seconds one type at a time randomly
    useEffect(() => {
        const filteredQuotes = currentType === "All" ? RosesOfRomeQuotes : RosesOfRomeQuotes.filter(q => q.type.en === currentType);
        if (filteredQuotes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        setCurrentQuote(filteredQuotes[randomIndex]);
    }, [currentType, language]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentIndex = allQuotesTypes.indexOf(currentType);
            const nextIndex = (currentIndex + 1) % allQuotesTypes.length;
            setCurrentType(allQuotesTypes[nextIndex]);
        }, 10000);

        return () => clearInterval(interval);
    }, [currentType, allQuotesTypes]);
    return (
        <div className="quote-container">
            <h2>{currentQuote.type[language]}</h2>
            <p>{currentQuote.quote[language]}</p>
        </div>
    )
}