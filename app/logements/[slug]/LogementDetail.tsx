"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";
import { parseISO, eachDayOfInterval, format } from "date-fns";
import {
  ArrowLeft,
  Users,
  BedDouble,
  Bath,
  Star,
  Wifi,
  Car,
  UtensilsCrossed,
  WashingMachine,
  Flame,
  TreePine,
  PawPrint,
  CheckCircle2,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Logement, DateBloquee, PeriodeTarifaire } from "@/types";
import { getPrixParJour, calculerTotal, getBreakdown } from "@/lib/pricing";
import "react-day-picker/dist/style.css";

const equipementIcons: Record<string, React.ReactNode> = {
  "WiFi haut débit": <Wifi className="w-4 h-4" />,
  "Parking privé": <Car className="w-4 h-4" />,
  "Parking 2 véhicules": <Car className="w-4 h-4" />,
  "Parking à proximité": <Car className="w-4 h-4" />,
  "Cuisine équipée": <UtensilsCrossed className="w-4 h-4" />,
  "Cuisine ouverte équipée": <UtensilsCrossed className="w-4 h-4" />,
  "Lave-linge": <WashingMachine className="w-4 h-4" />,
  "Cheminée": <Flame className="w-4 h-4" />,
  "Terrasse": <TreePine className="w-4 h-4" />,
  "Animaux acceptés": <PawPrint className="w-4 h-4" />,
};

interface Props {
  logement: Logement;
  dates_bloquees?: DateBloquee[];
  periodes_tarifaires?: PeriodeTarifaire[];
}

export default function LogementDetail({ logement, dates_bloquees = [], periodes_tarifaires = [] }: Props) {
  const router = useRouter();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [selectedRange, setSelectedRange] = useState<{ from: Date; to: Date } | null>(null);
  const [nbMonths, setNbMonths] = useState(1);

  useEffect(() => {
    const check = () => setNbMonths(window.innerWidth >= 640 ? 2 : 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const blockedDays = dates_bloquees
    .flatMap((d) =>
      eachDayOfInterval({
        start: parseISO(d.date_debut),
        end: parseISO(d.date_fin),
      })
    );

  // Dynamic pricing
  const joursDetail = selectedRange
    ? getPrixParJour(selectedRange.from, selectedRange.to, logement.prix_par_nuit, periodes_tarifaires)
    : [];
  const totalDynamic = joursDetail.length > 0 ? calculerTotal(joursDetail) : 0;
  const breakdown = joursDetail.length > 0 ? getBreakdown(joursDetail) : [];
  const totalNights = joursDetail.length;

  const prevPhoto = () =>
    setCurrentPhoto((c) => (c === 0 ? logement.photos.length - 1 : c - 1));
  const nextPhoto = () =>
    setCurrentPhoto((c) => (c === logement.photos.length - 1 ? 0 : c + 1));

  const handleReserve = () => {
    const params = new URLSearchParams({ logement: logement.id });
    if (selectedRange?.from && selectedRange?.to) {
      params.set("arrivee", format(selectedRange.from, "yyyy-MM-dd"));
      params.set("depart", format(selectedRange.to, "yyyy-MM-dd"));
    }
    router.push(`/?${params.toString()}#reservation`);
  };

  return (
    <div className="min-h-[100dvh] bg-sand">
      {/* Back nav */}
      <div className="bg-primary text-white py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-lato text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <span className="font-playfair text-lg font-bold">
            L&apos;Escapade Rangeoise
          </span>
          <button
            onClick={handleReserve}
            className="bg-gold text-primary font-lato text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-[#cc9430] transition-all min-h-[44px] flex items-center"
          >
            Réserver
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Photo gallery */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main photo with navigation */}
          <div className="relative rounded-2xl overflow-hidden h-72 md:h-[480px] mb-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logement.photos[currentPhoto]}
              alt={`${logement.nom} - Photo ${currentPhoto + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Nav arrows */}
            {logement.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary p-2.5 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary p-2.5 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Photo suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white font-lato text-sm px-3 py-1 rounded-full">
              {currentPhoto + 1} / {logement.photos.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {logement.photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPhoto(idx)}
                className={`flex-shrink-0 rounded-lg overflow-hidden w-20 h-16 border-2 transition-all ${
                  idx === currentPhoto
                    ? "border-gold"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={`Miniature ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Title area */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-playfair text-3xl md:text-4xl text-primary mb-2">
                    {logement.nom}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-500 font-lato text-sm">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>{logement.adresse}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gold/10 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-lato font-bold text-gold">4.9</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 bg-white rounded-2xl p-5 mb-6 shadow-sm">
                {[
                  {
                    icon: <Users className="w-5 h-5 text-gold" />,
                    value: logement.capacite,
                    label: "Voyageurs",
                  },
                  {
                    icon: <BedDouble className="w-5 h-5 text-gold" />,
                    value: logement.nb_chambres,
                    label: "Chambres",
                  },
                  {
                    icon: <Bath className="w-5 h-5 text-gold" />,
                    value: logement.nb_salles_de_bain,
                    label: "SDB",
                  },
                ].map(({ icon, value, label }) => (
                  <div key={label} className="text-center">
                    <div className="flex justify-center mb-1">{icon}</div>
                    <p className="font-playfair text-xl font-bold text-primary">
                      {value}
                    </p>
                    <p className="font-lato text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="font-playfair text-2xl text-primary mb-4">
                  Le logement
                </h2>
                {logement.description.split("\n\n").map((para, idx) => (
                  <p key={idx} className="font-lato text-gray-700 leading-relaxed mb-3">
                    {para}
                  </p>
                ))}
              </div>

              {/* Equipements */}
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="font-playfair text-2xl text-primary mb-5">
                  Équipements
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {logement.equipements.map((eq) => (
                    <div
                      key={eq}
                      className="flex items-center gap-2 text-sm font-lato text-gray-700"
                    >
                      <span className="text-vert-sauge flex-shrink-0">
                        {equipementIcons[eq] ?? <CheckCircle2 className="w-4 h-4" />}
                      </span>
                      {eq}
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability calendar */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-playfair text-2xl text-primary mb-2 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-gold" />
                  Disponibilités &amp; Tarifs
                </h2>
                <p className="font-lato text-sm text-gray-500 mb-4">
                  Sélectionnez vos dates pour voir le tarif total.
                </p>
                <div className="overflow-x-auto">
                  <DayPicker
                    mode="range"
                    locale={fr}
                    selected={selectedRange ? { from: selectedRange.from, to: selectedRange.to } : undefined}
                    onSelect={(r) => {
                      if (r?.from && r?.to) setSelectedRange({ from: r.from, to: r.to });
                      else if (!r?.from) setSelectedRange(null);
                    }}
                    disabled={[{ before: new Date() }, ...blockedDays]}
                    modifiers={{ booked: blockedDays }}
                    modifiersStyles={{
                      booked: {
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        textDecoration: "line-through",
                      },
                    }}
                    numberOfMonths={nbMonths}
                  />
                </div>
                <div className="flex gap-4 mt-2 text-xs font-lato text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-red-100" />
                    Indisponible
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-sand border border-gray-200" />
                    Disponible
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24 space-y-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Price card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                {totalNights > 0 ? (
                  /* Dynamic: dates selected */
                  <div className="mb-5">
                    <p className="font-lato text-xs text-gray-500 mb-1">Estimation pour {totalNights} nuit{totalNights > 1 ? "s" : ""}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-playfair text-3xl font-bold text-primary">{totalDynamic}€</span>
                      <span className="font-lato text-gray-500 text-sm">au total</span>
                    </div>
                    {breakdown.length > 1 && (
                      <div className="mt-2 space-y-1">
                        {breakdown.map((line, i) => (
                          <p key={i} className="font-lato text-xs text-gray-500">{line}</p>
                        ))}
                      </div>
                    )}
                    {breakdown.length === 1 && (
                      <p className="font-lato text-xs text-gray-500 mt-1">{breakdown[0]}</p>
                    )}
                    <button
                      onClick={() => setSelectedRange(null)}
                      className="mt-2 font-lato text-xs text-gold hover:underline"
                    >
                      Effacer la sélection
                    </button>
                  </div>
                ) : (
                  /* Static: no dates */
                  <div className="mb-5">
                    <p className="font-lato text-xs text-gray-400 mb-1">À partir de</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-playfair text-3xl font-bold text-primary">
                        {logement.prix_par_nuit}€
                      </span>
                      <span className="font-lato text-gray-500 text-sm">/ nuit</span>
                    </div>
                    {periodes_tarifaires.length > 0 && (
                      <p className="font-lato text-xs text-gray-400 mt-1">
                        Tarifs variables selon la période
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-1 mb-5">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-lato text-sm font-semibold">4.9</span>
                  <span className="font-lato text-xs text-gray-400">(12 avis)</span>
                </div>

                <div className="space-y-3 text-sm font-lato text-gray-600 border-t pt-4 mb-5">
                  <div className="flex justify-between">
                    <span>Capacité max.</span>
                    <span className="font-semibold text-primary">
                      {logement.capacite} personnes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chambres</span>
                    <span className="font-semibold text-primary">
                      {logement.nb_chambres}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Salles de bain</span>
                    <span className="font-semibold text-primary">
                      {logement.nb_salles_de_bain}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleReserve}
                  className="w-full bg-gold text-primary font-lato font-bold py-4 rounded-xl hover:bg-[#cc9430] transition-all hover:scale-105 active:scale-95 text-base"
                >
                  Réserver ce logement
                </button>

                {logement.airbnb_url && (
                  <a
                    href={logement.airbnb_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-lato text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Voir sur Airbnb
                  </a>
                )}
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-playfair text-lg text-primary mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  Localisation
                </h3>
                <p className="font-lato text-sm text-gray-600 mb-3">
                  {logement.adresse}
                </p>
                <div className="bg-sand/50 rounded-xl p-3 text-xs font-lato text-gray-600 space-y-1">
                  <p>🚂 Gare de Rang-du-Fliers : 2 min</p>
                  <p>🏖️ Plage de Berck : 10 min en voiture</p>
                  <p>🎪 Festival cerfs-volants : 10 min</p>
                  <p>🐟 Le Touquet : 20 min en voiture</p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-primary rounded-2xl p-5 text-white text-center">
                <p className="font-lato text-sm text-white/70 mb-2">
                  Une question ?
                </p>
                <a
                  href="mailto:contact@escapade-rangeoise.fr"
                  className="font-lato text-gold font-semibold hover:text-white transition-colors text-sm"
                >
                  contact@escapade-rangeoise.fr
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
