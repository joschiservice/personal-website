import type { BlogTocItem } from "@/content-types";

export function TableOfContents({
  toc,
  label = "On this page",
  ariaLabel = "Table of contents",
}: {
  toc: BlogTocItem[];
  label?: string;
  ariaLabel?: string;
}) {
  if (toc.length === 0) return null;

  const links = (
    <ol>
      {toc.map((item) => (
        <li key={item.id} data-level={item.level}>
          <a href={`#${item.id}`}>{item.title}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="blog-toc-mobile">
        <summary>{label}</summary>
        {links}
      </details>
      <aside className="blog-toc-desktop" aria-label={ariaLabel}>
        <p>{label}</p>
        {links}
      </aside>
    </>
  );
}
