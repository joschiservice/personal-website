"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidDiagramProps {
  source: string;
}

type RenderStatus = "loading" | "ready" | "error";

let mermaidLoader: Promise<(typeof import("mermaid"))["default"]> | undefined;
let renderSequence = 0;

function loadMermaid() {
  mermaidLoader ??= import("mermaid").then(({ default: mermaid }) => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: {
        darkMode: true,
        background: "#08101d",
        primaryColor: "#10243d",
        primaryTextColor: "#f8fafc",
        primaryBorderColor: "#42a5f5",
        secondaryColor: "#251d3c",
        secondaryTextColor: "#f8fafc",
        secondaryBorderColor: "#ba68c8",
        tertiaryColor: "#0b1829",
        tertiaryTextColor: "#e2e8f0",
        tertiaryBorderColor: "#52657b",
        lineColor: "#8dd8ff",
        textColor: "#e2e8f0",
        noteBkgColor: "#251d3c",
        noteTextColor: "#f8fafc",
        noteBorderColor: "#ba68c8",
        fontFamily: "IBM Plex Mono, ui-monospace, monospace",
      },
    });

    return mermaid;
  });

  return mermaidLoader;
}

export function MermaidDiagram({ source }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const [status, setStatus] = useState<RenderStatus>("loading");

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}-${++renderSequence}`;

    async function renderDiagram() {
      if (!container) return;

      setStatus("loading");

      try {
        const mermaid = await loadMermaid();
        const { svg, bindFunctions } = await mermaid.render(diagramId, source);
        if (cancelled) return;

        container.innerHTML = svg;
        bindFunctions?.(container);
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;

        console.error("Unable to render Mermaid diagram", error);
        container.replaceChildren();
        setStatus("error");
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
      container?.replaceChildren();
    };
  }, [reactId, source]);

  return (
    <figure className="blog-diagram" data-status={status}>
      <div
        ref={containerRef}
        className="blog-diagram-canvas"
        aria-busy={status === "loading"}
      />
      {status === "loading" ? (
        <span className="blog-diagram-loading" aria-live="polite">
          Rendering diagram…
        </span>
      ) : null}
      {status === "error" ? (
        <div className="blog-diagram-error" role="alert">
          <p>This diagram could not be rendered.</p>
          <pre><code>{source}</code></pre>
        </div>
      ) : null}
    </figure>
  );
}
