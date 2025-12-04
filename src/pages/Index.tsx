import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBlock } from "@/components/FilterBlock";
import { HowItWorks } from "@/components/HowItWorks";
import { BlogSection } from "@/components/BlogSection";
import { Shield, Users, Globe, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Professionnels vérifiés" },
  { icon: Shield, value: "100%", label: "Profils authentifiés" },
  { icon: Globe, value: "2", label: "Pays couverts" },
  { icon: Star, value: "4.8", label: "Note moyenne" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Background Video */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/7646285/7646285-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-4 leading-tight drop-shadow-lg"
            >
              Trouvez les <span className="text-gold-light">meilleurs experts</span>
              <br />
              de la diaspora France-Maroc
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-md"
            >
              Avocats, médecins, experts-comptables, coachs... Des professionnels vérifiés qui comprennent vos besoins
              biculturels.
            </motion.p>
          </div>

          {/* Filter Block */}
          <FilterBlock />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-white"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Trust Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
                  We Link You
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-6">
                  Des professionnels rigoureusement <span className="text-gradient-primary">sélectionnés</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Chaque professionnel sur WeLinkYou passe par un processus de vérification strict. Diplômes,
                  expérience, références... Nous nous assurons que vous êtes entre de bonnes mains.
                </p>
                <ul className="space-y-4">
                  {[
                    "Vérification des diplômes et certifications",
                    "Contrôle de l'inscription aux ordres professionnels",
                    "Validation des années d'expérience",
                    "Suivi des avis et de la satisfaction client",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop"
                    alt="Professionnels de confiance"
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl -z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* CTA Section */}
      <section className="py-24 gradient-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary-foreground mb-6">
              Vous êtes professionnel ?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Rejoignez notre réseau d'experts et connectez-vous avec une clientèle qualifiée de la diaspora
              France-Maroc.
            </p>
            <a
              href="/espace-professionnel"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-primary rounded-xl font-semibold hover:bg-background/90 transition-colors shadow-lg"
            >
              Rejoindre WeLinkYou
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
