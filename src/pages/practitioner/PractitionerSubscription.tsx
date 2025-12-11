import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  Crown,
  Zap,
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

const features = [
  "Profil professionnel complet",
  "Badge vérifié après validation",
  "Visibilité dans les résultats de recherche",
  "Statistiques de votre profil",
  "Support dédié",
];

const invoices = [
  { id: "INV-001", date: "01/12/2024", amount: "450 DH", status: "Payée" },
  { id: "INV-002", date: "01/11/2024", amount: "450 DH", status: "Payée" },
  { id: "INV-003", date: "01/10/2024", amount: "450 DH", status: "Payée" },
  { id: "INV-004", date: "01/09/2024", amount: "450 DH", status: "Payée" },
];

export const PractitionerSubscription = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon Abonnement</h1>
        <p className="text-muted-foreground mt-1">
          Choisissez la formule qui vous convient.
        </p>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Card
          onClick={() => setBillingPeriod("monthly")}
          className={cn(
            "cursor-pointer transition-all border-2 p-6 flex-1",
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
            "cursor-pointer transition-all border-2 p-6 flex-1 relative",
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Ce qui est inclus :</h3>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
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
                <Receipt className="w-5 h-5 text-gradient-end" />
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
              <CreditCard className="w-5 h-5 text-gradient-end" />
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
