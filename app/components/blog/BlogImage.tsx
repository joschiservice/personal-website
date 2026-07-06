import { ZoomableBlogImage } from "./ZoomableBlogImage";

export interface BlogImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export function BlogImage({
  src,
  alt,
  width,
  height,
  caption,
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
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
