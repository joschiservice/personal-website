import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { HiOutlineLink } from "react-icons/hi2";
import { BlogImage } from "./BlogImage";
import { Callout } from "./Callout";
import type { Dictionary } from "@/app/i18n/getDictionary";

function HeadingLink({
  as: Tag,
  id,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2"> & { as: "h2" | "h3" }) {
  return (
    <Tag id={id} {...props}>
      <a href={id ? `#${id}` : undefined} className="blog-heading-link">
        <span>{children}</span>
        <HiOutlineLink aria-hidden="true" />
      </a>
    </Tag>
  );
}

function MdxLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export function createMdxComponents(copy: Dictionary["blog"]): MDXComponents {
  return {
    a: MdxLink,
    h2: (props) => <HeadingLink as="h2" {...props} />,
    h3: (props) => <HeadingLink as="h3" {...props} />,
    BlogImage: (props) => (
      <BlogImage
        {...props}
        enlargeLabel={copy.enlargeImage}
        fullscreenLabel={copy.fullscreenImage}
        closeLabel={copy.closeFullscreenImage}
      />
    ),
    Callout,
  };
}
