import { createAdminClient } from "@/lib/supabase/admin";
import { updateLogementDisponible } from "@/app/admin/actions";
import { Home, BedDouble, Users, Euro, Pencil } from "lucide-react";
import Link from "next/link";

export default async function LogementsAdminPage() {
  const supabase = createAdminClient();
  const { data: logements } = await supabase
    .from("logements")
    .select("*")
    .order("ordre");

  const list = logements ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((l) => (
          <div key={l.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Photo */}
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.photo_principale} alt={l.nom} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className={`absolute top-3 right-3 font-lato text-xs font-bold px-2.5 py-1 rounded-full ${l.disponible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {l.disponible ? "Actif" : "Inactif"}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-playfair text-lg text-primary mb-1">{l.nom}</h3>
              <p className="font-lato text-xs text-gray-400 mb-4 line-clamp-2">{l.description_courte}</p>

              <div className="flex flex-wrap gap-3 text-xs text-gray-500 font-lato mb-4">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-gold" />{l.capacite} pers.</span>
                <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-gold" />{l.nb_chambres} ch.</span>
                <span className="flex items-center gap-1"><Euro className="w-3.5 h-3.5 text-gold" />{l.prix_par_nuit}€/nuit</span>
              </div>

              <div className="flex gap-2">
                {/* Edit button */}
                <Link
                  href={`/admin/logements/${l.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white font-lato text-sm font-semibold py-2.5 rounded-xl hover:bg-secondary transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Modifier
                </Link>

                {/* Toggle disponible */}
                <form action={async () => { "use server"; await updateLogementDisponible(l.id, !l.disponible); }}>
                  <button
                    type="submit"
                    className={`font-lato text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                      l.disponible
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {l.disponible ? "Désactiver" : "Activer"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <Home className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="font-lato text-gray-400">Aucun logement trouvé.</p>
          <p className="font-lato text-xs text-gray-400 mt-1">Exécutez le fichier seed.sql dans Supabase pour importer les données.</p>
        </div>
      )}
    </div>
  );
}
