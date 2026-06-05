import { siteConfig } from "@/lib/seo-config";
import type { Evenement } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const base = siteConfig.url;

// Postal code lookup for Côte d'Opale cities
const villesCoteOpale: Record<string, string> = {
  "berck-sur-mer": "62600",
  "berck": "62600",
  "le touquet": "62520",
  "le touquet-paris-plage": "62520",
  "rang-du-fliers": "62180",
  "montreuil-sur-mer": "62170",
  "boulogne-sur-mer": "62200",
  "calais": "62100",
  "etaples": "62630",
  "etaples-sur-mer": "62630",
  "saint-josse": "62170",
  "fort-mahon": "80120",
  "crotoy": "80550",
  "le crotoy": "80550",
};

function getCodePostal(lieu: string): string {
  return villesCoteOpale[lieu.toLowerCase().trim()] ?? siteConfig.adresse.postalCode;
}

// ─── LodgingBusiness (home page) ────────────────────────────────────────────

export function getLodgingBusinessSchema(opts: {
  email?: string;
  telephone?: string;
  airbnbUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    url: base,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.adresse.locality,
      addressRegion: siteConfig.adresse.region,
      postalCode: siteConfig.adresse.postalCode,
      addressCountry: siteConfig.adresse.country,
    },
    ...(opts.email ? { email: opts.email } : {}),
    ...(opts.telephone ? { telephone: opts.telephone } : {}),
    ...(opts.airbnbUrl
      ? { sameAs: [opts.airbnbUrl] }
      : {}),
    geo: {
      "@type": "GeoCoordinates",
      // Rang-du-Fliers approximate coordinates
      latitude: 50.4186,
      longitude: 1.6089,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 50.4186,
        longitude: 1.6089,
      },
      geoRadius: "50000",
    },
    containsPlace: { "@type": "Place", name: "Côte d'Opale" },
  };
}

// ─── VacationRental (logement page) ─────────────────────────────────────────

export function getVacationRentalSchema(logement: {
  nom: string;
  slug: string;
  description_courte: string;
  capacite?: number;
  chambres?: number;
  photos?: string[];
}) {
  const url = `${base}/logements/${logement.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": url,
    name: logement.nom,
    url,
    description: logement.description_courte,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.adresse.locality,
      addressRegion: siteConfig.adresse.region,
      postalCode: siteConfig.adresse.postalCode,
      addressCountry: siteConfig.adresse.country,
    },
    ...(logement.capacite
      ? { numberOfRooms: logement.chambres, occupancy: { "@type": "QuantitativeValue", maxValue: logement.capacite } }
      : {}),
    ...(logement.photos?.length
      ? { image: logement.photos.slice(0, 5) }
      : {}),
    containedInPlace: {
      "@type": "LodgingBusiness",
      name: siteConfig.name,
      url: base,
    },
  };
}

// ─── Events ─────────────────────────────────────────────────────────────────

/**
 * Convert a bare date ("2026-07-15") to ISO 8601 with France timezone.
 * CEST +02:00 (Apr–Oct), CET +01:00 (Nov–Mar).
 * If the string already contains "T", strips the existing offset and re-applies.
 */
function toFranceIso(dateStr: string, defaultHour = 10): string {
  const month = parseInt(dateStr.slice(5, 7), 10);
  const tz = month >= 4 && month <= 10 ? "+02:00" : "+01:00";
  if (dateStr.includes("T")) {
    const bare = dateStr.split("+")[0].replace("Z", "");
    return `${bare}${tz}`;
  }
  const hh = String(defaultHour).padStart(2, "0");
  return `${dateStr}T${hh}:00:00${tz}`;
}

/** Single event schema — no @context (used inside @graph). */
export function getEventSchema(ev: Evenement): Record<string, unknown> {
  const startDate = toFranceIso(ev.date, 10);
  // Use date_fin when available; otherwise +4 h (same day, 14:00)
  const endDate = ev.date_fin
    ? toFranceIso(ev.date_fin, 10)
    : toFranceIso(ev.date, 14);

  return {
    "@type": "Event",
    name: ev.titre,
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: ev.description || `${ev.titre} — Événement sur la Côte d'Opale`,
    // Always include an image; fall back to the global OG image
    image: `${base}/opengraph-image`,
    location: {
      "@type": "Place",
      name: ev.lieu,
      address: {
        "@type": "PostalAddress",
        addressLocality: ev.lieu,
        addressRegion: siteConfig.adresse.region,
        postalCode: getCodePostal(ev.lieu),
        addressCountry: siteConfig.adresse.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: base,
    },
  };
}

/** All events as a single @graph — valid JSON-LD, one <script> tag. */
export function getEventsSchema(evenements: Evenement[]) {
  return {
    "@context": "https://schema.org",
    "@graph": evenements.slice(0, 10).map(getEventSchema),
  };
}

// ─── Restaurants ─────────────────────────────────────────────────────────────

export function getRestaurantsSchema(
  restaurants: Array<{ nom: string; description?: string; adresse?: string; site_web?: string }>
) {
  return restaurants.slice(0, 8).map((r) => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.nom,
    ...(r.description ? { description: r.description } : {}),
    ...(r.adresse
      ? { address: { "@type": "PostalAddress", streetAddress: r.adresse, addressCountry: siteConfig.adresse.country } }
      : {}),
    ...(r.site_web ? { url: r.site_web } : {}),
  }));
}

// ─── TouristAttraction (explorer page) ──────────────────────────────────────

export function getTouristAttractionSchema(lieu: {
  nom: string;
  slug: string;
  description: string;
  image?: string;
  distance?: string;
}) {
  const url = `${base}/explorer/${lieu.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: lieu.nom,
    url,
    description: lieu.description,
    ...(lieu.image ? { image: lieu.image } : {}),
    ...(lieu.distance
      ? { additionalProperty: { "@type": "PropertyValue", name: "distance", value: lieu.distance } }
      : {}),
    containedInPlace: {
      "@type": "Place",
      name: "Côte d'Opale",
      address: {
        "@type": "PostalAddress",
        addressRegion: siteConfig.adresse.region,
        addressCountry: siteConfig.adresse.country,
      },
    },
  };
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
