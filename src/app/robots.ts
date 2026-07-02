import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Allow everything except the private ops portal + API, and explicitly welcome
// the AI answer-engine crawlers (we want to be cited for Bergen County eye care).
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api/"] },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
