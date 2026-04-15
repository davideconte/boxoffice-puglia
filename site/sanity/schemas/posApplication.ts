import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export default defineType({
  name: "posApplication",
  title: "Candidatura Punto Vendita",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "businessName", title: "Nome attività", type: "string" }),
    defineField({ name: "ownerName", title: "Nome titolare", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "address", title: "Indirizzo", type: "string" }),
    defineField({ name: "city", title: "Città", type: "string" }),
    defineField({
      name: "province",
      title: "Provincia",
      type: "string",
      options: { list: ["BA","BT","BR","FG","LE","TA"] },
    }),
    defineField({ name: "message", title: "Messaggio", type: "text" }),
    defineField({
      name: "status",
      title: "Stato",
      type: "string",
      options: { list: [
        { title: "In attesa", value: "pending" },
        { title: "Approvato", value: "approved" },
        { title: "Rifiutato", value: "rejected" },
      ]},
      initialValue: "pending",
    }),
    defineField({ name: "submittedAt", title: "Data invio", type: "datetime" }),
  ],
  preview: { select: { title: "businessName", subtitle: "status", city: "city" }, prepare({ title, subtitle, city }) { return { title, subtitle: `${city} · ${subtitle}` }; } },
});
