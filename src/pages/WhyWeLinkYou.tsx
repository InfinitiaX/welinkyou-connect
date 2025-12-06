import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Sparkles,
  CheckCircle,
  ArrowRight,
  BadgeCheck,
  Heart,
  Globe,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const features = [
  {
    icon: BadgeCheck,
    title: "Profil vérifié",
    description: "Chaque professionnel référencé sur WeLinkYou a fait l'objet d'une vérification administrative rigoureuse (identité, diplômes, statut d'activité…).",
    detail: "Cette vérification garantit la transparence et renforce la confiance entre utilisateurs et professionnels.",
    gradient: "from-primary to-primary-light",
  },
  {
    icon: Heart,
    title: "Proximité & compréhension",
    description: "Nos professionnels comprennent vos besoins et les particularités de votre contexte (culture, langue, pratiques professionnelles).",
    detail: "Une relation basée sur la confiance et la compréhension mutuelle.",
    gradient: "from-accent to-gold",
  },
  {
    icon: Sparkles,
    title: "Une plateforme simple et utile",
    description: "Pas besoin de créer un compte pour consulter — WeLinkYou vous permet d'accéder librement à un annuaire de professionnels fiables, mis à jour régulièrement.",
    detail: "Pas de frais d'intermédiations.",
    gradient: "from-gold to-primary-light",
  },
];

const values = [
  { icon: Shield, text: "Rigueur et transparence" },
  { icon: Globe, text: "Sensibilité culturelle" },
  { icon: Users, text: "Professionnels engagés par charte" },
  { icon: CheckCircle, text: "Évaluation dans la durée" },
];

const WhyWeLinkYou = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full bg-gold/20 blur-xl"
          />
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 right-[15%] w-32 h-32 rounded-full bg-accent/20 blur-xl"
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  La plateforme de confiance
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
              >
                Pourquoi{" "}
                <span className="relative">
                  <span className="relative z-10 text-gold">WeLinkYou</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-2 left-0 h-3 bg-gold/30 -z-0"
                  />
                </span>
                {" "}?
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
              >
                WeLinkYou vise à être la plateforme de confiance entre la France et le Maroc, 
                en combinant <strong>rigueur</strong>, <strong>transparence</strong> et{" "}
                <strong>sensibilité culturelle</strong>. Chaque professionnel est vérifié, 
                engagé par charte, et évalué dans la durée.
              </motion.p>

              {/* Values badges */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-3 mt-10 mb-16"
              >
                {values.map((value, index) => (
                  <motion.div
                    key={value.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <value.icon className="w-4 h-4 text-gold" />
                    <span className="text-white/90 text-sm font-medium">{value.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full">
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-background"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Nos engagements
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Ce qui nous différencie
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeInUp}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="relative bg-card border border-border/50 rounded-3xl p-8 h-full shadow-soft hover:shadow-lg transition-all duration-500">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Number indicator */}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                        <span className="text-lg font-bold text-muted-foreground/50">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <p className="text-sm text-primary font-medium">
                        {feature.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Visual Section with Image */}
        <section className="py-24 bg-background-soft overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                      alt="Professionnels de confiance"
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  </div>

                  {/* Floating card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="absolute -bottom-8 -right-8 bg-card p-6 rounded-2xl shadow-xl border border-border/50 max-w-xs"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">100% Vérifié</div>
                        <div className="text-sm text-muted-foreground">Profils authentiques</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                    Notre approche
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                    Une vérification <span className="text-gradient-primary">rigoureuse</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Nous nous assurons que chaque professionnel répond à des critères stricts 
                    de qualité et de fiabilité. Notre processus de vérification couvre :
                  </p>

                  <div className="space-y-4">
                    {[
                      "Vérification de l'identité",
                      "Validation des diplômes et certifications",
                      "Contrôle du statut d'activité",
                      "Engagement par charte qualité",
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Prêt à trouver votre professionnel de confiance ?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Accédez librement à notre annuaire et trouvez l'expert qui comprend 
                vos besoins et votre contexte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/recherche">
                  <Button
                    size="lg"
                    className="btn-ripple gradient-primary border-0 gap-2 text-base px-8"
                  >
                    Parcourir l'annuaire
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/a-propos">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-base px-8"
                  >
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyWeLinkYou;
