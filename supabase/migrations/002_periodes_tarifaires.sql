-- ════════════════════════════════════════════════════════════════════════════
-- L'Escapade Rangeoise — Migration 002 : Périodes tarifaires
-- À exécuter dans le SQL Editor de Supabase
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists periodes_tarifaires (
  id            uuid primary key default gen_random_uuid(),
  logement_id   uuid references logements(id) on delete cascade,
  nom           text not null,
  date_debut    date not null,
  date_fin      date not null,
  prix_par_nuit numeric(10,2) not null,
  created_at    timestamptz default now()
);

alter table periodes_tarifaires enable row level security;

create policy "Public read periodes_tarifaires"
  on periodes_tarifaires for select using (true);

create policy "Admin all periodes_tarifaires"
  on periodes_tarifaires for all
  using (auth.role() = 'authenticated');
