// Renders every Mermaid diagram again and removes files no post uses any more. Run it after
// upgrading Mermaid. New or edited diagrams don't need it: dev and local builds render those.
import { existsSync } from "node:fs";
import { rename, rm } from "node:fs/promises";
import { createBuilder } from "@content-collections/core";

const DIAGRAMS_DIRECTORY = "content/diagrams";
const BACKUP_DIRECTORY = ".content-collections/diagrams-backup";

await rm(BACKUP_DIRECTORY, { recursive: true, force: true });
await rm(".content-collections/cache", { recursive: true, force: true });
if (existsSync(DIAGRAMS_DIRECTORY)) await rename(DIAGRAMS_DIRECTORY, BACKUP_DIRECTORY);

const errors: unknown[] = [];
try {
  const builder = await createBuilder("content-collections.ts");
  builder.on("_error", (event) => errors.push(event));
  await builder.build();
} catch (error) {
  errors.push(error);
}

if (errors.length > 0) {
  // Put the previous files back, so a failed run leaves the working tree as it was.
  await rm(DIAGRAMS_DIRECTORY, { recursive: true, force: true });
  if (existsSync(BACKUP_DIRECTORY)) await rename(BACKUP_DIRECTORY, DIAGRAMS_DIRECTORY);
  console.error(errors);
  process.exit(1);
}

await rm(BACKUP_DIRECTORY, { recursive: true, force: true });
