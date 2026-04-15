import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icona (Lucide)", type: "string", description: "Nome icona Lucide, es: Music, Theater, Trophy" }),
    defineField({ name: "color", title: "Colore (hex)", type: "string", description: "Es: #013DFF" }),
    defineField({ name: "description", title: "Descrizione", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "color" } },
});
