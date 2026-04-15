import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
  name: "service",
  title: "Servizio",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Descrizione", type: "blockContent" }),
    defineField({ name: "icon", title: "Icona (Lucide)", type: "string" }),
    defineField({ name: "image", title: "Immagine", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
