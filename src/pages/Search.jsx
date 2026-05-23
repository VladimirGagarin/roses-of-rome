import logoEmblem from "../assets/images/official_logo.png";
import { useNavigate } from "react-router-dom";
import FlagImage from "../assets/images/official_flag.png";
import MottoIcon from "../assets/images/official_motto.png";
import "./search.css";
import { useLanguage } from "../components/LanguageContext";

export default function MoreInfo() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const moreInfoTranslations = {
    en: {
      title: "The Eternal Identity of Roses of Rome Pictures",
      subtitle: "Connoisseurs of Film, Music & Animation",
      intro1: "Roses of Rome Pictures was founded upon a timeless belief: that kindness, love, and beauty possess the power to outlive generations.",
      intro2: "Inspired by the grandeur of ancient Rome and the delicate poetry of the rose, our studio exists to create works that move the soul — stories that bloom eternally through cinema, music, and animation.",
      quote: "Empires fade. Beauty remains.",
      
      flagTitle: "The Roman Red Flag",
      flag1: "The flag of Roses of Rome Pictures carries the sacred Roman Red — the color of courage, sacrifice, passion, and immortality.",
      flag2: "In ancient Rome, red symbolized victorious legions and enduring legacy. Within our studio, it represents the fire of artistic creation — the fearless pursuit of stories that leave permanent marks upon humanity.",
      flag3: "This banner stands as a declaration that Roses of Rome Pictures was not created merely to entertain, but to build an eternal artistic legacy.",
      flagQuote: "The flag does not merely wave — it remembers.",
      
      logoTitle: "The Emblem of the Eternal Rose",
      logoDesc1: "At the heart of our identity rests a single rose embraced by two eternal laurels.",
      kindness: "The Laurel of Kindness",
      kindnessDesc: "The gentle strength that uplifts, heals, and protects.",
      love: "The Laurel of Love",
      loveDesc: "The eternal force that unites souls and transcends time.",
      logoDesc2: "Between them blooms the rose — the symbol of beauty itself.",
      logoDesc3: "Beauty in cinema. Beauty in music. Beauty in animation. Beauty in humanity.",
      centralMessage: "When love and kindness protect beauty, beauty becomes eternal.",
      
      mottoTitle: "Aeternum Floreamus",
      mottoLatin: "Let Us Bloom Forever",
      mottoDesc1: "More than a motto, this is the spiritual philosophy of Roses of Rome Pictures.",
      aeternum: "Aeternum",
      aeternumMeaning: "Eternal. Beyond time. Beyond death.",
      floreamus: "Floreamus",
      floreamusMeaning: "To bloom. To flourish. To radiate beauty into existence.",
      mottoDesc2: "To bloom forever means to continue creating beauty, even in difficult times.",
      mottoDesc3: "It means choosing compassion over cruelty, art over emptiness, and love over indifference.",
      mottoQuote: "Where kindness lives, beauty blooms eternally.",
      
      unityHeading: "Roses of Rome Pictures",
      unityText1: "A creative studio devoted to the eternal language of film, music, and animation.",
      unityText2: "Built upon love. Guided by kindness. Dedicated to beauty.",
      unityMotto: "AETERNUM FLOREAMUS"
    },
    
    it: {
      title: "L'Identità Eterna delle Rose di Roma Pictures",
      subtitle: "Conoscitori di Cinema, Musica e Animazione",
      intro1: "Roses of Rome Pictures è stata fondata su una credenza senza tempo: che gentilezza, amore e bellezza possiedono il potere di superare le generazioni.",
      intro2: "Ispirata dalla grandezza dell'antica Roma e dalla delicata poesia della rosa, il nostro studio esiste per creare opere che muovono l'anima — storie che sbocciano eternamente attraverso cinema, musica e animazione.",
      quote: "Gli imperi svaniscono. La bellezza rimane.",
      
      flagTitle: "La Bandiera Rossa Romana",
      flag1: "La bandiera di Roses of Rome Pictures porta il sacro Rosso Romano — il colore del coraggio, sacrificio, passione e immortalità.",
      flag2: "Nell'antica Roma, il rosso simboleggiava legioni vittoriose e un'eredità duratura. Nel nostro studio rappresenta il fuoco della creazione artistica — la ricerca audace di storie che lasciano segni permanenti sull'umanità.",
      flag3: "Questo vessillo è una dichiarazione che Roses of Rome Pictures non è nata solo per intrattenere, ma per costruire un'eredità artistica eterna.",
      flagQuote: "La bandiera non sventola soltanto — ricorda.",
      
      logoTitle: "L'Emblema della Rosa Eterna",
      logoDesc1: "Nel cuore della nostra identità riposa una singola rosa abbracciata da due allori eterni.",
      kindness: "L'Alloro della Gentilezza",
      kindnessDesc: "La forza gentile che solleva, guarisce e protegge.",
      love: "L'Alloro dell'Amore",
      loveDesc: "La forza eterna che unisce le anime e trascende il tempo.",
      logoDesc2: "Tra loro fiorisce la rosa — il simbolo della bellezza stessa.",
      logoDesc3: "Bellezza nel cinema. Bellezza nella musica. Bellezza nell'animazione. Bellezza nell'umanità.",
      centralMessage: "Quando l'amore e la gentilezza proteggono la bellezza, la bellezza diventa eterna.",
      
      mottoTitle: "Aeternum Floreamus",
      mottoLatin: "Che Fioriamo Per Sempre",
      mottoDesc1: "Più di un motto, questa è la filosofia spirituale di Roses of Rome Pictures.",
      aeternum: "Aeternum",
      aeternumMeaning: "Eterno. Oltre il tempo. Oltre la morte.",
      floreamus: "Floreamus",
      floreamusMeaning: "Fiorire. Prosperare. Irradiare bellezza nell'esistenza.",
      mottoDesc2: "Fiorire per sempre significa continuare a creare bellezza, anche nei momenti difficili.",
      mottoDesc3: "Significa scegliere la compassione sulla crudeltà, l'arte sul vuoto e l'amore sull'indifferenza.",
      mottoQuote: "Dove vive la gentilezza, la bellezza fiorisce eternamente.",
      
      unityHeading: "Roses of Rome Pictures",
      unityText1: "Uno studio creativo dedicato al linguaggio eterno del cinema, della musica e dell'animazione.",
      unityText2: "Costruito sull'amore. Guidato dalla gentilezza. Dedicato alla bellezza.",
      unityMotto: "AETERNUM FLOREAMUS"
    }
  };

  const t = moreInfoTranslations[language] || moreInfoTranslations.en;

  return (
    <>
      {/* Symbolism Section */}
      <section className="symbolism-section">
        <div className="symbolism-container">
          <h1 className="symbolism-title">{t.title}</h1>
          <p className="symbolism-subtitle">{t.subtitle}</p>

          <div className="intro-manifesto">
            <p>{t.intro1}</p>
            <p>{t.intro2}</p>
            <p className="manifesto-quote">“{t.quote}”</p>
          </div>

          <div className="symbolism-grid">
            {/* FLAG */}
            <div className="symbolism-card flag-card">
              <div className="symbol-image-container">
                <img
                  src={FlagImage}
                  alt="Official Roses of Rome Pictures Flag"
                  className="symbol-image"
                />
              </div>

              <h2>{t.flagTitle}</h2>

              <p className="symbolism-description">{t.flag1}</p>
              <p className="symbolism-description">{t.flag2}</p>
              <p className="symbolism-description">{t.flag3}</p>

              <div className="symbolism-quote">“{t.flagQuote}”</div>
            </div>

            {/* LOGO */}
            <div className="symbolism-card logo-card">
              <div className="symbol-image-container">
                <img
                  src={logoEmblem}
                  alt="Official Roses of Rome Pictures Logo"
                  className="symbol-image"
                />
              </div>

              <h2>{t.logoTitle}</h2>

              <p className="symbolism-description">{t.logoDesc1}</p>

              <div className="laurel-meanings">
                <div className="laurel-left">
                  <span className="laurel-symbol">🤍</span>
                  <p>
                    <strong>{t.kindness}</strong><br />
                    {t.kindnessDesc}
                  </p>
                </div>

                <div className="laurel-right">
                  <span className="laurel-symbol">❤️</span>
                  <p>
                    <strong>{t.love}</strong><br />
                    {t.loveDesc}
                  </p>
                </div>
              </div>

              <p className="symbolism-description">{t.logoDesc2}</p>
              <p className="symbolism-description">{t.logoDesc3}</p>

              <p className="symbolism-description central-message">
                {t.centralMessage}
              </p>
            </div>

            {/* MOTTO */}
            <div className="symbolism-card motto-card">
              <div className="symbol-image-container">
                <img
                  src={MottoIcon}
                  alt="Official Roses of Rome Pictures Motto"
                  className="symbol-image"
                />
              </div>

              <h2>{t.mottoTitle}</h2>

              <p className="symbolism-description latin-text">“{t.mottoLatin}”</p>

              <p className="symbolism-description">{t.mottoDesc1}</p>

              <div className="motto-breakdown">
                <div className="motto-part">
                  <span className="motto-word">{t.aeternum}</span>
                  <span className="motto-meaning">{t.aeternumMeaning}</span>
                </div>

                <div className="motto-part">
                  <span className="motto-word">{t.floreamus}</span>
                  <span className="motto-meaning">{t.floreamusMeaning}</span>
                </div>
              </div>

              <p className="symbolism-description">{t.mottoDesc2}</p>
              <p className="symbolism-description">{t.mottoDesc3}</p>

              <div className="symbolism-quote">“{t.mottoQuote}”</div>
            </div>
          </div>

          {/* FINAL UNITY SECTION */}
          <div className="unity-statement">
            <div className="unity-content">
              <span className="unity-icon">🌹</span>

              <div>
                <p className="unity-heading">{t.unityHeading}</p>
                <p className="unity-text">{t.unityText1}</p>
                <p className="unity-text">{t.unityText2}</p>
                <p className="unity-motto">{t.unityMotto}</p>
              </div>

              <span className="unity-icon">🏛️</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}