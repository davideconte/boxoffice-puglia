import { defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

export default defineType({
  name: "venue",
  title: "Venue / Location",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({ name: "name", title: "Nome venue", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "address", title: "Indirizzo", type: "string" }),
    defineField({ name: "city", title: "Città", type: "string" }),
    defineField({
      name: "province",
      title: "Provincia",
      type: "string",
      options: {
        list: [
          { title: "Bari", value: "BA" },
          { title: "Barletta-Andria-Trani", value: "BT" },
          { title: "Brindisi", value: "BR" },
          { title: "Foggia", value: "FG" },
          { title: "Lecce", value: "LE" },
          { title: "Taranto", value: "TA" },
        ],
      },
    }),
    defineField({ name: "geopoint", title: "Posizione GPS", type: "geopoint" }),
    defineField({ name: "description", title: "Descrizione", type: "blockContent" }),
    defineField({ name: "image", title: "Immagine", type: "image", options: { hotspot: true } }),
    defineField({ name: "capacity", title: "Capienza", type: "number" }),
    defineField({ name: "website", title: "Sito web", type: "url" }),
    defineField({ name: "googleMapsUrl", title: "Link Google Maps", type: "url" }),
  ],
  preview: { select: { title: "name", subtitle: "city", media: "image" } },
});
