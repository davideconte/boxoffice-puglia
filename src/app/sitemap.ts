import { MetadataRoute } from "next";

const BASE_URL = "https://boxofficepuglia.it";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  { url: `${BASE_URL}/eventi`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
  { url: `${BASE_URL}/punti-vendita`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/diventa-punto-vendita`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/servizi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/chi-siamo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/contatti`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  // Skip Sanity queries at build time if not configured
  if (!projectId || projectId === "your_project_id") {
    return STATIC_PAGES;
  }

  try {
    const { client } = await import("@/lib/sanity/client");
    const [events, articles] = await Promise.all([
      client.fetch<{ slug: string; date: string }[]>(
        `*[_type == "event"] { "slug": slug.current, date }`,
        {},
        { next: { revalidate: 3600 } }
      ),
      client.fetch<{ slug: string; publishedAt: string }[]>(
        `*[_type == "article"] { "slug": slug.current, publishedAt }`,
        {},
        { next: { revalidate: 3600 } }
      ),
    ]);

    return [
      ...STATIC_PAGES,
      ...events.map((e) => ({ url: `${BASE_URL}/eventi/${e.slug}`, lastModified: e.date ? new Date(e.date) : new Date(), changeFrequency: "weekly" as const, priority: 0.7 })),
      ...articles.map((a) => ({ url: `${BASE_URL}/news/${a.slug}`, lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
    ];
  } catch {
    return STATIC_PAGES;
  }
}
