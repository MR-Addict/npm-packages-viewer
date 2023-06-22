import path from "path";
import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $lib: path.resolve("./src/lib"),
      $hooks: path.resolve("./src/hooks"),
      $types: path.resolve("./src/types"),
      $stores: path.resolve("./src/stores"),
      $components: path.resolve("./src/components")
    }
  }
};

export default config;
