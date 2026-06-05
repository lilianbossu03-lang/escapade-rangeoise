"use client";

import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";
import { ContenuSite } from "@/types";

export default function ProprietaireSection({ contenu_site }: { contenu_site: Pick<ContenuSite, "qui_suis_je_titre" | "qui_suis_je_texte" | "qui_suis_je_photo" | "contact_email"> }) {
  const paragraphs = contenu_site.qui_suis_je_texte.split("\n\n").filter(Boolean);

  return (
    <section id="proprietaire" className="py-20 bg-sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contenu_site.qui_suis_je_photo}
                  alt="Sandra, propriétaire de L'Escapade Rangeoise"
                  className="w-full h-80 lg:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>

              {/* Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="bg-gold/20 rounded-full p-2">
                  <Heart className="w-5 h-5 text-gold fill-gold" />
                </div>
                <div>
                  <p className="font-lato font-bold text-primary text-sm">{contenu_site.qui_suis_je_titre}</p>
                  <p className="font-lato text-gray-500 text-xs">Votre hôte</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold font-lato text-sm font-semibold tracking-widest uppercase">
              Votre hôte
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-primary mt-2 mb-6">
              {contenu_site.qui_suis_je_titre}
            </h2>

            {/* Quote */}
            <div className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gold/20">
              <Quote className="w-8 h-8 text-gold/30 absolute top-4 left-4" />
              <p className="font-playfair text-lg text-primary italic pl-6 leading-relaxed">
                Séjourner chez moi, c&apos;est profiter d&apos;un accès privilégié à la beauté sauvage de notre littoral et bénéficier de mes conseils locaux pour découvrir la région hors des sentiers battus.
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
              {paragraphs.slice(0, 3).map((para, idx) => (
                <p key={idx} className="font-lato text-gray-700 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <a
                href={`mailto:${contenu_site.contact_email}`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-lato font-semibold px-6 py-3 rounded-full hover:bg-secondary transition-colors"
              >
                Me contacter
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById("reservation");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 bg-gold text-primary font-lato font-semibold px-6 py-3 rounded-full hover:bg-[#cc9430] transition-colors"
              >
                Réserver un séjour
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
