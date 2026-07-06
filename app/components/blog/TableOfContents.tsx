import type { BlogTocItem } from "@/content-types";

export function TableOfContents({ toc }: { toc: BlogTocItem[] }) {
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
        <summary>On this page</summary>
        {links}
      </details>
      <aside className="blog-toc-desktop" aria-label="Table of contents">
        <p>On this page</p>
        {links}
      </aside>
    </>
  );
}
