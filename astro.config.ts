import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkReadingTime from "./src/remark-reading-time";
import remarkModifiedTime from "./src/remark-modified-time";

export default defineConfig({
  site: "https://murek.dev",
  integrations: [
    mdx({
      remarkPlugins: [remarkReadingTime, remarkModifiedTime],
    }),
    sitemap(),
  ],
  experimental: {
    fonts: [
      {
        name: "Gambarino",
        cssVariable: "--font-gambarino",
        fallbacks: [
          "Didot",
          "Bodoni MT",
          "Noto Serif Display",
          "URW Palladio L",
          "P052",
          "Sylfaen",
          "serif",
        ],
        provider: fontProviders.fontshare(),
      },
      {
        name: "Switzer",
        cssVariable: "--font-switzer",
        fallbacks: [
          "Inter",
          "Roboto",
          "Helvetica Neue",
          "Arial Nova",
          "Nimbus Sans",
          "Arial",
          "sans-serif",
        ],
        provider: fontProviders.fontshare(),
        weights: ["100 900"],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
