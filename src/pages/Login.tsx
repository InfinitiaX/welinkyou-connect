import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const Login = () => {
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

      <main className="flex-1 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          {/* Left side - Login form */}
          <div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-background">
            <div className="max-w-md w-full mx-auto lg:mx-0">
              {/* Back link */}
              <Link
                to="/espace-professionnel"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à l'espace professionnel
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Identifiez-vous
                </h1>
                <p className="text-muted-foreground mb-8">
                  Ou{" "}
                  <Link to="/inscription-pro" className="text-primary hover:underline font-medium">
                    créez votre compte gratuitement
                  </Link>
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Adresse e-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 text-base border-2 border-border focus:border-primary transition-colors rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 text-base pr-12 border-2 border-border focus:border-primary transition-colors rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-semibold uppercase tracking-wide btn-ripple gradient-primary border-0 rounded-xl"
                  >
                    Continuer
                  </Button>

                  <a
                    href="#"
                    className="block text-center text-sm text-primary hover:underline font-medium"
                  >
                    Un problème pour vous connecter ?
                  </a>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">ou</span>
                  </div>
                </div>

                <Link to="/inscription-pro">
                  <Button 
                    variant="outline" 
                    className="w-full h-14 text-base font-semibold border-2 hover:bg-primary/5 rounded-xl"
                  >
                    Créer un compte professionnel
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right side - Promotional content */}
          <div className="hidden lg:flex flex-col justify-between bg-primary text-white px-12 xl:px-20 py-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-dark/50 to-transparent" />
            
            <div className="relative z-10 max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl xl:text-4xl font-display font-bold mb-6 leading-tight">
                  Développez votre activité avec WeLinkYou
                </h2>
                <p className="text-lg text-white/90 mb-8 font-medium">
                  Découvrez les avantages de notre plateforme
                </p>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Visibilité auprès d'une clientèle ciblée</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Badge "Profil vérifié" pour rassurer vos clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Contact direct sans commission</span>
                  </li>
                </ul>

                <Link to="/inscription-pro">
                  <Button 
                    variant="outline" 
                    className="bg-accent/20 border-accent/40 text-white hover:bg-accent/30 gap-2 rounded-xl"
                  >
                    Rejoindre WeLinkYou
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* News Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 mt-12"
            >
              <h3 className="text-xl font-display font-semibold mb-4">
                Actualités WeLinkYou Pro
              </h3>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <p className="text-xs text-white/60 mb-1">{item.date}</p>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
