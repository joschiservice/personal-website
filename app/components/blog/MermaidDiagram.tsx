interface MermaidDiagramProps {
  svg: string;
}

// The SVG is rendered ahead of time from the post's own source. See content-diagrams.ts.
export function MermaidDiagram({ svg }: MermaidDiagramProps) {
  return (
    <figure className="blog-diagram">
      <div className="blog-diagram-canvas" dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
}
