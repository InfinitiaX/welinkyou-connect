import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const MentionsLegales = () => {
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
          <h1 className="text-4xl font-bold mb-8 text-foreground">Mentions Légales</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
            {/* Editeur */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Éditeur du site</h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Nom de l'entreprise :</strong> WeLinkYou</p>
                <p className="mb-2"><strong>Forme juridique :</strong> SARL/SAS/EIRL</p>
                <p className="mb-2"><strong>Siège social :</strong> [Adresse complète]</p>
                <p className="mb-2"><strong>Email :</strong> contact@welinkyou.com</p>
                <p className="mb-2"><strong>Téléphone :</strong> [Numéro de téléphone]</p>
                <p className="mb-2"><strong>SIRET :</strong> [Numéro SIRET]</p>
                <p><strong>Directeur de la publication :</strong> [Nom du directeur]</p>
              </div>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Hébergement</h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Hébergeur :</strong> [Nom de l'hébergeur]</p>
                <p className="mb-2"><strong>Adresse :</strong> [Adresse de l'hébergeur]</p>
                <p><strong>Pays :</strong> [Pays de l'hébergeur]</p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Propriété Intellectuelle</h2>
              <p className="mb-4">
                L'ensemble des contenus de ce site (textes, images, logos, éléments graphiques, etc.) est protégé par les droits d'auteur et les droits voisins. Toute reproduction, modification ou utilisation sans autorisation préalable est interdite.
              </p>
              <p>
                Les marques, logos et noms commerciaux présents sur ce site sont la propriété exclusive de WeLinkYou ou de tiers ayant autorisé leur utilisation.
              </p>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation de Responsabilité</h2>
              <p className="mb-4">
                WeLinkYou ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site, notamment les pertes de données, interruptions de service ou erreurs.
              </p>
              <p className="mb-4">
                Le site est fourni "en l'état" et WeLinkYou ne garantit pas l'absence d'erreurs ou d'interruptions.
              </p>
              <p>
                L'utilisateur est responsable de l'utilisation qu'il fait du site et des contenus qu'il y publie.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
              <p className="mb-4">
                Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. L'utilisateur peut refuser les cookies via les paramètres de son navigateur.
              </p>
              <p>
                Pour plus d'informations, veuillez consulter notre Politique de Confidentialité.
              </p>
            </section>

            {/* Données personnelles */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Données Personnelles</h2>
              <p className="mb-4">
                Les données personnelles collectées sont traitées conformément à la Loi Informatique et Libertés et au RGPD. Pour plus d'informations, veuillez consulter notre Politique de Confidentialité.
              </p>
              <p>
                L'utilisateur dispose de droits d'accès, de modification et de suppression de ses données personnelles.
              </p>
            </section>

            {/* Modification des CGU */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications</h2>
              <p>
                WeLinkYou se réserve le droit de modifier ces mentions légales à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
              <p className="mb-2">Pour toute question, veuillez nous contacter à :</p>
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
