import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { AREAS } from "@/lib/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/oradell", priority: 0.8, freq: "monthly" },
    { path: "/fort-lee", priority: 0.7, freq: "monthly" },
    { path: "/book", priority: 0.9, freq: "monthly" },
    { path: "/reviews", priority: 0.6, freq: "monthly" },
    { path: "/areas", priority: 0.6, freq: "monthly" },
  ];

  const services = SERVICES.map((s) => ({
    path: `/${s.slug}`,
    priority: 0.9,
    freq: "monthly" as const,
  }));

  const areas = AREAS.map((a) => ({
    path: `/areas/${a.slug}`,
    priority: 0.7,
    freq: "monthly" as const,
  }));

  return [...core, ...services, ...areas].map((e) => ({
    url: `${SITE_URL}${e.path === "/" ? "" : e.path}`,
    lastModified: now,
    changeFrequency: e.freq,
    priority: e.priority,
  }));
}
