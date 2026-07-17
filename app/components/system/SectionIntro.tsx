export function SectionIntro({
  label,
  title,
  description,
  id,
  align = "left",
}: {
  label: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "split";
}) {
  return (
    <header className={`section-intro section-intro--${align}`}>
      <p className="system-label">{label}</p>
      <div className="section-intro__content">
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
