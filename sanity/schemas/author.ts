import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
  name: "author",
  title: "Autore",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "image", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "name", media: "image" } },
});
