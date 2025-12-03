import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        {/* Hero */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
                Questions fréquentes
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Trouvez rapidement les réponses à vos questions
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      {category.category}
                    </h2>
                    <div className="space-y-3">
                      {category.questions.map((item, index) => {
                        const itemId = `${category.category}-${index}`;
                        const isOpen = openItems.includes(itemId);

                        return (
                          <div
                            key={index}
                            className="card-premium overflow-hidden"
                          >
                            <button
                              onClick={() => toggleItem(itemId)}
                              className="w-full flex items-center justify-between p-5 text-left"
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
                          </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
