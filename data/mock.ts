import { Logement, Evenement, Restaurant, ContenuSite, DateBloquee, Reservation, RegionPoint } from "@/types";

export const logements: Logement[] = [
  {
    id: "1",
    slug: "le-chalet-des-dunes",
    nom: "Le Chalet des Dunes",
    description:
      "Niché à deux pas des majestueuses dunes de Berck-sur-Mer, ce chalet authentique vous offrira un séjour inoubliable sur la Côte d'Opale. Entièrement rénové avec soin, il allie charme normand et confort moderne. La grande terrasse ensoleillée vous invite à profiter des couchers de soleil sur la mer, tandis que le salon chaleureux avec sa cheminée vous accueille les soirs de fraîcheur. À 10 minutes à pied de la plage, vous serez également proche des commerces et restaurants de Berck-Plage.",
    description_courte:
      "Chalet authentique à 10 min des plages, avec terrasse et cheminée. Idéal pour familles.",
    prix_par_nuit: 120,
    capacite: 6,
    nb_chambres: 3,
    nb_salles_de_bain: 2,
    equipements: [
      "WiFi haut débit",
      "Parking privé",
      "Cuisine équipée",
      "Lave-linge",
      "Sèche-linge",
      "Cheminée",
      "Terrasse",
      "Barbecue",
      "Télévision",
      "Climatisation",
      "Jeux de société",
      "Vélos disponibles",
      "Animaux acceptés",
      "Lit bébé sur demande",
    ],
    photos: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
    photo_principale:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    adresse: "12 Rue des Dunes, 62180 Rang-du-Fliers",
    disponible: true,
    airbnb_url: "https://airbnb.com",
  },
  {
    id: "2",
    slug: "la-maison-du-phare",
    nom: "La Maison du Phare",
    description:
      "Inspirée par les grands phares qui illuminent la Côte d'Opale, La Maison du Phare est une demeure lumineuse et spacieuse parfaite pour vos vacances en famille ou entre amis. Ses grandes baies vitrées inondent les espaces de vie d'une lumière naturelle exceptionnelle. Le jardin clos et sécurisé est idéal pour les enfants, et la cuisine ouverte favorise les repas conviviaux. À quelques minutes du Touquet et de Berck, vous serez au cœur de toutes les activités de la région.",
    description_courte:
      "Maison lumineuse avec jardin sécurisé, parfaite pour familles avec enfants.",
    prix_par_nuit: 155,
    capacite: 8,
    nb_chambres: 4,
    nb_salles_de_bain: 2,
    equipements: [
      "WiFi haut débit",
      "Parking 2 véhicules",
      "Cuisine ouverte équipée",
      "Lave-linge",
      "Sèche-linge",
      "Jardin clos",
      "Terrasse couverte",
      "Barbecue",
      "Télévision",
      "Netflix",
      "Jeux enfants extérieur",
      "Poussette disponible",
      "Chaises hautes",
      "Jeux de société",
    ],
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    photo_principale:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    adresse: "8 Allée du Littoral, 62180 Rang-du-Fliers",
    disponible: true,
    airbnb_url: "https://airbnb.com",
  },
  {
    id: "3",
    slug: "lappartement-opalin",
    nom: "L'Appartement Opalin",
    description:
      "L'Appartement Opalin est un nid douillet et moderne, idéal pour les couples ou les petites familles à la recherche d'une escapade romantique sur la Côte d'Opale. Entièrement décoré avec goût dans des tons bleu-marine et sable rappelant l'océan, cet appartement de charme dispose de tout le nécessaire pour un séjour parfait. Sa situation centrale à Rang-du-Fliers vous permettra de rejoindre facilement les plages, les marchés locaux et les nombreuses activités de la région.",
    description_courte:
      "Appartement moderne et cosy, décor marin, idéal pour couples et petites familles.",
    prix_par_nuit: 85,
    capacite: 4,
    nb_chambres: 2,
    nb_salles_de_bain: 1,
    equipements: [
      "WiFi haut débit",
      "Parking à proximité",
      "Cuisine équipée",
      "Lave-linge",
      "Télévision",
      "Netflix",
      "Balcon",
      "Climatisation",
      "Café & thé offerts",
      "Linge de maison fourni",
    ],
    photos: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    ],
    photo_principale:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    adresse: "3 Place du Marché, 62180 Rang-du-Fliers",
    disponible: true,
    airbnb_url: "https://airbnb.com",
  },
  {
    id: "4",
    slug: "la-villa-des-galets",
    nom: "La Villa des Galets",
    description:
      "La Villa des Galets est une belle demeure de caractère aux allures de maison de famille, nichée dans un quartier résidentiel calme à quelques minutes des plages de galets de la côte. Sa grande terrasse avec salon de jardin et son espace extérieur arboré en font un havre de paix idéal pour les groupes ou les grandes familles. L'intérieur chaleureux mêle poutres apparentes, pierres naturelles et mobilier soigné. Une adresse coup de cœur pour des vacances ressourçantes.",
    description_courte:
      "Villa de caractère avec grande terrasse et jardin, idéale pour groupes et grandes familles.",
    prix_par_nuit: 180,
    capacite: 10,
    nb_chambres: 5,
    nb_salles_de_bain: 3,
    equipements: [
      "WiFi haut débit",
      "Parking 3 véhicules",
      "Cuisine équipée",
      "Lave-linge",
      "Sèche-linge",
      "Terrasse",
      "Jardin privatif",
      "Barbecue",
      "Télévision",
      "Cheminée",
      "Jeux de société",
      "Lit bébé sur demande",
      "Animaux acceptés",
    ],
    photos: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      "https://images.unsplash.com/photo-1574739782594-db4ead022697?w=800&q=80",
    ],
    photo_principale:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    adresse: "27 Chemin des Galets, 62180 Rang-du-Fliers",
    disponible: true,
    airbnb_url: "https://airbnb.com",
  },
  {
    id: "5",
    slug: "le-studio-cotier",
    nom: "Le Studio Côtier",
    description:
      "Le Studio Côtier est un espace intimiste et lumineux, pensé pour les escapades en duo. Décoré avec soin dans un style scandinave épuré teinté de touches marines, ce studio cosy dispose d'une kitchenette fonctionnelle et d'un lit king-size confortable. Sa grande fenêtre orientée est inonde le logement de lumière matinale. Idéalement situé en centre-bourg, vous serez à deux pas des commerces, restaurants et de la gare pour rejoindre facilement toute la côte.",
    description_courte:
      "Studio lumineux style scandinave, parfait pour un week-end romantique en duo.",
    prix_par_nuit: 65,
    capacite: 2,
    nb_chambres: 1,
    nb_salles_de_bain: 1,
    equipements: [
      "WiFi haut débit",
      "Parking à proximité",
      "Kitchenette équipée",
      "Télévision",
      "Netflix",
      "Café & thé offerts",
      "Linge de maison fourni",
      "Climatisation",
      "Sèche-cheveux",
    ],
    photos: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?w=800&q=80",
    ],
    photo_principale:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    adresse: "15 Rue de la Gare, 62180 Rang-du-Fliers",
    disponible: true,
    airbnb_url: "https://airbnb.com",
  },
];

export const evenements: Evenement[] = [
  {
    id: "1",
    titre: "Festival International de Cerfs-Volants de Berck-sur-Mer",
    date: "2026-04-18",
    date_fin: "2026-04-26",
    lieu: "Plage de Berck-sur-Mer",
    description:
      "Le plus grand festival de cerfs-volants d'Europe ! Spectacle époustouflant dans le ciel de la Côte d'Opale avec des cerfs-volants géants venus du monde entier. Animation pour toute la famille.",
    categorie: "festival",
    url: "https://www.cerfs-volants-berck.com",
  },
  {
    id: "2",
    titre: "Opale Summer Festival",
    date: "2026-07-10",
    date_fin: "2026-07-12",
    lieu: "Berck-sur-Mer",
    description:
      "Festival de musique en plein air sur la côte avec artistes locaux et nationaux. Ambiance festive garantie pour toute la famille sur fond de mer.",
    categorie: "festival",
  },
  {
    id: "3",
    titre: "Marché des Producteurs Locaux",
    date: "2026-05-03",
    lieu: "Rang-du-Fliers, Place du Village",
    description:
      "Rencontrez les producteurs locaux du Pas-de-Calais. Fromages, charcuteries, légumes bio, confitures artisanales et bien plus encore. Un moment authentique pour découvrir les saveurs de la région.",
    categorie: "gastronomie",
  },
  {
    id: "4",
    titre: "Randonnée des Caps — Cap Blanc-Nez & Cap Gris-Nez",
    date: "2026-06-14",
    lieu: "Cap Blanc-Nez",
    description:
      "Grande randonnée guidée le long des falaises des deux Caps. Paysages époustouflants sur la Manche et l'Angleterre par temps clair. Niveau intermédiaire, 18 km environ.",
    categorie: "nature",
    url: "https://www.tourisme-opale.fr",
  },
  {
    id: "5",
    titre: "Nuit des Étoiles sur la Côte d'Opale",
    date: "2026-08-08",
    lieu: "Plage de Berck",
    description:
      "Observation astronomique organisée par le club d'astronomie local. Profitez de l'absence de pollution lumineuse de la côte pour admirer les étoiles et constellations. Télescopes mis à disposition.",
    categorie: "nature",
  },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    nom: "La Criée de Berck",
    type_cuisine: "Fruits de mer & Poissons",
    gamme_prix: "€€",
    adresse: "12 Rue du Port, 62600 Berck-sur-Mer",
    ville: "Berck-sur-Mer",
    telephone: "03 21 09 XX XX",
    google_maps_url: "https://maps.google.com/?q=Berck-sur-Mer",
    description:
      "La meilleure criée de la côte ! Poissons ultra-frais arrivant directement des bateaux locaux. Moules, crevettes, sole et turbot à déguster face à la mer.",
    photo:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    specialite: "Moules marinières et sole grillée",
  },
  {
    id: "2",
    nom: "L'Auberge du Val d'Authie",
    type_cuisine: "Cuisine du terroir",
    gamme_prix: "€€",
    adresse: "Route de la Vallée, 62180 Rang-du-Fliers",
    ville: "Rang-du-Fliers",
    telephone: "03 21 84 XX XX",
    google_maps_url: "https://maps.google.com/?q=Rang-du-Fliers",
    description:
      "Cuisine authentique du terroir picard et artésien dans un cadre champêtre. Carbonnade flamande, potjevleesch et endives au gratin sont à l'honneur. Cave à vins remarquable.",
    photo:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    specialite: "Carbonnade flamande",
  },
  {
    id: "3",
    nom: "Café de la Plage",
    type_cuisine: "Brasserie & Snacks",
    gamme_prix: "€",
    adresse: "Front de mer, 62600 Berck-Plage",
    ville: "Berck-sur-Mer",
    google_maps_url: "https://maps.google.com/?q=Berck-Plage",
    description:
      "Brasserie incontournable face à la mer pour un déjeuner rapide ou un café en terrasse. Planches apéro, croque-monsieur, salades fraîches. Vue imprenable sur la plage.",
    photo:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
    specialite: "Planche fruits de mer & bulots",
  },
  {
    id: "4",
    nom: "Le Touquet Gastronome",
    type_cuisine: "Gastronomie française",
    gamme_prix: "€€€",
    adresse: "5 Avenue du Verger, 62520 Le Touquet",
    ville: "Le Touquet-Paris-Plage",
    telephone: "03 21 05 XX XX",
    google_maps_url: "https://maps.google.com/?q=Le-Touquet",
    description:
      "Restaurant gastronomique dans le cadre élégant du Touquet. Menu découverte de saison mettant à l'honneur les produits régionaux. Soirée d'exception garantie.",
    photo:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
    specialite: "Menu dégustation 7 services",
  },
  {
    id: "5",
    nom: "La Grenouillère (Montreuil)",
    type_cuisine: "Cuisine créative étoilée",
    gamme_prix: "€€€",
    adresse: "Rue de la Grenouillère, 62170 Montreuil-sur-Mer",
    ville: "Montreuil-sur-Mer",
    telephone: "03 21 06 07 22",
    site_web: "https://www.lagrenouillere.fr",
    google_maps_url: "https://maps.google.com/?q=La+Grenouillere+Montreuil",
    description:
      "Restaurant triplement étoilé du chef Alexandre Gauthier. Cuisine créative et audacieuse dans un cadre bucolique au bord de la Canche. Une expérience unique et mémorable.",
    photo:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80",
    specialite: "Cuisine de saison créative et locale",
  },
  {
    id: "6",
    nom: "Chez Tante Léonie",
    type_cuisine: "Crêperie & Galettes",
    gamme_prix: "€",
    adresse: "24 Rue du Général de Gaulle, 62180 Rang-du-Fliers",
    ville: "Rang-du-Fliers",
    google_maps_url: "https://maps.google.com/?q=Rang-du-Fliers",
    description:
      "La crêperie familiale du village ! Galettes de blé noir garnies généreusement et crêpes sucrées maison dans une ambiance chaleureuse et décontractée. Idéal pour les familles.",
    photo:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&q=80",
    specialite: "Galette complète & crêpe caramel beurre salé",
  },
];

export const contenu_site: ContenuSite = {
  hero_titre: "L'Escapade Rangeoise",
  hero_sous_titre: "Vos vacances sur la Côte d'Opale",
  hero_image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  qui_suis_je_titre: "Sandra",
  qui_suis_je_texte: `Bonjour, je suis Sandra, enfant du pays et heureuse propriétaire de L'Escapade Rangeoise !

Née à Berck-sur-Mer, j'ai grandi entre nos dunes dorées et les embruns vivifiants de la Côte d'Opale. Profondément éprise de cette région où les ciels majestueux de Turner rencontrent l'immensité des plages de sable fin, j'ai voulu créer un lieu d'accueil à l'image de ce terroir authentique.

En ouvrant les portes de cet hébergement de charme, mon souhait est de vous offrir bien plus qu'une simple location de vacances. J'ai pensé L'Escapade Rangeoise comme un véritable havre de paix, idéal pour vous ressourcer lors d'un week-end ou d'un séjour proche de la mer. Vous y trouverez un confort chaleureux, pensé pour vous déconnecter totalement du quotidien.

Séjourner chez moi, c'est profiter d'un accès privilégié à la beauté sauvage de notre littoral et bénéficier de mes conseils locaux pour découvrir la région hors des sentiers battus.

Venez respirer l'air iodé et réservez dès maintenant votre parenthèse de douceur pour des vacances inoubliables sur la Côte d'Opale.`,
  qui_suis_je_photo:
    "https://image-uniservice.linternaute.com/image/450/3/1764532649/6345816.jpg",
  region_titre: "La Côte d'Opale, une région à découvrir",
  region_description:
    "Entre falaises vertigineuses, plages infinies et villages pittoresques, la Côte d'Opale vous réserve bien des merveilles.",
  contact_email: "contact@escapade-rangeoise.fr",
  contact_telephone: "06 XX XX XX XX",
  airbnb_url: "https://www.airbnb.fr/users/profile/1469389380893590619?previous_page_name=PdpHomeMarketplace",
};

export const dates_bloquees: DateBloquee[] = [
  {
    logement_id: "1",
    date_debut: "2026-04-10",
    date_fin: "2026-04-15",
    raison: "Réservé",
  },
  {
    logement_id: "1",
    date_debut: "2026-05-01",
    date_fin: "2026-05-08",
    raison: "Réservé",
  },
  {
    logement_id: "2",
    date_debut: "2026-04-18",
    date_fin: "2026-04-25",
    raison: "Réservé",
  },
  {
    logement_id: "2",
    date_debut: "2026-07-01",
    date_fin: "2026-07-31",
    raison: "Haute saison réservé",
  },
  {
    logement_id: "3",
    date_debut: "2026-04-05",
    date_fin: "2026-04-07",
    raison: "Réservé",
  },
  {
    logement_id: "3",
    date_debut: "2026-05-20",
    date_fin: "2026-05-25",
    raison: "Réservé",
  },
];

export const reservations_mock: Reservation[] = [
  {
    id: "r1",
    logement_id: "1",
    logement_nom: "Le Chalet des Dunes",
    nom: "Famille Dupont",
    email: "dupont@email.com",
    telephone: "06 12 34 56 78",
    date_arrivee: "2026-04-10",
    date_depart: "2026-04-15",
    nb_adultes: 2,
    nb_enfants: 2,
    message: "Nous avons hâte de découvrir la région !",
    statut: "confirme",
    date_creation: "2026-03-15",
  },
  {
    id: "r2",
    logement_id: "2",
    logement_nom: "La Maison du Phare",
    nom: "Groupe Lecomte",
    email: "lecomte@email.com",
    telephone: "06 98 76 54 32",
    date_arrivee: "2026-04-18",
    date_depart: "2026-04-25",
    nb_adultes: 4,
    nb_enfants: 0,
    message: "Séjour entre amis pour le festival de cerfs-volants !",
    statut: "en_attente",
    date_creation: "2026-03-28",
  },
  {
    id: "r3",
    logement_id: "3",
    logement_nom: "L'Appartement Opalin",
    nom: "M. et Mme Martin",
    email: "martin@email.com",
    telephone: "06 11 22 33 44",
    date_arrivee: "2026-05-20",
    date_depart: "2026-05-25",
    nb_adultes: 2,
    nb_enfants: 0,
    message: "Escapade romantique pour notre anniversaire de mariage.",
    statut: "en_attente",
    date_creation: "2026-04-01",
  },
];

export const region_points: RegionPoint[] = [
  {
    slug: "berck-sur-mer",
    nom: "Berck-sur-Mer",
    sous_titre: "Station balnéaire au cœur de la Côte d'Opale",
    description:
      "Célèbre pour ses plages de sable fin et son festival international de cerfs-volants, Berck est le cœur vibrant de la Côte d'Opale. Promenades sur le front de mer, char à voile, et vie marine authentique.",
    paragraphes: [
      "Berck-sur-Mer, c'est avant tout une immensité de sable fin qui s'étire sur plus de 10 kilomètres face à la Manche. Cette station balnéaire historique, classée parmi les plus belles plages de France, a longtemps été reconnue pour la pureté de son air marin et ses propriétés thérapeutiques qui ont fait sa réputation dès le XIXe siècle. Aujourd'hui, elle attire familles, sportifs et amoureux de la nature en quête d'espace et d'authenticité.",
      "La plage de Berck est le paradis du char à voile et du kitesurf. Les vastes étendues de sable à marée basse se transforment en terrain de jeu idéal pour ces disciplines sportives qui font la fierté de la région. Chaque mois d'avril, la ville se métamorphose lors du Festival International de Cerfs-Volants, qui réunit pendant dix jours des artistes et des passionnés venus du monde entier pour illuminer le ciel opale de leurs créations volantes spectaculaires.",
      "Au-delà de la plage, Berck-Ville mérite une exploration à pied. Ses ruelles commerçantes, son marché animé et ses restaurants de fruits de mer où les moules-frites restent une institution locale vous inviteront à découvrir l'âme véritable de la Côte d'Opale. Ne manquez pas non plus le musée municipal et ses collections dédiées à l'histoire maritime de la région.",
    ],
    image: "/explorer-berck.jpg",
    image_hero: "/explorer-berck.jpg",
    distance: "5 min",
    activites: [
      {
        titre: "Char à voile et kitesurf",
        description:
          "La plage de Berck est l'une des meilleures plages d'Europe pour le char à voile. Des clubs proposent des initiations dès 8 ans pour toute la famille.",
      },
      {
        titre: "Festival International de Cerfs-Volants (avril)",
        description:
          "Le plus grand festival de cerfs-volants d'Europe réunit chaque année des milliers de spectateurs pour 10 jours de spectacles aériens époustouflants.",
      },
      {
        titre: "Promenade sur le front de mer",
        description:
          "Le boulevard longeant l'immense plage est idéal pour une balade à pied ou à vélo, avec vues panoramiques sur la Manche et l'horizon.",
      },
      {
        titre: "Baignade et plage familiale",
        description:
          "Une plage surveillée en saison, avec un accès facilité pour les personnes à mobilité réduite. Jeux d'enfants et locations de matériel de plage disponibles.",
      },
      {
        titre: "Marché de Berck-sur-Mer",
        description:
          "Le marché hebdomadaire propose produits locaux, fruits de mer frais et spécialités du Pas-de-Calais dans une ambiance authentique.",
      },
    ],
    infos_pratiques: {
      distance_km: "5 km de Rang-du-Fliers",
      temps_voiture: "5 minutes",
      tarif: "Accès libre à la plage — activités payantes à partir de 20 €",
      meilleure_periode: "Avril à septembre — Festival de cerfs-volants en avril",
    },
  },
  {
    slug: "nausicaa",
    nom: "Nausicaá",
    sous_titre: "Le plus grand aquarium d'Europe à Boulogne-sur-Mer",
    description:
      "Le Centre National de la Mer à Boulogne-sur-Mer, l'un des plus grands aquariums d'Europe. Requins, raies, manchots et méduses vous attendent pour un voyage sous-marin inoubliable.",
    paragraphes: [
      "Nausicaá, Centre National de la Mer, est bien plus qu'un simple aquarium : c'est une immersion totale dans les océans du monde. Avec ses 10 000 animaux marins représentant plus de 1 000 espèces différentes, et ses 4 500 m² d'exposition, il se classe parmi les plus grandes structures de ce type en Europe. Depuis son ouverture en 1991, Nausicaá a reçu plus de 17 millions de visiteurs et s'est imposé comme un incontournable de la région.",
      "Le parcours vous emmène des côtes de la Manche aux récifs coralliens tropicaux, en passant par les eaux profondes et les zones polaires. La grande fosse aux requins, le bassin des raies, la colonie de manchots de Magellan et le spectaculaire lagon tropical sont autant de moments forts qui émerveillent petits et grands. Les présentateurs animaliers animent régulièrement des séances de nourrissage et d'explication pour une expérience encore plus riche.",
      "Au-delà du spectacle, Nausicaá porte un message fort sur la préservation des océans. Des expositions permanentes et temporaires sensibilisent les visiteurs aux enjeux environnementaux marins. La proximité avec le port de pêche de Boulogne-sur-Mer, premier port de pêche de France, permet d'ailleurs de prolonger la journée par une découverte des coulisses de la pêche artisanale.",
    ],
    image: "/explorer-nausicaa.jpg",
    image_hero: "/explorer-nausicaa.jpg",
    distance: "45 min",
    activites: [
      {
        titre: "Visite du bassin des requins",
        description:
          "Face à la grande fosse transparente, observez requins et raies évoluer à quelques centimètres de vous dans un silence saisissant.",
      },
      {
        titre: "Rencontre avec les manchots de Magellan",
        description:
          "La colonie de manchots est l'une des attractions phares. Des séances de nourrissage commentées ont lieu plusieurs fois par jour.",
      },
      {
        titre: "Le lagon tropical",
        description:
          "Poissons multicolores, coraux et tortues marines peuplent ce bassin immersif qui reconstitue fidèlement un écosystème tropical.",
      },
      {
        titre: "Expositions sur la préservation des océans",
        description:
          "Des espaces pédagogiques sensibilisent aux problématiques de pollution plastique, de surpêche et de réchauffement climatique.",
      },
    ],
    infos_pratiques: {
      distance_km: "55 km de Rang-du-Fliers",
      temps_voiture: "45 minutes",
      tarif: "Payant — adulte ~22 €, enfant ~15 € (tarifs réduits en ligne)",
      meilleure_periode: "Toute l'année — idéal par mauvais temps",
    },
  },
  {
    slug: "cap-blanc-nez",
    nom: "Cap Blanc-Nez",
    sous_titre: "Falaises vertigineuses sur la Manche",
    description:
      "Falaises blanches vertigineuses dominant la Manche à 134 m de hauteur. Par temps clair, les falaises d'Angleterre se dessinent à l'horizon. Un site naturel exceptionnel inscrit au patrimoine.",
    paragraphes: [
      "Classé parmi les Grands Sites de France, le Cap Blanc-Nez s'impose comme l'un des paysages les plus spectaculaires du littoral nord. Ses falaises de craie blanche, qui plongent à 134 mètres dans les eaux grises et tourmentées de la Manche, offrent un panorama à couper le souffle sur le Pas-de-Calais. Par temps dégagé, il n'est pas rare d'apercevoir distinctement les falaises de Douvres en Angleterre, distantes de seulement 33 kilomètres.",
      "Le site est traversé par le célèbre chemin des Douaniers, un sentier côtier qui serpente le long des falaises et relie le Cap Blanc-Nez au Cap Gris-Nez sur environ 30 kilomètres. Ce sentier de randonnée offre des vues inégalées sur la côte et les détroits, et permet d'observer la faune marine et les oiseaux migrateurs dans leur habitat naturel. Au sommet du cap trône l'obélisque du Dover Patrol, monument commémoratif érigé en hommage aux marins franco-britanniques tombés lors de la Première Guerre mondiale.",
      "Le Cap Blanc-Nez est aussi un extraordinaire point d'observation du trafic maritime : le détroit du Pas-de-Calais est l'un des passages les plus fréquentés du monde, avec plus de 500 navires qui s'y croisent chaque jour. Jumelles en main, on peut y observer des ferrys, des porte-conteneurs géants et parfois même des dauphins ou des phoques nageant au pied des falaises.",
    ],
    image: "/explorer-cap-blanc-nez.jpg",
    image_hero: "/explorer-cap-blanc-nez.jpg",
    distance: "1h",
    activites: [
      {
        titre: "Randonnée sur le chemin des Douaniers",
        description:
          "Emprunter le sentier côtier qui longe les falaises est une expérience inoubliable. Comptez 2h aller-retour pour la boucle du Cap Blanc-Nez.",
      },
      {
        titre: "Vue sur les falaises de Douvres",
        description:
          "Par temps clair, les falaises blanches d'Angleterre sont visibles à l'œil nu. Un spectacle unique et émouvant au bord du détroit.",
      },
      {
        titre: "Observation du trafic maritime",
        description:
          "500 navires traversent le Pas-de-Calais chaque jour. Munis de jumelles, observez ce ballet maritime depuis le sommet des falaises.",
      },
      {
        titre: "Monument du Dover Patrol",
        description:
          "Découvrez ce monument commémoratif franco-britannique et son histoire liée à la Première Guerre mondiale et aux marins disparus.",
      },
      {
        titre: "Observation ornithologique",
        description:
          "Les falaises et les landes du cap abritent de nombreuses espèces d'oiseaux. Un paradis pour les ornithologues amateurs.",
      },
    ],
    infos_pratiques: {
      distance_km: "65 km de Rang-du-Fliers",
      temps_voiture: "1 heure",
      tarif: "Accès entièrement gratuit",
      meilleure_periode: "Toute l'année — couchers de soleil spectaculaires en automne",
    },
  },
  {
    slug: "le-touquet",
    nom: "Le Touquet-Paris-Plage",
    sous_titre: "La station balnéaire chic du nord de la France",
    description:
      "La station balnéaire la plus chic du Nord ! Architecture 1900, forêt de pins, golf, casino et plages immenses. Un art de vivre élégant à seulement quelques kilomètres.",
    paragraphes: [
      "Le Touquet-Paris-Plage est une station balnéaire d'exception qui ne ressemble à aucune autre. Née au tournant du XXe siècle sous l'impulsion d'investisseurs britanniques et parisiens, elle a rapidement acquis une réputation de lieu de villégiature élégant où se pressaient artistes, écrivains et personnalités. Son architecture unique mêle villas anglo-normandes, chalets suisses et constructions néo-flamandes dans un cadre préservé que les amateurs d'architecture adoreront.",
      "La ville est entourée d'une forêt de pins de plus de 800 hectares qui confère à ses rues une atmosphère particulièrement apaisante. Les amateurs de sport pourront choisir entre le golf (plusieurs parcours de réputation internationale), le tennis, l'équitation sur la plage ou encore le surf. La plage elle-même, longue de 12 kilomètres, est l'une des plus belles et des plus fréquentées de la côte, avec son immense espace de sable blanc et ses écoles de sports nautiques.",
      "La vie commerçante et gastronomique du Touquet est à la hauteur de sa réputation. La rue Saint-Jean et ses alentours regorgent de boutiques tendance, de restaurants gastronomiques et de brasseries animées. Le marché couvert propose chaque semaine des produits locaux d'exception. Pour les amateurs de jeux et de nuit, le Casino Barrière propose spectacles et animations toute l'année.",
    ],
    image: "/explorer-touquet.jpg",
    image_hero: "/explorer-touquet.jpg",
    distance: "20 min",
    activites: [
      {
        titre: "Balade architecturale dans les villas",
        description:
          "Des centaines de villas Belle Époque, néo-flamandes et anglo-normandes font du Touquet un musée à ciel ouvert. Des visites guidées thématiques sont organisées.",
      },
      {
        titre: "Golf sur les parcours internationaux",
        description:
          "Le Touquet abrite des golfs de réputation mondiale, dont le fameux La Mer. Idéal pour les golfeurs de tous niveaux.",
      },
      {
        titre: "Promenade en forêt et à vélo",
        description:
          "La forêt de pins de 800 hectares propose des dizaines de kilomètres de pistes cyclables et de sentiers de promenade boisés.",
      },
      {
        titre: "Sports nautiques sur la grande plage",
        description:
          "Surf, kitesurf, char à voile, canoë-kayak : la plage du Touquet est un terrain de jeu idéal pour les adeptes de sports de glisse.",
      },
      {
        titre: "Shopping et gastronomie",
        description:
          "La rue Saint-Jean et ses boutiques, les chocolateries artisanales et les restaurants étoilés font du Touquet une destination gourmande incontournable.",
      },
    ],
    infos_pratiques: {
      distance_km: "20 km de Rang-du-Fliers",
      temps_voiture: "20 minutes",
      tarif: "Accès libre — activités et restaurants payants",
      meilleure_periode: "Juin à septembre pour la plage — toute l'année pour la ville",
    },
  },
  {
    slug: "montreuil-sur-mer",
    nom: "Montreuil-sur-Mer",
    sous_titre: "Cité médiévale fortifiée, cadre des Misérables",
    description:
      "Cité médiévale fortifiée par Vauban, cadre du roman de Victor Hugo 'Les Misérables'. Remparts majestueux, ruelles pavées et marché traditionnel pittoresque à découvrir.",
    paragraphes: [
      "Montreuil-sur-Mer est l'une des plus belles villes fortifiées du nord de la France. Perchée sur un éperon rocheux dominant la vallée de la Canche, cette cité médiévale est entourée de remparts quasi-intacts dont la construction remonte en grande partie à Vauban, le célèbre ingénieur militaire de Louis XIV. La promenade sur les remparts, longue de 3 kilomètres, offre des vues exceptionnelles sur les bocages de la Canche et les paysages verdoyants du Montreuillois.",
      "La ville doit une partie de sa renommée internationale à Victor Hugo, qui y séjourna à plusieurs reprises et s'en inspira pour camper le décor de nombreuses scènes des Misérables. La citadelle, le couvent des Ursulines et les ruelles pavées du centre historique font revivre l'atmosphère du roman. Chaque été, la ville perpétue ce lien littéraire avec une représentation théâtrale des Misérables en plein air dans la citadelle, qui attire des spectateurs de toute l'Europe.",
      "Au-delà de son histoire, Montreuil-sur-Mer est une ville vivante et gourmande. Ses nombreuses galeries d'art, ses antiquaires, ses restaurants gastronomiques — dont la célèbre Grenouillère triplement étoilée toute proche — et ses marchés en font une destination culturelle et culinaire de premier ordre. La proximité de la vallée de la Canche, paradis des pêcheurs et des promeneurs, complète l'attrait de ce site exceptionnel.",
    ],
    image: "/explorer-montreuil.jpg",
    image_hero: "/explorer-montreuil.jpg",
    distance: "25 min",
    activites: [
      {
        titre: "Promenade sur les remparts de Vauban",
        description:
          "3 km de remparts quasi-intacts, classés monument historique, offrent des panoramas époustouflants sur la vallée de la Canche.",
      },
      {
        titre: "Les Misérables en plein air (été)",
        description:
          "Chaque été, la citadelle accueille une représentation théâtrale spectaculaire du roman de Victor Hugo. Un événement unique à ne pas manquer.",
      },
      {
        titre: "Visite de la citadelle",
        description:
          "La forteresse médiévale remaniée par Vauban abrite un musée et des vestiges archéologiques. Visites guidées disponibles.",
      },
      {
        titre: "Galeries d'art et antiquaires",
        description:
          "Le centre-ville regorge de galeries d'art contemporain et de boutiques d'antiquités. Une ville appréciée des collectionneurs et des amateurs d'art.",
      },
      {
        titre: "Randonnée dans la vallée de la Canche",
        description:
          "La vallée encaissée de la Canche, au pied de la citadelle, est un paradis naturel pour la randonnée, le vélo et la pêche.",
      },
    ],
    infos_pratiques: {
      distance_km: "22 km de Rang-du-Fliers",
      temps_voiture: "25 minutes",
      tarif: "Accès libre aux remparts — citadelle payante (~6 €)",
      meilleure_periode: "Toute l'année — spectacle des Misérables en juillet-août",
    },
  },
  {
    slug: "baie-authie",
    nom: "Baie d'Authie",
    sous_titre: "Réserve naturelle aux portes de Rang-du-Fliers",
    description:
      "Joyau naturel classé Natura 2000 aux portes de Rang-du-Fliers, la Baie d'Authie est un estuaire sauvage où mer, sable et marais se fondent en paysages époustouflants. Un paradis pour les phoques et les oiseaux migrateurs.",
    paragraphes: [
      "La Baie d'Authie est l'un des sites naturels les plus précieux et les moins connus de la Côte d'Opale. Classée Natura 2000 et Zone de Protection Spéciale, cette vaste étendue de sables, de prés salés et de dunes constitue l'un des derniers estuaires sauvages du littoral nord de la France. La rivière Authie, qui marque la frontière naturelle entre le Pas-de-Calais et la Somme, se jette ici dans la Manche en formant un delta de chenaux et de bancs de sable d'une beauté saisissante, particulièrement impressionnant vu du ciel.",
      "La baie abrite l'une des plus importantes colonies de phoques veaux-marins et de phoques gris de la Manche. Ces mammifères marins, au nombre de plusieurs centaines, se reposent sur les bancs de sable découverts à marée basse, offrant un spectacle rare et émouvant à quelques kilomètres seulement de Rang-du-Fliers. Des sorties en bateau organisées depuis Berck-sur-Mer permettent d'approcher respectueusement ces animaux dans leur milieu naturel, dans le respect strict de la réglementation de protection.",
      "Pour les amoureux des oiseaux, la Baie d'Authie est un site d'observation exceptionnel. Des milliers d'oiseaux limicoles, de canards et d'échassiers fréquentent les vasières et les prés salés au fil des saisons. Barges à queue noire, bécasseaux, avocettes et sternes élégantes s'y côtoient tout au long de l'année. Les sentiers de randonnée qui longent la baie depuis Berck ou Fort-Mahon permettent de traverser ces paysages uniques à pied ou à vélo, dans un silence et une sérénité absolus.",
    ],
    image: "/explorer-baie-authie.jpg",
    image_hero: "/explorer-baie-authie-hero.jpg",
    image_hero_position: "bottom",
    distance: "10 min",
    activites: [
      {
        titre: "Observation des phoques",
        description:
          "Plusieurs centaines de phoques veaux-marins et gris se reposent sur les bancs de sable à marée basse. Des sorties en bateau sont organisées depuis Berck pour les approcher.",
      },
      {
        titre: "Randonnée sur les sentiers côtiers",
        description:
          "Des sentiers balisés longent la baie depuis Berck jusqu'à Fort-Mahon. Comptez 2 à 3 heures pour une boucle au cœur des dunes et des prés salés.",
      },
      {
        titre: "Observation ornithologique",
        description:
          "La baie est un site majeur pour les oiseaux migrateurs et nicheurs. Barges, avocettes, sternes et canards s'y observent en toute saison avec jumelles ou longue-vue.",
      },
      {
        titre: "Pêche à pied",
        description:
          "À marée basse, les vastes étendues de sable se prêtent à la pêche à pied. Coques, palourdes et crevettes grises sont au rendez-vous pour les initiés.",
      },
      {
        titre: "Balade à vélo le long de l'estuaire",
        description:
          "La Vélomaritime (EV1) longe la Baie d'Authie et offre une façon douce et panoramique de découvrir l'estuaire, entre dunes, marais et horizon marin.",
      },
    ],
    infos_pratiques: {
      distance_km: "8 km de Rang-du-Fliers",
      temps_voiture: "10 minutes",
      tarif: "Accès libre — sorties phoques en bateau ~15 €",
      meilleure_periode: "Toute l'année — phoques visibles surtout de juin à septembre",
    },
  },
];
