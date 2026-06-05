import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Clock, Car, Euro, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/lib/seo-config";
import JsonLd from "@/components/seo/JsonLd";
import { getTouristAttractionSchema, getBreadcrumbSchema } from "@/lib/schemas/json-ld";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("lieux_explorer").select("slug");
  return (data ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("lieux_explorer")
    .select("nom, description")
    .eq("slug", params.slug)
    .single();
  if (!data) return {};

  const url = `${siteConfig.url}/explorer/${params.slug}`;
  const title = `${data.nom} — L'Escapade Rangeoise`;

  return {
    title,
    description: data.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description: data.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: data.description,
    },
  };
}

export default async function ExplorerSlugPage({ params }: Props) {
  const supabase = createClient();
  const { data } = await supabase
    .from("lieux_explorer")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!data) notFound();

  const point = {
    slug: data.slug,
    nom: data.nom,
    sous_titre: data.sous_titre ?? "",
    description: data.description ?? "",
    paragraphes: data.paragraphes ?? [],
    image: data.image,
    image_hero: data.image_hero,
    image_hero_position: data.image_hero_position ?? "center",
    distance: data.distance,
    activites: Array.isArray(data.activites) ? data.activites : [],
    infos_pratiques: {
      distance_km: data.distance_km ?? "",
      temps_voiture: data.temps_voiture ?? "",
      tarif: data.tarif ?? "",
      meilleure_periode: data.meilleure_periode ?? "",
    },
  };

  const touristAttractionSchema = getTouristAttractionSchema({
    nom: point.nom,
    slug: point.slug,
    description: point.description,
    image: point.image_hero ?? point.image,
    distance: point.distance,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Accueil", url: siteConfig.url },
    { name: "À explorer", url: `${siteConfig.url}/#region` },
    { name: point.nom, url: `${siteConfig.url}/explorer/${point.slug}` },
  ]);

  return (
    <>
      <JsonLd schema={touristAttractionSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={point.image_hero ?? point.image}
            alt={point.nom}
            className="w-full h-full object-cover"
            style={{ objectPosition: point.image_hero_position ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />

          <div className="absolute top-24 left-0 right-0 px-4 sm:px-8">
            <Link href="/#region" className="inline-flex items-center gap-1.5 font-lato text-sm text-white/70 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              À explorer
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-16 pb-10">
            <div className="max-w-4xl">
              {point.distance && (
                <span className="inline-flex items-center gap-1.5 bg-gold text-primary font-lato text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  <Car className="w-3 h-3" />
                  {point.distance} depuis les logements
                </span>
              )}
              <h1 className="font-playfair text-4xl md:text-6xl text-white font-bold mb-2">{point.nom}</h1>
              <p className="font-lato text-white/80 text-lg">{point.sous_titre}</p>
            </div>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-playfair text-2xl text-primary mb-5">Découvrir {point.nom}</h2>
                <div className="space-y-4">
                  {point.paragraphes.map((para: string, i: number) => (
                    <p key={i} className="font-lato text-gray-600 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-playfair text-2xl text-primary mb-5">Que faire sur place ?</h2>
                <ul className="space-y-4">
                  {point.activites.map((activite: { titre: string; description: string }, i: number) => (
                    <li key={i} className="flex gap-4 bg-sand/30 rounded-2xl p-5 border border-sand">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-lato font-semibold text-primary text-sm mb-1">{activite.titre}</p>
                        <p className="font-lato text-gray-500 text-sm leading-relaxed">{activite.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="bg-primary rounded-2xl p-6 text-white sticky top-24">
                <h3 className="font-playfair text-xl mb-5 text-gold">Infos pratiques</h3>
                <ul className="space-y-4">
                  <InfoRow icon={<MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />} label="Distance" value={point.infos_pratiques.distance_km} />
                  <InfoRow icon={<Car className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />} label="En voiture" value={point.infos_pratiques.temps_voiture} />
                  <InfoRow icon={<Euro className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />} label="Tarif" value={point.infos_pratiques.tarif} />
                  <InfoRow icon={<CalendarDays className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />} label="Meilleure période" value={point.infos_pratiques.meilleure_periode} />
                </ul>
                <div className="mt-6 space-y-3">
                  <Link href="/#reservation" className="flex items-center justify-center gap-2 bg-gold text-primary font-lato font-semibold text-sm px-5 py-3 rounded-full hover:bg-[#cc9430] transition-all w-full">
                    Réserver votre séjour
                  </Link>
                  <Link href="/#region" className="flex items-center justify-center gap-2 border border-white/30 text-white/80 font-lato text-sm px-5 py-3 rounded-full hover:bg-white/10 transition-all w-full">
                    <Clock className="w-4 h-4" />
                    Voir d'autres suggestions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex gap-3">
      {icon}
      <div>
        <p className="font-lato text-white/50 text-xs uppercase tracking-wider">{label}</p>
        <p className="font-lato text-white text-sm mt-0.5">{value}</p>
      </div>
    </li>
  );
}
