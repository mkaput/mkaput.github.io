import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://murek.dev",
  integrations: [sitemap()],
});
