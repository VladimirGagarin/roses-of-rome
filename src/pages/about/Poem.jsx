import { VideoLink } from "../../ui/YouTubeOverlay";

export default function Poem({
  data,
  language,
  className = "",
  titleLink,
  titleAs = "h2",
}) {
  const title = data.title[language] || data.title.en;
  const Heading = titleAs;

  return (
    <section className={`poem ${className}`}>
      <Heading className="poem-title">
        {titleLink ? (
          <VideoLink
            url={titleLink.url}
            title={titleLink.ytTitle}
            className="poem-title-link"
          >
            {title}
          </VideoLink>
        ) : (
          title
        )}
      </Heading>
      {data.verses.map((block, bi) => (
        <div className={`poem-block ${block.type}`} key={bi}>
          {block.verse.map((line) => (
            <p className="poem-line" key={line.lineId}>
              {line[language] || line.en}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
