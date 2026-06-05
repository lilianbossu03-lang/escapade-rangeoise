import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ExternalLink, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const navLinks = [
  { label: "Nos logements", href: "/#logements" },
  { label: "La Région", href: "/#region" },
  { label: "Événements", href: "/#evenements" },
  { label: "Restaurants", href: "/#restaurants" },
  { label: "Réserver", href: "/#reservation" },
];

export default async function Footer() {
  const supabase = createClient();

  const [{ data: contenu_rows }, { data: logements }] = await Promise.all([
    supabase.from("contenu_site").select("cle, valeur"),
    supabase.from("logements").select("nom, slug").eq("disponible", true).order("ordre"),
  ]);

  const contenu = (contenu_rows ?? []).reduce<Record<string, string>>(
    (acc, row) => ({ ...acc, [row.cle]: row.valeur ?? "" }),
    {}
  );

  const airbnb_url = contenu.airbnb_url ?? "";
  const contact_email = contenu.contact_email ?? "";
  const contact_telephone = contenu.contact_telephone ?? "";
  const logementList = logements ?? [];

  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="L'Escapade Rangeoise"
                width={48}
                height={48}
                className="h-12 w-12 flex-shrink-0"
              />
              <span className="font-playfair text-lg leading-tight text-white">
                L&apos;Escapade<br />Rangeoise
              </span>
            </div>
            <p className="font-lato text-white/60 text-sm leading-relaxed mb-6">
              Locations de vacances authentiques à Rang-du-Fliers, sur la
              magnifique Côte d&apos;Opale.
            </p>
            {airbnb_url && (
              <a
                href={airbnb_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF5A5F] text-white text-sm font-lato font-semibold px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Voir sur Airbnb
              </a>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-playfair text-lg mb-4 text-gold">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-lato text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logements */}
          <div>
            <h4 className="font-playfair text-lg mb-4 text-gold">Nos logements</h4>
            <ul className="space-y-2">
              {logementList.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/logements/${l.slug}`}
                    className="font-lato text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {l.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg mb-4 text-gold">Contact</h4>
            <ul className="space-y-3">
              {contact_email && (
                <li>
                  <a
                    href={`mailto:${contact_email}`}
                    className="flex items-center gap-2 font-lato text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    {contact_email}
                  </a>
                </li>
              )}
              {contact_telephone && (
                <li>
                  <a
                    href={`tel:${contact_telephone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 font-lato text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {contact_telephone}
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-6">
              <h5 className="font-lato text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">
                Mentions légales
              </h5>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/conditions-generales"
                    className="font-lato text-xs text-white/50 hover:text-white/80 transition-colors"
                  >
                    Conditions générales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politique-de-confidentialite"
                    className="font-lato text-xs text-white/50 hover:text-white/80 transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentions-legales"
                    className="font-lato text-xs text-white/50 hover:text-white/80 transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-lato text-xs text-white/40">
            © {new Date().getFullYear()} L&apos;Escapade Rangeoise. Tous droits réservés.
          </p>
          <p className="font-lato text-xs text-white/40 flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-gold fill-gold" /> sur la Côte d&apos;Opale
          </p>
        </div>
      </div>
    </footer>
  );
}
