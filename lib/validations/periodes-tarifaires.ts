import type { PeriodeTarifaire } from "@/types";

/**
 * Check if a new date range overlaps with any existing periods for the same logement.
 * Two ranges overlap when: newDebut < existing.fin AND newFin > existing.debut
 * Returns the first conflicting period, or null if no overlap.
 */
export function checkPeriodeOverlap(
  periodes: PeriodeTarifaire[],
  newDebut: string,
  newFin: string,
  excludeId?: string
): PeriodeTarifaire | null {
  for (const p of periodes) {
    if (excludeId && p.id === excludeId) continue;
    if (newDebut < p.date_fin && newFin > p.date_debut) {
      return p;
    }
  }
  return null;
}
