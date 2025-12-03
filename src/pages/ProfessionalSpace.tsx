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
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Users,
    title: "Clientèle qualifiée",
    description: "Accédez à une audience ciblée de la diaspora France-Maroc.",
  },
  {
    icon: Shield,
    title: "Badge vérifié",
    description: "Gagnez en crédibilité avec notre badge de vérification.",
  },
  {
    icon: TrendingUp,
    title: "Visibilité maximale",
    description: "Apparaissez en tête des résultats de recherche.",
  },
  {
    icon: Star,
    title: "Avis clients",
    description: "Collectez des témoignages pour renforcer votre réputation.",
  },
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
  const [activeTab, setActiveTab] = useState<"login" | "discover">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Tab navigation */}
        <div className="bg-background-soft border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex">
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
              <button
                onClick={() => setActiveTab("discover")}
                className={cn(
                  "px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "discover"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Découvrez WeLinkYou
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "login" ? (
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
                    <h1 className="text-3xl font-display font-semibold text-foreground mb-2">
                      Espace Professionnel
                    </h1>
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
          ) : (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-12"
            >
              <div className="container mx-auto px-4 lg:px-8">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-6"
                  >
                    Développez votre activité avec{" "}
                    <span className="text-gradient-primary">WeLinkYou Pro</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-muted-foreground mb-8"
                  >
                    Rejoignez le premier réseau de professionnels de confiance
                    pour la diaspora France-Maroc et accédez à une clientèle
                    qualifiée.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link to="/inscription-pro">
                      <Button
                        size="lg"
                        className="btn-ripple gradient-primary border-0 gap-2 text-lg px-8"
                      >
                        Rejoindre WeLinkYou
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="card-premium p-6 text-center"
                    >
                      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="card-premium p-8 text-center bg-gradient-to-br from-primary/5 to-gold/5">
                    <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
                      Offre Premium
                    </span>
                    <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                      Tarifs transparents
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-background rounded-xl border border-border">
                        <p className="text-muted-foreground mb-2">Mensuel</p>
                        <p className="text-4xl font-bold text-foreground mb-2">
                          450{" "}
                          <span className="text-lg font-normal text-muted-foreground">
                            DH/mois
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sans engagement
                        </p>
                      </div>
                      <div className="p-6 bg-primary/5 rounded-xl border-2 border-primary relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          -63%
                        </span>
                        <p className="text-muted-foreground mb-2">Annuel</p>
                        <p className="text-4xl font-bold text-foreground mb-2">
                          2000{" "}
                          <span className="text-lg font-normal text-muted-foreground">
                            DH/an
                          </span>
                        </p>
                        <p className="text-sm text-primary font-medium">
                          Économisez 3400 DH
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-6">
                      Paiement unique, pas de frais cachés. Annulation possible
                      à tout moment.
                    </p>
                  </div>
                </motion.div>
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
