"use client";
/**
 * Sanity Studio embedded in Next.js
 * Accessible at /studio
 * Runs client-side only — excluded from static prerendering
 */
import dynamic from "next/dynamic";

export const dynamicParams = true;

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false, loading: () => <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Caricamento Studio...</div> }
);

// Prevent static prerendering
import config from "../../../../sanity/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
