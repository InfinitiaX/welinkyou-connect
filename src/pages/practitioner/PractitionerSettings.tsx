import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  Shield,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const PractitionerSettings = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos préférences et paramètres de compte
        </p>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-gradient-end" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Notifications email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevez des notifications par email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Nouvelles évaluations</Label>
                <p className="text-sm text-muted-foreground">
                  Soyez notifié des nouveaux avis
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Rappels d'abonnement</Label>
                <p className="text-sm text-muted-foreground">
                  Rappels avant renouvellement
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Actualités et conseils WeLinkYou
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-gradient-end" />
              Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Changer le mot de passe</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-sm text-muted-foreground">
                    Mot de passe actuel
                  </Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm text-muted-foreground">
                    Nouveau mot de passe
                  </Label>
                  <Input id="new-password" type="password" />
                </div>
              </div>
              <Button variant="outline">Mettre à jour le mot de passe</Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Authentification à deux facteurs</Label>
                <p className="text-sm text-muted-foreground">
                  Ajoutez une couche de sécurité supplémentaire
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-gradient-end" />
              Préférences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fuseau horaire</Label>
                <Select defaultValue="paris">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Europe/Paris (UTC+1)</SelectItem>
                    <SelectItem value="casablanca">Africa/Casablanca (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5 flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="text-base">Mode sombre</Label>
                  <p className="text-sm text-muted-foreground">
                    Interface en thème sombre
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm border-red-200">
          <CardHeader>
            <CardTitle className="text-lg text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Zone dangereuse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
              <div>
                <p className="font-medium text-red-800">Supprimer le compte</p>
                <p className="text-sm text-red-600">
                  Cette action est irréversible et supprimera toutes vos données
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
