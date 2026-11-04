import type { MDXComponents, MDXContent } from "mdx/types";
import * as runtime from "react/jsx-runtime";

interface MdxContentProps {
  code: string;
  components: MDXComponents;
}

// The code is compiled from the post's own source in content-collections.ts, never from user input.
export function MdxContent({ code, components }: MdxContentProps) {
  const { default: render } = new Function(code)(runtime) as { default: MDXContent };

  return render({ components });
}
