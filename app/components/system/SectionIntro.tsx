export function SectionIntro({
  label,
  title,
  description,
  id,
  align = "left",
  number,
}: {
  label: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "split";
  number?: string;
}) {
  return (
    <header className={`section-intro section-intro--${align} motion-section-content`}>
      {number ? (
        <span className="section-intro__number" aria-hidden="true">
          {number}
        </span>
      ) : null}
      <p className="system-label">{label}</p>
      <div className="section-intro__content">
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
