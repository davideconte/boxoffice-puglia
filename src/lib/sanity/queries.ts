import { client } from "./client";

// ============================================================
// EVENTS
// ============================================================

const EVENT_FIELDS = `
  _id,
  title,
  slug,
  date,
  endDate,
  shortDescription,
  price,
  isFeatured,
  isSoldOut,
  tags,
  "image": image { asset, hotspot, crop },
  "category": category->{ title, slug, icon, color },
  "venue": venue->{ name, city, province, address, geopoint }
`;

export async function getFeaturedEvents() {
  return client.fetch(
    `*[_type == "event" && isFeatured == true && date >= now()] | order(date asc) [0...5] {
      ${EVENT_FIELDS}
    }`,
    {},
    { next: { tags: ["events"] } }
  );
}

export async function getUpcomingEvents(filters?: {
  province?: string;
  categorySlug?: string;
  from?: string;
  to?: string;
  page?: number;
}) {
  const PAGE_SIZE = 12;
  const page = filters?.page ?? 0;
  const offset = page * PAGE_SIZE;

  const provinceFilter = filters?.province
    ? `&& venue->province == "${filters.province}"`
    : "";
  const categoryFilter = filters?.categorySlug
    ? `&& category->slug.current == "${filters.categorySlug}"`
    : "";
  const fromFilter = filters?.from ? `&& date >= "${filters.from}"` : "";
  const toFilter = filters?.to ? `&& date <= "${filters.to}"` : "";

  return client.fetch(
    `*[_type == "event" && date >= now() ${provinceFilter} ${categoryFilter} ${fromFilter} ${toFilter}]
    | order(date asc) [${offset}...${offset + PAGE_SIZE}] {
      ${EVENT_FIELDS}
    }`,
    {},
    { next: { tags: ["events"] } }
  );
}

export async function getEventBySlug(slug: string) {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      ${EVENT_FIELDS},
      description,
      gallery[] { asset, hotspot, crop },
      ticketOneUrl,
      seo
    }`,
    { slug },
    { next: { tags: [`event-${slug}`] } }
  );
}

export async function getRelatedEvents(
  categorySlug: string,
  currentSlug: string
) {
  return client.fetch(
    `*[_type == "event" && category->slug.current == $categorySlug && slug.current != $currentSlug && date >= now()]
    | order(date asc) [0...4] {
      ${EVENT_FIELDS}
    }`,
    { categorySlug, currentSlug },
    { next: { tags: ["events"] } }
  );
}

// ============================================================
// CATEGORIES
// ============================================================

export async function getCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug, icon, color }`,
    {},
    { next: { tags: ["categories"] } }
  );
}

// ============================================================
// POINTS OF SALE
// ============================================================

export async function getPointsOfSale(province?: string) {
  const filter = province ? `&& province == "${province}"` : "";
  return client.fetch(
    `*[_type == "pointOfSale" && isActive == true ${filter}] | order(city asc) {
      _id, name, address, city, province, geopoint, phone, email, openingHours, services, image
    }`,
    {},
    { next: { tags: ["pos"] } }
  );
}

// ============================================================
// ARTICLES
// ============================================================

const ARTICLE_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "image": mainImage { asset, hotspot, crop },
  "author": author->{ name, image },
  "categories": categories[]->{ title, slug, color }
`;

export async function getArticles(page = 0) {
  const PAGE_SIZE = 9;
  const offset = page * PAGE_SIZE;
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc) [${offset}...${offset + PAGE_SIZE}] { ${ARTICLE_FIELDS} }`,
    {},
    { next: { tags: ["articles"] } }
  );
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      ${ARTICLE_FIELDS},
      body,
      seo
    }`,
    { slug },
    { next: { tags: [`article-${slug}`] } }
  );
}

export async function getFeaturedArticle() {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc) [0] { ${ARTICLE_FIELDS} }`,
    {},
    { next: { tags: ["articles"] } }
  );
}

// ============================================================
// SERVICES
// ============================================================

export async function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc) { _id, title, description, icon, image }`,
    {},
    { next: { tags: ["services"] } }
  );
}

// ============================================================
// SITE SETTINGS
// ============================================================

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]`,
    {},
    { next: { tags: ["settings"] } }
  );
}
