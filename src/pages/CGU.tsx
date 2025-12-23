import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const CGU = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-foreground">Conditions Générales d'Utilisation</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
            {/* Objet */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Objet</h2>
              <p>
                Les présentes conditions générales d'utilisation (CGU) régissent l'accès et l'utilisation du site WeLinkYou.com et de tous ses services. En accédant au site, vous acceptez inconditionnellement ces conditions.
              </p>
            </section>

            {/* Accès au site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Accès au Site</h2>
              <p className="mb-4">
                WeLinkYou s'efforce de maintenir le site accessible 24h/24, 7j/7. Cependant, l'accès peut être temporairement suspendu pour maintenance, mise à jour ou pour des raisons de sécurité.
              </p>
              <p>
                L'utilisateur est responsable de l'accès au site via un navigateur compatible et une connexion Internet fonctionnelle.
              </p>
            </section>

            {/* Utilisateurs et inscription */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Utilisateurs et Inscription</h2>
              <div className="space-y-4">
                <p>
                  Pour accéder à certains services, l'utilisateur peut être amené à créer un compte personnel en fournissant des informations exactes et à jour.
                </p>
                <p>
                  L'utilisateur est responsable de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>La confidentialité de ses identifiants de connexion</li>
                  <li>Toute activité réalisée sous son compte</li>
                  <li>La notification immédiate de tout accès non autorisé</li>
                </ul>
              </div>
            </section>

            {/* Droits et obligations */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Droits et Obligations de l'Utilisateur</h2>
              <div className="space-y-4">
                <p><strong>L'utilisateur s'engage à :</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respecter toutes les lois et réglementations applicables</li>
                  <li>Ne pas utiliser le site à des fins illégales ou frauduleuses</li>
                  <li>Ne pas publier de contenu offensant, diffamatoire ou nuisible</li>
                  <li>Ne pas usurper l'identité d'une autre personne</li>
                  <li>Ne pas pirater ou modifier le code du site</li>
                  <li>Ne pas interférer avec le fonctionnement du serveur</li>
                </ul>
                <p className="mt-4"><strong>Interdictions spécifiques :</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Harcèlement ou menaces envers d'autres utilisateurs</li>
                  <li>Exploitation ou prostitution</li>
                  <li>Contenu sexuel impliquant des mineurs</li>
                  <li>Violation de droits de propriété intellectuelle</li>
                  <li>Usurpation d'identité ou fraude</li>
                </ul>
              </div>
            </section>

            {/* Contenu utilisateur */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Contenu Publié par l'Utilisateur</h2>
              <p className="mb-4">
                L'utilisateur reste responsable de tout contenu qu'il publie. En publiant du contenu, l'utilisateur concède à WeLinkYou le droit d'utiliser, reproduire, modifier et diffuser ce contenu sur le site.
              </p>
              <p className="mb-4">
                WeLinkYou se réserve le droit de supprimer tout contenu qui viole ces conditions ou la loi.
              </p>
              <p>
                L'utilisateur garantit qu'il dispose de tous les droits nécessaires sur le contenu qu'il publie.
              </p>
            </section>

            {/* Limitation de responsabilité */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation de Responsabilité</h2>
              <p className="mb-4">
                LE SITE EST FOURNI "EN L'ÉTAT" SANS GARANTIE DE QUELQUE NATURE QUE CE SOIT.
              </p>
              <p className="mb-4">
                WeLinkYou ne sera pas responsable de :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Les dommages directs, indirects ou consécutifs</li>
                <li>Les pertes de données ou de revenus</li>
                <li>Les interruptions de service</li>
                <li>Les erreurs ou omissions dans le contenu</li>
                <li>Les actions de tiers utilisateurs</li>
              </ul>
            </section>

            {/* Liens externes */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Liens Externes</h2>
              <p className="mb-4">
                Le site peut contenir des liens vers des sites tiers. WeLinkYou n'est pas responsable du contenu de ces sites externes.
              </p>
              <p>
                En cliquant sur un lien externe, vous quittez le site WeLinkYou et acceptez de consulter le site tiers sous votre propre responsabilité.
              </p>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Propriété Intellectuelle</h2>
              <p className="mb-4">
                Tous les éléments du site (code, design, textes, images, logos) sont la propriété exclusive de WeLinkYou ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, représentation, modification ou exploitation sans autorisation préalable est interdite.
              </p>
            </section>

            {/* Données personnelles */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Données Personnelles</h2>
              <p className="mb-4">
                L'utilisation des données personnelles est régie par notre Politique de Confidentialité. En acceptant ces CGU, vous acceptez également la collecte et le traitement de vos données conformément à cette politique.
              </p>
              <p>
                Pour plus d'informations, veuillez consulter notre Politique de Confidentialité.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Modifications des Conditions</h2>
              <p className="mb-4">
                WeLinkYou se réserve le droit de modifier ces CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.
              </p>
              <p>
                L'utilisateur est encouragé à consulter régulièrement les CGU. L'utilisation continue du site après les modifications constitue l'acceptation des nouvelles conditions.
              </p>
            </section>

            {/* Résiliation */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Résiliation</h2>
              <p className="mb-4">
                WeLinkYou se réserve le droit de suspendre ou de supprimer un compte utilisateur qui viole ces conditions, sans préavis.
              </p>
              <p>
                L'utilisateur peut demander la suppression de son compte à tout moment en contactant WeLinkYou.
              </p>
            </section>

            {/* Loi applicable */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Loi Applicable et Juridiction</h2>
              <p className="mb-4">
                Ces conditions sont régies par la loi française.
              </p>
              <p>
                En cas de litige, les utilisateurs acceptent de soumettre le différend aux juridictions compétentes de France.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact</h2>
              <p className="mb-2">Pour toute question concernant ces CGU, veuillez nous contacter :</p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email :</strong> contact@welinkyou.com</p>
                <p><strong>Formulaire de contact :</strong> <a href="/contact" className="text-primary hover:text-primary-light">Cliquez ici</a></p>
              </div>
            </section>

            {/* Dernière mise à jour */}
            <div className="pt-8 border-t border-muted">
              <p className="text-sm text-foreground/60">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
