export interface Logement {
  id: string;
  slug: string;
  nom: string;
  description: string;
  description_courte: string;
  prix_par_nuit: number;
  capacite: number;
  nb_chambres: number;
  nb_salles_de_bain: number;
  equipements: string[];
  photos: string[];
  photo_principale: string;
  adresse: string;
  disponible: boolean;
  airbnb_url?: string;
}

export interface Evenement {
  id: string;
  titre: string;
  date: string;
  date_fin?: string;
  lieu: string;
  description: string;
  categorie: "festival" | "sport" | "culture" | "nature" | "gastronomie";
  url?: string;
}

export interface Restaurant {
  id: string;
  nom: string;
  type_cuisine: string;
  gamme_prix: "€" | "€€" | "€€€";
  adresse: string;
  ville: string;
  telephone?: string;
  site_web?: string;
  google_maps_url: string;
  description: string;
  photo?: string;
  specialite?: string;
}

export interface ContenuSite {
  hero_titre: string;
  hero_sous_titre: string;
  hero_image: string;
  qui_suis_je_titre: string;
  qui_suis_je_texte: string;
  qui_suis_je_photo: string;
  region_titre: string;
  region_description: string;
  contact_email: string;
  contact_telephone: string;
  airbnb_url: string;
}

export interface DateBloquee {
  logement_id: string;
  date_debut: string;
  date_fin: string;
  raison?: string;
}

export interface Reservation {
  id: string;
  logement_id: string;
  logement_nom: string;
  nom: string;
  email: string;
  telephone: string;
  date_arrivee: string;
  date_depart: string;
  nb_adultes: number;
  nb_enfants: number;
  message: string;
  statut: "en_attente" | "confirme" | "refuse" | "annule";
  date_creation: string;
}

export interface PeriodeTarifaire {
  id: string;
  logement_id: string;
  nom: string;
  date_debut: string; // yyyy-MM-dd
  date_fin: string;   // yyyy-MM-dd
  prix_par_nuit: number;
  created_at?: string;
}

export interface RegionActivite {
  titre: string;
  description: string;
}

export interface RegionInfosPratiques {
  distance_km: string;
  temps_voiture: string;
  tarif: string;
  meilleure_periode: string;
}

export interface RegionPoint {
  slug: string;
  nom: string;
  sous_titre: string;
  description: string;
  paragraphes: string[];
  image: string;
  image_hero?: string;
  image_hero_position?: string;
  distance?: string;
  activites: RegionActivite[];
  infos_pratiques: RegionInfosPratiques;
}
