import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  icon: CogIcon,

  fields: [
    defineField({ name: "siteName", title: "Nome sito", type: "string" }),
    defineField({ name: "siteDescription", title: "Descrizione", type: "text", rows: 2 }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({
      name: "socialLinks",
      title: "Social",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "facebook", title: "Facebook URL", type: "url" },
        { name: "tiktok", title: "TikTok URL", type: "url" },
      ],
    }),
    defineField({ name: "contactEmail", title: "Email di contatto", type: "string" }),
    defineField({ name: "contactPhone", title: "Telefono", type: "string" }),
    defineField({ name: "address", title: "Sede", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Impostazioni Sito" }) },
});
