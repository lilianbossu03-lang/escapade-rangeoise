import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "L'Escapade Rangeoise — Locations de vacances sur la Côte d'Opale",
  description:
    "Découvrez nos locations de vacances à Rang-du-Fliers, près de Berck-sur-Mer sur la magnifique Côte d'Opale (Pas-de-Calais). Mer, dunes, et authenticité.",
  keywords: [
    "location vacances",
    "Côte d'Opale",
    "Berck-sur-Mer",
    "Rang-du-Fliers",
    "Pas-de-Calais",
    "gîte",
    "mer",
    "plage",
  ],
  openGraph: {
    title: "L'Escapade Rangeoise — Locations de vacances sur la Côte d'Opale",
    description:
      "Locations de vacances authentiques à Rang-du-Fliers, proche de Berck-sur-Mer.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${lato.variable} font-lato antialiased bg-blanc-casse text-text-dark`}
      >
        {children}
      </body>
    </html>
  );
}
