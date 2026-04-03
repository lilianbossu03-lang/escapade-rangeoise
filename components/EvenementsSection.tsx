"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Evenement } from "@/types";
import { format, parseISO, isFuture, isToday } from "date-fns";
import { fr } from "date-fns/locale";

const categorieColors: Record<string, string> = {
  festival: "bg-purple-100 text-purple-700",
  sport: "bg-green-100 text-green-700",
  culture: "bg-blue-100 text-blue-700",
  nature: "bg-vert-sauge/20 text-vert-sauge",
  gastronomie: "bg-orange-100 text-orange-700",
};

const categorieLabels: Record<string, string> = {
  festival: "Festival",
  sport: "Sport",
  culture: "Culture",
  nature: "Nature",
  gastronomie: "Gastronomie",
};

export default function EvenementsSection({ evenements }: { evenements: Evenement[] }) {
  const futureEvents = evenements.filter((e) => {
    const date = parseISO(e.date);
    return isFuture(date) || isToday(date);
  });

  return (
    <section id="evenements" className="py-20 bg-white">
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
            À venir
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-primary mt-2 mb-4">
            Événements & Animations
          </h2>
          <p className="font-lato text-gray-600 max-w-2xl mx-auto text-lg">
            La Côte d'Opale est une région vivante ! Festivals, marchés, randonnées...
            Il se passe toujours quelque chose.
          </p>
        </motion.div>

        {/* Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureEvents.map((evt, idx) => (
            <motion.div
              key={evt.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white rounded-xl p-3 flex flex-col items-center min-w-[52px]">
                    <span className="font-playfair text-xl font-bold leading-none">
                      {format(parseISO(evt.date), "d", { locale: fr })}
                    </span>
                    <span className="font-lato text-xs uppercase mt-0.5 text-gold">
                      {format(parseISO(evt.date), "MMM", { locale: fr })}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg text-primary font-semibold leading-tight">
                      {evt.titre}
                    </h3>
                    {evt.date_fin && (
                      <p className="font-lato text-xs text-gray-500 mt-0.5">
                        Du {format(parseISO(evt.date), "d MMM", { locale: fr })} au{" "}
                        {format(parseISO(evt.date_fin), "d MMM yyyy", { locale: fr })}
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs font-lato font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
                    categorieColors[evt.categorie]
                  }`}
                >
                  {categorieLabels[evt.categorie]}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-500 text-sm font-lato mb-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{evt.lieu}</span>
              </div>

              {/* Description */}
              <p className="font-lato text-gray-600 text-sm leading-relaxed flex-1">
                {evt.description}
              </p>

              {/* Link */}
              {evt.url && (
                <a
                  href={evt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-gold font-lato text-sm font-semibold hover:text-[#cc9430] transition-colors"
                >
                  En savoir plus
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {futureEvents.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-lato">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun événement à venir pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
