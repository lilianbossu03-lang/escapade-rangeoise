"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { DayPicker, DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { format, parseISO, eachDayOfInterval, isValid } from "date-fns";
import {
  Users,
  Plus,
  Minus,
  Calendar,
  Send,
  CheckCircle2,
  Home,
  Mail,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";
import { submitReservation, type SubmitReservationResult } from "@/app/admin/actions";
import { Logement, DateBloquee, PeriodeTarifaire } from "@/types";
import { getPrixParJour, calculerTotal, getBreakdown } from "@/lib/pricing";
import "react-day-picker/dist/style.css";

interface FormData {
  logement_id: string;
  nom: string;
  email: string;
  telephone: string;
  nb_adultes: number;
  nb_enfants: number;
  message: string;
}

export default function ReservationForm({
  logements,
  dates_bloquees,
  periodes_tarifaires = [],
}: {
  logements: Logement[];
  dates_bloquees: DateBloquee[];
  periodes_tarifaires?: PeriodeTarifaire[];
}) {
  const searchParams = useSearchParams();

  // Read preselection from query params (set by LogementDetail "Réserver ce logement")
  const prelogement = searchParams.get("logement") ?? "";
  const prearrivee = searchParams.get("arrivee") ?? "";
  const predepart = searchParams.get("depart") ?? "";

  const validPrelogement = logements.find((l) => l.id === prelogement)?.id ?? "";

  const initialRange = (): DateRange | undefined => {
    if (!prearrivee || !predepart) return undefined;
    const from = new Date(prearrivee);
    const to = new Date(predepart);
    if (!isValid(from) || !isValid(to) || to <= from) return undefined;
    return { from, to };
  };

  const [formData, setFormData] = useState<FormData>({
    logement_id: validPrelogement,
    nom: "",
    email: "",
    telephone: "",
    nb_adultes: 2,
    nb_enfants: 0,
    message: "",
  });
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [blockedDays, setBlockedDays] = useState<Date[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  // Tracks if current logement_id came from preselection (for badge display)
  const [isPreselected, setIsPreselected] = useState(!!validPrelogement);

  useEffect(() => {
    if (!formData.logement_id) {
      setBlockedDays([]);
      return;
    }
    const blocked = dates_bloquees
      .filter((d) => d.logement_id === formData.logement_id)
      .flatMap((d) =>
        eachDayOfInterval({
          start: parseISO(d.date_debut),
          end: parseISO(d.date_fin),
        })
      );
    setBlockedDays(blocked);
  }, [formData.logement_id, dates_bloquees]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setGlobalError(null);

    if (!range?.from || !range?.to) {
      setFormErrors({ date_arrivee: "Veuillez sélectionner vos dates de séjour." });
      return;
    }
    if (totalNights < 2) {
      setFormErrors({ date_depart: "La durée minimale de séjour est de 2 nuits." });
      return;
    }

    setLoading(true);
    const result: SubmitReservationResult = await submitReservation({
      logement_id: formData.logement_id,
      logement_nom: selectedLogement?.nom ?? "",
      date_arrivee: format(range.from, "yyyy-MM-dd"),
      date_depart: format(range.to, "yyyy-MM-dd"),
      nb_adultes: formData.nb_adultes,
      nb_enfants: formData.nb_enfants,
      nom_client: formData.nom,
      email_client: formData.email,
      telephone_client: formData.telephone,
      message: formData.message,
    });
    setLoading(false);

    if (!result.success) {
      if (result.errors) setFormErrors(result.errors);
      if (result.globalError) setGlobalError(result.globalError);
      return;
    }
    setSubmitted(true);
  };

  const totalNights =
    range?.from && range?.to
      ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const selectedLogement = logements.find((l) => l.id === formData.logement_id);

  const joursDetail =
    selectedLogement && range?.from && range?.to
      ? getPrixParJour(
          range.from,
          range.to,
          selectedLogement.prix_par_nuit,
          periodes_tarifaires.filter((p) => p.logement_id === selectedLogement.id)
        )
      : [];

  const totalPrice = joursDetail.length > 0 ? calculerTotal(joursDetail) : 0;
  const priceBreakdown = joursDetail.length > 0 ? getBreakdown(joursDetail) : [];
  const hasMixedPrices = priceBreakdown.length > 1;

  if (submitted) {
    return (
      <section id="reservation" className="py-20 bg-sand">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <CheckCircle2 className="w-20 h-20 text-vert-sauge mx-auto mb-6" />
            <h2 className="font-playfair text-4xl text-primary mb-4">
              Demande envoyée !
            </h2>
            <p className="font-lato text-gray-600 text-lg mb-4">
              Merci <strong>{formData.nom}</strong> ! Votre demande de réservation a bien
              été reçue.
            </p>
            <p className="font-lato text-gray-500 mb-8">
              Je vous répondrai dans les 24h à l&apos;adresse{" "}
              <strong>{formData.email}</strong> pour confirmer votre séjour.
            </p>
            {range?.from && range?.to && selectedLogement && (
              <div className="bg-white rounded-2xl p-6 text-left shadow-sm">
                <h3 className="font-playfair text-xl text-primary mb-4">
                  Récapitulatif
                </h3>
                <div className="space-y-2 font-lato text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Logement</span>
                    <span className="font-semibold text-primary">
                      {selectedLogement.nom}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arrivée</span>
                    <span className="font-semibold text-primary">
                      {format(range.from, "d MMMM yyyy", { locale: fr })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Départ</span>
                    <span className="font-semibold text-primary">
                      {format(range.to, "d MMMM yyyy", { locale: fr })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durée</span>
                    <span className="font-semibold text-primary">
                      {totalNights} nuit{totalNights > 1 ? "s" : ""}
                    </span>
                  </div>
                  {hasMixedPrices && (
                    <div className="space-y-1">
                      {priceBreakdown.map((line, i) => (
                        <div key={i} className="flex justify-between text-xs text-gray-500">
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-semibold">Total estimé</span>
                    <span className="font-bold text-gold text-base">
                      {totalPrice}€
                    </span>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  logement_id: "",
                  nom: "",
                  email: "",
                  telephone: "",
                  nb_adultes: 2,
                  nb_enfants: 0,
                  message: "",
                });
                setRange(undefined);
              }}
              className="mt-6 text-gold font-lato text-sm underline hover:text-[#cc9430] transition-colors"
            >
              Faire une nouvelle demande
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="py-20 bg-sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold font-lato text-sm font-semibold tracking-widest uppercase">
            Réservation
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-primary mt-2 mb-4">
            Préparez votre séjour
          </h2>
          <p className="font-lato text-gray-600 max-w-2xl mx-auto text-lg">
            Remplissez le formulaire ci-dessous et je vous répondrai sous 24h
            pour confirmer votre réservation.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logement selector */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-playfair text-xl text-primary mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-gold" />
                  Choisissez votre logement
                </h3>

                {/* Preselection badge */}
                {isPreselected && formData.logement_id && (
                  <div className="flex items-center gap-2 mb-4 bg-gold/10 border border-gold/20 rounded-xl px-4 py-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <p className="font-lato text-sm text-primary">
                      Logement pré-sélectionné :{" "}
                      <strong>
                        {logements.find((l) => l.id === formData.logement_id)?.nom}
                      </strong>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {logements.map((l) => (
                    <label
                      key={l.id}
                      className={`cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 ${
                        formData.logement_id === l.id
                          ? "border-gold bg-gold/5"
                          : "border-gray-200 hover:border-gold/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="logement"
                        value={l.id}
                        className="sr-only"
                        onChange={() => {
                          setFormData((f) => ({ ...f, logement_id: l.id }));
                          setIsPreselected(false);
                        }}
                      />
                      <div className="relative h-20 rounded-lg overflow-hidden mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={l.photo_principale}
                          alt={l.nom}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-playfair text-sm text-primary font-semibold leading-tight">
                        {l.nom}
                      </p>
                      <p className="font-lato text-xs text-gold font-semibold mt-0.5">
                        À partir de {l.prix_par_nuit}€/nuit
                      </p>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Travelers */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-playfair text-xl text-primary mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gold" />
                  Nombre de voyageurs
                </h3>
                {formErrors.nb_adultes && (
                  <p className="mb-2 font-lato text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{formErrors.nb_adultes}</p>
                )}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Adultes", key: "nb_adultes" as const, min: 1 },
                    { label: "Enfants", key: "nb_enfants" as const, min: 0 },
                  ].map(({ label, key, min }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-lato font-semibold text-text-dark">
                          {label}
                        </p>
                        <p className="font-lato text-xs text-gray-400">
                          {key === "nb_enfants" ? "Moins de 12 ans" : "12 ans et plus"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((f) => ({
                              ...f,
                              [key]: Math.max(min, f[key] - 1),
                            }))
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gold hover:text-gold transition-colors disabled:opacity-30 min-h-[44px] min-w-[44px]"
                          disabled={formData[key] <= min}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-lato font-bold text-lg text-primary w-6 text-center">
                          {formData[key]}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((f) => ({ ...f, [key]: f[key] + 1 }))
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gold hover:text-gold transition-colors min-h-[44px] min-w-[44px]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact info */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-playfair text-xl text-primary mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-gold" />
                  Vos coordonnées
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-lato text-sm font-semibold text-gray-700 mb-1.5">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Marie Dupont"
                        value={formData.nom}
                        onChange={(e) =>
                          setFormData((f) => ({ ...f, nom: e.target.value }))
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl font-lato text-base focus:outline-none focus:ring-1 transition-colors ${formErrors.nom_client ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-gold focus:ring-gold"}`}
                      />
                    </div>
                    {formErrors.nom_client && (
                      <p className="mt-1 font-lato text-xs text-red-600">{formErrors.nom_client}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-lato text-sm font-semibold text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="marie@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((f) => ({ ...f, email: e.target.value }))
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl font-lato text-base focus:outline-none focus:ring-1 transition-colors ${formErrors.email_client ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-gold focus:ring-gold"}`}
                      />
                    </div>
                    {formErrors.email_client && (
                      <p className="mt-1 font-lato text-xs text-red-600">{formErrors.email_client}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-lato text-sm font-semibold text-gray-700 mb-1.5">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        inputMode="tel"
                        placeholder="06 12 34 56 78"
                        value={formData.telephone}
                        onChange={(e) =>
                          setFormData((f) => ({ ...f, telephone: e.target.value }))
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl font-lato text-base focus:outline-none focus:ring-1 transition-colors ${formErrors.telephone_client ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-gold focus:ring-gold"}`}
                      />
                    </div>
                    {formErrors.telephone_client && (
                      <p className="mt-1 font-lato text-xs text-red-600">{formErrors.telephone_client}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block font-lato text-sm font-semibold text-gray-700 mb-1.5">
                    Message (questions, demandes particulières...)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      rows={4}
                      placeholder="Partagez vos demandes ou questions..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, message: e.target.value }))
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl font-lato text-base focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column: Calendar + Summary */}
            <div className="space-y-6">
              {/* Calendar */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <h3 className="font-playfair text-xl text-primary mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  Vos dates
                </h3>
                {!formData.logement_id && (
                  <p className="font-lato text-sm text-gray-400 text-center py-4">
                    Sélectionnez un logement pour voir les disponibilités
                  </p>
                )}
                {formData.logement_id && (
                  <>
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      locale={fr}
                      disabled={[
                        { before: new Date() },
                        ...blockedDays.map((d) => d),
                      ]}
                      modifiers={{ booked: blockedDays }}
                      modifiersStyles={{
                        booked: {
                          backgroundColor: "#fee2e2",
                          color: "#dc2626",
                          textDecoration: "line-through",
                        },
                      }}
                      styles={{
                        root: { width: "100%" },
                        months: { width: "100%" },
                        month: { width: "100%" },
                        table: { width: "100%" },
                      }}
                    />
                    <div className="flex gap-3 mt-2 text-xs font-lato text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-gold" />
                        Sélectionné
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-red-100" />
                        Indisponible
                      </div>
                    </div>
                    {totalNights === 1 && (
                      <p className="mt-3 text-xs font-lato font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                        Séjour minimum de 2 nuits — veuillez sélectionner une date de départ plus tardive.
                      </p>
                    )}
                    {(formErrors.date_arrivee || formErrors.date_depart) && (
                      <p className="mt-3 text-xs font-lato font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                        {formErrors.date_arrivee || formErrors.date_depart}
                      </p>
                    )}
                  </>
                )}
              </motion.div>

              {/* Summary */}
              {selectedLogement && range?.from && range?.to && (
                <motion.div
                  className="bg-primary rounded-2xl p-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-playfair text-xl mb-4">Récapitulatif</h3>
                  <div className="space-y-3 font-lato text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Logement</span>
                      <span className="font-semibold">{selectedLogement.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Arrivée</span>
                      <span className="font-semibold">
                        {format(range.from, "d MMM yyyy", { locale: fr })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Départ</span>
                      <span className="font-semibold">
                        {format(range.to, "d MMM yyyy", { locale: fr })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Durée</span>
                      <span className="font-semibold">
                        {totalNights} nuit{totalNights > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Voyageurs</span>
                      <span className="font-semibold">
                        {formData.nb_adultes + formData.nb_enfants} pers.
                      </span>
                    </div>
                    {/* Price breakdown */}
                    {hasMixedPrices && (
                      <div className="bg-white/10 rounded-xl px-3 py-2 space-y-1">
                        {priceBreakdown.map((line, i) => (
                          <div key={i} className="flex justify-between text-xs text-white/80">
                            <span>{line.split(" = ")[0]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-white/20 pt-3 flex justify-between">
                      <span className="font-semibold">Total estimé</span>
                      <span className="font-bold text-gold text-xl">
                        {totalPrice}€
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">
                      * Prix indicatif, confirmation par email
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Global error banner */}
              {globalError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="font-lato text-sm text-red-700 font-semibold">{globalError}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !formData.logement_id || !range?.from || !range?.to || totalNights < 2}
                className="w-full bg-gold text-primary font-lato font-bold py-4 rounded-2xl hover:bg-[#cc9430] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-base shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer ma demande
                  </>
                )}
              </button>
              <p className="text-center font-lato text-xs text-gray-500">
                Réponse garantie sous 24h · Pas d&apos;engagement
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
