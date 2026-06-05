import { siteConfig } from "@/lib/seo-config";

// ─── Helpers ────────────────────────────────────────────────────────────────

const base = siteConfig.url;

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
 * Convert a bare date ("2026-07-15") to a full ISO 8601 datetime string with
 * France timezone offset (CEST +02:00 Apr–Oct, CET +01:00 Nov–Mar).
 * If the date already contains a time component it is left as-is (tz appended).
 */
function toFranceIso(dateStr: string, defaultHour = 10): string {
  const month = parseInt(dateStr.slice(5, 7), 10);
  const tz = month >= 4 && month <= 10 ? "+02:00" : "+01:00";
  if (dateStr.includes("T")) {
    // Already has time — strip any existing offset and re-apply
    const bare = dateStr.split("+")[0].replace("Z", "");
    return `${bare}${tz}`;
  }
  const hh = String(defaultHour).padStart(2, "0");
  return `${dateStr}T${hh}:00:00${tz}`;
}

export function getEventsSchema(
  evenements: Array<{
    nom: string;
    description?: string;
    date: string;
    lieu?: string;
    image?: string;
  }>
) {
  return evenements.slice(0, 10).map((ev) => {
    const startDate = toFranceIso(ev.date, 10);
    const endDate = toFranceIso(ev.date, 14); // +4 h default

    // Map free-text lieu to addressLocality; fall back to siteConfig
    const addressLocality = ev.lieu ?? siteConfig.adresse.locality;
    // Best-effort postalCode: only fill if lieu matches our known locality
    const postalCode =
      !ev.lieu || ev.lieu === siteConfig.adresse.locality
        ? siteConfig.adresse.postalCode
        : undefined;

    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: ev.nom,
      description: ev.description ?? `${ev.nom} — événement sur la Côte d'Opale`,
      startDate,
      endDate,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: ev.lieu ?? "Côte d'Opale",
        address: {
          "@type": "PostalAddress",
          addressLocality,
          addressRegion: siteConfig.adresse.region,
          ...(postalCode ? { postalCode } : {}),
          addressCountry: siteConfig.adresse.country,
        },
      },
      ...(ev.image ? { image: ev.image } : {}),
      organizer: {
        "@type": "Organization",
        name: siteConfig.name,
        url: base,
      },
    };
  });
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
