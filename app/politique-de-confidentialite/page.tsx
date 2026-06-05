import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — L'Escapade Rangeoise",
  description:
    "Politique de confidentialité et traitement des données personnelles de L'Escapade Rangeoise.",
};

export default function PolitiqueConfidentialitePage() {
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
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-lato text-xs text-gray-400 uppercase tracking-widest">
                L&apos;Escapade Rangeoise
              </p>
              <h1 className="font-playfair text-3xl text-primary">
                Politique de confidentialité
              </h1>
            </div>
          </div>

          <div className="space-y-8">
            <p className="font-lato text-gray-600 leading-relaxed">
              La présente politique de confidentialité a pour objet de vous informer avec la plus grande
              transparence sur la manière dont L&apos;Escapade Rangeoise collecte, utilise et protège vos
              données personnelles. Cet engagement de confidentialité s&apos;inscrit dans le strict respect de
              la législation européenne, notamment le Règlement Général sur la Protection des Données
              (RGPD), ainsi que de la loi française Informatique et Libertés. Nous accordons une
              importance primordiale à la protection de votre vie privée et à la sécurité des
              informations que vous nous confiez lors de la préparation de vos vacances sur la Côte
              d&apos;Opale.
            </p>

            <Section title="1. Responsable du traitement et données collectées">
              <p>
                Le responsable du traitement de vos informations est <strong>Sandra Bossu</strong>,
                éditrice et propriétaire du site de L&apos;Escapade Rangeoise, que vous pouvez joindre
                facilement pour toute question à l&apos;adresse électronique{" "}
                <a
                  href="mailto:contact@escapade-rangeoise.fr"
                  className="text-gold hover:underline"
                >
                  contact@escapade-rangeoise.fr
                </a>
                .
              </p>
              <p>
                Dans le cadre de votre visite sur notre site internet, nous collectons uniquement les
                données que vous choisissez de nous transmettre de manière volontaire, principalement
                lors de l&apos;utilisation de notre formulaire de contact ou de réservation. Ces informations
                englobent votre nom, votre prénom, votre adresse e-mail, votre numéro de téléphone
                éventuel, ainsi que les détails inhérents à votre projet de séjour, tels que les dates
                souhaitées, le nombre de voyageurs et le contenu de vos messages.
              </p>
              <p>
                Il est essentiel de préciser qu&apos;<strong>aucune donnée bancaire ou financière</strong>{" "}
                n&apos;est collectée ni stockée directement sur notre plateforme, les transactions éventuelles
                étant systématiquement déléguées à des plateformes de paiement tierces et hautement
                sécurisées.
              </p>
            </Section>

            <Section title="2. Finalités du traitement et engagement de confidentialité">
              <p>
                Les données personnelles que nous recueillons sont traitées de manière loyale et sont
                utilisées exclusivement pour vous fournir le meilleur service possible. Elles nous sont
                indispensables pour répondre avec précision à vos demandes de renseignements, pour gérer
                l&apos;ensemble de votre dossier de réservation, assurer le suivi de votre séjour et pouvoir
                vous contacter rapidement en cas de nécessité liée à votre accueil.
              </p>
              <p>
                L&apos;Escapade Rangeoise s&apos;engage formellement à ce que vos données ne soient{" "}
                <strong>jamais revendues, louées ou cédées</strong> à des entreprises tierces à des fins
                de prospection commerciale. Pour assurer la sécurité de vos informations, nous mettons en
                œuvre des mesures techniques et organisationnelles rigoureuses, conçues pour empêcher
                tout accès non autorisé, toute perte, altération ou divulgation accidentelle de vos
                données.
              </p>
            </Section>

            <Section title="3. Durée de conservation">
              <p>
                Dans une démarche de minimisation, nous conservons vos informations uniquement le temps
                nécessaire à l&apos;accomplissement des finalités évoquées. Vos données personnelles sont
                ainsi conservées pour une durée maximale de{" "}
                <strong>trois ans</strong> à compter de la fin de votre dernier séjour ou de notre
                dernier contact, avant d&apos;être définitivement supprimées ou anonymisées.
              </p>
            </Section>

            <Section title="4. Vos droits">
              <p>
                Conformément à la réglementation en vigueur, vous conservez le contrôle absolu sur vos
                données. Vous disposez à tout moment des droits suivants :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {[
                  "Droit d'accès",
                  "Droit de rectification",
                  "Droit à l'effacement (droit à l'oubli)",
                  "Droit à la limitation du traitement",
                  "Droit à la portabilité",
                  "Droit d'opposition",
                ].map((droit) => (
                  <div
                    key={droit}
                    className="flex items-center gap-2 bg-sand/40 rounded-lg px-4 py-2.5 font-lato text-sm text-primary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {droit}
                  </div>
                ))}
              </div>
              <p className="mt-4">
                Pour faire valoir l&apos;un de ces droits, il vous suffit de nous adresser une demande écrite
                par courriel à{" "}
                <a
                  href="mailto:contact@escapade-rangeoise.fr"
                  className="text-gold hover:underline"
                >
                  contact@escapade-rangeoise.fr
                </a>
                . Nous nous engageons à traiter votre requête dans les meilleurs délais. Par ailleurs,
                si vous estimez après nous avoir contactés que vos droits ne sont pas respectés, vous
                avez la possibilité d&apos;introduire une réclamation officielle auprès de la{" "}
                <strong>Commission Nationale de l&apos;Informatique et des Libertés (CNIL)</strong>{" "}
                directement via leur site internet.
              </p>
            </Section>

            <Section title="5. Cookies">
              <p>
                Concernant votre navigation sur notre site, nous tenons à vous assurer d&apos;une expérience
                respectueuse de votre tranquillité. L&apos;Escapade Rangeoise a fait le choix de n&apos;utiliser{" "}
                <strong>aucun cookie ou traceur</strong> à des fins publicitaires, commerciales ou
                d&apos;analyse comportementale tierce.
              </p>
              <p>
                Seuls des cookies techniques, qui sont strictement indispensables au bon fonctionnement,
                à l&apos;affichage et à la sécurité de l&apos;infrastructure du site, peuvent être déposés sur
                votre appareil. Ces éléments techniques sont neutres et ne collectent aucune donnée
                personnelle permettant de vous identifier lors de votre visite.
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
