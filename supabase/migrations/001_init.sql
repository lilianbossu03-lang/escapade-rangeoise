-- ════════════════════════════════════════════════════════════════════════════
-- L'Escapade Rangeoise — Migration 001 : Initialisation
-- À exécuter dans le SQL Editor de Supabase
-- ════════════════════════════════════════════════════════════════════════════

-- ── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Logements ────────────────────────────────────────────────────────────────
create table if not exists logements (
  id                 uuid primary key default gen_random_uuid(),
  slug               text unique not null,
  nom                text not null,
  description        text,
  description_courte text,
  prix_par_nuit      numeric(10,2) not null,
  capacite           int not null,
  nb_chambres        int not null default 1,
  nb_salles_de_bain  int not null default 1,
  superficie         int,
  equipements        text[] default '{}',
  photos             text[] default '{}',
  photo_principale   text,
  adresse            text,
  disponible         boolean default true,
  airbnb_url         text,
  ordre              int default 0,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

-- ── Dates bloquées ────────────────────────────────────────────────────────────
create table if not exists dates_bloquees (
  id             uuid primary key default gen_random_uuid(),
  logement_id    uuid references logements(id) on delete cascade,
  date_debut     date not null,
  date_fin       date not null,
  motif          text default 'Réservé',
  reservation_id uuid,
  created_at     timestamptz default now()
);

-- ── Réservations ─────────────────────────────────────────────────────────────
create table if not exists reservations (
  id                uuid primary key default gen_random_uuid(),
  logement_id       uuid references logements(id) on delete set null,
  logement_nom      text,
  date_arrivee      date not null,
  date_depart       date not null,
  nb_adultes        int not null default 1,
  nb_enfants        int not null default 0,
  nom_client        text not null,
  email_client      text not null,
  telephone_client  text,
  message           text,
  statut            text not null default 'en_attente'
                    check (statut in ('en_attente','confirme','refuse','annule')),
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ── Événements ───────────────────────────────────────────────────────────────
create table if not exists evenements (
  id          uuid primary key default gen_random_uuid(),
  titre       text not null,
  date        date not null,
  date_fin    date,
  lieu        text,
  description text,
  categorie   text check (categorie in ('festival','sport','culture','nature','gastronomie')),
  url         text,
  created_at  timestamptz default now()
);

-- ── Restaurants ──────────────────────────────────────────────────────────────
create table if not exists restaurants (
  id             uuid primary key default gen_random_uuid(),
  nom            text not null,
  type_cuisine   text,
  gamme_prix     text check (gamme_prix in ('€','€€','€€€')),
  adresse        text,
  ville          text,
  telephone      text,
  site_web       text,
  google_maps_url text,
  description    text,
  photo          text,
  specialite     text,
  created_at     timestamptz default now()
);

-- ── Lieux à explorer ─────────────────────────────────────────────────────────
create table if not exists lieux_explorer (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text unique not null,
  nom                  text not null,
  sous_titre           text,
  description          text,
  paragraphes          text[] default '{}',
  image                text,
  image_hero           text,
  image_hero_position  text default 'center',
  distance             text,
  activites            jsonb default '[]',
  distance_km          text,
  temps_voiture        text,
  tarif                text,
  meilleure_periode    text,
  ordre                int default 0,
  created_at           timestamptz default now()
);

-- ── Contenu du site ──────────────────────────────────────────────────────────
create table if not exists contenu_site (
  id         uuid primary key default gen_random_uuid(),
  cle        text unique not null,
  valeur     text,
  updated_at timestamptz default now()
);

-- ════════════════════════════════════════════════════════════════════════════
-- Row Level Security
-- ════════════════════════════════════════════════════════════════════════════

alter table logements        enable row level security;
alter table dates_bloquees   enable row level security;
alter table reservations     enable row level security;
alter table evenements       enable row level security;
alter table restaurants      enable row level security;
alter table lieux_explorer   enable row level security;
alter table contenu_site     enable row level security;

-- ── Lecture publique sur tout ────────────────────────────────────────────────
create policy "Public read logements"       on logements      for select using (true);
create policy "Public read dates_bloquees"  on dates_bloquees for select using (true);
create policy "Public read evenements"      on evenements     for select using (true);
create policy "Public read restaurants"     on restaurants    for select using (true);
create policy "Public read lieux_explorer"  on lieux_explorer for select using (true);
create policy "Public read contenu_site"    on contenu_site   for select using (true);

-- ── Les visiteurs peuvent créer une réservation ──────────────────────────────
create policy "Public insert reservations"  on reservations   for insert with check (true);

-- ── Admin (authentifié) : accès complet à tout ───────────────────────────────
create policy "Admin all logements"       on logements      for all using (auth.role() = 'authenticated');
create policy "Admin all dates_bloquees"  on dates_bloquees for all using (auth.role() = 'authenticated');
create policy "Admin all reservations"    on reservations   for all using (auth.role() = 'authenticated');
create policy "Admin all evenements"      on evenements     for all using (auth.role() = 'authenticated');
create policy "Admin all restaurants"     on restaurants    for all using (auth.role() = 'authenticated');
create policy "Admin all lieux_explorer"  on lieux_explorer for all using (auth.role() = 'authenticated');
create policy "Admin all contenu_site"    on contenu_site   for all using (auth.role() = 'authenticated');

-- ════════════════════════════════════════════════════════════════════════════
-- Supabase Storage — bucket "photos"
-- ════════════════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

create policy "Public read photos"
  on storage.objects for select
  using (bucket_id = 'photos');

create policy "Authenticated upload photos"
  on storage.objects for insert
  with check (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Authenticated delete photos"
  on storage.objects for delete
  using (bucket_id = 'photos' and auth.role() = 'authenticated');

-- ════════════════════════════════════════════════════════════════════════════
-- Trigger updated_at
-- ════════════════════════════════════════════════════════════════════════════

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_logements_updated_at
  before update on logements
  for each row execute function update_updated_at();

create trigger trg_reservations_updated_at
  before update on reservations
  for each row execute function update_updated_at();

create trigger trg_contenu_site_updated_at
  before update on contenu_site
  for each row execute function update_updated_at();
