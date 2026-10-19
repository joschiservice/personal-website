import { ViewTransition, type ReactNode } from "react";

/**
 * Slides page content in the direction of travel when a link carries a
 * `nav-forward` or `nav-back` transition type. Untyped navigations (including
 * the browser's back button) swap without a slide. Must wrap content in a page,
 * not a layout: layouts persist, so their enter/exit never fires.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const directional = {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  };

  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}

/** Shared name for a post's cover, so it morphs between a list and its article. */
export function postCoverTransitionName(slug: string) {
  return `post-cover-${slug}`;
}
