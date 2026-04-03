import type { PeriodeTarifaire } from "@/types";

export interface JourTarif {
  date: string; // yyyy-MM-dd
  prix: number;
  nomPeriode?: string;
  estSpecial: boolean;
}

/**
 * Retourne une entrée par nuit (arrivée incluse, départ exclu)
 * avec le prix applicable selon les périodes tarifaires.
 */
export function getPrixParJour(
  dateArrivee: Date,
  dateDepart: Date,
  prixBase: number,
  periodes: PeriodeTarifaire[]
): JourTarif[] {
  const jours: JourTarif[] = [];
  const current = new Date(dateArrivee);
  current.setHours(0, 0, 0, 0);
  const fin = new Date(dateDepart);
  fin.setHours(0, 0, 0, 0);

  while (current < fin) {
    const dateStr = current.toISOString().split("T")[0];
    const periode = periodes.find(
      (p) => dateStr >= p.date_debut && dateStr <= p.date_fin
    );
    jours.push({
      date: dateStr,
      prix: periode ? Number(periode.prix_par_nuit) : prixBase,
      nomPeriode: periode?.nom,
      estSpecial: !!periode,
    });
    current.setDate(current.getDate() + 1);
  }

  return jours;
}

export function calculerTotal(jours: JourTarif[]): number {
  return jours.reduce((sum, j) => sum + j.prix, 0);
}

/**
 * Regroupe les nuits consécutives au même tarif pour un affichage lisible.
 * Ex: ["3 nuits × 120€", "2 nuits × 180€ (Été 2026)"]
 */
export function getBreakdown(jours: JourTarif[]): string[] {
  if (jours.length === 0) return [];

  const groups: { prix: number; nomPeriode?: string; count: number }[] = [];
  for (const jour of jours) {
    const last = groups[groups.length - 1];
    if (last && last.prix === jour.prix && last.nomPeriode === jour.nomPeriode) {
      last.count++;
    } else {
      groups.push({ prix: jour.prix, nomPeriode: jour.nomPeriode, count: 1 });
    }
  }

  return groups.map((g) => {
    const n = g.count;
    const label = `${n} nuit${n > 1 ? "s" : ""} × ${g.prix}€`;
    return g.nomPeriode ? `${label} (${g.nomPeriode})` : label;
  });
}
