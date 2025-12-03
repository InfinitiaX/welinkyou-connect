import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid, List, SlidersHorizontal, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfessionalCard, ProfessionalCardSkeleton } from "@/components/ProfessionalCard";
import { professionals } from "@/data/professionals";
import { categories, countries, cities } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  const countryParam = searchParams.get("country");
  const cityParam = searchParams.get("city");
  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");

  // Filter professionals based on params
  const filteredProfessionals = professionals.filter((pro) => {
    if (countryParam && pro.country !== countryParam) return false;
    if (cityParam && cityParam !== "all" && pro.city !== cityParam) return false;
    if (categoryParam && pro.category !== categoryParam) return false;
    if (subcategoryParam && pro.subcategory !== subcategoryParam) return false;
    return true;
  });

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Get display labels
  const countryLabel = countryParam
    ? countries.find((c) => c.id === countryParam)?.name
    : null;
  const cityLabel = cityParam && cityParam !== "all"
    ? cities[countryParam || "france"]?.find((c) => c.id === cityParam)?.name
    : null;
  const categoryLabel = categoryParam
    ? categories.find((c) => c.id === categoryParam)?.name
    : null;
  const subcategoryLabel = subcategoryParam && categoryParam
    ? categories
        .find((c) => c.id === categoryParam)
        ?.subcategories.find((s) => s.id === subcategoryParam)?.name
    : null;

  const activeFilters = [
    countryLabel,
    cityLabel,
    categoryLabel,
    subcategoryLabel,
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background-soft">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              {filteredProfessionals.length} professionnel{filteredProfessionals.length > 1 ? "s" : ""} trouvé{filteredProfessionals.length > 1 ? "s" : ""}
            </h1>
            
            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between gap-4 mb-8 p-4 bg-card rounded-xl border border-border"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Affichage :
              </span>
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-3xl"
            )}
          >
            {isLoading ? (
              // Skeleton loading
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProfessionalCardSkeleton />
                </motion.div>
              ))
            ) : filteredProfessionals.length > 0 ? (
              // Results
              <AnimatePresence mode="wait">
                {filteredProfessionals.map((professional, index) => (
                  <ProfessionalCard
                    key={professional.id}
                    professional={professional}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            ) : (
              // No results
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-muted-foreground mb-6">
                  Essayez d'élargir vos critères de recherche
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/recherche"}
                >
                  Réinitialiser les filtres
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
