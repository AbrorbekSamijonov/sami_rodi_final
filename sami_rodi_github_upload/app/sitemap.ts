import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/privacy", "/terms"].map((p) => ({
    url: `${BRAND.siteUrl}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.3,
  }));
}
