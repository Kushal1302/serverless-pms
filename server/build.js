import { build } from "esbuild";

build({
  entryPoints: ["src/handler.ts"], // Lambda entry
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "dist/handler.js",
  sourcemap: false,
  minify: true,
  external: [],
}).catch(() => process.exit(1));
