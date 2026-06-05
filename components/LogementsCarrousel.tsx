"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, BedDouble, Star } from "lucide-react";
import { flushSync } from "react-dom";
import { Logement } from "@/types";

// ── Carousel constants ────────────────────────────────────────────────────────
const VISIBLE_LG = 3;
const CLONE = VISIBLE_LG;
const AUTO_MS = 4500;
const PAUSE_MS = 3000;
const EASING = "transform 580ms cubic-bezier(0.4, 0, 0.2, 1)";

// ── Card component ────────────────────────────────────────────────────────────
function LogementCard({ logement }: { logement: Logement }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logement.photo_principale}
          alt={logement.nom}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-4 right-4 bg-gold text-primary text-sm font-semibold px-3 py-1 rounded-full">
          {logement.prix_par_nuit}€/nuit
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-playfair text-xl text-primary mb-2 leading-snug">{logement.nom}</h3>
        <p className="font-lato text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{logement.description_courte}</p>
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 font-lato">
          <span className="flex items-center gap-1"><Users className="w-4 h-4 text-gold" />{logement.capacite} pers.</span>
          <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-gold" />{logement.nb_chambres} ch.</span>
          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />4.9</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {logement.equipements.slice(0, 3).map((eq) => (
            <span key={eq} className="bg-sand text-secondary text-xs font-lato px-2 py-1 rounded-full">{eq}</span>
          ))}
        </div>
        <div className="mt-auto">
          <Link
            href={`/logements/${logement.slug}`}
            className="block w-full text-center font-lato font-semibold py-3 rounded-xl border-2 border-gold bg-gold text-primary hover:bg-transparent hover:text-gold transition-all duration-300"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main carousel ─────────────────────────────────────────────────────────────
export default function LogementsCarrousel({ logements }: { logements: Logement[] }) {
  const REAL = logements.length;
  // TOTAL kept for readability: REAL + CLONE * 2 — not used in logic currently
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const TOTAL = REAL + CLONE * 2;
  const START = CLONE;
  const ext: Logement[] = [
    ...logements.slice(REAL - CLONE),
    ...logements,
    ...logements.slice(0, CLONE),
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(START);
  const [cardWidth, setCardWidth] = useState(0);
  const currentRef = useRef(START);
  const isAnimating = useRef(false);
  const isPaused = useRef(false);
  const touchStartX = useRef(0);
  const wheelAccum = useRef(0);
  const pauseTimer = useRef<ReturnType<typeof setTimeout>>();

  currentRef.current = current;

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const visible = window.innerWidth >= 1024 ? VISIBLE_LG : 1;
      setCardWidth(w / visible);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback((dir: 1 | -1) => {
    if (isAnimating.current || !trackRef.current) return;
    isAnimating.current = true;
    trackRef.current.style.transition = EASING;
    setCurrent((c) => c + dir);
  }, []);

  const pause = useCallback(() => {
    isPaused.current = true;
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => { isPaused.current = false; }, PAUSE_MS);
  }, []);

  const advance = useCallback((dir: 1 | -1) => { pause(); goTo(dir); }, [pause, goTo]);

  useEffect(() => {
    const id = setInterval(() => { if (!isPaused.current) goTo(1); }, AUTO_MS);
    return () => clearInterval(id);
  }, [goTo]);

  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.propertyName !== "transform") return;
    const c = currentRef.current;
    const inClone = c >= CLONE + REAL || c < CLONE;
    if (inClone) {
      const jumpTo = c >= CLONE + REAL ? c - REAL : c + REAL;
      if (trackRef.current) trackRef.current.style.transition = "none";
      flushSync(() => setCurrent(jumpTo));
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = EASING;
        isAnimating.current = false;
      }));
    } else {
      isAnimating.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [REAL]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) advance(diff > 0 ? 1 : -1);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 5) return;
      e.preventDefault();
      wheelAccum.current += e.deltaX;
      if (Math.abs(wheelAccum.current) > 60) { advance(wheelAccum.current > 0 ? 1 : -1); wheelAccum.current = 0; }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  const realIndex = ((current - CLONE) % REAL + REAL) % REAL;

  const jumpToSlide = useCallback((i: number) => {
    if (isAnimating.current || !trackRef.current) return;
    pause();
    isAnimating.current = true;
    trackRef.current.style.transition = EASING;
    setCurrent(CLONE + i);
  }, [pause]);

  const translateX = cardWidth > 0 ? -current * cardWidth : 0;

  if (logements.length === 0) return null;

  return (
    <section id="logements" className="py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-gold font-lato text-sm font-semibold tracking-widest uppercase">Nos hébergements</span>
          <h2 className="font-playfair text-4xl md:text-5xl text-primary mt-2 mb-4">Choisissez votre nid</h2>
          <p className="font-lato text-gray-600 max-w-2xl mx-auto text-lg">Cinq logements soigneusement aménagés pour vous offrir le meilleur des vacances sur la Côte d&apos;Opale.</p>
        </motion.div>

        <div className="relative">
          <div ref={containerRef} className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {cardWidth === 0 && (
              <div className="flex gap-6">{[1,2,3].map((i) => <div key={i} className="flex-1 h-96 bg-white/60 rounded-2xl animate-pulse" />)}</div>
            )}
            {cardWidth > 0 && (
              <div ref={trackRef} onTransitionEnd={handleTransitionEnd} style={{ display: "flex", transform: `translateX(${translateX}px)`, transition: EASING, willChange: "transform" }}>
                {ext.map((logement, i) => (
                  <div key={`${logement.slug}-${i}`} style={{ minWidth: `${cardWidth}px`, width: `${cardWidth}px` }} className="px-3 py-4">
                    <LogementCard logement={logement} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => advance(-1)} aria-label="Précédent" className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center bg-white text-primary shadow-lg p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-200"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={() => advance(1)} aria-label="Suivant" className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center bg-white text-primary shadow-lg p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-200"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => advance(-1)} aria-label="Précédent" className="lg:hidden bg-white text-primary border border-gray-200 p-3 rounded-full shadow hover:bg-primary hover:text-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex items-center gap-2">
            {Array.from({ length: REAL }).map((_, i) => (
              <button key={i} onClick={() => jumpToSlide(i)} aria-label={`Logement ${i+1}`} className={`rounded-full transition-all duration-300 ${i === realIndex ? "bg-gold w-6 h-3" : "bg-gray-300 w-3 h-3 hover:bg-gold/50"}`} />
            ))}
          </div>
          <button onClick={() => advance(1)} aria-label="Suivant" className="lg:hidden bg-white text-primary border border-gray-200 p-3 rounded-full shadow hover:bg-primary hover:text-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <button onClick={() => { const el = document.getElementById("reservation"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="bg-gold text-primary font-lato font-semibold px-8 py-4 rounded-full hover:bg-[#cc9430] transition-all hover:scale-105">
            Réserver votre séjour
          </button>
        </motion.div>
      </div>
    </section>
  );
}
