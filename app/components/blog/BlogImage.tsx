import { ZoomableBlogImage } from "./ZoomableBlogImage";

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
    <figure className="blog-figure">
      <ZoomableBlogImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 760px"
        frameClassName="blog-figure-frame"
        enlargeLabel={enlargeLabel}
        fullscreenLabel={fullscreenLabel}
        closeLabel={closeLabel}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
