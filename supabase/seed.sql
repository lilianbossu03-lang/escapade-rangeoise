-- ════════════════════════════════════════════════════════════════════════════
-- L'Escapade Rangeoise — Seed (données initiales)
-- À exécuter APRÈS 001_init.sql dans le SQL Editor de Supabase
-- ════════════════════════════════════════════════════════════════════════════

-- ── Logements ────────────────────────────────────────────────────────────────
insert into logements (slug, nom, description, description_courte, prix_par_nuit, capacite, nb_chambres, nb_salles_de_bain, equipements, photos, photo_principale, adresse, disponible, airbnb_url, ordre) values
(
  'le-chalet-des-dunes',
  'Le Chalet des Dunes',
  'Niché à deux pas des majestueuses dunes de Berck-sur-Mer, ce chalet authentique vous offrira un séjour inoubliable sur la Côte d''Opale. Entièrement rénové avec soin, il allie charme normand et confort moderne. La grande terrasse ensoleillée vous invite à profiter des couchers de soleil sur la mer, tandis que le salon chaleureux avec sa cheminée vous accueille les soirs de fraîcheur. À 10 minutes à pied de la plage, vous serez également proche des commerces et restaurants de Berck-Plage.',
  'Chalet authentique à 10 min des plages, avec terrasse et cheminée. Idéal pour familles.',
  120, 6, 3, 2,
  ARRAY['WiFi haut débit','Parking privé','Cuisine équipée','Lave-linge','Sèche-linge','Cheminée','Terrasse','Barbecue','Télévision','Climatisation','Jeux de société','Vélos disponibles','Animaux acceptés','Lit bébé sur demande'],
  ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80','https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80','https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80'],
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  '12 Rue des Dunes, 62180 Rang-du-Fliers', true, 'https://airbnb.com', 1
),
(
  'la-maison-du-phare',
  'La Maison du Phare',
  'Inspirée par les grands phares qui illuminent la Côte d''Opale, La Maison du Phare est une demeure lumineuse et spacieuse parfaite pour vos vacances en famille ou entre amis. Ses grandes baies vitrées inondent les espaces de vie d''une lumière naturelle exceptionnelle. Le jardin clos et sécurisé est idéal pour les enfants, et la cuisine ouverte favorise les repas conviviaux. À quelques minutes du Touquet et de Berck, vous serez au cœur de toutes les activités de la région.',
  'Maison lumineuse avec jardin sécurisé, parfaite pour familles avec enfants.',
  155, 8, 4, 2,
  ARRAY['WiFi haut débit','Parking 2 véhicules','Cuisine ouverte équipée','Lave-linge','Sèche-linge','Jardin clos','Terrasse couverte','Barbecue','Télévision','Netflix','Jeux enfants extérieur','Poussette disponible','Chaises hautes','Jeux de société'],
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  '8 Allée du Littoral, 62180 Rang-du-Fliers', true, 'https://airbnb.com', 2
),
(
  'lappartement-opalin',
  'L''Appartement Opalin',
  'L''Appartement Opalin est un nid douillet et moderne, idéal pour les couples ou les petites familles à la recherche d''une escapade romantique sur la Côte d''Opale. Entièrement décoré avec goût dans des tons bleu-marine et sable rappelant l''océan, cet appartement de charme dispose de tout le nécessaire pour un séjour parfait.',
  'Appartement moderne et cosy, décor marin, idéal pour couples et petites familles.',
  85, 4, 2, 1,
  ARRAY['WiFi haut débit','Parking à proximité','Cuisine équipée','Lave-linge','Télévision','Netflix','Balcon','Climatisation','Café & thé offerts','Linge de maison fourni'],
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80','https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'],
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  '3 Place du Marché, 62180 Rang-du-Fliers', true, 'https://airbnb.com', 3
),
(
  'la-villa-des-galets',
  'La Villa des Galets',
  'La Villa des Galets est une belle demeure de caractère aux allures de maison de famille, nichée dans un quartier résidentiel calme à quelques minutes des plages de galets de la côte. Sa grande terrasse avec salon de jardin et son espace extérieur arboré en font un havre de paix idéal pour les groupes ou les grandes familles.',
  'Villa de caractère avec grande terrasse et jardin, idéale pour groupes et grandes familles.',
  180, 10, 5, 3,
  ARRAY['WiFi haut débit','Parking 3 véhicules','Cuisine équipée','Lave-linge','Sèche-linge','Terrasse','Jardin privatif','Barbecue','Télévision','Cheminée','Jeux de société','Lit bébé sur demande','Animaux acceptés'],
  ARRAY['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80','https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80','https://images.unsplash.com/photo-1574739782594-db4ead022697?w=800&q=80'],
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  '27 Chemin des Galets, 62180 Rang-du-Fliers', true, 'https://airbnb.com', 4
),
(
  'le-studio-cotier',
  'Le Studio Côtier',
  'Le Studio Côtier est un espace intimiste et lumineux, pensé pour les escapades en duo. Décoré avec soin dans un style scandinave épuré teinté de touches marines, ce studio cosy dispose d''une kitchenette fonctionnelle et d''un lit king-size confortable.',
  'Studio lumineux style scandinave, parfait pour un week-end romantique en duo.',
  65, 2, 1, 1,
  ARRAY['WiFi haut débit','Parking à proximité','Kitchenette équipée','Télévision','Netflix','Café & thé offerts','Linge de maison fourni','Climatisation','Sèche-cheveux'],
  ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80','https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80','https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80','https://images.unsplash.com/photo-1583845112203-29329902332e?w=800&q=80'],
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  '15 Rue de la Gare, 62180 Rang-du-Fliers', true, 'https://airbnb.com', 5
);

-- ── Dates bloquées (référencées par slug pour robustesse) ─────────────────────
insert into dates_bloquees (logement_id, date_debut, date_fin, motif)
select id, '2026-04-10', '2026-04-15', 'Réservé' from logements where slug = 'le-chalet-des-dunes';
insert into dates_bloquees (logement_id, date_debut, date_fin, motif)
select id, '2026-05-01', '2026-05-08', 'Réservé' from logements where slug = 'le-chalet-des-dunes';
insert into dates_bloquees (logement_id, date_debut, date_fin, motif)
select id, '2026-04-18', '2026-04-25', 'Réservé' from logements where slug = 'la-maison-du-phare';
insert into dates_bloquees (logement_id, date_debut, date_fin, motif)
select id, '2026-07-01', '2026-07-31', 'Haute saison réservé' from logements where slug = 'la-maison-du-phare';
insert into dates_bloquees (logement_id, date_debut, date_fin, motif)
select id, '2026-04-05', '2026-04-07', 'Réservé' from logements where slug = 'lappartement-opalin';
insert into dates_bloquees (logement_id, date_debut, date_fin, motif)
select id, '2026-05-20', '2026-05-25', 'Réservé' from logements where slug = 'lappartement-opalin';

-- ── Réservations mock ─────────────────────────────────────────────────────────
insert into reservations (logement_id, logement_nom, date_arrivee, date_depart, nb_adultes, nb_enfants, nom_client, email_client, telephone_client, message, statut, created_at)
select id, 'Le Chalet des Dunes', '2026-04-10', '2026-04-15', 2, 2, 'Famille Dupont', 'dupont@email.com', '06 12 34 56 78', 'Nous avons hâte de découvrir la région !', 'confirme', '2026-03-15'
from logements where slug = 'le-chalet-des-dunes';

insert into reservations (logement_id, logement_nom, date_arrivee, date_depart, nb_adultes, nb_enfants, nom_client, email_client, telephone_client, message, statut, created_at)
select id, 'La Maison du Phare', '2026-04-18', '2026-04-25', 4, 0, 'Groupe Lecomte', 'lecomte@email.com', '06 98 76 54 32', 'Séjour entre amis pour le festival de cerfs-volants !', 'en_attente', '2026-03-28'
from logements where slug = 'la-maison-du-phare';

insert into reservations (logement_id, logement_nom, date_arrivee, date_depart, nb_adultes, nb_enfants, nom_client, email_client, telephone_client, message, statut, created_at)
select id, 'L''Appartement Opalin', '2026-05-20', '2026-05-25', 2, 0, 'M. et Mme Martin', 'martin@email.com', '06 11 22 33 44', 'Escapade romantique pour notre anniversaire de mariage.', 'en_attente', '2026-04-01'
from logements where slug = 'lappartement-opalin';

-- ── Événements ───────────────────────────────────────────────────────────────
insert into evenements (titre, date, date_fin, lieu, description, categorie, url) values
('Festival International de Cerfs-Volants de Berck-sur-Mer', '2026-04-18', '2026-04-26', 'Plage de Berck-sur-Mer', 'Le plus grand festival de cerfs-volants d''Europe ! Spectacle époustouflant dans le ciel de la Côte d''Opale avec des cerfs-volants géants venus du monde entier.', 'festival', 'https://www.cerfs-volants-berck.com'),
('Opale Summer Festival', '2026-07-10', '2026-07-12', 'Berck-sur-Mer', 'Festival de musique en plein air sur la côte avec artistes locaux et nationaux.', 'festival', null),
('Marché des Producteurs Locaux', '2026-05-03', null, 'Rang-du-Fliers, Place du Village', 'Rencontrez les producteurs locaux du Pas-de-Calais. Fromages, charcuteries, légumes bio, confitures artisanales et bien plus encore.', 'gastronomie', null),
('Randonnée des Caps — Cap Blanc-Nez & Cap Gris-Nez', '2026-06-14', null, 'Cap Blanc-Nez', 'Grande randonnée guidée le long des falaises des deux Caps. Paysages époustouflants sur la Manche et l''Angleterre par temps clair. 18 km environ.', 'nature', 'https://www.tourisme-opale.fr'),
('Nuit des Étoiles sur la Côte d''Opale', '2026-08-08', null, 'Plage de Berck', 'Observation astronomique organisée par le club d''astronomie local. Profitez de l''absence de pollution lumineuse de la côte.', 'nature', null);

-- ── Restaurants ──────────────────────────────────────────────────────────────
insert into restaurants (nom, type_cuisine, gamme_prix, adresse, ville, telephone, site_web, google_maps_url, description, photo, specialite) values
('La Criée de Berck', 'Fruits de mer & Poissons', '€€', '12 Rue du Port, 62600 Berck-sur-Mer', 'Berck-sur-Mer', '03 21 09 XX XX', null, 'https://maps.google.com/?q=Berck-sur-Mer', 'La meilleure criée de la côte ! Poissons ultra-frais arrivant directement des bateaux locaux.', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', 'Moules marinières et sole grillée'),
('L''Auberge du Val d''Authie', 'Cuisine du terroir', '€€', 'Route de la Vallée, 62180 Rang-du-Fliers', 'Rang-du-Fliers', '03 21 84 XX XX', null, 'https://maps.google.com/?q=Rang-du-Fliers', 'Cuisine authentique du terroir picard et artésien dans un cadre champêtre.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', 'Carbonnade flamande'),
('Café de la Plage', 'Brasserie & Snacks', '€', 'Front de mer, 62600 Berck-Plage', 'Berck-sur-Mer', null, null, 'https://maps.google.com/?q=Berck-Plage', 'Brasserie incontournable face à la mer pour un déjeuner rapide ou un café en terrasse.', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80', 'Planche fruits de mer & bulots'),
('Le Touquet Gastronome', 'Gastronomie française', '€€€', '5 Avenue du Verger, 62520 Le Touquet', 'Le Touquet-Paris-Plage', '03 21 05 XX XX', null, 'https://maps.google.com/?q=Le-Touquet', 'Restaurant gastronomique dans le cadre élégant du Touquet. Menu découverte de saison.', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', 'Menu dégustation 7 services'),
('La Grenouillère (Montreuil)', 'Cuisine créative étoilée', '€€€', 'Rue de la Grenouillère, 62170 Montreuil-sur-Mer', 'Montreuil-sur-Mer', '03 21 06 07 22', 'https://www.lagrenouillere.fr', 'https://maps.google.com/?q=La+Grenouillere+Montreuil', 'Restaurant triplement étoilé du chef Alexandre Gauthier. Cuisine créative et audacieuse.', 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80', 'Cuisine de saison créative et locale'),
('Chez Tante Léonie', 'Crêperie & Galettes', '€', '24 Rue du Général de Gaulle, 62180 Rang-du-Fliers', 'Rang-du-Fliers', null, null, 'https://maps.google.com/?q=Rang-du-Fliers', 'La crêperie familiale du village ! Galettes de blé noir garnies généreusement et crêpes sucrées maison.', 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&q=80', 'Galette complète & crêpe caramel beurre salé');

-- ── Lieux à explorer ─────────────────────────────────────────────────────────
insert into lieux_explorer (slug, nom, sous_titre, description, paragraphes, image, image_hero, image_hero_position, distance, activites, distance_km, temps_voiture, tarif, meilleure_periode, ordre) values
(
  'berck-sur-mer', 'Berck-sur-Mer', 'Station balnéaire au cœur de la Côte d''Opale',
  'Célèbre pour ses plages de sable fin et son festival international de cerfs-volants, Berck est le cœur vibrant de la Côte d''Opale.',
  ARRAY['Berck-sur-Mer, c''est avant tout une immensité de sable fin qui s''étire sur plus de 10 kilomètres face à la Manche.','La plage de Berck est le paradis du char à voile et du kitesurf.','Au-delà de la plage, Berck-Ville mérite une exploration à pied.'],
  '/explorer-berck.jpg', '/explorer-berck.jpg', 'center', '5 min',
  '[{"titre":"Char à voile et kitesurf","description":"La plage de Berck est l''une des meilleures plages d''Europe pour le char à voile."},{"titre":"Festival International de Cerfs-Volants (avril)","description":"Le plus grand festival de cerfs-volants d''Europe réunit chaque année des milliers de spectateurs."},{"titre":"Promenade sur le front de mer","description":"Le boulevard longeant la plage est idéal pour une balade à pied ou à vélo."},{"titre":"Baignade et plage familiale","description":"Une plage surveillée en saison, avec accès facilité."},{"titre":"Marché de Berck-sur-Mer","description":"Le marché hebdomadaire propose produits locaux et spécialités du Pas-de-Calais."}]',
  '5 km de Rang-du-Fliers', '5 minutes', 'Accès libre à la plage — activités payantes à partir de 20 €', 'Avril à septembre — Festival de cerfs-volants en avril', 1
),
(
  'nausicaa', 'Nausicaá', 'Le plus grand aquarium d''Europe à Boulogne-sur-Mer',
  'Le Centre National de la Mer à Boulogne-sur-Mer, l''un des plus grands aquariums d''Europe.',
  ARRAY['Nausicaá, Centre National de la Mer, est bien plus qu''un simple aquarium : c''est une immersion totale dans les océans du monde.','Le parcours vous emmène des côtes de la Manche aux récifs coralliens tropicaux.','Au-delà du spectacle, Nausicaá porte un message fort sur la préservation des océans.'],
  '/explorer-nausicaa.jpg', '/explorer-nausicaa.jpg', 'center', '45 min',
  '[{"titre":"Visite du bassin des requins","description":"Face à la grande fosse transparente, observez requins et raies évoluer."},{"titre":"Rencontre avec les manchots de Magellan","description":"Des séances de nourrissage commentées ont lieu plusieurs fois par jour."},{"titre":"Le lagon tropical","description":"Poissons multicolores, coraux et tortues marines peuplent ce bassin immersif."},{"titre":"Expositions sur la préservation des océans","description":"Des espaces pédagogiques sensibilisent aux problématiques environnementales."}]',
  '55 km de Rang-du-Fliers', '45 minutes', 'Payant — adulte ~22 €, enfant ~15 €', 'Toute l''année — idéal par mauvais temps', 2
),
(
  'cap-blanc-nez', 'Cap Blanc-Nez', 'Falaises vertigineuses sur la Manche',
  'Falaises blanches vertigineuses dominant la Manche à 134 m de hauteur. Par temps clair, les falaises d''Angleterre se dessinent à l''horizon.',
  ARRAY['Classé parmi les Grands Sites de France, le Cap Blanc-Nez s''impose comme l''un des paysages les plus spectaculaires du littoral nord.','Le site est traversé par le célèbre chemin des Douaniers.','Le Cap Blanc-Nez est aussi un extraordinaire point d''observation du trafic maritime.'],
  '/explorer-cap-blanc-nez.jpg', '/explorer-cap-blanc-nez.jpg', 'center', '1h',
  '[{"titre":"Randonnée sur le chemin des Douaniers","description":"Comptez 2h aller-retour pour la boucle du Cap Blanc-Nez."},{"titre":"Vue sur les falaises de Douvres","description":"Par temps clair, les falaises blanches d''Angleterre sont visibles à l''œil nu."},{"titre":"Observation du trafic maritime","description":"500 navires traversent le Pas-de-Calais chaque jour."},{"titre":"Monument du Dover Patrol","description":"Découvrez ce monument commémoratif franco-britannique."},{"titre":"Observation ornithologique","description":"Les falaises et landes abritent de nombreuses espèces d''oiseaux."}]',
  '65 km de Rang-du-Fliers', '1 heure', 'Accès entièrement gratuit', 'Toute l''année — couchers de soleil spectaculaires en automne', 3
),
(
  'le-touquet', 'Le Touquet-Paris-Plage', 'La station balnéaire chic du nord de la France',
  'La station balnéaire la plus chic du Nord ! Architecture 1900, forêt de pins, golf, casino et plages immenses.',
  ARRAY['Le Touquet-Paris-Plage est une station balnéaire d''exception qui ne ressemble à aucune autre.','La ville est entourée d''une forêt de pins de plus de 800 hectares.','La vie commerçante et gastronomique du Touquet est à la hauteur de sa réputation.'],
  '/explorer-touquet.jpg', '/explorer-touquet.jpg', 'center', '20 min',
  '[{"titre":"Balade architecturale dans les villas","description":"Des centaines de villas Belle Époque font du Touquet un musée à ciel ouvert."},{"titre":"Golf sur les parcours internationaux","description":"Le Touquet abrite des golfs de réputation mondiale."},{"titre":"Promenade en forêt et à vélo","description":"800 hectares de forêt de pins avec pistes cyclables."},{"titre":"Sports nautiques sur la grande plage","description":"Surf, kitesurf, char à voile, canoë-kayak."},{"titre":"Shopping et gastronomie","description":"Boutiques, chocolateries artisanales et restaurants étoilés."}]',
  '20 km de Rang-du-Fliers', '20 minutes', 'Accès libre — activités et restaurants payants', 'Juin à septembre pour la plage — toute l''année pour la ville', 4
),
(
  'montreuil-sur-mer', 'Montreuil-sur-Mer', 'Cité médiévale fortifiée, cadre des Misérables',
  'Cité médiévale fortifiée par Vauban, cadre du roman de Victor Hugo ''Les Misérables''.',
  ARRAY['Montreuil-sur-Mer est l''une des plus belles villes fortifiées du nord de la France.','La ville doit une partie de sa renommée internationale à Victor Hugo.','Au-delà de son histoire, Montreuil-sur-Mer est une ville vivante et gourmande.'],
  '/explorer-montreuil.jpg', '/explorer-montreuil.jpg', 'center', '25 min',
  '[{"titre":"Promenade sur les remparts de Vauban","description":"3 km de remparts quasi-intacts offrent des panoramas sur la vallée de la Canche."},{"titre":"Les Misérables en plein air (été)","description":"Représentation théâtrale spectaculaire chaque été dans la citadelle."},{"titre":"Visite de la citadelle","description":"La forteresse médiévale remaniée par Vauban abrite un musée."},{"titre":"Galeries d''art et antiquaires","description":"Le centre-ville regorge de galeries d''art contemporain."},{"titre":"Randonnée dans la vallée de la Canche","description":"Paradis naturel pour la randonnée, le vélo et la pêche."}]',
  '22 km de Rang-du-Fliers', '25 minutes', 'Accès libre aux remparts — citadelle payante (~6 €)', 'Toute l''année — spectacle des Misérables en juillet-août', 5
),
(
  'baie-authie', 'Baie d''Authie', 'Réserve naturelle aux portes de Rang-du-Fliers',
  'Joyau naturel classé Natura 2000 aux portes de Rang-du-Fliers, la Baie d''Authie est un estuaire sauvage où mer, sable et marais se fondent en paysages époustouflants.',
  ARRAY['La Baie d''Authie est l''un des sites naturels les plus précieux et les moins connus de la Côte d''Opale.','La baie abrite l''une des plus importantes colonies de phoques veaux-marins et de phoques gris de la Manche.','Pour les amoureux des oiseaux, la Baie d''Authie est un site d''observation exceptionnel.'],
  '/explorer-baie-authie.jpg', '/explorer-baie-authie-hero.jpg', 'bottom', '10 min',
  '[{"titre":"Observation des phoques","description":"Plusieurs centaines de phoques se reposent sur les bancs de sable à marée basse."},{"titre":"Randonnée sur les sentiers côtiers","description":"Sentiers balisés depuis Berck jusqu''à Fort-Mahon."},{"titre":"Observation ornithologique","description":"Site majeur pour les oiseaux migrateurs et nicheurs."},{"titre":"Pêche à pied","description":"Coques, palourdes et crevettes grises à marée basse."},{"titre":"Balade à vélo le long de l''estuaire","description":"La Vélomaritime (EV1) longe la Baie d''Authie."}]',
  '8 km de Rang-du-Fliers', '10 minutes', 'Accès libre — sorties phoques en bateau ~15 €', 'Toute l''année — phoques visibles surtout de juin à septembre', 6
);

-- ── Contenu du site ──────────────────────────────────────────────────────────
insert into contenu_site (cle, valeur) values
('hero_titre', 'L''Escapade Rangeoise'),
('hero_sous_titre', 'Vos vacances sur la Côte d''Opale'),
('qui_suis_je_titre', 'Sandra'),
('qui_suis_je_texte', 'Bonjour, je suis Sandra, enfant du pays et heureuse propriétaire de L''Escapade Rangeoise !

Née à Berck-sur-Mer, j''ai grandi entre nos dunes dorées et les embruns vivifiants de la Côte d''Opale. Profondément éprise de cette région où les ciels majestueux de Turner rencontrent l''immensité des plages de sable fin, j''ai voulu créer un lieu d''accueil à l''image de ce terroir authentique.

En ouvrant les portes de cet hébergement de charme, mon souhait est de vous offrir bien plus qu''une simple location de vacances. J''ai pensé L''Escapade Rangeoise comme un véritable havre de paix, idéal pour vous ressourcer lors d''un week-end ou d''un séjour proche de la mer.

Séjourner chez moi, c''est profiter d''un accès privilégié à la beauté sauvage de notre littoral et bénéficier de mes conseils locaux pour découvrir la région hors des sentiers battus.

Venez respirer l''air iodé et réservez dès maintenant votre parenthèse de douceur pour des vacances inoubliables sur la Côte d''Opale.'),
('qui_suis_je_photo', 'https://image-uniservice.linternaute.com/image/450/3/1764532649/6345816.jpg'),
('contact_email', 'contact@escapade.fr'),
('contact_telephone', '06 26 24 16 61'),
('airbnb_url', 'https://www.airbnb.fr/users/profile/1469389380893590619?previous_page_name=PdpHomeMarketplace');
