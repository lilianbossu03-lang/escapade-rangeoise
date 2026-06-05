import { Metadata } from "next";
import Link from "next/link";
import { Anchor, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales — L'Escapade Rangeoise",
  description: "Mentions légales du site L'Escapade Rangeoise.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-lato text-sm text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>

          {/* Header */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-sand">
            <div className="bg-primary rounded-xl p-2.5">
              <Anchor className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-lato text-xs text-gray-400 uppercase tracking-widest">
                L&apos;Escapade Rangeoise
              </p>
              <h1 className="font-playfair text-3xl text-primary">
                Mentions légales
              </h1>
            </div>
          </div>

          <div className="space-y-8">
            <Section title="Éditeur du site">
              <p>
                Le présent site internet est édité par la société{" "}
                <strong>L&apos;ESCAPADE RANGEOISE</strong>, une Société par Actions Simplifiée au capital
                social de 1 000 euros. Son siège social est domicilié au{" "}
                <strong>40 Avenue Jean Moulin, 62180 Rang-du-Fliers</strong>.
              </p>
              <p>
                La société est immatriculée au Registre National des Entreprises sous le numéro SIREN{" "}
                <strong>998 946 099</strong>, et l&apos;établissement est identifié par le numéro de SIRET{" "}
                <strong>998 946 099 00012</strong>. Son numéro de TVA intracommunautaire est le{" "}
                <strong>FR29 998 946 099</strong>.
              </p>
            </Section>

            <Section title="Directrice de la publication">
              <p>
                La directrice de la publication du présent site web est{" "}
                <strong>Sandra BOSSU</strong>, agissant en qualité de dirigeante et représentante légale
                de L&apos;Escapade Rangeoise. Pour toute question, demande d&apos;information ou de réservation,
                vous pouvez la contacter directement :
              </p>
              <div className="bg-sand/40 rounded-xl p-5 mt-3 space-y-2">
                <div className="flex gap-2 font-lato text-sm">
                  <span className="text-gray-400 min-w-[110px]">Téléphone :</span>
                  <a
                    href="tel:+33626241661"
                    className="text-primary font-medium hover:text-gold transition-colors"
                  >
                    06 26 24 16 61
                  </a>
                </div>
                <div className="flex gap-2 font-lato text-sm">
                  <span className="text-gray-400 min-w-[110px]">E-mail :</span>
                  <a
                    href="mailto:contact@escapade.fr"
                    className="text-primary font-medium hover:text-gold transition-colors"
                  >
                    contact@escapade.fr
                  </a>
                </div>
              </div>
            </Section>

            <Section title="Hébergement">
              <p>
                L&apos;hébergement technique de ce site internet est assuré par la société{" "}
                <strong>Vercel Inc.</strong> Le siège social de cet hébergeur est situé au{" "}
                340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis. Pour toute question
                relative à l&apos;infrastructure informatique du site, vous pouvez contacter directement cet
                hébergeur via son site internet officiel accessible à l&apos;adresse{" "}
                <span className="text-primary font-medium">vercel.com</span>.
              </p>
            </Section>

            <Section title="Propriété intellectuelle">
              <p>
                L&apos;ensemble des éléments constituant ce site internet, incluant de façon non limitative
                sa structure générale, ses textes, ses photographies, son identité visuelle et ses logos,
                relèvent de la législation française et internationale sur le droit d&apos;auteur et la
                propriété intellectuelle. Ces éléments sont la propriété exclusive de L&apos;Escapade
                Rangeoise.
              </p>
              <p>
                Toute représentation, reproduction, modification ou exploitation totale ou partielle de
                ce site et de son contenu sans l&apos;autorisation expresse et préalable de la société est
                formellement interdite et constituerait une contrefaçon sanctionnée par le Code de la
                propriété intellectuelle.
              </p>
            </Section>

            <Section title="Conception et développement">
              <p>
                La conception, le développement et la réalisation de ce site internet ont été assurés par{" "}
                <strong>Lilian Bossu</strong>.
              </p>
            </Section>

            <Section title="Données personnelles">
              <p>
                Dans le cadre de l&apos;utilisation de ce site et notamment lors de l&apos;utilisation des
                formulaires de contact ou de réservation, L&apos;Escapade Rangeoise est amenée à collecter et
                à traiter certaines de vos données personnelles. Ce traitement est effectué dans le plus
                strict respect du Règlement Général sur la Protection des Données et de la loi
                Informatique et Libertés.
              </p>
              <p>
                Ces informations sont exclusivement réservées à la gestion de vos demandes et de vos
                séjours. Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès,
                de rectification, de portabilité, d&apos;effacement de vos données ou d&apos;une limitation du
                traitement, que vous pouvez exercer à tout moment en contactant la directrice de la
                publication aux coordonnées indiquées ci-dessus.
              </p>
            </Section>

            <p className="font-lato text-xs text-gray-400 pt-6 border-t border-gray-100">
              Dernière mise à jour : avril 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-playfair text-xl text-primary mb-3">{title}</h2>
      <div className="font-lato text-gray-600 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}
