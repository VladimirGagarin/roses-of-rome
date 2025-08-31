// FormsComponent.jsx
import React from "react";

const forms = [
  {
    title: "home",
    forms: {
      en: "https://docs.google.com/forms/d/e/1FAIpQLScsznApMR3pFwrQEQVJkL3KTylvEAzix6Dv2Thjeyf36YSbMg/viewform?embedded=true",
      it: "https://docs.google.com/forms/d/e/1FAIpQLSfpPyivM_ndcwBakjfsjbS3RFrc2Ugxcj7zdL7ejM0gsuL6OA/viewform?embedded=true",
    },
  },
  // later you’ll add "songs", "videos", "shorts" etc.
];

export default function FormsComponent({ section = "home", language = "en" }) {
  // find correct section
  const sectionData = forms.find((f) => f.title === section);

  if (!sectionData) {
    return <p></p>;
  }

  const src = sectionData.forms[language] || sectionData.forms.en; // fallback to EN if missing

  return (
    <div className="w-full flex justify-center">
      <iframe
        src={src}
        width="640"
        height="2100"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        className="rounded-2xl shadow-xl border"
        title={`${section}-${language}-form`}
      >
        { language === "it" ? "Caricamento…" : "Loading…"}
      </iframe>
    </div>
  );
}
