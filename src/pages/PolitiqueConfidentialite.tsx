import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const PolitiqueConfidentialite = () => {
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
          <h1 className="text-4xl font-bold mb-8 text-foreground">Politique de Confidentialité</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p>
                WeLinkYou s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles conformément à la Loi Informatique et Libertés et au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            {/* Données collectées */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Données Que Nous Collectons</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground/90 mb-2">Informations Fournies par l'Utilisateur</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nom, prénom, adresse e-mail</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse postale</li>
                    <li>Informations de profil (bio, photo, compétences)</li>
                    <li>Informations de paiement (si applicable)</li>
                    <li>Messages et commentaires publiés</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground/90 mb-2">Données Collectées Automatiquement</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresse IP</li>
                    <li>Type de navigateur et système d'exploitation</li>
                    <li>Historique de navigation et pages visitées</li>
                    <li>Temps d'accès et durée de visite</li>
                    <li>Données de localisation (si autorisées)</li>
                    <li>Identifiants de cookies et traceurs similaires</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground/90 mb-2">Données en Provenance de Tiers</h3>
                  <p>
                    Nous pouvons recevoir des informations personnelles de la part de partenaires, prestataires de services ou sources publiques dans le but d'améliorer nos services.
                  </p>
                </div>
              </div>
            </section>

            {/* Utilisation des données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Utilisation de Vos Données</h2>
              <p className="mb-4">Nous utilisons vos données personnelles pour :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Créer et gérer votre compte utilisateur</li>
                <li>Fournir et améliorer nos services</li>
                <li>Vous envoyer des notifications et mises à jour</li>
                <li>Répondre à vos demandes et questions</li>
                <li>Personnaliser votre expérience</li>
                <li>Effectuer des analyses statistiques et du marketing</li>
                <li>Détecter et prévenir la fraude</li>
                <li>Respecter nos obligations légales</li>
                <li>Assurer la sécurité du site et des utilisateurs</li>
              </ul>
            </section>

            {/* Base légale */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Base Légale du Traitement</h2>
              <p className="mb-4">Nous traitons vos données personnelles sur les bases légales suivantes :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Consentement :</strong> Vous avez donné votre consentement explicite</li>
                <li><strong>Contrat :</strong> Le traitement est nécessaire pour exécuter notre contrat avec vous</li>
                <li><strong>Obligation légale :</strong> Le traitement est requis par la loi</li>
                <li><strong>Intérêt légitime :</strong> Le traitement est nécessaire pour nos intérêts légitimes</li>
              </ul>
            </section>

            {/* Partage des données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Partage de Vos Données</h2>
              <p className="mb-4">
                Nous ne vendons pas vos données personnelles. Cependant, nous pouvons les partager avec :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Prestataires de services :</strong> Hébergeurs, processeurs de paiement, services d'analytique</li>
                <li><strong>Partenaires commerciaux :</strong> Uniquement avec votre consentement</li>
                <li><strong>Autorités légales :</strong> Si requis par la loi</li>
                <li><strong>Autres utilisateurs :</strong> Les informations de votre profil public peuvent être visibles par d'autres utilisateurs</li>
              </ul>
            </section>

            {/* Sécurité des données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Sécurité de Vos Données</h2>
              <p className="mb-4">
                WeLinkYou implémente des mesures de sécurité techniques et organisationnelles pour protéger vos données :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Chiffrement SSL/TLS pour les transmissions</li>
                <li>Mots de passe hachés et salés</li>
                <li>Contrôles d'accès et authentification</li>
                <li>Pare-feu et systèmes de détection d'intrusions</li>
                <li>Audits de sécurité réguliers</li>
              </ul>
              <p className="mt-4">
                Cependant, aucune transmission sur Internet n'est complètement sécurisée. WeLinkYou n'offre pas de garantie absolue de sécurité.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies et Traceurs</h2>
              <p className="mb-4">
                WeLinkYou utilise des cookies et traceurs similaires pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cookies essentiels :</strong> Fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> Analyse du trafic (Google Analytics)</li>
                <li><strong>Cookies publicitaires :</strong> Ciblage publicitaire</li>
                <li><strong>Cookies de préférences :</strong> Mémorisation de vos choix</li>
              </ul>
              <p className="mt-4">
                Vous pouvez refuser ou supprimer les cookies via les paramètres de votre navigateur.
              </p>
            </section>

            {/* Durée de rétention */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Durée de Conservation des Données</h2>
              <p className="mb-4">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fournir nos services</li>
                <li>Respecter nos obligations légales</li>
                <li>Résoudre les litiges</li>
              </ul>
              <p className="mt-4">
                Une fois que vos données ne sont plus nécessaires, nous les supprimons ou les rendons anonymes, sauf si la loi exige leur conservation.
              </p>
            </section>

            {/* Droits des utilisateurs */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Vos Droits</h2>
              <p className="mb-4">
                Conformément au RGPD et à la Loi Informatique et Libertés, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données (Droit à l'oubli)</li>
                <li><strong>Droit à la limitation du traitement :</strong> Limiter l'utilisation de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                <li><strong>Droits relatifs aux décisions automatisées :</strong> Contester le profilage</li>
              </ul>
            </section>

            {/* Exercer vos droits */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Comment Exercer Vos Droits</h2>
              <p className="mb-4">
                Pour exercer vos droits, veuillez nous contacter par e-mail à :
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email :</strong> contact@welinkyou.co</p>
                <p className="mb-2"><strong>Objet :</strong> Demande d'exercice des droits RGPD</p>
                <p>
                  Nous traiterons votre demande dans un délai de 30 jours.
                </p>
              </div>
            </section>

            {/* Données internacionales */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Transfert de Données Internationales</h2>
              <p className="mb-4">
                Vos données peuvent être transférées vers des pays en dehors de l'UE. Nous assurons que ces transferts sont protégés par des mécanismes appropriés conformes au RGPD (clauses contractuelles types, décisions d'adéquation, etc.).
              </p>
            </section>

            {/* COPPA et mineurs */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Protection des Mineurs</h2>
              <p className="mb-4">
                WeLinkYou ne collecte pas sciemment de données personnelles auprès d'enfants de moins de 13 ans.
              </p>
              <p>
                Si nous découvrons que nous avons collecté des données d'un mineur sans consentement parental, nous supprimerons immédiatement ces données. Si vous êtes parent et que vous découvrez que votre enfant a fourni des informations personnelles, veuillez nous contacter.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Modifications de Cette Politique</h2>
              <p className="mb-4">
                WeLinkYou peut modifier cette politique de confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.
              </p>
              <p>
                Nous vous notifierons des changements significatifs par e-mail ou via une notification sur le site.
              </p>
            </section>

            {/* Délégué protection données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Délégué à la Protection des Données</h2>
              <p className="mb-4">
                Si vous avez des questions concernant notre traitement de vos données personnelles, vous pouvez contacter notre Délégué à la Protection des Données :
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email :</strong> dpo@welinkyou.co</p>
                <p className="mb-2"><strong>Adresse :</strong> [Adresse du siège social]</p>
                <p>
                  Vous pouvez également contacter la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Nous Contacter</h2>
              <p className="mb-2">Pour toute question concernant cette politique ou vos données, veuillez nous contacter :</p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email :</strong> contact@welinkyou.co</p>
                <p className="mb-2"><strong>Téléphone :</strong> [Numéro de téléphone]</p>
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
