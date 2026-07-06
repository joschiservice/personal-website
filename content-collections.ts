import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { z } from "zod";
import type { Heading, Root } from "mdast";
import type { BlogTocItem } from "./content-types";

const isoDate = z.iso.date();

function extractHeadings(content: string) {
  const target: BlogTocItem[] = [];
  const slugger = new GithubSlugger();
  const tree = unified().use(remarkParse).use(remarkGfm).parse(content) as Root;

  visit(tree, "heading", (node: Heading) => {
    const title = toString(node).trim();
    if (!title) return;

    const id = slugger.slug(title);
    if (node.depth === 2 || node.depth === 3) {
      target.push({ id, title, level: node.depth });
    }
  });

  return target;
}

function calculateReadingTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: isoDate,
    updatedAt: isoDate.optional(),
    tags: z.array(z.string().min(1)).min(1),
    draft: z.boolean().default(false),
    cover: z.object({
      src: z.string().startsWith("/img/blog/"),
      alt: z.string().min(1),
    }),
    content: z.string(),
  }),
  transform: async (post, context) => {
    const toc = extractHeadings(post.content);
    const compiledContent = await compileMDX(context, post, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "github-dark-dimmed",
            keepBackground: false,
          },
        ],
      ],
    });

    const slug = post._meta.path;

    return {
      ...post,
      slug,
      url: `/blog/${slug}`,
      readingTimeMinutes: calculateReadingTime(post.content),
      toc,
      compiledContent,
    };
  },
});

export default defineConfig({
  content: [posts],
});
