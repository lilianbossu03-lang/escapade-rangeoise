-- ════════════════════════════════════════════════════════════════════════════
-- Détection des chevauchements dans periodes_tarifaires
-- À exécuter dans le SQL Editor de Supabase pour auditer les données existantes
-- ════════════════════════════════════════════════════════════════════════════

-- 1. Lister toutes les paires de périodes qui se chevauchent pour le même logement
SELECT
  a.id          AS id_a,
  a.nom         AS nom_a,
  a.date_debut  AS debut_a,
  a.date_fin    AS fin_a,
  b.id          AS id_b,
  b.nom         AS nom_b,
  b.date_debut  AS debut_b,
  b.date_fin    AS fin_b,
  l.nom         AS logement
FROM periodes_tarifaires a
JOIN periodes_tarifaires b
  ON  a.logement_id = b.logement_id
  AND a.id < b.id                        -- éviter les doublons (A,B) et (B,A)
  AND a.date_debut < b.date_fin          -- condition de chevauchement
  AND a.date_fin   > b.date_debut        -- condition de chevauchement
JOIN logements l ON l.id = a.logement_id
ORDER BY l.nom, a.date_debut;

-- 2. Compter le nombre total de conflits par logement
SELECT
  l.nom AS logement,
  COUNT(*) AS nb_conflits
FROM periodes_tarifaires a
JOIN periodes_tarifaires b
  ON  a.logement_id = b.logement_id
  AND a.id < b.id
  AND a.date_debut < b.date_fin
  AND a.date_fin   > b.date_debut
JOIN logements l ON l.id = a.logement_id
GROUP BY l.nom
ORDER BY nb_conflits DESC;

-- 3. Réservations confirmées SANS entrée dans dates_bloquees
--    (double-réservation potentielle sur d'anciennes confirmations)
SELECT
  r.id,
  r.nom_client,
  r.logement_nom,
  r.date_arrivee,
  r.date_depart,
  r.statut
FROM reservations r
LEFT JOIN dates_bloquees db ON db.reservation_id = r.id
WHERE r.statut = 'confirme'
  AND db.id IS NULL
ORDER BY r.date_arrivee;

-- 4. Dates bloquées sans reservation_id (bloquées manuellement, pour info)
SELECT
  db.id,
  db.logement_id,
  l.nom AS logement,
  db.date_debut,
  db.date_fin,
  db.motif
FROM dates_bloquees db
JOIN logements l ON l.id = db.logement_id
WHERE db.reservation_id IS NULL
ORDER BY l.nom, db.date_debut;
