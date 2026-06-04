import { createAdminClient } from "@/lib/supabase/admin";
import { updateReservationStatut } from "@/app/admin/actions";
import { CheckCircle2, XCircle, Clock, CalendarDays, Users, Mail, Phone, MessageSquare, AlertTriangle } from "lucide-react";

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const errorMessages: Record<string, string> = {
  conflit_dates:
    "Impossible de confirmer : ces dates sont déjà bloquées par une autre réservation.",
  reservation_introuvable: "Réservation introuvable.",
};

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = createAdminClient();
  const { data: reservations } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  const list = reservations ?? [];
  const pending = list.filter((r) => r.statut === "en_attente");

  return (
    <div className="space-y-6">
      {/* Error banner from action */}
      {params.error && errorMessages[params.error] && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="font-lato text-sm text-red-800 font-semibold">
            {errorMessages[params.error]}
          </p>
        </div>
      )}

      {/* Alert */}
      {pending.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="font-lato text-sm text-amber-800 font-semibold">
            {pending.length} demande{pending.length > 1 ? "s" : ""} en attente de traitement
          </p>
        </div>
      )}

      {list.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="font-lato text-gray-400">Aucune réservation pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left: client info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-playfair text-lg text-primary font-semibold">{r.nom_client}</h3>
                      <span className={`font-lato text-xs font-semibold px-2.5 py-1 rounded-full ${statutColors[r.statut]}`}>
                        {statutLabels[r.statut]}
                      </span>
                    </div>

                    <p className="font-lato text-sm text-gold font-semibold">{r.logement_nom}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-lato">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        {formatDate(r.date_arrivee)} → {formatDate(r.date_depart)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        {r.nb_adultes} adulte{r.nb_adultes > 1 ? "s" : ""}
                        {r.nb_enfants > 0 ? `, ${r.nb_enfants} enfant${r.nb_enfants > 1 ? "s" : ""}` : ""}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-lato">
                      <a href={`mailto:${r.email_client}`} className="flex items-center gap-1 hover:text-primary transition-colors min-h-[44px] py-1"><Mail className="w-3.5 h-3.5" />{r.email_client}</a>
                      {r.telephone_client && <a href={`tel:${r.telephone_client}`} className="flex items-center gap-1 hover:text-primary transition-colors min-h-[44px] py-1"><Phone className="w-3.5 h-3.5" />{r.telephone_client}</a>}
                    </div>

                    {r.message && (
                      <div className="flex gap-2 bg-gray-50 rounded-xl px-3 py-2 mt-1">
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="font-lato text-xs text-gray-500 italic">{r.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Right: actions */}
                  {r.statut === "en_attente" && (
                    <div className="flex sm:flex-col gap-2 flex-shrink-0 w-full sm:w-auto">
                      <form action={async () => { "use server"; await updateReservationStatut(r.id, "confirme"); }} className="flex-1 sm:flex-none">
                        <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-green-600 text-white font-lato text-sm font-semibold px-4 py-3 sm:py-2 rounded-xl hover:bg-green-700 transition-colors min-h-[44px]">
                          <CheckCircle2 className="w-4 h-4" /> Confirmer
                        </button>
                      </form>
                      <form action={async () => { "use server"; await updateReservationStatut(r.id, "refuse"); }} className="flex-1 sm:flex-none">
                        <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-red-600 text-white font-lato text-sm font-semibold px-4 py-3 sm:py-2 rounded-xl hover:bg-red-700 transition-colors min-h-[44px]">
                          <XCircle className="w-4 h-4" /> Refuser
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-6 py-2 bg-gray-50 border-t border-gray-100">
                <p className="font-lato text-xs text-gray-400">
                  Reçue le {formatDate(r.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
