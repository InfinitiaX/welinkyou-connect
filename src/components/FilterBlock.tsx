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
    <>
      {/* Overlay to close dropdown */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setOpenDropdown(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-5xl mx-auto relative z-50"
      >
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1.3fr_auto] gap-4">
          {/* Country */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "country" ? null : "country")}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300",
                openDropdown === "country"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className={cn("text-sm font-medium", selectedCountry ? "text-black" : "text-gray-500")}>
                  {selectedCountry
                    ? countries.find((c) => c.id === selectedCountry)?.name
                    : "Pays"}
                </span>
              </div>
              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", openDropdown === "country" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "country" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden"
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
                        "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
                        selectedCountry === country.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-50 text-black"
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
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300",
                !selectedCountry && "opacity-50 cursor-not-allowed",
                openDropdown === "city"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50 bg-white"
              )}
            >
              <span className={cn("text-sm font-medium whitespace-nowrap", selectedCity ? "text-black" : "text-gray-500")}>
                {selectedCity
                  ? availableCities.find((c) => c.id === selectedCity)?.name
                  : "Ville"}
              </span>
              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", openDropdown === "city" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "city" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                >
                  {availableCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city.id);
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full px-4 py-3.5 text-left text-sm font-medium transition-colors",
                        selectedCity === city.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-50 text-black"
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
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300",
                openDropdown === "category"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className={cn("text-sm font-medium truncate", selectedCategory ? "text-black" : "text-gray-500")}>
                  {selectedCategory
                    ? categories.find((c) => c.id === selectedCategory)?.name
                    : "Domaine"}
                </span>
              </div>
              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0", openDropdown === "category" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "category" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto"
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
                        "w-full px-4 py-3.5 text-left text-sm font-medium transition-colors",
                        selectedCategory === category.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-50 text-black"
                      )}
                    >
                      {category.name}
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
                "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300",
                !selectedCategory && "opacity-50 cursor-not-allowed",
                openDropdown === "subcategory"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50 bg-white"
              )}
            >
              <span className={cn("text-sm font-medium truncate", selectedSubcategory ? "text-black" : "text-gray-500")}>
                {selectedSubcategory
                  ? currentCategory?.subcategories.find((s) => s.id === selectedSubcategory)?.name
                  : "Spécialité"}
              </span>
              <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0", openDropdown === "subcategory" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openDropdown === "subcategory" && currentCategory && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                >
                  {currentCategory.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubcategory(sub.id);
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full px-4 py-3.5 text-left text-sm font-medium transition-colors",
                        selectedSubcategory === sub.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-50 text-black"
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
            className="btn-ripple gradient-primary border-0 h-[52px] text-base font-semibold gap-2 rounded-xl"
          >
            <Search className="w-5 h-5" />
            Rechercher
          </Button>
        </div>
      </div>
    </motion.div>
    </>
  );
};