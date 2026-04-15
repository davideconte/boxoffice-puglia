import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export default defineType({
  name: "article",
  title: "Articolo / News",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "mainImage", title: "Immagine principale", type: "image", options: { hotspot: true } }),
    defineField({ name: "excerpt", title: "Estratto", type: "text", rows: 3, validation: (r) => r.max(300) }),
    defineField({ name: "body", title: "Contenuto", type: "blockContent" }),
    defineField({ name: "author", title: "Autore", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "categories",
      title: "Categorie",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({ name: "publishedAt", title: "Data pubblicazione", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 2 },
      ],
    }),
  ],
  orderings: [{ title: "Data pubblicazione (più recente)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", date: "publishedAt", media: "mainImage" }, prepare({ title, date, media }) { return { title, subtitle: date ? new Date(date).toLocaleDateString("it-IT") : "", media }; } },
});
