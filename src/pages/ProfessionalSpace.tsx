import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  BadgeCheck,
  Zap,
  MessageCircle,
  FileCheck,
  Send,
  UserCheck,
  Megaphone,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

const benefits = [
  {
    icon: Megaphone,
    title: "Gagnez en visibilité auprès d'une audience ciblée",
    description: "Votre profil est mis en avant auprès d'une audience ciblée, engagée et en recherche active de votre type d'expertise.",
    highlight: "Résultat : plus de demandes pertinentes, plus de clients qualifiés.",
    gradient: "from-primary to-primary-light",
  },
  {
    icon: BadgeCheck,
    title: "Valorisez votre profil avec le badge \"Profil vérifié\"",
    description: "Un signe distinctif qui valorise votre engagement et votre professionnalisme.",
    highlight: "Il rassure immédiatement les utilisateurs et augmente votre taux de contact.",
    gradient: "from-gold to-gold-light",
  },
  {
    icon: Users,
    title: "Intégrez un réseau de confiance",
    description: "Une communauté de professionnels authentifiés, reconnue pour sa transparence et son sérieux.",
    highlight: "Un environnement sécurisant qui renforce votre image et attire des clients confiants.",
    gradient: "from-accent to-primary",
  },
  {
    icon: MessageCircle,
    title: "Recevez des contacts directs, sans intermédiaire",
    description: "Zéro commission. Zéro plateforme entre vous et vos clients.",
    highlight: "100% de votre activité, 100% de vos revenus.",
    gradient: "from-primary-light to-accent",
  },
];

const steps = [
  { icon: Send, text: "Vous envoyez vos documents" },
  { icon: FileCheck, text: "Nous vérifions" },
  { icon: UserCheck, text: "Votre profil est publié et mis en avant" },
  { icon: Star, text: "Les clients vous contactent directement" },
];

const news = [
  {
    title: "Nouveau : Statistiques avancées",
    date: "3 Dec 2024",
    description: "Suivez en temps réel les vues et contacts de votre profil.",
  },
  {
    title: "Webinaire : Développer sa clientèle",
    date: "28 Nov 2024",
    description: "Inscrivez-vous à notre prochain webinaire gratuit.",
  },
];

const ProfessionalSpace = () => {
  const [activeTab, setActiveTab] = useState<"login" | "discover">("discover");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Similar to WhyWeLinkYou */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80')`,
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
                  <Zap className="w-4 h-4" />
                  Espace Professionnel
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
              >
                Vous êtes{" "}
                <span className="relative">
                  <span className="relative z-10 text-gold">professionnel</span>
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
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10"
              >
                Rejoignez WeLinkYou et faites décoller votre activité auprès d'une clientèle 
                vraiment intéressée par votre <strong>expertise</strong> et votre{" "}
                <strong>compréhension du contexte marocain</strong>.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/inscription-pro">
                  <Button
                    size="lg"
                    className="bg-gold hover:bg-gold-light text-primary-foreground gap-2 text-base px-8 shadow-lg"
                  >
                    Rejoindre WeLinkYou
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveTab("login")}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2 text-base px-8"
                >
                  Se connecter
                </Button>
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

        {/* Tab navigation */}
        <div className="bg-background border-b border-border sticky top-16 z-40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex">
              <button
                onClick={() => setActiveTab("discover")}
                className={cn(
                  "px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "discover"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Pourquoi rejoindre WeLinkYou ?
              </button>
              <button
                onClick={() => setActiveTab("login")}
                className={cn(
                  "px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "login"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Identification
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "discover" ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Benefits Section */}
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
                        Vos avantages
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                        Pourquoi rejoindre{" "}
                        <span className="text-gradient-primary">WeLinkYou</span> ?
                      </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit.title}
                          variants={fadeInUp}
                          whileHover={{ y: -8, transition: { duration: 0.3 } }}
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                          <div className="relative bg-card border border-border/50 rounded-3xl p-8 h-full shadow-soft hover:shadow-lg transition-all duration-500">
                            <div className="flex items-start gap-6">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                              >
                                <benefit.icon className="w-8 h-8 text-white" />
                              </motion.div>
                              <div className="flex-1">
                                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                                  {benefit.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                  {benefit.description}
                                </p>
                                <p className="text-sm text-primary font-medium">
                                  {benefit.highlight}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* How it works Section */}
              <section className="py-24 bg-background-soft">
                <div className="container mx-auto px-4 lg:px-8">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto"
                  >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
                        Simple et rapide
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                        Comment ça marche ?
                      </h2>
                    </motion.div>

                    <div className="relative">
                      {/* Connection line */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-gold to-accent hidden md:block" />

                      <div className="space-y-8">
                        {steps.map((step, index) => (
                          <motion.div
                            key={step.text}
                            variants={fadeInUp}
                            className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                          >
                            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-soft inline-block">
                                <p className="text-foreground font-medium">{step.text}</p>
                              </div>
                            </div>
                            <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
                              <step.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 hidden md:block" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                  >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                      Envie d'attirer plus de clients ciblés ?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10">
                      Rejoignez WeLinkYou dès maintenant et développez votre activité 
                      auprès d'une clientèle qualifiée.
                    </p>
                    <Link to="/inscription-pro">
                      <Button
                        size="lg"
                        className="btn-ripple gradient-primary border-0 gap-2 text-base px-8"
                      >
                        Créer mon profil professionnel
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Login form */}
                  <div className="max-w-md">
                    <h2 className="text-3xl font-display font-semibold text-foreground mb-2">
                      Connexion
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Connectez-vous pour accéder à votre tableau de bord
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-muted-foreground">
                            Se souvenir de moi
                          </span>
                        </label>
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline"
                        >
                          Mot de passe oublié ?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full btn-ripple gradient-primary border-0"
                      >
                        Se connecter
                      </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-border">
                      <p className="text-center text-muted-foreground mb-4">
                        Pas encore inscrit ?
                      </p>
                      <Link to="/inscription-pro">
                        <Button variant="outline" className="w-full">
                          Créer un compte professionnel
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* News sidebar */}
                  <div className="hidden lg:block">
                    <div className="bg-background-soft rounded-2xl p-8">
                      <h2 className="text-xl font-semibold text-foreground mb-6">
                        Actualités WeLinkYou Pro
                      </h2>
                      <div className="space-y-6">
                        {news.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-l-2 border-primary pl-4"
                          >
                            <span className="text-xs text-muted-foreground">
                              {item.date}
                            </span>
                            <h3 className="font-medium text-foreground mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer links */}
              <div className="bg-background-soft border-t border-border py-6">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground transition-colors">
                      CGU Professionnels
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Charte de qualité
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Protection des données
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Support Pro
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default ProfessionalSpace;
