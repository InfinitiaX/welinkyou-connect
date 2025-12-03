import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Globe,
  Award,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { professionals } from "@/data/professionals";
import { categories } from "@/data/categories";

const ProfessionalDetail = () => {
  const { id } = useParams();
  const professional = professionals.find((p) => p.id === id);

  if (!professional) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">
              Professionnel non trouvé
            </h1>
            <Link to="/recherche">
              <Button>Retour à la recherche</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === professional.category);
  const subcategory = category?.subcategories.find(
    (s) => s.id === professional.subcategory
  );
  const cityDisplay =
    professional.city.charAt(0).toUpperCase() + professional.city.slice(1);
  const countryFlag = professional.country === "france" ? "🇫🇷" : "🇲🇦";
  const countryName = professional.country === "france" ? "France" : "Maroc";

  return (
    <div className="min-h-screen flex flex-col bg-background-soft">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/recherche"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux résultats
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Hero card */}
              <div className="card-premium p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={professional.photo}
                      alt={`${professional.firstName} ${professional.lastName}`}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-primary/20"
                    />
                    {professional.verified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute -bottom-2 -right-2"
                      >
                        <div className="badge-verified">
                          <CheckCircle className="w-4 h-4" />
                          Vérifié
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
                      {professional.firstName} {professional.lastName}
                    </h1>
                    <p className="text-primary text-lg font-medium mb-4">
                      {professional.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {cityDisplay}, {countryName} {countryFlag}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{professional.experience} ans d'expérience</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 fill-gold text-gold" />
                        <span className="font-semibold text-foreground text-lg">
                          {professional.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({professional.reviewCount} avis)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="card-premium p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  À propos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {professional.description}
                </p>
              </div>

              {/* Specialties */}
              <div className="card-premium p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Spécialités
                </h2>
                <div className="flex flex-wrap gap-2">
                  {professional.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="card-premium p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Langues parlées
                </h2>
                <div className="flex flex-wrap gap-2">
                  {professional.languages.map((language) => (
                    <span
                      key={language}
                      className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar - Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="card-premium p-6 sticky top-28">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Contacter {professional.firstName}
                </h3>

                <div className="space-y-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${professional.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      size="lg"
                      className="w-full btn-ripple gap-2 bg-[#25D366] hover:bg-[#20BD5A] border-0"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </Button>
                  </a>

                  {/* Phone */}
                  <a href={`tel:${professional.phone}`} className="block">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Appeler
                    </Button>
                  </a>

                  {/* Email */}
                  <a href={`mailto:${professional.email}`} className="block">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Email
                    </Button>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    📞 {professional.phone}
                    <br />
                    ✉️ {professional.email}
                  </p>
                </div>

                {/* Category badge */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                      Catégorie
                    </span>
                    <p className="font-medium text-foreground">
                      {category?.icon} {category?.name}
                    </p>
                    <p className="text-sm text-primary">{subcategory?.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfessionalDetail;
