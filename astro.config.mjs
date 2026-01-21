import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://murek.dev",
  integrations: [sitemap()],
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
