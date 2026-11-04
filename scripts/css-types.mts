// Generates a type declaration beside each CSS Module, so a mistyped styles.x fails type checking.
// --watch keeps them current during pnpm dev. --check also fails on classes nothing uses.
import { globSync, readFileSync, watch, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import postcss from "postcss";

const MODULE_SUFFIX = ".module.css";

function localClasses(css: string) {
  const classes = new Set<string>();

  postcss.parse(css).walkRules((rule) => {
    if (rule.parent?.type === "atrule" && /keyframes$/.test((rule.parent as postcss.AtRule).name)) return;

    const selector = rule.selector.replace(/:global\([^)]*\)/g, "").replace(/\[[^\]]*\]/g, "");
    for (const [, name] of selector.matchAll(/\.([_a-zA-Z][\w-]*)/g)) classes.add(name!);
  });

  return [...classes].sort();
}

function writeTypes(file: string) {
  const members = localClasses(readFileSync(file, "utf8")).map((name) => `  readonly ${JSON.stringify(name)}: string;`);
  const types = `declare const styles: {\n${members.join("\n")}\n};\nexport default styles;\n`;
  const target = file.replace(/\.css$/, ".d.css.ts");

  let current = "";
  try {
    current = readFileSync(target, "utf8");
  } catch {
    // Not generated yet.
  }
  if (current !== types) writeFileSync(target, types);
}

function unusedClasses(modules: string[]) {
  const usedByModule = new Map<string, Set<string> | "dynamic">();

  for (const file of globSync("{app,e2e}/**/*.{ts,tsx}")) {
    const source = readFileSync(file, "utf8");
    for (const [, name, path] of source.matchAll(/import (\w+) from "([^"]+\.module\.css)"/g)) {
      const target = path!.startsWith("@/") ? resolve(path!.slice(2)) : resolve(dirname(file), path!);
      const used = usedByModule.get(target) ?? new Set<string>();
      if (used === "dynamic" || new RegExp(`\\b${name}\\[`).test(source)) {
        usedByModule.set(target, "dynamic");
        continue;
      }
      for (const [, member] of source.matchAll(new RegExp(`\\b${name}\\.(\\w+)`, "g"))) used.add(member!);
      usedByModule.set(target, used);
    }
  }

  return modules.flatMap((file) => {
    const used = usedByModule.get(resolve(file));
    if (used === "dynamic") return [];
    return localClasses(readFileSync(file, "utf8"))
      .filter((name) => !used?.has(name))
      .map((name) => `${file}: .${name}`);
  });
}

const modules = globSync(`app/**/*${MODULE_SUFFIX}`);
modules.forEach(writeTypes);

if (process.argv.includes("--check")) {
  const unused = unusedClasses(modules);
  if (unused.length > 0) {
    console.error(`Unused CSS Module classes:\n${unused.join("\n")}`);
    process.exit(1);
  }
}

if (process.argv.includes("--watch")) {
  watch("app", { recursive: true }, (_, file) => {
    if (!file?.endsWith(MODULE_SUFFIX)) return;
    try {
      writeTypes(`app/${file}`);
    } catch (error) {
      // A half-typed rule or a deleted file. The next save fixes it.
      console.warn(`css-types: skipped ${basename(file)}: ${String(error)}`);
    }
  });

  // Exit with the dev server, which started this in the background.
  const parent = process.ppid;
  setInterval(() => {
    if (process.ppid !== parent) process.exit(0);
  }, 2000);
}
