import fs from "node:fs";
import path from "node:path";

/** Server-only: returns the public URL if /public/<rel> exists, else null. Photos dropped in are picked up on the next build. */
export function photoIf(rel: string): string | null {
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? "/" + rel.replace(/^\/+/, "") : null;
}
