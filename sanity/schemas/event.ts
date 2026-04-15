import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export default defineType({
  name: "event",
  title: "Evento",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Data inizio",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "Data fine (opzionale)",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm" },
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "venue",
      title: "Location",
      type: "reference",
      to: [{ type: "venue" }],
    }),
    defineField({
      name: "image",
      title: "Immagine principale",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galleria immagini",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "shortDescription", title: "Descrizione breve", type: "text", rows: 3, validation: (r) => r.max(200) }),
    defineField({ name: "description", title: "Descrizione completa", type: "blockContent" }),
    defineField({ name: "ticketOneUrl", title: "URL TicketOne (iframe)", type: "url" }),
    defineField({ name: "price", title: "Prezzo", type: "string", description: 'Es: "da €25" oppure "Ingresso gratuito"' }),
    defineField({
      name: "isFeatured",
      title: "In evidenza",
      type: "boolean",
      description: "Mostra in homepage nello slider hero",
      initialValue: false,
    }),
    defineField({ name: "isSoldOut", title: "Sold Out", type: "boolean", initialValue: false }),
    defineField({ name: "tags", title: "Tag", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 2 },
        { name: "ogImage", title: "OG Image", type: "image" },
      ],
    }),
  ],
  orderings: [
    { title: "Data (più recente)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Data (più vicina)", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", date: "date", city: "venue.city", media: "image" },
    prepare({ title, date, city, media }) {
      const d = date ? new Date(date).toLocaleDateString("it-IT") : "—";
      return { title, subtitle: `${d}${city ? " · " + city : ""}`, media };
    },
  },
});
