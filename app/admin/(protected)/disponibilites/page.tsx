import { createAdminClient } from "@/lib/supabase/admin";
import { createDateBloquee, deleteDateBloquee } from "@/app/admin/actions";
import { CalendarDays, Trash2, Plus } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function DisponibilitesPage() {
  const supabase = createAdminClient();
  const [{ data: logements }, { data: dates }] = await Promise.all([
    supabase.from("logements").select("id, nom").order("ordre"),
    supabase.from("dates_bloquees").select("*, logements(nom)").order("date_debut"),
  ]);

  const logementList = logements ?? [];
  const dateList = dates ?? [];

  return (
    <div className="space-y-8">
      {/* Formulaire d'ajout */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-playfair text-xl text-primary mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-gold" />
          Bloquer des dates
        </h2>
        <form
          action={async (formData: FormData) => {
            "use server";
            await createDateBloquee({
              logement_id: formData.get("logement_id") as string,
              date_debut: formData.get("date_debut") as string,
              date_fin: formData.get("date_fin") as string,
              motif: (formData.get("motif") as string) || "Réservé",
            });
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Logement</label>
            <select name="logement_id" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold">
              <option value="">Choisir...</option>
              {logementList.map((l) => <option key={l.id} value={l.id}>{l.nom}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Date de début</label>
            <input type="date" name="date_debut" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold" />
          </div>
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Date de fin</label>
            <input type="date" name="date_fin" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold" />
          </div>
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Motif</label>
            <div className="flex gap-2">
              <input type="text" name="motif" placeholder="Réservé" className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold" />
              <button type="submit" className="bg-primary text-white font-lato text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-secondary transition-colors flex-shrink-0">
                Bloquer
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gold" />
          <h2 className="font-playfair text-lg text-primary">Dates bloquées</h2>
        </div>
        {dateList.length === 0 ? (
          <p className="font-lato text-sm text-gray-400 text-center py-8">Aucune date bloquée.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {dateList.map((d) => (
              <div key={d.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-lato font-semibold text-sm text-primary">
                    {(d.logements as { nom: string } | null)?.nom ?? "—"}
                  </p>
                  <p className="font-lato text-xs text-gray-500 mt-0.5">
                    {formatDate(d.date_debut)} → {formatDate(d.date_fin)}
                    {d.motif && <span className="ml-2 text-gray-400">· {d.motif}</span>}
                  </p>
                </div>
                <form action={async () => { "use server"; await deleteDateBloquee(d.id); }}>
                  <button type="submit" className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
