import { ZoomableBlogImage } from "./ZoomableBlogImage";
import styles from "./BlogImage.module.css";

export interface BlogImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  enlargeLabel?: string;
  fullscreenLabel?: string;
  closeLabel?: string;
}

export function BlogImage({
  src,
  alt,
  width,
  height,
  caption,
  enlargeLabel,
  fullscreenLabel,
  closeLabel,
}: BlogImageProps) {
  return (
    <figure className={styles.figure}>
      <ZoomableBlogImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 760px"
        frameClassName={styles.figureFrame}
        enlargeLabel={enlargeLabel}
        fullscreenLabel={fullscreenLabel}
        closeLabel={closeLabel}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
