import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, countries, cities } from "@/data/categories";
import { cn } from "@/lib/utils";

export const FilterBlock = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCountry) params.set("country", selectedCountry);
    if (selectedCity && selectedCity !== "all") params.set("city", selectedCity);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedSubcategory) params.set("subcategory", selectedSubcategory);
    
    navigate(`/recherche?${params.toString()}`);
  };

  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const availableCities = selectedCountry ? cities[selectedCountry] : [];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="glass-strong rounded-2xl p-4 md:p-6 shadow-xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Country */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "country" ? null : "country")}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border transition-all duration-200",
                openDropdown === "country"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-background"
              )}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className={cn("text-sm", selectedCountry ? "text-foreground" : "text-muted-foreground")}>
                  {selectedCountry
                    ? countries.find((c) => c.id === selectedCountry)?.name
                    : "Pays"}
                </span>
              </div>
              <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === "country" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "country" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                >
                  {countries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => {
                        setSelectedCountry(country.id);
                        setSelectedCity("");
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                        selectedCountry === country.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-sm font-medium">{country.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* City */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "city" ? null : "city")}
              disabled={!selectedCountry}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border transition-all duration-200",
                !selectedCountry && "opacity-50 cursor-not-allowed",
                openDropdown === "city"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-background"
              )}
            >
              <span className={cn("text-sm", selectedCity ? "text-foreground" : "text-muted-foreground")}>
                {selectedCity
                  ? availableCities.find((c) => c.id === selectedCity)?.name
                  : "Ville"}
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === "city" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "city" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                >
                  {availableCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city.id);
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-left text-sm transition-colors",
                        selectedCity === city.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted"
                      )}
                    >
                      {city.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border transition-all duration-200",
                openDropdown === "category"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-background"
              )}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className={cn("text-sm truncate", selectedCategory ? "text-foreground" : "text-muted-foreground")}>
                  {selectedCategory
                    ? categories.find((c) => c.id === selectedCategory)?.name
                    : "Domaine"}
                </span>
              </div>
              <ChevronDown className={cn("w-4 h-4 transition-transform flex-shrink-0", openDropdown === "category" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "category" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden max-h-80 overflow-y-auto"
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedSubcategory("");
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                        selectedCategory === category.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subcategory */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "subcategory" ? null : "subcategory")}
              disabled={!selectedCategory}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border transition-all duration-200",
                !selectedCategory && "opacity-50 cursor-not-allowed",
                openDropdown === "subcategory"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-background"
              )}
            >
              <span className={cn("text-sm truncate", selectedSubcategory ? "text-foreground" : "text-muted-foreground")}>
                {selectedSubcategory
                  ? currentCategory?.subcategories.find((s) => s.id === selectedSubcategory)?.name
                  : "Spécialité"}
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform flex-shrink-0", openDropdown === "subcategory" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "subcategory" && currentCategory && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                >
                  {currentCategory.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubcategory(sub.id);
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-left text-sm transition-colors",
                        selectedSubcategory === sub.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted"
                      )}
                    >
                      {sub.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            size="lg"
            className="btn-ripple gradient-primary border-0 h-[50px] text-base font-semibold gap-2"
          >
            <Search className="w-5 h-5" />
            Rechercher
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
