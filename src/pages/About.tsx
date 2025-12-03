import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Target, Users, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Confiance",
    description: "La confiance est au cœur de notre mission. Chaque professionnel est rigoureusement vérifié.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Nous sélectionnons uniquement les meilleurs experts dans chaque domaine.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Une équipe dédiée qui comprend les enjeux de la diaspora franco-marocaine.",
  },
  {
    icon: Globe,
    title: "Accessibilité",
    description: "Des services professionnels accessibles, où que vous soyez.",
  },
];

const team = [
  {
    name: "Amine Benjelloun",
    role: "Fondateur & CEO",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Salma El Khattabi",
    role: "Directrice des opérations",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Youssef Tazi",
    role: "Responsable technique",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
];

const About = () => {
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
                À propos de{" "}
                <span className="text-gradient-primary">WeLinkYou</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                WeLinkYou est née d'une conviction simple : la diaspora
                franco-marocaine mérite un accès facile à des professionnels de
                confiance qui comprennent ses besoins spécifiques.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-semibold text-foreground mb-6">
                  Notre histoire
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Tout a commencé par un constat personnel : trouver un avocat
                    spécialisé dans le droit franco-marocain, un expert-comptable
                    qui comprend les enjeux fiscaux des deux pays, ou un médecin
                    bilingue était un véritable parcours du combattant.
                  </p>
                  <p>
                    Après des mois de recherches et de bouche-à-oreille, nous
                    avons décidé de créer la plateforme que nous aurions aimé
                    avoir : WeLinkYou.
                  </p>
                  <p>
                    Aujourd'hui, nous sommes fiers de connecter des milliers de
                    personnes avec des professionnels de confiance, vérifiés et
                    recommandés par notre communauté.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Équipe WeLinkYou"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background-soft">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
                Nos valeurs
              </h2>
              <p className="text-muted-foreground">
                Les principes qui guident chacune de nos actions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
                Notre équipe
              </h2>
              <p className="text-muted-foreground">
                Des passionnés au service de la diaspora
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary/20"
                  />
                  <h3 className="font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
