import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const features = [
  "Profil professionnel complet",
  "Badge vérifié après validation",
  "Visibilité dans les résultats de recherche",
  "Statistiques de votre profil",
  "Support dédié",
];

interface PricingSectionProps {
  showHeader?: boolean;
  className?: string;
}

export const PricingSection = ({ showHeader = true, className }: PricingSectionProps) => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <section className={cn("py-24 bg-background", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {showHeader && (
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full gradient-vibrant-soft text-white text-sm font-medium mb-4">
                Tarification
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Mon abonnement
              </h2>
              <p className="text-muted-foreground mt-3">
                Choisissez la formule qui vous convient.
              </p>
            </motion.div>
          )}

          {/* Billing Toggle */}
          <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-10">
            <Card
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "cursor-pointer transition-all border-2 p-6 min-w-[200px]",
                billingPeriod === "monthly"
                  ? "border-primary shadow-lg"
                  : "border-border hover:border-primary/30"
              )}
            >
              <p className="text-muted-foreground text-sm mb-2">Mensuel</p>
              <p className="text-3xl font-bold text-primary">
                450 <span className="text-lg font-normal text-muted-foreground">DH</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">par mois, sans engagement</p>
            </Card>

            <Card
              onClick={() => setBillingPeriod("annual")}
              className={cn(
                "cursor-pointer transition-all border-2 p-6 min-w-[200px] relative",
                billingPeriod === "annual"
                  ? "border-gradient-start shadow-lg ring-2 ring-gradient-start ring-offset-2"
                  : "border-border hover:border-gradient-start/30"
              )}
            >
              <Badge className="absolute -top-3 right-4 gradient-vibrant text-white">
                -63%
              </Badge>
              <p className="text-muted-foreground text-sm mb-2">Annuel</p>
              <p className="text-3xl font-bold text-primary">
                2000 <span className="text-lg font-normal text-muted-foreground">DH</span>
              </p>
              <p className="text-sm text-green-600 font-medium mt-1">Économisez 3400 DH</p>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeInUp}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="font-semibold text-foreground mb-6">Ce qui est inclus :</h3>
                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/inscription-pro" className="block mt-8">
                  <Button className="w-full gradient-vibrant-horizontal hover:brightness-110 hover:scale-[1.01] transition-all text-white gap-2 rounded-full">
                    Choisir cette formule
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
