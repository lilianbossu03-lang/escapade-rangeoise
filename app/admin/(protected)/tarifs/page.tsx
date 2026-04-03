import { createAdminClient } from "@/lib/supabase/admin";
import TarifsEditor from "./TarifsEditor";
import type { PeriodeTarifaire } from "@/types";

export default async function TarifsPage() {
  const supabase = createAdminClient();
  const [{ data: logements }, { data: periodes }] = await Promise.all([
    supabase.from("logements").select("id, nom, prix_par_nuit").order("ordre"),
    supabase.from("periodes_tarifaires").select("*").order("date_debut"),
  ]);

  const logementList = (logements ?? []).map((l) => ({
    id: l.id as string,
    nom: l.nom as string,
    prix_par_nuit: Number(l.prix_par_nuit),
  }));

  const periodeList: PeriodeTarifaire[] = (periodes ?? []).map((p) => ({
    id: p.id,
    logement_id: p.logement_id,
    nom: p.nom,
    date_debut: p.date_debut,
    date_fin: p.date_fin,
    prix_par_nuit: Number(p.prix_par_nuit),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl text-primary mb-1">Tarifs par période</h1>
        <p className="font-lato text-sm text-gray-500">
          Sélectionnez une plage de dates sur le calendrier pour définir un tarif spécial pour un logement.
        </p>
      </div>

      {logementList.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <p className="font-lato text-gray-400">Aucun logement trouvé.</p>
        </div>
      ) : (
        <TarifsEditor logements={logementList} initialPeriodes={periodeList} />
      )}
    </div>
  );
}
