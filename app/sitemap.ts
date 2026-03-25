import { MetadataRoute } from "next";

/** Auto-generated sitemap for Google Search Console */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://snapinvoice.com"; // ← Replace with your domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
