import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Box Office Puglia",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuti")
          .items([
            S.listItem()
              .title("⚙️ Impostazioni sito")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.listItem().title("🎫 Eventi").child(S.documentTypeList("event")),
            S.listItem().title("📰 Articoli / News").child(S.documentTypeList("article")),
            S.listItem().title("🏪 Punti Vendita").child(S.documentTypeList("pointOfSale")),
            S.divider(),
            S.listItem().title("🏟️ Venue").child(S.documentTypeList("venue")),
            S.listItem().title("🏷️ Categorie").child(S.documentTypeList("category")),
            S.listItem().title("✍️ Autori").child(S.documentTypeList("author")),
            S.listItem().title("⭐ Servizi").child(S.documentTypeList("service")),
            S.divider(),
            S.listItem().title("📋 Candidature PdV").child(S.documentTypeList("posApplication")),
          ]),
    }),
    visionTool(),
  ],
});
