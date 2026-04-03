"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sendNewReservationEmails, sendConfirmationEmail, sendRefusEmail } from "@/lib/emails/send";

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

  await supabase
    .from("reservations")
    .update({ statut })
    .eq("id", id);

  revalidatePath("/admin/reservations");
  revalidatePath("/admin");

  // Send email based on new status
  if (res && statut === "confirme") {
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
    }).catch(() => {}); // ne pas bloquer si l'email échoue
  } else if (res && (statut === "refuse" || statut === "annule")) {
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

export async function createPeriodeTarifaire(data: {
  logement_id: string;
  nom: string;
  date_debut: string;
  date_fin: string;
  prix_par_nuit: number;
}) {
  const supabase = createAdminClient();
  await supabase.from("periodes_tarifaires").insert(data);
  revalidatePath("/admin/tarifs");
  revalidatePath("/");
}

export async function updatePeriodeTarifaire(id: string, data: {
  nom?: string;
  date_debut?: string;
  date_fin?: string;
  prix_par_nuit?: number;
}) {
  const supabase = createAdminClient();
  await supabase.from("periodes_tarifaires").update(data).eq("id", id);
  revalidatePath("/admin/tarifs");
  revalidatePath("/");
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

export async function submitReservation(data: {
  logement_id: string;
  logement_nom: string;
  date_arrivee: string;
  date_depart: string;
  nb_adultes: number;
  nb_enfants: number;
  nom_client: string;
  email_client: string;
  telephone_client?: string;
  message?: string;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient(); // bypass RLS pour l'insert public
  const { error } = await supabase.from("reservations").insert({
    ...data,
    statut: "en_attente",
  });
  if (error) return { error: error.message };

  // Fetch prix_par_nuit for the email estimate
  const { data: logement } = await supabase
    .from("logements")
    .select("prix_par_nuit")
    .eq("id", data.logement_id)
    .single();

  await sendNewReservationEmails({
    ...data,
    prix_par_nuit: logement?.prix_par_nuit,
  }).catch(() => {}); // ne pas bloquer si l'email échoue

  return { error: null };
}
