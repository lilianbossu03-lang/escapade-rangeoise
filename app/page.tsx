import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogementsCarrousel from "@/components/LogementsCarrousel";
import RegionSection from "@/components/RegionSection";
import EvenementsSection from "@/components/EvenementsSection";
import ProprietaireSection from "@/components/ProprietaireSection";
import RestaurantsSection from "@/components/RestaurantsSection";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import FloatingReserveButton from "@/components/FloatingReserveButton";
import { createClient } from "@/lib/supabase/server";
import { ContenuSite } from "@/types";
import type { PeriodeTarifaire } from "@/types";

export const revalidate = 60; // revalidation toutes les 60s

async function fetchData() {
  const supabase = createClient();

  const [
    { data: logements },
    { data: region_points },
    { data: evenements },
    { data: restaurants },
    { data: contenu_rows },
    { data: dates_bloquees },
    { data: periodes_raw },
  ] = await Promise.all([
    supabase.from("logements").select("*").eq("disponible", true).order("ordre"),
    supabase.from("lieux_explorer").select("*").order("ordre"),
    supabase.from("evenements").select("*").order("date"),
    supabase.from("restaurants").select("*"),
    supabase.from("contenu_site").select("cle, valeur"),
    supabase.from("dates_bloquees").select("*"),
    supabase.from("periodes_tarifaires").select("*"),
  ]);

  // Contenu site : rows → objet clé/valeur
  const contenu: ContenuSite = {
    hero_titre: "",
    hero_sous_titre: "",
    hero_image: "",
    qui_suis_je_titre: "",
    qui_suis_je_texte: "",
    qui_suis_je_photo: "",
    region_titre: "",
    region_description: "",
    contact_email: "",
    contact_telephone: "",
    airbnb_url: "",
    ...(contenu_rows ?? []).reduce((acc, row) => ({ ...acc, [row.cle]: row.valeur ?? "" }), {}),
  };

  // Dates bloquées : adapter le format Supabase vers le type local
  const datesFormatted = (dates_bloquees ?? []).map((d: {
    id: string;
    logement_id: string;
    date_debut: string;
    date_fin: string;
    motif?: string;
  }) => ({
    logement_id: d.logement_id,
    date_debut: d.date_debut,
    date_fin: d.date_fin,
    raison: d.motif,
  }));

  // Région points : adapter activites (jsonb → typed)
  const regionFormatted = (region_points ?? []).map((p: {
    slug: string;
    nom: string;
    sous_titre?: string;
    description: string;
    paragraphes?: string[];
    image: string;
    image_hero?: string;
    image_hero_position?: string;
    distance?: string;
    activites?: unknown;
    distance_km?: string;
    temps_voiture?: string;
    tarif?: string;
    meilleure_periode?: string;
  }) => ({
    slug: p.slug,
    nom: p.nom,
    sous_titre: p.sous_titre ?? "",
    description: p.description,
    paragraphes: p.paragraphes ?? [],
    image: p.image,
    image_hero: p.image_hero,
    image_hero_position: p.image_hero_position,
    distance: p.distance,
    activites: Array.isArray(p.activites) ? p.activites : [],
    infos_pratiques: {
      distance_km: p.distance_km ?? "",
      temps_voiture: p.temps_voiture ?? "",
      tarif: p.tarif ?? "",
      meilleure_periode: p.meilleure_periode ?? "",
    },
  }));

  const periodesTarifaires: PeriodeTarifaire[] = (periodes_raw ?? []).map((p) => ({
    id: p.id,
    logement_id: p.logement_id,
    nom: p.nom,
    date_debut: p.date_debut,
    date_fin: p.date_fin,
    prix_par_nuit: Number(p.prix_par_nuit),
  }));

  return {
    logements: logements ?? [],
    region_points: regionFormatted,
    evenements: evenements ?? [],
    restaurants: restaurants ?? [],
    contenu,
    dates_bloquees: datesFormatted,
    periodes_tarifaires: periodesTarifaires,
  };
}

export default async function Home() {
  const { logements, region_points, evenements, restaurants, contenu, dates_bloquees, periodes_tarifaires } = await fetchData();

  return (
    <main>
      <Navbar />
      <Hero />
      <LogementsCarrousel logements={logements} />
      <RegionSection region_points={region_points} />
      <EvenementsSection evenements={evenements} />
      <ProprietaireSection contenu_site={contenu} />
      <RestaurantsSection restaurants={restaurants} />
      <Suspense fallback={<div id="reservation" className="py-20 bg-sand" />}>
        <ReservationForm logements={logements} dates_bloquees={dates_bloquees} periodes_tarifaires={periodes_tarifaires} />
      </Suspense>
      <Footer />
      <FloatingReserveButton />
    </main>
  );
}
