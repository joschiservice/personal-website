import styles from "./MermaidDiagram.module.css";

interface MermaidDiagramProps {
  svg: string;
}

// The SVG is rendered ahead of time from the post's own source. See content-diagrams.ts.
export function MermaidDiagram({ svg }: MermaidDiagramProps) {
  return (
    <figure className={styles.diagram} data-testid="blog-diagram">
      <div className={styles.diagramCanvas} dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
}
