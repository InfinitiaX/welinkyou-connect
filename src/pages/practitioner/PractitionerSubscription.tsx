import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  Crown,
  Zap,
  Star,
  Calendar,
  Receipt,
  Download,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "Gratuit",
    description: "Pour découvrir la plateforme",
    features: [
      "Profil basique",
      "5 contacts/mois",
      "Support email",
    ],
    notIncluded: [
      "Badge vérifié",
      "Mise en avant",
      "Statistiques avancées",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 29,
    period: "/mois",
    description: "Le plus populaire",
    popular: true,
    features: [
      "Profil complet",
      "Contacts illimités",
      "Badge vérifié",
      "Mise en avant",
      "Statistiques avancées",
      "Support prioritaire",
    ],
    notIncluded: [],
  },
  {
    id: "business",
    name: "Business",
    price: 79,
    period: "/mois",
    description: "Pour les cabinets",
    features: [
      "Tout Premium inclus",
      "Multi-praticiens (5)",
      "Analytics équipe",
      "API access",
      "Account manager dédié",
      "Formation incluse",
    ],
    notIncluded: [],
  },
];

const invoices = [
  { id: "INV-001", date: "01/12/2024", amount: "29,00 €", status: "Payée" },
  { id: "INV-002", date: "01/11/2024", amount: "29,00 €", status: "Payée" },
  { id: "INV-003", date: "01/10/2024", amount: "29,00 €", status: "Payée" },
  { id: "INV-004", date: "01/09/2024", amount: "29,00 €", status: "Payée" },
];

export const PractitionerSubscription = () => {
  const [currentPlan] = useState("premium");

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon Abonnement</h1>
        <p className="text-muted-foreground mt-1">
          Gérez votre abonnement et consultez vos factures
        </p>
      </motion.div>

      {/* Current Plan Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">Plan Premium</h2>
                    <Badge className="bg-gold text-primary">Actif</Badge>
                  </div>
                  <p className="text-white/70">Renouvelé le 1er janvier 2025</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">29€<span className="text-lg font-normal text-white/70">/mois</span></p>
                <p className="text-white/60 text-sm">Facturé mensuellement</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Profil vérifié</p>
                  <p className="text-sm text-muted-foreground">Badge actif</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium">Mise en avant</p>
                  <p className="text-sm text-muted-foreground">Priorité recherche</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">28 jours restants</p>
                  <p className="text-sm text-muted-foreground">Avant renouvellement</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Période d'utilisation</span>
                <span className="font-medium">3 jours / 31 jours</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Plans Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-primary mb-4">Changer de plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "border-2 transition-all hover:shadow-lg relative",
                plan.id === currentPlan
                  ? "border-gold shadow-gold/20"
                  : "border-gray-100 hover:border-gray-200",
                plan.popular && "ring-2 ring-gold ring-offset-2"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gold text-primary">
                    <Star className="w-3 h-3 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}€</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full",
                    plan.id === currentPlan
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : plan.popular
                      ? "bg-gold hover:bg-gold-light text-primary"
                      : ""
                  )}
                  variant={plan.id === currentPlan ? "outline" : "default"}
                  disabled={plan.id === currentPlan}
                >
                  {plan.id === currentPlan ? (
                    "Plan actuel"
                  ) : (
                    <>
                      Choisir ce plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="w-5 h-5 text-gold" />
                Historique des factures
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Tout télécharger
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Facture</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gold" />
              Moyen de paiement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expire le 12/26</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
