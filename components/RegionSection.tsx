"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { RegionPoint } from "@/types";

export default function RegionSection({ region_points }: { region_points: RegionPoint[] }) {
  return (
    <section id="region" className="py-20 bg-primary">
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
            À explorer
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mt-2 mb-4">
            La Côte d'Opale à votre portée
          </h2>
          <p className="font-lato text-white/70 max-w-2xl mx-auto text-lg">
            Entre falaises vertigineuses, plages infinies et villages pittoresques,
            la région vous réserve bien des trésors à découvrir.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {region_points.map((point, idx) => (
            <motion.div
              key={point.nom}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                href={`/explorer/${point.slug}`}
                className="group relative overflow-hidden rounded-2xl cursor-pointer block"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={point.image || "/hero.jpg"}
                    alt={point.nom}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = "/hero.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-playfair text-xl text-white font-bold">
                      {point.nom}
                    </h3>
                    {point.distance && (
                      <span className="flex items-center gap-1 bg-gold/90 text-primary text-xs font-lato px-2 py-1 rounded-full flex-shrink-0 ml-2">
                        <Clock className="w-3 h-3" />
                        {point.distance}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <p className="font-lato text-white/80 text-sm line-clamp-2 leading-relaxed">
                      {point.description}
                    </p>
                    <span className="flex-shrink-0 flex items-center gap-1 font-lato text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Découvrir <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom cta */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-8 py-5">
            <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-lato font-semibold">
                Rang-du-Fliers — Votre base idéale
              </p>
              <p className="text-white/60 font-lato text-sm">
                À 5 min de Berck, 20 min du Touquet, au cœur de la Côte d'Opale
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
