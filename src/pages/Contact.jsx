import { useState } from "react";
import { FaYoutube, FaEnvelope, FaTiktok, FaHeart } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import "./Contact.css";

export default function Contact() {
  const { language } = useLanguage();
  const isIt = language === "it";
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useSeo({
    title: "Contact Us — Roses Of Rome Pictures",
    description: isIt
      ? "Contatta Roses of Rome Pictures: invia un messaggio allo studio cinematografico, musicale e di animazione."
      : "Contact Roses of Rome Pictures: send a message to the film, music, and animation studio.",
    keywords: "Roses of Rome contact, email film studio, Roses of Rome Pictures contact",
    path: "/contact",
    lang: language,
  });

  const t = {
    title: { en: "Contact & Messages", it: "Contatti e Messaggi" },
    sub: {
      en: "If our roses have touched your heart, write to us — every petal of praise is a garden watered.",
      it: "Se le nostre rose ti hanno toccato il cuore, scrivici — ogni petalo di lode è un giardino innaffiato.",
    },
    name: { en: "Your Name", it: "Il Tuo Nome" },
    email: { en: "Your Email", it: "La Tua Email" },
    message: { en: "Your Message", it: "Il Tuo Messaggio" },
    send: { en: "Send Message", it: "Invia Messaggio" },
    sending: { en: "Sending…", it: "Invio…" },
    sentTitle: { en: "Thank you for writing!", it: "Grazie di averci scritto!" },
    sentText: {
      en: "Your words have been gathered like petals. We will read them soon.",
      it: "Le tue parole sono state raccolte come petali. Le leggeremo presto.",
    },
    error: {
      en: "Your message could not be delivered. Please try again, or reach us directly by email from the Direct Connections panel.",
      it: "Il tuo messaggio non è stato consegnato. Riprova oppure contattaci direttamente via email dal pannello Collegamenti Diretti.",
    },
    writeAgain: { en: "Write again", it: "Scrivi di nuovo" },
    direct: { en: "Direct Connections", it: "Collegamenti Diretti" },
    youtube: { en: "YouTube Channel", it: "Canale YouTube" },
    tiktok: { en: "TikTok Channel", it: "Canale TikTok" },
    emailLabel: { en: "Send us an Email", it: "Inviaci un'Email" },
    love: { en: "Your words make us bloom.", it: "Le tue parole ci fanno fiorire." },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      name: form.name,
      email: form.email,
      message: form.message,
      _subject: form.name ? `New message from ${form.name}` : "New message for Roses Of Rome Pictures",
      _template: "table",
    };

    try {
      const res = await fetch("https://formsubmit.co/ajax/rosesofromepictures@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data && data.success === "true") {
        setStatus("sent");
      } else {
        throw new Error(data?.message || "Delivery failed");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container page-section contact-page">
      <div className="section-head">
        <span className="kicker">Aeternum Floreamus</span>
        <h1>{t.title[language]}</h1>
        <p className="section-sub">{t.sub[language]}</p>
      </div>

      <div className="contact-grid">
        <div className="contact-form-wrap">
          {status === "sent" ? (
            <div className="contact-sent">
              <FaHeart className="contact-sent-icon" />
              <h2>{t.sentTitle[language]}</h2>
              <p>{t.sentText[language]}</p>
              <button className="gold-btn" onClick={() => setStatus("idle")}>
                {t.writeAgain[language]}
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-field">
                <span>{t.name[language]}</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label className="contact-field">
                <span>{t.email[language]}</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>

              <label className="contact-field">
                <span>{t.message[language]}</span>
                <textarea
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </label>

              {status === "error" && (
                <p className="contact-error" role="alert">
                  {t.error[language]}
                </p>
              )}

              <button type="submit" className="crimson-btn" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="contact-spinner" aria-hidden="true" />
                    {t.sending[language]}
                  </>
                ) : (
                  t.send[language]
                )}
              </button>
            </form>
          )}
        </div>

        <aside className="contact-direct">
          <h2>{t.direct[language]}</h2>
          <p>{t.love[language]}</p>
          <ul className="contact-links">
            <li>
              <a href="mailto:rosesofromepictures@gmail.com" rel="noopener noreferrer">
                <FaEnvelope /> {t.emailLabel[language]}
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@rosesofrome" rel="noopener noreferrer" target="_blank">
                <FaYoutube /> {t.youtube[language]}
              </a>
            </li>
            <li>
              <a href="https://tiktok.com/@roses_of_rome" rel="noopener noreferrer" target="_blank">
                <FaTiktok /> {t.tiktok[language]} (@roses_of_rome)
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}