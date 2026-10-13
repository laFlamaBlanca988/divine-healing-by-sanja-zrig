import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

/** Osnovna sigurnosna zaglavlja za sve stranice (bez CSP-a, koji bi tražio nonce za Nextove skripte). */
const sigurnosnaZaglavlja = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

export default function config(phase: string): NextConfig {
  // Bez javne adrese canonical, sitemap i Open Graph pokazuju na localhost (vidi src/content/studio.ts).
  if (
    phase === PHASE_PRODUCTION_BUILD &&
    !process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    console.warn(
      "\n⚠ NEXT_PUBLIC_SITE_URL nije postavljen: canonical, sitemap i Open Graph koristit će http://localhost:3000.\n" +
        "  Za produkciju postavite NEXT_PUBLIC_SITE_URL (npr. https://www.vasa-domena.hr).\n",
    );
  }

  return {
    cacheComponents: true,
    partialPrefetching: true,
    poweredByHeader: false,
    async headers() {
      return [{ source: "/:path*", headers: sigurnosnaZaglavlja }];
    },
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
