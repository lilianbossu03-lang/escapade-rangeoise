import { createAdminClient } from "@/lib/supabase/admin";
import { createEvenement, deleteEvenement } from "@/app/admin/actions";
import { PartyPopper, Trash2, Plus, MapPin, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const categories = ["festival", "sport", "culture", "nature", "gastronomie"];
const categorieColors: Record<string, string> = {
  festival: "bg-purple-100 text-purple-700",
  sport: "bg-green-100 text-green-700",
  culture: "bg-blue-100 text-blue-700",
  nature: "bg-emerald-100 text-emerald-700",
  gastronomie: "bg-orange-100 text-orange-700",
};

export default async function EvenementsAdminPage() {
  const supabase = createAdminClient();
  const { data: evenements } = await supabase
    .from("evenements")
    .select("*")
    .order("date");

  const list = evenements ?? [];

  return (
    <div className="space-y-8">
      {/* Formulaire d'ajout */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-playfair text-xl text-primary mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-gold" />
          Ajouter un événement
        </h2>
        <form
          action={async (formData: FormData) => {
            "use server";
            await createEvenement({
              titre: formData.get("titre") as string,
              date: formData.get("date") as string,
              date_fin: (formData.get("date_fin") as string) || undefined,
              lieu: formData.get("lieu") as string,
              description: formData.get("description") as string,
              categorie: formData.get("categorie") as string,
              url: (formData.get("url") as string) || undefined,
            });
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Titre *</label>
              <input type="text" name="titre" required placeholder="Nom de l'événement" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Date de début *</label>
              <input type="date" name="date" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Date de fin</label>
              <input type="date" name="date_fin" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Lieu *</label>
              <input type="text" name="lieu" required placeholder="Berck-sur-Mer" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Catégorie *</label>
              <select name="categorie" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold">
                {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Description *</label>
              <textarea name="description" required rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold resize-none" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">URL (optionnel)</label>
              <input type="url" name="url" placeholder="https://..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
          </div>
          <button type="submit" className="bg-primary text-white font-lato text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-secondary transition-colors">
            Ajouter l'événement
          </button>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <PartyPopper className="w-4 h-4 text-gold" />
          <h2 className="font-playfair text-lg text-primary">Événements ({list.length})</h2>
        </div>
        {list.length === 0 ? (
          <p className="font-lato text-sm text-gray-400 text-center py-8">Aucun événement.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {list.map((evt) => (
              <div key={evt.id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="bg-primary text-white rounded-xl px-3 py-2 flex flex-col items-center flex-shrink-0">
                    <span className="font-playfair text-lg font-bold leading-none">{format(parseISO(evt.date), "d", { locale: fr })}</span>
                    <span className="font-lato text-xs uppercase text-gold">{format(parseISO(evt.date), "MMM", { locale: fr })}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-playfair text-base text-primary font-semibold">{evt.titre}</p>
                      <span className={`font-lato text-xs font-semibold px-2 py-0.5 rounded-full ${categorieColors[evt.categorie] ?? "bg-gray-100 text-gray-600"}`}>{evt.categorie}</span>
                    </div>
                    <p className="font-lato text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{evt.lieu}</p>
                    <p className="font-lato text-xs text-gray-500 mt-1 line-clamp-2">{evt.description}</p>
                  </div>
                </div>
                <form action={async () => { "use server"; await deleteEvenement(evt.id); }}>
                  <button type="submit" className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50 flex-shrink-0">
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
