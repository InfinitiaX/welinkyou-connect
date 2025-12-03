import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Clock,
  Globe,
  Award,
  Heart,
  Headphones,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Professionnels vérifiés",
    description:
      "Chaque expert passe par notre processus rigoureux de vérification : diplômes, certifications, expérience et avis clients.",
    color: "from-primary to-primary-light",
  },
  {
    icon: Globe,
    title: "Expertise biculturelle",
    description:
      "Nos professionnels comprennent les spécificités juridiques, fiscales et culturelles France-Maroc.",
    color: "from-primary-light to-accent",
  },
  {
    icon: Clock,
    title: "Gain de temps",
    description:
      "Plus besoin de chercher pendant des heures. Trouvez le bon expert en quelques clics grâce à nos filtres intelligents.",
    color: "from-accent to-primary",
  },
  {
    icon: Award,
    title: "Avis transparents",
    description:
      "Consultez les avis vérifiés d'autres utilisateurs pour faire votre choix en toute confiance.",
    color: "from-gold to-gold-light",
  },
  {
    icon: Headphones,
    title: "Support dédié",
    description:
      "Notre équipe est disponible pour vous accompagner et répondre à toutes vos questions.",
    color: "from-primary to-gold",
  },
  {
    icon: Heart,
    title: "Communauté de confiance",
    description:
      "Rejoignez des milliers de membres satisfaits qui font confiance à WeLinkYou.",
    color: "from-gold-light to-primary-light",
  },
];

const stats = [
  { value: "500+", label: "Professionnels" },
  { value: "10 000+", label: "Mises en relation" },
  { value: "4.8/5", label: "Note moyenne" },
  { value: "98%", label: "Satisfaction" },
];

const WhyWeLinkYou = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
                Pourquoi choisir{" "}
                <span className="text-gradient-primary">WeLinkYou</span> ?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Découvrez ce qui fait de WeLinkYou la plateforme de référence
                pour la diaspora franco-marocaine.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/80 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reasons */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-premium p-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <reason.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-20 bg-background-soft">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
                  Notre engagement
                </h2>
                <p className="text-muted-foreground">
                  Ce que nous vous garantissons
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Vérification des diplômes et certifications",
                  "Contrôle des inscriptions aux ordres professionnels",
                  "Validation des années d'expérience déclarées",
                  "Modération des avis clients",
                  "Support réactif 7j/7",
                  "Protection de vos données personnelles",
                  "Pas de frais cachés",
                  "Satisfaction garantie",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-background rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-display font-semibold text-foreground mb-6">
                Prêt à trouver votre expert ?
              </h2>
              <p className="text-muted-foreground mb-8">
                Lancez votre recherche maintenant et trouvez le professionnel
                idéal en quelques minutes.
              </p>
              <Link to="/recherche">
                <Button
                  size="lg"
                  className="btn-ripple gradient-primary border-0 gap-2"
                >
                  Commencer ma recherche
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyWeLinkYou;
