"use client";

import Image, { type ImageProps } from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiOutlineArrowsPointingOut, HiXMark } from "react-icons/hi2";

interface ZoomableBlogImageProps extends ImageProps {
  frameClassName?: string;
  aspectRatio?: number;
  enlargeLabel?: string;
  fullscreenLabel?: string;
  closeLabel?: string;
}

type LightboxStyle = CSSProperties & {
  "--blog-image-aspect": number;
};

export function ZoomableBlogImage({
  frameClassName = "",
  aspectRatio,
  alt,
  enlargeLabel = "Enlarge image",
  fullscreenLabel = "Fullscreen image",
  closeLabel = "Close fullscreen image",
  ...imageProps
}: ZoomableBlogImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const focusRingTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const restoreFocusWithoutRingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const imageId = useId();
  const resolvedAspectRatio =
    aspectRatio ??
    (typeof imageProps.width === "number" && typeof imageProps.height === "number"
      ? imageProps.width / imageProps.height
      : 16 / 9);
  const layoutId = prefersReducedMotion ? undefined : `blog-image-${imageId}`;

  const suppressTriggerFocusRing = useCallback((untilBlur = false) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    trigger.dataset.suppressFocusRing = "true";
    trigger.style.outline = "none";
    if (focusRingTimeoutRef.current) clearTimeout(focusRingTimeoutRef.current);
    if (untilBlur) return;

    focusRingTimeoutRef.current = setTimeout(() => {
      delete trigger.dataset.suppressFocusRing;
      trigger.style.removeProperty("outline");
    }, prefersReducedMotion ? 0 : 650);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocusWithoutRingRef.current = false;
        setIsOpen(false);
      }
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
      suppressTriggerFocusRing(restoreFocusWithoutRingRef.current);
      trigger?.focus();
    };
  }, [isOpen, suppressTriggerFocusRing]);

  useEffect(
    () => () => {
      if (focusRingTimeoutRef.current) clearTimeout(focusRingTimeoutRef.current);
    },
    [],
  );

  const lightbox = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="blog-image-lightbox"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            display: "grid",
            placeItems: "center",
            padding: "1.5rem",
            background: "rgba(3, 8, 16, 0.88)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              restoreFocusWithoutRingRef.current = true;
              setIsOpen(false);
            }
          }}
        >
          <div
            className="blog-image-lightbox-dialog"
            style={{
              display: "grid",
              width: "100%",
              height: "100%",
              placeItems: "center",
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`${fullscreenLabel}: ${alt}`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="blog-image-lightbox-close"
              style={{
                position: "fixed",
                top: "1rem",
                right: "1rem",
                zIndex: 1,
              }}
              aria-label={closeLabel}
              onPointerDown={() => {
                restoreFocusWithoutRingRef.current = true;
              }}
              onClick={() => setIsOpen(false)}
            >
              <HiXMark aria-hidden="true" />
            </button>
            <motion.div
              layoutId={layoutId}
              className="blog-image-lightbox-figure"
              style={
                {
                  "--blog-image-aspect": resolvedAspectRatio,
                  position: "relative",
                  width: `min(calc(100vw - 3rem), calc((100dvh - 3rem) * ${resolvedAspectRatio}))`,
                  aspectRatio: resolvedAspectRatio,
                  overflow: "hidden",
                } as LightboxStyle
              }
              initial={prefersReducedMotion ? { opacity: 0 } : undefined}
              animate={prefersReducedMotion ? { opacity: 1 } : undefined}
              exit={prefersReducedMotion ? { opacity: 0 } : undefined}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 28,
                mass: 0.75,
              }}
            >
              <Image
                src={imageProps.src}
                alt={alt}
                fill
                loading="eager"
                sizes="100vw"
                className="blog-image-lightbox-image"
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`blog-zoomable-image ${frameClassName}`.trim()}
        style={{ display: "block", position: "relative", width: "100%" }}
        aria-label={`${enlargeLabel}: ${alt}`}
        aria-haspopup="dialog"
        onPointerDown={() => {
          restoreFocusWithoutRingRef.current = true;
          suppressTriggerFocusRing(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            restoreFocusWithoutRingRef.current = false;
            delete event.currentTarget.dataset.suppressFocusRing;
            event.currentTarget.style.removeProperty("outline");
          }
        }}
        onBlur={(event) => {
          delete event.currentTarget.dataset.suppressFocusRing;
          event.currentTarget.style.removeProperty("outline");
        }}
        onClick={() => setIsOpen(true)}
      >
        <motion.span
          layoutId={layoutId}
          className="blog-zoomable-image-surface"
          style={{ display: "block", position: "relative", width: "100%" }}
        >
          <Image {...imageProps} alt={alt} />
        </motion.span>
        <span
          className="blog-zoomable-image-hint"
          aria-hidden="true"
          style={{ position: "absolute", right: "0.85rem", bottom: "0.85rem" }}
        >
          <HiOutlineArrowsPointingOut />
        </span>
      </button>
      {typeof document !== "undefined" ? createPortal(lightbox, document.body) : null}
    </>
  );
}
