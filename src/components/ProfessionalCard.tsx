import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Professional } from "@/data/professionals";
import { cn } from "@/lib/utils";

interface ProfessionalCardProps {
  professional: Professional;
  index?: number;
}

export const ProfessionalCard = ({ professional, index = 0 }: ProfessionalCardProps) => {
  const cityDisplay = professional.city.charAt(0).toUpperCase() + professional.city.slice(1);
  const countryFlag = professional.country === "france" ? "🇫🇷" : "🇲🇦";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="card-premium p-6 h-full flex flex-col min-h-[380px] transition-all duration-300 group-hover:shadow-[0_0_40px_-5px_hsl(160_84%_39%/0.4)] group-hover:border-emerald/60">
        {/* Header with photo and verified badge */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={professional.photo}
              alt={`${professional.firstName} ${professional.lastName}`}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-border group-hover:ring-emerald/50 transition-all duration-300"
            />
            {professional.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-1 -right-1"
              >
                <div className="badge-verified text-xs py-0.5 px-2">
                  <CheckCircle className="w-3 h-3" />
                  <span className="hidden sm:inline">Vérifié</span>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {professional.firstName} {professional.lastName}
            </h3>
            <p className="text-primary font-medium text-sm mb-1 line-clamp-1">
              {professional.title}
            </p>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{cityDisplay}</span>
              <span>{countryFlag}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
          {professional.description}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4 h-14">
          {professional.specialties.slice(0, 2).map((specialty) => (
            <span
              key={specialty}
              className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium h-fit"
            >
              {specialty}
            </span>
          ))}
          {professional.specialties.length > 2 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground h-fit">
              +{professional.specialties.length - 2}
            </span>
          )}
        </div>

        {/* Rating and Experience */}
        <div className="flex items-center justify-between mb-4 py-3 border-y border-border">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-emerald text-emerald" />
            <span className="font-semibold text-foreground">{professional.rating}</span>
            <span className="text-muted-foreground text-sm">
              ({professional.reviewCount} avis)
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {professional.experience} ans d'exp.
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/professionnel/${professional.id}`} className="flex-1">
            <Button variant="outline" className="w-full group-hover:border-emerald group-hover:text-emerald group-hover:bg-emerald/5 transition-all duration-300">
              Voir le profil
            </Button>
          </Link>
          <a
            href={`https://wa.me/${professional.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
          <Button size="icon" className="gradient-vibrant-horizontal border-0 btn-ripple hover:brightness-110">
            <MessageCircle className="w-4 h-4" />
          </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton version for loading state
export const ProfessionalCardSkeleton = () => {
  return (
    <div className="card-premium p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="skeleton w-20 h-20 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-3 w-1/3 rounded" />
        </div>
      </div>
      <div className="skeleton h-10 w-full rounded mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-24 rounded-full" />
      </div>
      <div className="flex justify-between py-3 border-y border-border mb-4">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-10 flex-1 rounded-lg" />
        <div className="skeleton h-10 w-10 rounded-lg" />
      </div>
    </div>
  );
};
