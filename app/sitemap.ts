import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tolegend.art";

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  const galleryImages = Array.from({ length: 20 }, (_, i) => i + 1);

  const galleryRoutes = galleryImages.map((id) => ({
    url: `${baseUrl}/gallery/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...galleryRoutes];
}
