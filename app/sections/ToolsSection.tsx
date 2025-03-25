import Image from "next/image";

interface Tool {
  name: string;
  hideText?: boolean;
}

const TOOLS: Tool[] = [
  {
    name: "XCode",
  },
  {
    name: "VisualStudio"
  },
  {
    name: "WebStorm"
  },
  {
    name: "ChatGPT"
  },
  {
    name: "GitHub Copilot"
  },
  {
    name: "Material UI"
  },
  {
    name: "Next.js",
    hideText: true
  },
  {
    name: "React.js"
  },
  {
    name: "Sentry"
  },
  {
    name: "GitHub"
  },
  {
    name: "Vercel",
    hideText: true
  }
];

export function ToolsSection() {
  return (
    <section className="py-16" id="tools">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-medium text-center mb-8">
          Tools, Frameworks & Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {TOOLS.map((tool, pos) => <ToolItem key={pos} item={tool} />)}
        </div>
      </div>
    </section>
  );
}

function ToolItem({ item }: { item: Tool }) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Image
        width={item.hideText ? 130 : 50}
        height={50}
        src={"/img/tools/" + item.name + ".png"}
        alt={item.name}
        className="object-contain"
      />
      {!item.hideText &&
        <span className="text-lg font-medium">
          {item.name}
        </span>
      }
    </div>
  );
}