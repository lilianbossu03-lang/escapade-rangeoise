import { notFound } from "next/navigation";
import LogementDetail from "./LogementDetail";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PeriodeTarifaire } from "@/types";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("logements").select("slug");
  return (data ?? []).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("logements")
    .select("nom, description_courte")
    .eq("slug", params.slug)
    .single();

  if (!data) return {};
  return {
    title: `${data.nom} — L'Escapade Rangeoise`,
    description: data.description_courte,
  };
}

export default async function LogementPage({ params }: Props) {
  const supabase = createClient();

  const { data: logement } = await supabase
    .from("logements")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!logement) notFound();

  const [{ data: datesData }, { data: periodesData }] = await Promise.all([
    supabase.from("dates_bloquees").select("*").eq("logement_id", logement.id),
    supabase.from("periodes_tarifaires").select("*").eq("logement_id", logement.id),
  ]);

  const datesBloquees = (datesData ?? []).map(
    (d: { logement_id: string; date_debut: string; date_fin: string; motif?: string }) => ({
      logement_id: d.logement_id,
      date_debut: d.date_debut,
      date_fin: d.date_fin,
      raison: d.motif,
    })
  );

  const periodesTarifaires: PeriodeTarifaire[] = (periodesData ?? []).map((p) => ({
    id: p.id,
    logement_id: p.logement_id,
    nom: p.nom,
    date_debut: p.date_debut,
    date_fin: p.date_fin,
    prix_par_nuit: Number(p.prix_par_nuit),
  }));

  return (
    <LogementDetail
      logement={logement}
      dates_bloquees={datesBloquees}
      periodes_tarifaires={periodesTarifaires}
    />
  );
}
