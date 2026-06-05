"use client";

import { useState, useTransition, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { parseISO, eachDayOfInterval, format } from "date-fns";
import { createPeriodeTarifaire, deletePeriodeTarifaire } from "@/app/admin/actions";
import type { PeriodeTarifaire } from "@/types";
import { checkPeriodeOverlap } from "@/lib/validations/periodes-tarifaires";
import { Trash2, Check, X, Euro, Loader2, AlertTriangle } from "lucide-react";
import "react-day-picker/dist/style.css";

interface Logement {
  id: string;
  nom: string;
  prix_par_nuit: number;
}

interface Props {
  logements: Logement[];
  initialPeriodes: PeriodeTarifaire[];
}

export default function TarifsEditor({ logements, initialPeriodes }: Props) {
  const [activeId, setActiveId] = useState(logements[0]?.id ?? "");
  const [periodes, setPeriodes] = useState<PeriodeTarifaire[]>(initialPeriodes);
  const [range, setRange] = useState<DateRange | undefined>();
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [isPending, startTransition] = useTransition();
  const [nbMonths, setNbMonths] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setNbMonths(window.innerWidth >= 768 ? 2 : 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeLogement = logements.find((l) => l.id === activeId);
  const lPeriodes = periodes
    .filter((p) => p.logement_id === activeId)
    .sort((a, b) => a.date_debut.localeCompare(b.date_debut));

  // Build modifiers from existing periods
  const daysHigher: Date[] = [];
  const daysLower: Date[] = [];
  for (const p of lPeriodes) {
    try {
      const days = eachDayOfInterval({
        start: parseISO(p.date_debut),
        end: parseISO(p.date_fin),
      });
      if (Number(p.prix_par_nuit) > (activeLogement?.prix_par_nuit ?? 0)) {
        daysHigher.push(...days);
      } else {
        daysLower.push(...days);
      }
    } catch {
      // skip invalid dates
    }
  }

  // Real-time overlap detection as the user selects dates
  const overlapWarning: PeriodeTarifaire | null =
    range?.from && range?.to
      ? checkPeriodeOverlap(
          lPeriodes,
          format(range.from, "yyyy-MM-dd"),
          format(range.to, "yyyy-MM-dd")
        )
      : null;

  const resetSelection = () => {
    setRange(undefined);
    setNom("");
    setPrix("");
    setSubmitError(null);
  };

  const handleTabChange = (id: string) => {
    setActiveId(id);
    resetSelection();
  };

  const handleConfirm = () => {
    if (!range?.from || !range?.to || !nom.trim() || !prix) return;
    const prixNum = parseFloat(prix);
    if (isNaN(prixNum) || prixNum < 0) return;
    if (overlapWarning) return; // blocked by real-time check

    setSubmitError(null);
    const newData = {
      logement_id: activeId,
      nom: nom.trim(),
      date_debut: format(range.from, "yyyy-MM-dd"),
      date_fin: format(range.to, "yyyy-MM-dd"),
      prix_par_nuit: prixNum,
    };

    startTransition(async () => {
      const result = await createPeriodeTarifaire(newData);
      if (!result.success) {
        setSubmitError(result.error);
        return;
      }
      // Optimistic add
      setPeriodes((prev) => [
        ...prev,
        { id: `tmp-${Date.now()}`, ...newData },
      ]);
      resetSelection();
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deletePeriodeTarifaire(id);
      setPeriodes((prev) => prev.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="space-y-6">
      {/* Logement tabs */}
      <div className="flex gap-2 flex-wrap">
        {logements.map((l) => (
          <button
            key={l.id}
            onClick={() => handleTabChange(l.id)}
            className={`font-lato text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${
              activeId === l.id
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {l.nom}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* ── Left: calendar ─────────────────────────────────────────────── */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-playfair text-lg text-primary">{activeLogement?.nom}</h3>
              <p className="font-lato text-xs text-gray-400 mt-0.5">
                Prix de base :{" "}
                <span className="font-semibold text-primary">
                  {activeLogement?.prix_par_nuit}€/nuit
                </span>
              </p>
            </div>
            {isPending && (
              <Loader2 className="w-4 h-4 animate-spin text-gray-400 mt-1" />
            )}
          </div>
          <p className="font-lato text-xs text-gray-400 mb-4">
            Cliquez et glissez pour sélectionner une plage de dates, puis définissez le tarif.
          </p>

          {/* DayPicker */}
          <div className="overflow-x-auto">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              locale={fr}
              numberOfMonths={nbMonths}
              modifiers={{ higher: daysHigher, lower: daysLower }}
              modifiersStyles={{
                higher: {
                  backgroundColor: "#fed7aa",
                  color: "#c2410c",
                  borderRadius: "50%",
                  fontWeight: "700",
                },
                lower: {
                  backgroundColor: "#bbf7d0",
                  color: "#15803d",
                  borderRadius: "50%",
                  fontWeight: "700",
                },
              }}
            />
          </div>

          {/* Inline form when range is complete */}
          {range?.from && range?.to && (
            <div className="mt-4 bg-gold/5 border border-gold/30 rounded-xl p-4">
              <p className="font-lato text-xs font-semibold text-gray-600 mb-3">
                Période sélectionnée :{" "}
                <span className="text-primary">
                  {format(range.from, "d MMMM yyyy", { locale: fr })} →{" "}
                  {format(range.to, "d MMMM yyyy", { locale: fr })}
                </span>
              </p>

              {/* Real-time overlap warning */}
              {overlapWarning && (
                <div className="mb-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="font-lato text-xs text-amber-700">
                    Chevauchement avec <strong>{overlapWarning.nom}</strong> ({overlapWarning.date_debut} → {overlapWarning.date_fin}). Ajustez les dates.
                  </p>
                </div>
              )}

              {/* Server-side error */}
              {submitError && (
                <div className="mb-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="font-lato text-xs text-red-700">{submitError}</p>
                </div>
              )}

              <div className="flex gap-3 flex-wrap items-center">
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                  placeholder="Nom (ex : Été 2026, Noël…)"
                  className="flex-1 min-w-40 border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
                />
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="number"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                    placeholder="Prix / nuit"
                    min={0}
                    step={1}
                    className="w-32 pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
                  />
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={!nom.trim() || !prix || isPending || !!overlapWarning}
                  className="flex items-center gap-1.5 bg-primary text-white font-lato text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  Confirmer
                </button>
                <button
                  onClick={resetSelection}
                  className="flex items-center gap-1.5 text-gray-500 font-lato text-sm px-3 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex gap-5 mt-4 font-lato text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-orange-200 border border-orange-300" />
              Prix majoré (haute saison)
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-200 border border-green-300" />
              Prix réduit (basse saison)
            </div>
          </div>
        </div>

        {/* ── Right: period list ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-playfair text-base text-primary">Périodes</h3>
            <span className="font-lato text-xs text-gray-400">
              {lPeriodes.length} configurée{lPeriodes.length !== 1 ? "s" : ""}
            </span>
          </div>

          {lPeriodes.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="font-lato text-sm text-gray-400">
                Aucune période — le prix de base s&apos;applique à toutes les dates.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {lPeriodes.map((p) => {
                const isHigher =
                  Number(p.prix_par_nuit) > (activeLogement?.prix_par_nuit ?? 0);
                return (
                  <div
                    key={p.id}
                    className="px-5 py-3.5 flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                          isHigher ? "bg-orange-400" : "bg-green-500"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="font-lato text-sm font-semibold text-primary truncate">
                          {p.nom}
                        </p>
                        <p className="font-lato text-xs text-gray-400 mt-0.5">
                          {format(parseISO(p.date_debut), "d MMM", { locale: fr })} →{" "}
                          {format(parseISO(p.date_fin), "d MMM yyyy", { locale: fr })}
                        </p>
                        <p
                          className={`font-lato text-xs font-bold mt-0.5 ${
                            isHigher ? "text-orange-500" : "text-green-600"
                          }`}
                        >
                          {p.prix_par_nuit}€/nuit
                          <span className="font-normal text-gray-400 ml-1">
                            ({isHigher ? "+" : ""}
                            {Math.round(
                              ((Number(p.prix_par_nuit) -
                                (activeLogement?.prix_par_nuit ?? 0)) /
                                (activeLogement?.prix_par_nuit ?? 1)) *
                                100
                            )}
                            %)
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={isPending}
                      className="text-gray-300 group-hover:text-gray-400 hover:!text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
