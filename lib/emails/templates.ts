// ── Shared helpers ────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function countNights(arrivee: string, depart: string) {
  const diff = new Date(depart).getTime() - new Date(arrivee).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

// ── Layout wrapper ────────────────────────────────────────────────────────────

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>L'Escapade Rangeoise</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(35,41,81,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:#232951;padding:28px 40px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">L'Escapade Rangeoise</p>
              <p style="margin:4px 0 0;font-size:13px;color:#e3a637;letter-spacing:1px;text-transform:uppercase;">Côte d'Opale</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#232951;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#e3a637;font-weight:600;">L'Escapade Rangeoise</p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">Rang-du-Fliers · Côte d'Opale · Pas-de-Calais</p>
              <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);">${(process.env.ADMIN_EMAIL ?? "").split(",")[0].trim()}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #efe3c9;">
      <span style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">${label}</span><br/>
      <span style="font-size:15px;color:#232951;font-weight:600;">${value}</span>
    </td>
  </tr>`;
}

function badge(text: string, color: string) {
  return `<span style="display:inline-block;background:${color};color:#232951;font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:0.5px;">${text}</span>`;
}

// ── 1. Nouvelle demande → Admin ───────────────────────────────────────────────

export interface NewReservationData {
  nom_client: string;
  email_client: string;
  telephone_client?: string;
  logement_nom: string;
  date_arrivee: string;
  date_depart: string;
  nb_adultes: number;
  nb_enfants: number;
  message?: string;
  prix_par_nuit?: number;
}

export function newReservationAdminHtml(d: NewReservationData): string {
  const nuits = countNights(d.date_arrivee, d.date_depart);
  const prixEstime = d.prix_par_nuit ? (d.prix_par_nuit * nuits).toFixed(0) + " €" : "À calculer";
  const voyageurs = d.nb_adultes + d.nb_enfants;

  const content = `
    <p style="margin:0 0 8px;font-size:13px;color:#e3a637;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Nouvelle demande</p>
    <h1 style="margin:0 0 24px;font-size:24px;color:#232951;font-weight:700;line-height:1.2;">
      Demande de réservation<br/>
      <span style="color:#e3a637;">${d.logement_nom}</span>
    </h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${infoRow("Client", d.nom_client)}
      ${infoRow("Email", d.email_client)}
      ${d.telephone_client ? infoRow("Téléphone", d.telephone_client) : ""}
      ${infoRow("Logement", d.logement_nom)}
      ${infoRow("Arrivée", formatDate(d.date_arrivee))}
      ${infoRow("Départ", formatDate(d.date_depart))}
      ${infoRow("Durée", `${nuits} nuit${nuits > 1 ? "s" : ""}`)}
      ${infoRow("Voyageurs", `${voyageurs} personne${voyageurs > 1 ? "s" : ""} (${d.nb_adultes} adulte${d.nb_adultes > 1 ? "s" : ""}${d.nb_enfants > 0 ? `, ${d.nb_enfants} enfant${d.nb_enfants > 1 ? "s" : ""}` : ""})`)}
      ${infoRow("Prix estimé", prixEstime)}
      ${d.message ? infoRow("Message", d.message) : ""}
    </table>

    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin/reservations"
         style="display:inline-block;background:#232951;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;">
        Gérer dans l'admin →
      </a>
    </div>
  `;
  return layout(content);
}

// ── 2. Nouvelle demande → Client (confirmation d'envoi) ───────────────────────

export function newReservationClientHtml(d: NewReservationData): string {
  const nuits = countNights(d.date_arrivee, d.date_depart);
  const voyageurs = d.nb_adultes + d.nb_enfants;

  const content = `
    <p style="margin:0 0 8px;font-size:13px;color:#e3a637;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Demande reçue ✓</p>
    <h1 style="margin:0 0 12px;font-size:24px;color:#232951;font-weight:700;">Bonjour ${d.nom_client},</h1>
    <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
      Votre demande de réservation a bien été reçue. Nous reviendrons vers vous <strong style="color:#232951;">dans les 48 heures</strong> pour confirmer votre séjour.
    </p>

    <div style="background:#efe3c9;border-radius:12px;padding:24px;margin-bottom:28px;">
      <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#232951;text-transform:uppercase;letter-spacing:0.5px;">Récapitulatif de votre demande</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Logement", d.logement_nom)}
        ${infoRow("Arrivée", formatDate(d.date_arrivee))}
        ${infoRow("Départ", formatDate(d.date_depart))}
        ${infoRow("Durée", `${nuits} nuit${nuits > 1 ? "s" : ""}`)}
        ${infoRow("Voyageurs", `${voyageurs} personne${voyageurs > 1 ? "s" : ""}`)}
        ${d.message ? infoRow("Votre message", d.message) : ""}
      </table>
    </div>

    <p style="margin:0;font-size:14px;color:#888;line-height:1.6;">
      Une question ? Contactez-nous à
      <a href="mailto:${(process.env.ADMIN_EMAIL ?? "").split(",")[0].trim()}" style="color:#e3a637;">${(process.env.ADMIN_EMAIL ?? "").split(",")[0].trim()}</a>
    </p>
  `;
  return layout(content);
}

// ── 3. Réservation confirmée → Client ─────────────────────────────────────────

export interface ConfirmationData {
  nom_client: string;
  email_client: string;
  logement_nom: string;
  logement_adresse?: string;
  date_arrivee: string;
  date_depart: string;
  nb_adultes: number;
  nb_enfants: number;
  prix_par_nuit?: number;
}

export function confirmationClientHtml(d: ConfirmationData): string {
  const nuits = countNights(d.date_arrivee, d.date_depart);
  const voyageurs = d.nb_adultes + d.nb_enfants;
  const prixTotal = d.prix_par_nuit ? (d.prix_par_nuit * nuits).toFixed(0) + " €" : null;

  const content = `
    <div style="text-align:center;margin-bottom:28px;">
      ${badge("Réservation confirmée ✓", "#e3a637")}
    </div>

    <h1 style="margin:0 0 12px;font-size:24px;color:#232951;font-weight:700;">Bonne nouvelle, ${d.nom_client} !</h1>
    <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
      Votre réservation est <strong style="color:#232951;">confirmée</strong>. Nous avons hâte de vous accueillir sur la Côte d'Opale !
    </p>

    <div style="background:#efe3c9;border-radius:12px;padding:24px;margin-bottom:28px;">
      <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#232951;text-transform:uppercase;letter-spacing:0.5px;">Détails de votre séjour</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Logement", d.logement_nom)}
        ${d.logement_adresse ? infoRow("Adresse", d.logement_adresse) : ""}
        ${infoRow("Arrivée", formatDate(d.date_arrivee))}
        ${infoRow("Départ", formatDate(d.date_depart))}
        ${infoRow("Durée", `${nuits} nuit${nuits > 1 ? "s" : ""}`)}
        ${infoRow("Voyageurs", `${voyageurs} personne${voyageurs > 1 ? "s" : ""}`)}
        ${prixTotal ? infoRow("Montant total estimé", prixTotal) : ""}
      </table>
    </div>

    <div style="background:#f9f6f0;border-left:4px solid #e3a637;border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#232951;">Informations pratiques</p>
      <p style="margin:0;font-size:13px;color:#555;line-height:1.6;">
        Pour toute question concernant votre arrivée, contactez-nous à<br/>
        <a href="mailto:${process.env.ADMIN_EMAIL ?? ""}" style="color:#e3a637;font-weight:600;">${process.env.ADMIN_EMAIL ?? ""}</a>
      </p>
    </div>

    <p style="margin:0;font-size:13px;color:#aaa;text-align:center;">À très bientôt sur la Côte d'Opale !</p>
  `;
  return layout(content);
}

// ── 4. Réservation refusée → Client ───────────────────────────────────────────

export interface RefusData {
  nom_client: string;
  logement_nom: string;
  date_arrivee: string;
  date_depart: string;
}

export function refusClientHtml(d: RefusData): string {
  const content = `
    <h1 style="margin:0 0 12px;font-size:24px;color:#232951;font-weight:700;">Bonjour ${d.nom_client},</h1>
    <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.7;">
      Nous sommes désolés de vous informer que votre demande de réservation pour <strong style="color:#232951;">${d.logement_nom}</strong> du <strong>${formatDate(d.date_arrivee)}</strong> au <strong>${formatDate(d.date_depart)}</strong> n'a malheureusement pas pu être confirmée pour ces dates.
    </p>

    <div style="background:#efe3c9;border-radius:12px;padding:24px;margin-bottom:28px;">
      <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#232951;">Vous souhaitez tenter d'autres dates ?</p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
        N'hésitez pas à consulter nos disponibilités et à soumettre une nouvelle demande pour d'autres dates. Nous ferons tout notre possible pour vous accueillir.
      </p>
    </div>

    <div style="text-align:center;margin-bottom:28px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/#reservation"
         style="display:inline-block;background:#232951;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;">
        Voir les disponibilités →
      </a>
    </div>

    <p style="margin:0;font-size:13px;color:#888;text-align:center;">
      Une question ? Écrivez-nous à
      <a href="mailto:${(process.env.ADMIN_EMAIL ?? "").split(",")[0].trim()}" style="color:#e3a637;">${(process.env.ADMIN_EMAIL ?? "").split(",")[0].trim()}</a>
    </p>
  `;
  return layout(content);
}
