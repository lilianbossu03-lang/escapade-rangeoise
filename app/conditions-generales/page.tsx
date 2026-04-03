import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions générales — L'Escapade Rangeoise",
  description:
    "Conditions générales de location de L'Escapade Rangeoise.",
};

export default function ConditionsGeneralesPage() {
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
            Retour à l'accueil
          </Link>

          {/* Header */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-sand">
            <div className="bg-primary rounded-xl p-2.5">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-lato text-xs text-gray-400 uppercase tracking-widest">
                L'Escapade Rangeoise
              </p>
              <h1 className="font-playfair text-3xl text-primary">
                Conditions générales de location
              </h1>
            </div>
          </div>

          <div className="space-y-8">
            <p className="font-lato text-gray-600 leading-relaxed">
              Les présentes conditions générales régissent toute réservation effectuée pour un séjour
              à L'Escapade Rangeoise. En validant une demande de réservation, le voyageur reconnaît
              avoir pris connaissance de ces conditions et les accepter sans réserve. Ce document vise
              à garantir un séjour serein et transparent, tant pour les voyageurs que pour l'hôte.
            </p>

            <Section title="1. Objet">
              <p>
                L'Escapade Rangeoise propose à la location des hébergements meublés de tourisme situés
                à Rang-du-Fliers, dans le Pas-de-Calais, destinés à des séjours de courte durée et à
                titre non professionnel. Le contrat de location saisonnière est conclu entre l'hôte,
                représentant L'Escapade Rangeoise, et le voyageur principal effectuant la réservation.
              </p>
            </Section>

            <Section title="2. Réservation">
              <p>
                Toute demande de séjour est soumise à l'approbation préalable de l'hôte. Le processus
                de réservation s'effectue en ligne ou par échange de courriels. La réservation n'est
                considérée comme ferme et définitive qu'à compter de la réception d'une confirmation
                écrite de la part de l'hôte et de l'encaissement effectif de l'acompte requis.
              </p>
            </Section>

            <Section title="3. Tarifs et paiement">
              <p>
                Les tarifs indiqués s'entendent en euros et incluent les charges courantes telles que
                l'eau, l'électricité et le chauffage, dans la limite d'une consommation raisonnable et
                écoresponsable. Ces prix n'incluent pas la taxe de séjour, qui est calculée selon la
                réglementation de la commune et facturée en supplément.
              </p>
              <div className="bg-sand/40 border border-sand rounded-xl p-5 mt-2 space-y-2">
                <div className="flex gap-2 font-lato text-sm">
                  <span className="text-gray-500 min-w-[100px]">Acompte :</span>
                  <span className="text-primary font-medium">30 % du montant total, dû à la réservation</span>
                </div>
                <div className="flex gap-2 font-lato text-sm">
                  <span className="text-gray-500 min-w-[100px]">Solde :</span>
                  <span className="text-primary font-medium">70 % restants, dû au plus tard 30 jours avant l'arrivée</span>
                </div>
                <div className="flex gap-2 font-lato text-sm">
                  <span className="text-gray-500 min-w-[100px]">Paiement :</span>
                  <span className="text-primary font-medium">Virement bancaire ou tout autre moyen convenu entre les parties</span>
                </div>
              </div>
            </Section>

            <Section title="4. Dépôt de garantie">
              <p>
                Afin de garantir le respect des lieux, un dépôt de garantie d'un montant de{" "}
                <strong>300 euros</strong> est demandé lors de la remise des clés. Cette caution sera
                restituée au voyageur dans un délai maximum de sept jours suivant son départ, sous
                réserve qu'aucune dégradation ne soit constatée lors de l'état des lieux de sortie. En
                cas de dommages matériels ou de nécessité d'un nettoyage exceptionnel, les frais
                correspondants seront déduits de ce dépôt, factures à l'appui.
              </p>
            </Section>

            <Section title="5. Durée et occupation">
              <p>
                Le logement est loué pour une durée déterminée lors de la réservation et pour un nombre
                strict de voyageurs. Le voyageur principal s'engage à occuper les lieux personnellement.
                La présence de toute personne supplémentaire non déclarée lors de la réservation
                constitue une rupture du contrat et pourra entraîner l'annulation immédiate du séjour
                sans qu'aucun remboursement ne puisse être exigé.
              </p>
              <p>
                Les arrivées s'effectuent à partir de <strong>16h00</strong> et les départs doivent
                avoir lieu au plus tard à <strong>10h00</strong>, sauf dérogation accordée expressément
                par l'hôte.
              </p>
            </Section>

            <Section title="6. Annulation">
              <div className="bg-sand/40 border border-sand rounded-xl p-5 mt-1 space-y-3">
                <CancelRow
                  delai="Plus de 30 jours avant l'arrivée"
                  condition="Acompte intégralement remboursé"
                  color="text-green-700"
                />
                <CancelRow
                  delai="Entre 15 et 30 jours avant l'arrivée"
                  condition="50 % de l'acompte conservé"
                  color="text-amber-700"
                />
                <CancelRow
                  delai="Moins de 15 jours avant l'arrivée"
                  condition="Totalité de l'acompte conservée"
                  color="text-red-600"
                />
                <CancelRow
                  delai="Non-présentation ou annulation le jour J"
                  condition="Intégralité du montant du séjour due"
                  color="text-red-700"
                />
              </div>
              <p className="mt-3">
                Il est ainsi vivement recommandé aux voyageurs de souscrire une assurance annulation
                indépendante. Si l'annulation est contrainte et à l'initiative de l'hôte, le voyageur
                sera immédiatement et intégralement remboursé des sommes versées.
              </p>
            </Section>

            <Section title="7. Obligations du voyageur">
              <p>
                Pendant la durée de son séjour, le voyageur s'engage à jouir des lieux de manière
                paisible et raisonnable. Le logement est strictement <strong>non-fumeur en intérieur</strong>.
                Afin de préserver la tranquillité du voisinage, l'organisation de fêtes ou d'événements
                est formellement interdite, et le calme doit être respecté entre <strong>22h00 et 8h00</strong>.
              </p>
              <p>
                Tout dysfonctionnement ou dommage matériel doit être signalé à l'hôte dans les plus
                brefs délais. À l'issue du séjour, le logement doit être restitué dans un état de
                propreté correct, similaire à celui de l'arrivée. Par ailleurs, les animaux de compagnie
                ne sont admis qu'après l'obtention d'un accord préalable et écrit de l'hôte.
              </p>
            </Section>

            <Section title="8. Responsabilité">
              <p>
                La responsabilité de l'hôte ne saurait être engagée en cas de dommages directs ou
                indirects subis par le voyageur ou ses biens personnels durant la location, notamment en
                cas de vol, de dégradations liées aux intempéries ou de force majeure. Le voyageur
                assume la pleine responsabilité des dommages causés au logement ou à ses équipements par
                lui-même ou par les personnes qui l'accompagnent. Il lui est conseillé de s'assurer que
                sa police d'assurance habitation inclut une garantie responsabilité civile villégiature.
              </p>
            </Section>

            <Section title="9. Litiges">
              <p>
                En cas de différend relatif à l'interprétation ou à l'exécution des présentes
                conditions, l'hôte et le voyageur s'engagent à privilégier une résolution amiable. Si
                aucun accord ne peut être trouvé, le litige sera porté devant les juridictions
                compétentes du ressort de la ville d'<strong>Arras</strong>, dans le Pas-de-Calais, et
                sera soumis à la législation française en vigueur.
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

function CancelRow({
  delai,
  condition,
  color,
}: {
  delai: string;
  condition: string;
  color: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 font-lato text-sm border-b border-sand last:border-0 pb-2 last:pb-0">
      <span className="text-gray-500 sm:min-w-[240px]">{delai}</span>
      <span className={`font-semibold ${color}`}>{condition}</span>
    </div>
  );
}
