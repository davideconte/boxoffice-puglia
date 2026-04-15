import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const marsWars = localFont({
  src: "../../public/fonts/MarsWars.ttf",
  variable: "--font-mars",
});

export const metadata: Metadata = {
  title: {
    default: "Box Office Puglia — From Puglia, For Puglia",
    template: "%s | Box Office Puglia",
  },
  description: "La piattaforma di riferimento per la scoperta e l'acquisto di biglietti per eventi in Puglia. Concerti, teatro, sport, cultura e molto altro.",
  keywords: ["eventi Puglia", "biglietti concerti Bari", "eventi Lecce", "teatro Puglia", "Box Office Puglia"],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://boxofficepuglia.it",
    siteName: "Box Office Puglia",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  metadataBase: new URL("https://boxofficepuglia.it"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`h-full scroll-smooth ${marsWars.variable}`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
