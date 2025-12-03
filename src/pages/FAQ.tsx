import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const faqs = [
  {
    category: "Général",
    questions: [
      {
        question: "Qu'est-ce que WeLinkYou ?",
        answer:
          "WeLinkYou est une plateforme de mise en relation entre la diaspora franco-marocaine et des professionnels de confiance (avocats, médecins, experts-comptables, etc.). Tous nos experts sont rigoureusement vérifiés pour garantir un service de qualité.",
      },
      {
        question: "WeLinkYou est-il gratuit pour les utilisateurs ?",
        answer:
          "Oui, l'utilisation de WeLinkYou est entièrement gratuite pour les particuliers. Vous pouvez rechercher, consulter les profils et contacter les professionnels sans aucun frais.",
      },
      {
        question: "Comment sont vérifiés les professionnels ?",
        answer:
          "Chaque professionnel passe par un processus de vérification rigoureux : validation des diplômes, contrôle de l'inscription aux ordres professionnels (si applicable), vérification de l'expérience et analyse des premiers avis clients.",
      },
    ],
  },
  {
    category: "Recherche & Contact",
    questions: [
      {
        question: "Comment trouver un professionnel ?",
        answer:
          "Utilisez notre barre de recherche en sélectionnant le pays, la ville, le domaine d'expertise et la spécialité souhaitée. Vous pouvez ensuite consulter les profils détaillés et contacter directement les professionnels.",
      },
      {
        question: "Puis-je contacter un professionnel directement ?",
        answer:
          "Oui, vous pouvez contacter les professionnels via WhatsApp, téléphone ou email directement depuis leur profil. Toutes les coordonnées sont affichées de manière transparente.",
      },
      {
        question: "Les avis sont-ils vérifiés ?",
        answer:
          "Oui, nous modérons tous les avis pour garantir leur authenticité. Seuls les utilisateurs ayant effectivement consulté un professionnel peuvent laisser un avis.",
      },
    ],
  },
  {
    category: "Espace Professionnel",
    questions: [
      {
        question: "Comment devenir partenaire WeLinkYou ?",
        answer:
          "Rendez-vous sur notre Espace Professionnel et créez votre compte. Vous devrez fournir vos documents justificatifs (diplômes, attestations) qui seront vérifiés par notre équipe avant la publication de votre profil.",
      },
      {
        question: "Quels sont les tarifs pour les professionnels ?",
        answer:
          "L'abonnement professionnel est de 450 DH/mois ou 2000 DH/an (soit une économie de 63%). Ce tarif inclut la visibilité sur la plateforme, le badge vérifié et l'accès aux statistiques.",
      },
      {
        question: "Puis-je modifier mon profil à tout moment ?",
        answer:
          "Oui, vous pouvez modifier vos informations, photos et spécialités à tout moment depuis votre espace professionnel. Les modifications sont visibles immédiatement.",
      },
    ],
  },
  {
    category: "Confidentialité & Sécurité",
    questions: [
      {
        question: "Mes données sont-elles protégées ?",
        answer:
          "Absolument. Nous respectons le RGPD et ne partageons jamais vos données avec des tiers. Vos informations personnelles sont sécurisées et utilisées uniquement pour améliorer votre expérience sur la plateforme.",
      },
      {
        question: "Comment signaler un problème ?",
        answer:
          "Si vous rencontrez un problème avec un professionnel ou sur la plateforme, contactez notre support via la page Contact ou par email. Nous traitons chaque signalement avec la plus grande attention.",
      },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

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
                backgroundImage: `url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1920&q=80')`,
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

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-28 pb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <HelpCircle className="w-4 h-4" />
                  Centre d'aide
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
              >
                Questions{" "}
                <span className="relative">
                  <span className="relative z-10 text-gold">fréquentes</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-2 left-0 h-3 bg-gold/30 -z-0"
                  />
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-white/90 leading-relaxed mb-8"
              >
                Trouvez rapidement les réponses à vos questions
              </motion.p>

              {/* Search */}
              <motion.div variants={fadeInUp} className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-white/95 backdrop-blur-sm border-0 shadow-lg"
                />
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

        {/* FAQ List */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="mb-10"
                  >
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      {category.category}
                    </h2>
                    <div className="space-y-3">
                      {category.questions.map((item, index) => {
                        const itemId = `${category.category}-${index}`;
                        const isOpen = openItems.includes(itemId);

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="card-premium overflow-hidden"
                          >
                            <button
                              onClick={() => toggleItem(itemId)}
                              className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                            >
                              <span className="font-medium text-foreground pr-4">
                                {item.question}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
                                  isOpen && "rotate-180"
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-5 pb-5">
                                    <p className="text-muted-foreground leading-relaxed">
                                      {item.answer}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground">
                    Aucun résultat trouvé pour "{searchQuery}"
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background-soft">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Vous n'avez pas trouvé votre réponse ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Nous contacter
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
