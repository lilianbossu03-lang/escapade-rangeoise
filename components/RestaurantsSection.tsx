"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, ExternalLink, Utensils } from "lucide-react";
import { Restaurant } from "@/types";

export default function RestaurantsSection({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <section id="restaurants" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold font-lato text-sm font-semibold tracking-widest uppercase">
            Bonnes tables
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-primary mt-2 mb-4">
            Mes coups de cœur
          </h2>
          <p className="font-lato text-gray-600 max-w-2xl mx-auto text-lg">
            Fruits de mer ultra-frais, cuisine du terroir flamand, gastronomie étoilée...
            La région régale les palais les plus exigeants.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((resto, idx) => (
            <motion.div
              key={resto.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              {resto.photo && (
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resto.photo}
                    alt={resto.nom}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Prix */}
                  <div className="absolute top-3 right-3 bg-white text-primary font-lato font-bold text-sm px-2.5 py-1 rounded-full shadow">
                    {resto.gamme_prix}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-playfair text-xl text-primary font-semibold">
                    {resto.nom}
                  </h3>
                </div>

                {/* Type */}
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="font-lato text-xs text-gold font-semibold uppercase tracking-wide">
                    {resto.type_cuisine}
                  </span>
                </div>

                <p className="font-lato text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {resto.description}
                </p>

                {resto.specialite && (
                  <div className="bg-gold/10 rounded-lg px-3 py-2 mb-4">
                    <p className="font-lato text-xs text-gold font-semibold uppercase tracking-wide mb-0.5">
                      Spécialité
                    </p>
                    <p className="font-lato text-sm text-text-dark">
                      {resto.specialite}
                    </p>
                  </div>
                )}

                {/* Address */}
                <div className="flex items-start gap-2 text-gray-500 text-xs font-lato mb-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
                  <span>{resto.adresse}</span>
                </div>

                {/* Phone */}
                {resto.telephone && (
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-lato mb-3">
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                    <span>{resto.telephone}</span>
                  </div>
                )}

                {/* Maps link */}
                <a
                  href={resto.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-gold font-lato text-sm font-semibold hover:text-[#cc9430] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Voir sur Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
