import { defineField, defineType } from "sanity";
import { StopIcon as ShopIcon } from "@sanity/icons";

export default defineType({
  name: "pointOfSale",
  title: "Punto Vendita",
  type: "document",
  icon: ShopIcon,
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "address", title: "Indirizzo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "city", title: "Città", type: "string", validation: (r) => r.required() }),
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
      validation: (r) => r.required(),
    }),
    defineField({ name: "geopoint", title: "Posizione GPS", type: "geopoint" }),
    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "openingHours", title: "Orari di apertura", type: "text", rows: 3 }),
    defineField({
      name: "services",
      title: "Servizi disponibili",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["TicketOne", "Vivaticket", "Biglietti cartacei", "Prenotazioni"] },
    }),
    defineField({ name: "image", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "isActive", title: "Attivo", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "name", subtitle: "city", media: "image" } },
});
