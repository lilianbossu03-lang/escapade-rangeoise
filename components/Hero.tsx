"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const scrollToLogements = () => {
    const el = document.getElementById("logements");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt="Vue aérienne de Berck-sur-Mer, Côte d'Opale"
          className="w-full h-full object-cover scale-110"
          // @ts-ignore
          fetchpriority="high"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/75" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-gold font-lato text-sm font-semibold tracking-widest uppercase mb-4 border border-gold/50 px-4 py-1 rounded-full">
            Côte d'Opale — Pas-de-Calais
          </span>
        </motion.div>

        <motion.h1
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          L'Escapade
          <br />
          <span className="text-gold">Rangeoise</span>
        </motion.h1>

        <motion.p
          className="font-lato text-xl md:text-2xl text-white/90 mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Vos vacances sur la Côte d'Opale
          <br />
          <span className="text-white/70 text-lg">
            À Rang-du-Fliers, entre mer et nature
          </span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={scrollToLogements}
            className="w-full sm:w-auto bg-gold text-primary font-lato font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#cc9430] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg min-h-[44px]"
          >
            Découvrir nos logements
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("reservation");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto border-2 border-white text-white font-lato font-semibold text-lg px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-200 min-h-[44px]"
          >
            Réserver maintenant
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/70 hover:text-white transition-colors"
        onClick={scrollToLogements}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#efe3c9"
          />
        </svg>
      </div>
    </section>
  );
}
