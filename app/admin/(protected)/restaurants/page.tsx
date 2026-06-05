import { createAdminClient } from "@/lib/supabase/admin";
import { createRestaurant, deleteRestaurant } from "@/app/admin/actions";
import { UtensilsCrossed, Trash2, Plus, MapPin } from "lucide-react";
import Image from "next/image";

export default async function RestaurantsAdminPage() {
  const supabase = createAdminClient();
  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("*")
    .order("nom");

  const list = restaurants ?? [];

  return (
    <div className="space-y-8">
      {/* Formulaire d'ajout */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-playfair text-xl text-primary mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-gold" />
          Ajouter un restaurant
        </h2>
        <form
          action={async (formData: FormData) => {
            "use server";
            await createRestaurant({
              nom: formData.get("nom") as string,
              type_cuisine: formData.get("type_cuisine") as string,
              gamme_prix: formData.get("gamme_prix") as string,
              adresse: formData.get("adresse") as string,
              ville: formData.get("ville") as string,
              telephone: (formData.get("telephone") as string) || undefined,
              site_web: (formData.get("site_web") as string) || undefined,
              google_maps_url: (formData.get("google_maps_url") as string) || undefined,
              description: formData.get("description") as string,
              specialite: (formData.get("specialite") as string) || undefined,
            });
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Nom *</label>
              <input type="text" name="nom" required placeholder="Nom du restaurant" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Type de cuisine *</label>
              <input type="text" name="type_cuisine" required placeholder="Fruits de mer, Gastronomie..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Gamme de prix *</label>
              <select name="gamme_prix" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold">
                <option value="€">€ — Économique</option>
                <option value="€€">€€ — Intermédiaire</option>
                <option value="€€€">€€€ — Gastronomique</option>
              </select>
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Ville *</label>
              <input type="text" name="ville" required placeholder="Berck-sur-Mer" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Adresse *</label>
              <input type="text" name="adresse" required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Téléphone</label>
              <input type="tel" name="telephone" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Lien Google Maps</label>
              <input type="url" name="google_maps_url" placeholder="https://maps.google.com/..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Description *</label>
              <textarea name="description" required rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold resize-none" />
            </div>
            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Spécialité</label>
              <input type="text" name="specialite" placeholder="Plat signature..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:border-gold" />
            </div>
          </div>
          <button type="submit" className="bg-primary text-white font-lato text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-secondary transition-colors">
            Ajouter le restaurant
          </button>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-gold" />
          <h2 className="font-playfair text-lg text-primary">Restaurants ({list.length})</h2>
        </div>
        {list.length === 0 ? (
          <p className="font-lato text-sm text-gray-400 text-center py-8">Aucun restaurant.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {list.map((r) => (
              <div key={r.id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex gap-4 min-w-0">
                  {r.photo && (
                    <Image src={r.photo} alt={r.nom} width={56} height={56} className="rounded-xl object-cover flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="font-playfair text-base text-primary font-semibold">{r.nom}</p>
                      <span className="font-lato text-xs font-bold text-gold">{r.gamme_prix}</span>
                    </div>
                    <p className="font-lato text-xs text-gold font-semibold uppercase tracking-wide mb-1">{r.type_cuisine}</p>
                    <p className="font-lato text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{r.ville}</p>
                    {r.specialite && <p className="font-lato text-xs text-gray-500 mt-1">✦ {r.specialite}</p>}
                  </div>
                </div>
                <form action={async () => { "use server"; await deleteRestaurant(r.id); }}>
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
