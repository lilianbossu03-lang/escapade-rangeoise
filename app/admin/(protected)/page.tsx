import { createAdminClient } from "@/lib/supabase/admin";
import {
  ClipboardList,
  Home,
  CalendarCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const statutColors: Record<string, string> = {
  confirme: "bg-green-100 text-green-700",
  en_attente: "bg-amber-100 text-amber-700",
  refuse: "bg-red-100 text-red-700",
  annule: "bg-gray-100 text-gray-500",
};
const statutLabels: Record<string, string> = {
  confirme: "Confirmé",
  en_attente: "En attente",
  refuse: "Refusé",
  annule: "Annulé",
};

export default async function DashboardPage() {
  const supabase = createAdminClient();
  const today = new Date().toISOString().split("T")[0];

  const [{ data: reservations }, { data: logements }] = await Promise.all([
    supabase.from("reservations").select("*").order("created_at", { ascending: false }),
    supabase.from("logements").select("id, nom, capacite, prix_par_nuit, disponible").order("ordre"),
  ]);

  const resList = reservations ?? [];
  const logList = logements ?? [];

  const pending = resList.filter((r) => r.statut === "en_attente");
  const confirmed = resList.filter((r) => r.statut === "confirme");
  const arrivals = resList
    .filter((r) => r.statut === "confirme" && r.date_arrivee >= today)
    .sort((a, b) => a.date_arrivee.localeCompare(b.date_arrivee))
    .slice(0, 5);
  const disponibles = logList.filter((l) => l.disponible).length;

  const stats = [
    {
      label: "Réservations en attente",
      value: pending.length,
      icon: Clock,
      iconColor: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      label: "Réservations confirmées",
      value: confirmed.length,
      icon: CheckCircle2,
      iconColor: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      label: "Logements actifs",
      value: `${disponibles} / ${logList.length}`,
      icon: Home,
      iconColor: "text-primary",
      bg: "bg-sand/40",
      border: "border-sand",
    },
    {
      label: "Prochaines arrivées",
      value: arrivals.length,
      icon: CalendarCheck,
      iconColor: "text-gold",
      bg: "bg-gold/10",
      border: "border-gold/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Alert if pending */}
      {pending.length > 0 && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <ClipboardList className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-lato font-semibold text-amber-800 text-sm">
              {pending.length} demande{pending.length > 1 ? "s" : ""} de
              réservation en attente
            </p>
            <p className="font-lato text-xs text-amber-600 mt-0.5">
              Répondez rapidement pour ne pas faire attendre vos voyageurs.
            </p>
          </div>
          <a
            href="/admin/reservations"
            className="font-lato text-xs font-semibold text-amber-700 underline flex-shrink-0 hover:text-amber-900"
          >
            Traiter →
          </a>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, iconColor, bg, border }) => (
          <div
            key={label}
            className={`${bg} border ${border} rounded-2xl p-5 flex items-start justify-between`}
          >
            <div>
              <p className="font-lato text-xs text-gray-500 mb-2 leading-tight">
                {label}
              </p>
              <p className="font-playfair text-3xl font-bold text-primary">
                {value}
              </p>
            </div>
            <div className="bg-white rounded-xl p-2.5 shadow-sm">
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Two-column row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming arrivals */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-gold" />
            <h2 className="font-playfair text-lg text-primary">
              Prochaines arrivées
            </h2>
          </div>
          {arrivals.length === 0 ? (
            <p className="font-lato text-sm text-gray-400 text-center py-8">
              Aucune arrivée confirmée à venir.
            </p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {arrivals.map((r) => (
                <li key={r.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-lato font-semibold text-sm text-primary truncate">
                      {r.nom_client}
                    </p>
                    <p className="font-lato text-xs text-gray-500 mt-0.5">
                      {r.logement_nom}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-lato text-xs font-semibold text-primary">
                      {formatDate(r.date_arrivee)}
                    </p>
                    <p className="font-lato text-xs text-gray-400 mt-0.5">
                      {r.nb_adultes + r.nb_enfants} pers.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent reservations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold" />
            <h2 className="font-playfair text-lg text-primary">
              Dernières demandes
            </h2>
          </div>
          {resList.length === 0 ? (
            <p className="font-lato text-sm text-gray-400 text-center py-8">
              Aucune réservation pour le moment.
            </p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {resList.slice(0, 5).map((r) => (
                <li key={r.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-lato font-semibold text-sm text-primary truncate">
                      {r.nom_client}
                    </p>
                    <p className="font-lato text-xs text-gray-500 mt-0.5">
                      {r.logement_nom} · {formatDate(r.date_arrivee)}
                    </p>
                  </div>
                  <span
                    className={`font-lato text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                      statutColors[r.statut] ?? "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {statutLabels[r.statut] ?? r.statut}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Logements overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Home className="w-4 h-4 text-gold" />
          <h2 className="font-playfair text-lg text-primary">Logements</h2>
        </div>
        {logList.length === 0 ? (
          <p className="font-lato text-sm text-gray-400 text-center py-8">
            Aucun logement trouvé.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {logList.map((l) => (
              <div key={l.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-playfair text-sm text-primary leading-tight">
                    {l.nom}
                  </p>
                  <span
                    className={`text-xs font-lato font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      l.disponible
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {l.disponible ? "Actif" : "Inactif"}
                  </span>
                </div>
                <p className="font-lato text-xs text-gray-400">
                  {l.capacite} pers · {l.prix_par_nuit}€/nuit
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
