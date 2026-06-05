/**
 * Central SEO configuration.
 * Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars when a custom domain is set.
 * Update TODO fields below when the information is available.
 */

function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (env && !env.includes("localhost")) {
    return env.replace(/\/$/, "");
  }
  // TODO: remplacer par le futur nom de domaine (ex: https://escapade-rangeoise.fr)
  return "https://escapaderangeoise.vercel.app";
}

export const siteConfig = {
  name: "L'Escapade Rangeoise",
  shortName: "Escapade Rangeoise",
  url: getSiteUrl(),
  description:
    "Locations de vacances sur la Côte d'Opale, à Rang-du-Fliers entre Berck-sur-Mer et Le Touquet. Mer, dunes, grands espaces. Réservez votre escapade.",
  locale: "fr_FR",

  proprietaire: {
    // TODO: confirmer le nom complet affiché publiquement
    name: "Sandra",
    // Récupérés dynamiquement depuis contenu_site — voir JSON-LD dans app/page.tsx
    email: "",
    telephone: "",
  },

  adresse: {
    locality: "Rang-du-Fliers",
    region: "Hauts-de-France",
    postalCode: "62180",
    country: "FR",
  },

  social: {
    // TODO: renseigner l'URL Airbnb principale si disponible
    airbnb: "",
  },

  keywords: [
    "location vacances Côte d'Opale",
    "gîte Berck-sur-Mer",
    "location Rang-du-Fliers",
    "vacances Pas-de-Calais",
    "hébergement Le Touquet",
    "logement bord de mer Nord",
    "location vacances Hauts-de-France",
    "séjour mer Opale",
  ] as string[],
};
