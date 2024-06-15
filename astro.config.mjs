// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
// const {
//   PUBLIC_SANITY_STUDIO_PROJECT_ID,
//   PUBLIC_SANITY_STUDIO_DATASET,
//   PUBLIC_SANITY_PROJECT_ID,
//   PUBLIC_SANITY_DATASET,
// } = loadEnv(import.meta.env.MODE, process.cwd(), "");

import { defineConfig } from "astro/config";

// Different environments use different variables
// const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
// const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

const projectId = "nm989itl";
const dataset = "production";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  // Hybrid+adapter is required to support embedded Sanity Studio
  integrations: [
    sanity({
      projectId: projectId,
      dataset,
      studioBasePath: "/admin",
      useCdn: true, // `false` if you want to ensure fresh data
      // `false` if you want to ensure fresh data
      apiVersion: "2024-06-01", // Set to date of setup to use the latest API version
    }),
    react(),
    tailwind(),
    mdx(),
    react(),
    sitemap(), // Required for Sanity Studio
  ],
});
