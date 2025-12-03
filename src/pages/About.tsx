import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eye, Target, Users, ArrowRight, Sparkles, Globe, Heart, Lightbulb } from "lucide-react";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                Qui sommes-nous ?
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-6 leading-tight">
                Connecter les professionnels, <span className="text-gradient-primary">simplifier la confiance</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                WeLinkYou est la plateforme qui réunit professionnels de confiance et utilisateurs en quête d'expertise
                biculturelle France-Maroc.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <motion.div {...fadeInUp} className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Eye className="w-4 h-4" />
                  Notre vision
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8 leading-tight">
                  Un accès simplifié aux <span className="text-gradient-primary">professionnels de confiance</span>
                </h2>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Chez WeLinkYou, nous croyons qu'il ne devrait jamais être difficile de trouver un professionnel de
                    confiance — qu'il s'agisse d'un avocat, médecin, coach, expert ou tout autre spécialiste — qui,
                    au-delà de ses compétences métier, maîtrise également les spécificités liées au Maroc, qu'elles
                    soient professionnelles, linguistiques ou culturelles.
                  </p>
                  <p>
                    De nombreux professionnels, au Maroc, en France ou ailleurs, possèdent cette double compréhension
                    précieuse, mais restent disséminés et peu visibles, alors même que les besoins sont nombreux et
                    croissants.
                  </p>
                  <p>
                    Nous imaginons un monde où l'accès à ces professionnels de confiance devient simple, fluide et
                    centralisé, où chacun peut trouver, en un seul endroit, des experts capables de comprendre vos
                    projets, vos besoins et vos réalités, tout en maîtrisant les spécificités locales, linguistiques
                    et/ou culturelles.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-gold/5 border border-primary/10"
                >
                  <p className="text-foreground font-medium italic">
                    "Notre vision est de simplifier l'accès à ces professionnels de confiance et de les rendre plus
                    visibles pour ceux qui les recherchent, afin de bâtir une relation fondée sur la confiance et la
                    proximité."
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 relative"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=900&fit=crop"
                    alt="Collaboration professionnelle"
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                  />
                  <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl -z-10" />
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full -z-10" />

                  {/* Floating card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-6 -right-6 md:right-8 bg-card p-4 rounded-2xl shadow-xl border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">France × Maroc</p>
                        <p className="text-xs text-muted-foreground">Double expertise</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-background-soft relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <motion.div {...fadeInUp} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold-foreground text-sm font-medium mb-6 border border-gold/20">
                  <Target className="w-4 h-4 text-gold" />
                  <span className="text-foreground">Notre mission</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-6">
                  Une solution digitale <span className="text-gradient-gold">simple et fiable</span>
                </h2>

                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Notre mission est d'offrir une solution digitale simple et fiable, qui permet à chacun de trouver
                  facilement un professionnel de confiance maîtrisant les spécificités marocaines.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Lightbulb,
                    title: "Centraliser",
                    description:
                      "Nous rassemblons et centralisons des compétences déjà nombreuses mais souvent dispersées, pour les rendre accessibles à tous.",
                    gradient: "from-primary to-primary-light",
                  },
                  {
                    icon: Heart,
                    title: "Structurer",
                    description:
                      "Un cadre structuré, transparent et fondé sur la confiance pour faciliter les mises en relation de qualité.",
                    gradient: "from-gold to-gold-light",
                  },
                  {
                    icon: Sparkles,
                    title: "Rayonner",
                    description:
                      "Les utilisateurs gagnent en clarté et sérénité, tandis que les professionnels renforcent leur visibilité et leur rayonnement.",
                    gradient: "from-primary-light to-accent",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="group"
                  >
                    <div className="h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-display font-semibold text-foreground mb-4">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop"
                    alt="Membre de l'équipe"
                    className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5]"
                  />
                  <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                    alt="Membre de l'équipe"
                    className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5] mt-12"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-gold/20 to-gold/5 rounded-3xl -z-10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full -z-10" />
              </motion.div>

              <motion.div {...fadeInUp}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  Notre équipe
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8 leading-tight">
                  Une rencontre, <span className="text-gradient-primary">une vision commune</span>
                </h2>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    WeLinkYou est née d'une rencontre entre deux personnes partageant une double culture européenne et
                    marocaine, aux parcours complémentaires (droit et ingénierie).
                  </p>
                  <p>
                    Animés par la même conviction, nous avons voulu créer un pont entre des besoins croissants de mise
                    en relation et les nombreuses compétences déjà présentes en France, au Maroc et ailleurs.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-gold/5 border border-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">Notre ambition</p>
                      <p className="text-muted-foreground">
                        Simplifier les connexions de confiance et mettre en lumière les talents à double compétence,
                        qu'elle soit professionnelle, linguistique ou culturelle.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex flex-wrap gap-4"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary-foreground mb-6">
                Prêt à trouver votre professionnel de confiance ?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
                Rejoignez la communauté WeLinkYou et accédez à un réseau d'experts qui comprennent vraiment vos besoins.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/recherche"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Trouver un professionnel
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/espace-professionnel"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground/10 text-primary-foreground font-semibold border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-300"
                >
                  Je suis professionnel
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
