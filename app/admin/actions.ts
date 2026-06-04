"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sendNewReservationEmails, sendConfirmationEmail, sendRefusEmail } from "@/lib/emails/send";
import { reservationSchema } from "@/lib/schemas/reservation";
import { checkPeriodeOverlap } from "@/lib/validations/periodes-tarifaires";

export type LoginState = { error: string | null };

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email ou mot de passe incorrect." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ── Réservations ──────────────────────────────────────────────────────────────

export async function updateReservationStatut(id: string, statut: "confirme" | "refuse" | "annule") {
  const supabase = createAdminClient();

  // Fetch reservation + logement details before updating
  const { data: res } = await supabase
    .from("reservations")
    .select("*, logements(prix_par_nuit, adresse)")
    .eq("id", id)
    .single();

  if (!res) {
    redirect("/admin/reservations?error=reservation_introuvable");
  }

  if (statut === "confirme") {
    // Check for overlap with existing blocked dates (excluding any previous entry for this same reservation)
    const { data: overlap } = await supabase
      .from("dates_bloquees")
      .select("id")
      .eq("logement_id", res.logement_id)
      .lt("date_debut", res.date_depart)
      .gt("date_fin", res.date_arrivee)
      .not("reservation_id", "eq", id)
      .limit(1);

    if (overlap && overlap.length > 0) {
      redirect("/admin/reservations?error=conflit_dates");
    }

    // Remove any stale entry for this reservation (idempotent)
    await supabase.from("dates_bloquees").delete().eq("reservation_id", id);

    // Update status
    await supabase.from("reservations").update({ statut }).eq("id", id);

    // Block the dates
    await supabase.from("dates_bloquees").insert({
      logement_id: res.logement_id,
      date_debut: res.date_arrivee,
      date_fin: res.date_depart,
      reservation_id: id,
      motif: `Réservation confirmée — ${res.nom_client}`,
    });
  } else {
    // refuse or annule: release blocked dates if any
    await supabase.from("dates_bloquees").delete().eq("reservation_id", id);
    await supabase.from("reservations").update({ statut }).eq("id", id);
  }

  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
  revalidatePath("/");

  // Send email based on new status
  if (statut === "confirme") {
    await sendConfirmationEmail({
      nom_client: res.nom_client,
      email_client: res.email_client,
      logement_nom: res.logement_nom,
      logement_adresse: res.logements?.adresse,
      date_arrivee: res.date_arrivee,
      date_depart: res.date_depart,
      nb_adultes: res.nb_adultes,
      nb_enfants: res.nb_enfants,
      prix_par_nuit: res.logements?.prix_par_nuit,
    }).catch(() => {});
  } else if (statut === "refuse" || statut === "annule") {
    await sendRefusEmail({
      nom_client: res.nom_client,
      email_client: res.email_client,
      logement_nom: res.logement_nom,
      date_arrivee: res.date_arrivee,
      date_depart: res.date_depart,
    }).catch(() => {});
  }
}

// ── Logements ─────────────────────────────────────────────────────────────────

export async function updateLogementDisponible(id: string, disponible: boolean) {
  const supabase = createAdminClient();
  await supabase.from("logements").update({ disponible }).eq("id", id);
  revalidatePath("/admin/logements");
  revalidatePath("/admin");
}

export async function updateLogement(id: string, data: {
  nom?: string;
  description?: string;
  description_courte?: string;
  capacite?: number;
  nb_chambres?: number;
  nb_salles_de_bain?: number;
  prix_par_nuit?: number;
  equipements?: string[];
  photos?: string[];
  photo_principale?: string;
}) {
  const supabase = createAdminClient();
  await supabase.from("logements").update(data).eq("id", id);
  revalidatePath("/admin/logements");
  revalidatePath(`/admin/logements/${id}`);
  revalidatePath("/");
}

// ── Périodes tarifaires ───────────────────────────────────────────────────────

export type PeriodeResult =
  | { success: true }
  | { success: false; error: string };

export async function createPeriodeTarifaire(data: {
  logement_id: string;
  nom: string;
  date_debut: string;
  date_fin: string;
  prix_par_nuit: number;
}): Promise<PeriodeResult> {
  if (!data.logement_id || !data.date_debut || !data.date_fin || !data.nom.trim() || data.prix_par_nuit < 0) {
    return { success: false, error: "Données invalides." };
  }
  if (data.date_fin <= data.date_debut) {
    return { success: false, error: "La date de fin doit être après la date de début." };
  }

  const supabase = createAdminClient();

  // Fetch existing periods for this logement to check overlap
  const { data: existingPeriodes } = await supabase
    .from("periodes_tarifaires")
    .select("id, nom, date_debut, date_fin, prix_par_nuit, logement_id")
    .eq("logement_id", data.logement_id);

  const conflict = checkPeriodeOverlap(
    existingPeriodes ?? [],
    data.date_debut,
    data.date_fin
  );

  if (conflict) {
    return {
      success: false,
      error: `Chevauchement avec la période "${conflict.nom}" (${conflict.date_debut} → ${conflict.date_fin}).`,
    };
  }

  await supabase.from("periodes_tarifaires").insert(data);
  revalidatePath("/admin/tarifs");
  revalidatePath("/");
  return { success: true };
}

export async function updatePeriodeTarifaire(id: string, data: {
  nom?: string;
  date_debut?: string;
  date_fin?: string;
  prix_par_nuit?: number;
}): Promise<PeriodeResult> {
  const supabase = createAdminClient();

  if (data.date_debut !== undefined || data.date_fin !== undefined) {
    // Fetch the current period to get logement_id and fill missing dates
    const { data: current } = await supabase
      .from("periodes_tarifaires")
      .select("logement_id, date_debut, date_fin")
      .eq("id", id)
      .single();

    if (!current) {
      return { success: false, error: "Période introuvable." };
    }

    const newDebut = data.date_debut ?? current.date_debut;
    const newFin = data.date_fin ?? current.date_fin;

    if (newFin <= newDebut) {
      return { success: false, error: "La date de fin doit être après la date de début." };
    }

    const { data: existingPeriodes } = await supabase
      .from("periodes_tarifaires")
      .select("id, nom, date_debut, date_fin, prix_par_nuit, logement_id")
      .eq("logement_id", current.logement_id);

    const conflict = checkPeriodeOverlap(
      existingPeriodes ?? [],
      newDebut,
      newFin,
      id // exclude self
    );

    if (conflict) {
      return {
        success: false,
        error: `Chevauchement avec la période "${conflict.nom}" (${conflict.date_debut} → ${conflict.date_fin}).`,
      };
    }
  }

  await supabase.from("periodes_tarifaires").update(data).eq("id", id);
  revalidatePath("/admin/tarifs");
  revalidatePath("/");
  return { success: true };
}

export async function deletePeriodeTarifaire(id: string) {
  const supabase = createAdminClient();
  await supabase.from("periodes_tarifaires").delete().eq("id", id);
  revalidatePath("/admin/tarifs");
  revalidatePath("/");
}

// ── Dates bloquées ────────────────────────────────────────────────────────────

export async function createDateBloquee(data: {
  logement_id: string;
  date_debut: string;
  date_fin: string;
  motif?: string;
}) {
  const supabase = createAdminClient();
  await supabase.from("dates_bloquees").insert(data);
  revalidatePath("/admin/disponibilites");
}

export async function deleteDateBloquee(id: string) {
  const supabase = createAdminClient();
  await supabase.from("dates_bloquees").delete().eq("id", id);
  revalidatePath("/admin/disponibilites");
}

// ── Événements ────────────────────────────────────────────────────────────────

export async function createEvenement(data: {
  titre: string;
  date: string;
  date_fin?: string;
  lieu: string;
  description: string;
  categorie: string;
  url?: string;
}) {
  const supabase = createAdminClient();
  await supabase.from("evenements").insert(data);
  revalidatePath("/admin/evenements");
}

export async function deleteEvenement(id: string) {
  const supabase = createAdminClient();
  await supabase.from("evenements").delete().eq("id", id);
  revalidatePath("/admin/evenements");
}

// ── Restaurants ───────────────────────────────────────────────────────────────

export async function createRestaurant(data: {
  nom: string;
  type_cuisine: string;
  gamme_prix: string;
  adresse: string;
  ville: string;
  telephone?: string;
  site_web?: string;
  google_maps_url?: string;
  description: string;
  specialite?: string;
}) {
  const supabase = createAdminClient();
  await supabase.from("restaurants").insert(data);
  revalidatePath("/admin/restaurants");
}

export async function deleteRestaurant(id: string) {
  const supabase = createAdminClient();
  await supabase.from("restaurants").delete().eq("id", id);
  revalidatePath("/admin/restaurants");
}

// ── Réservation publique ──────────────────────────────────────────────────────

export type SubmitReservationResult =
  | { success: true }
  | { success: false; errors?: Record<string, string>; globalError?: string };

export async function submitReservation(data: unknown): Promise<SubmitReservationResult> {
  // 1. Schema validation
  const parsed = reservationSchema.safeParse(data);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "global");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { success: false, errors };
  }

  const validData = parsed.data;
  const supabase = createAdminClient();

  // 2. Check logement exists + capacity
  const { data: logement } = await supabase
    .from("logements")
    .select("id, capacite, prix_par_nuit")
    .eq("id", validData.logement_id)
    .single();

  if (!logement) {
    return { success: false, errors: { logement_id: "Ce logement n'existe pas." } };
  }

  const totalVoyageurs = validData.nb_adultes + validData.nb_enfants;
  if (totalVoyageurs > logement.capacite) {
    return {
      success: false,
      errors: {
        nb_adultes: `Ce logement accepte ${logement.capacite} personnes maximum (${totalVoyageurs} demandées).`,
      },
    };
  }

  // 3. Check no overlap with blocked dates
  const { data: overlap } = await supabase
    .from("dates_bloquees")
    .select("id")
    .eq("logement_id", validData.logement_id)
    .lt("date_debut", validData.date_depart)
    .gt("date_fin", validData.date_arrivee)
    .limit(1);

  if (overlap && overlap.length > 0) {
    return {
      success: false,
      errors: {
        date_arrivee:
          "Ces dates ne sont plus disponibles. Veuillez sélectionner d'autres dates.",
      },
    };
  }

  // 4. Insert reservation
  const { error: insertError } = await supabase.from("reservations").insert({
    ...validData,
    statut: "en_attente",
  });

  if (insertError) {
    return { success: false, globalError: "Une erreur est survenue. Veuillez réessayer." };
  }

  // 5. Send notification emails
  await sendNewReservationEmails({
    ...validData,
    prix_par_nuit: logement.prix_par_nuit,
  }).catch(() => {});

  return { success: true };
}
