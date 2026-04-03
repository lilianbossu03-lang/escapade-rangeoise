import { Resend } from "resend";
import {
  newReservationAdminHtml,
  newReservationClientHtml,
  confirmationClientHtml,
  refusClientHtml,
  type NewReservationData,
  type ConfirmationData,
  type RefusData,
} from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = `L'Escapade Rangeoise <${process.env.FROM_EMAIL ?? "onboarding@resend.dev"}>`;
const ADMIN = (process.env.ADMIN_EMAIL ?? "").split(",").map((e) => e.trim()).filter(Boolean);

// ── 1. Nouvelle demande de réservation ────────────────────────────────────────

export async function sendNewReservationEmails(data: NewReservationData) {
  await Promise.allSettled([
    // Email à la propriétaire
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: `Nouvelle demande de réservation — ${data.logement_nom}`,
      html: newReservationAdminHtml(data),
    }),
    // Confirmation au visiteur
    resend.emails.send({
      from: FROM,
      to: data.email_client,
      subject: `Votre demande pour ${data.logement_nom} — L'Escapade Rangeoise`,
      html: newReservationClientHtml(data),
    }),
  ]);
}

// ── 2. Réservation confirmée ──────────────────────────────────────────────────

export async function sendConfirmationEmail(data: ConfirmationData) {
  await resend.emails.send({
    from: FROM,
    to: data.email_client,
    subject: `Votre réservation est confirmée — ${data.logement_nom}`,
    html: confirmationClientHtml(data),
  });
}

// ── 3. Réservation refusée ────────────────────────────────────────────────────

export async function sendRefusEmail(data: RefusData & { email_client: string }) {
  await resend.emails.send({
    from: FROM,
    to: data.email_client,
    subject: `Réponse à votre demande — ${data.logement_nom}`,
    html: refusClientHtml(data),
  });
}
