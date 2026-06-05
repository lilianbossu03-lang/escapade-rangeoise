import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page introuvable — L'Escapade Rangeoise",
  description:
    "Cette page n'existe pas. Retournez à l'accueil pour découvrir nos logements sur la Côte d'Opale.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      {/* Header minimal */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-header.svg"
              alt="L'Escapade Rangeoise"
              width={140}
              height={42}
              className="h-9 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="font-lato text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour à l&apos;accueil
          </Link>
        </div>
      </header>

      <main className="min-h-[100dvh] bg-sand flex flex-col">
        {/* Main section */}
        <section className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative wave */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <svg
                viewBox="0 0 120 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-28 h-8 opacity-30"
              >
                <path
                  d="M0,16 C15,4 30,28 45,16 C60,4 75,28 90,16 C105,4 112,22 120,16"
                  stroke="#232951"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* 404 number */}
            <p
              className="font-playfair font-bold text-gold leading-none mb-4"
              style={{ fontSize: "clamp(5rem, 20vw, 10rem)" }}
              aria-hidden="true"
            >
              404
            </p>

            {/* Title */}
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-primary font-bold leading-tight mb-5">
              Cette page s&apos;est perdue
              <br />
              <span className="italic font-normal text-2xl sm:text-3xl md:text-4xl">
                dans les dunes
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-lato text-gray-600 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              La page que vous cherchez n&apos;existe pas ou a été déplacée. Mais ne
              partez pas — il y a tant à découvrir sur la Côte d&apos;Opale.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-primary font-lato font-semibold px-8 py-3.5 rounded-full hover:bg-[#cc9430] transition-all duration-200 hover:scale-105 min-h-[44px]"
              >
                Retour à l&apos;accueil
              </Link>
              <Link
                href="/#logements"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gold text-primary font-lato font-semibold px-8 py-3.5 rounded-full hover:bg-gold hover:text-primary transition-all duration-200 min-h-[44px]"
              >
                Voir nos logements
              </Link>
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <p className="font-lato text-xs font-semibold text-gray-400 tracking-widest uppercase text-center mb-6">
              Vous cherchiez peut-être…
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  href: "/#reservation",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  ),
                  label: "Réserver un séjour",
                  desc: "Consultez nos disponibilités",
                },
                {
                  href: "/#region",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: "La Côte d'Opale",
                  desc: "Découvrez la région",
                },
                {
                  href: "/#proprietaire",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                  label: "Votre hôte",
                  desc: "Qui suis-je ?",
                },
              ].map(({ href, icon, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-gold/10 hover:border-gold/40 hover:shadow-md transition-all duration-200"
                >
                  <span className="text-gold flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {icon}
                  </span>
                  <div>
                    <p className="font-lato font-semibold text-primary text-sm">
                      {label}
                    </p>
                    <p className="font-lato text-gray-400 text-xs mt-0.5">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
