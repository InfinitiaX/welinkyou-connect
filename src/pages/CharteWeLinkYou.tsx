import { Button } from "@/components/ui/button";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CharteWeLinkYou = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Hidden in print */}
      <div className="print:hidden bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/inscription-pro" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'inscription
          </Link>
          <Button onClick={handlePrint} className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:opacity-90">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer / Télécharger PDF
          </Button>
        </div>
      </div>

      {/* Charter Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 print:shadow-none print:p-0">
          {/* Header */}
          <div className="text-center mb-10 pb-8 border-b">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Charte d'Engagement WeLinkYou
            </h1>
            <p className="text-muted-foreground">
              Charte à signer par tout professionnel souhaitant rejoindre la plateforme WeLinkYou
            </p>
          </div>

          {/* Preamble */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Préambule</h2>
            <p className="text-muted-foreground leading-relaxed">
              WeLinkYou est une plateforme de mise en relation qui centralise et connecte des professionnels de confiance 
              à des besoins nécessitant des compétences spécialisées, locales ou transfrontalières, dans un cadre structuré 
              et transparent. En rejoignant WeLinkYou, le professionnel s'engage à respecter les principes fondamentaux 
              de la plateforme et à adhérer aux engagements suivants.
            </p>
          </section>

          {/* Article 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Article 1 – Engagement de transparence</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le professionnel s'engage à :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Fournir des informations exactes et vérifiables concernant son identité, ses qualifications et son activité professionnelle.</li>
              <li>Mettre à jour son profil en cas de changement de situation (adresse, spécialités, disponibilité, etc.).</li>
              <li>Ne pas diffuser d'informations trompeuses ou mensongères sur ses compétences ou expériences.</li>
            </ul>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Article 2 – Respect de la déontologie professionnelle</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le professionnel s'engage à :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Exercer son activité dans le respect des règles déontologiques propres à sa profession.</li>
              <li>Respecter le secret professionnel et la confidentialité des informations échangées avec les clients.</li>
              <li>Agir avec intégrité, loyauté et bonne foi dans toutes ses relations professionnelles.</li>
            </ul>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Article 3 – Qualité de service</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le professionnel s'engage à :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Répondre aux sollicitations des clients dans un délai raisonnable.</li>
              <li>Fournir des prestations de qualité conformes aux standards de sa profession.</li>
              <li>Informer clairement les clients sur les tarifs, délais et conditions de ses prestations avant tout engagement.</li>
              <li>Traiter les réclamations avec professionnalisme et chercher des solutions amiables en cas de litige.</li>
            </ul>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Article 4 – Respect des utilisateurs</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le professionnel s'engage à :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Traiter tous les utilisateurs de la plateforme avec respect et courtoisie, sans discrimination.</li>
              <li>Ne pas solliciter les utilisateurs de manière abusive ou intrusive.</li>
              <li>Respecter la vie privée des utilisateurs et ne pas utiliser leurs données à des fins non autorisées.</li>
            </ul>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Article 5 – Respect de la plateforme</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Le professionnel s'engage à :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Respecter les conditions générales d'utilisation de WeLinkYou.</li>
              <li>Ne pas porter atteinte à l'image ou à la réputation de la plateforme.</li>
              <li>Signaler tout comportement frauduleux ou contraire à l'éthique observé sur la plateforme.</li>
              <li>Ne pas contourner les mécanismes de la plateforme pour éviter les obligations qui y sont liées.</li>
            </ul>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Article 6 – Sanctions</h2>
            <p className="text-muted-foreground leading-relaxed">
              En cas de non-respect des engagements de la présente charte, WeLinkYou se réserve le droit de :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-3">
              <li>Suspendre temporairement ou définitivement le profil du professionnel.</li>
              <li>Retirer le badge "Profil vérifié" du professionnel.</li>
              <li>Prendre toute mesure appropriée pour protéger les utilisateurs et l'intégrité de la plateforme.</li>
            </ul>
          </section>

          {/* Signature Section */}
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-semibold text-foreground mb-6">Engagement du professionnel</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Je soussigné(e), déclare avoir pris connaissance de la présente charte d'engagement WeLinkYou et 
              m'engage à en respecter l'ensemble des dispositions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Nom et prénom :</p>
                <div className="border-b border-dashed border-gray-300 h-8"></div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Date :</p>
                <div className="border-b border-dashed border-gray-300 h-8"></div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-2">Signature :</p>
              <div className="border border-dashed border-gray-300 h-24 rounded-lg"></div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>WeLinkYou – Plateforme de mise en relation professionnelle</p>
            <p className="mt-1">www.welinkyou.com</p>
          </div>
        </div>
      </div>

      {/* Print Button - Fixed at bottom on mobile, hidden in print */}
      <div className="print:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden">
        <Button onClick={handlePrint} className="w-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:opacity-90">
          <Download className="h-4 w-4 mr-2" />
          Télécharger en PDF
        </Button>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 2cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
};

export default CharteWeLinkYou;
