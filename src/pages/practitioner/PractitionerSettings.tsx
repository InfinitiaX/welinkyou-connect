import { useState } from "react";
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
  Save,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export const PractitionerSettings = () => {
  const { toast } = useToast();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordChange(false);

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été changé avec succès.",
    });
  };
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
        <Card className="border-0 shadow-sm opacity-50 pointer-events-none">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-gradient-end" />
              Notifications
            </CardTitle>
            <p className="text-sm text-muted-foreground">Gérez vos préférences de notifications (bientôt disponible)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Notifications email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevez des notifications par email
                </p>
              </div>
              <Switch disabled defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Nouvelles évaluations</Label>
                <p className="text-sm text-muted-foreground">
                  Soyez notifié des nouveaux avis
                </p>
              </div>
              <Switch disabled defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Rappels d'abonnement</Label>
                <p className="text-sm text-muted-foreground">
                  Rappels avant renouvellement
                </p>
              </div>
              <Switch disabled defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Actualités et conseils WeLinkYou
                </p>
              </div>
              <Switch disabled />
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
              <Button
                onClick={() => setShowPasswordChange(true)}
                variant="outline"
              >
                Mettre à jour le mot de passe
              </Button>
            </div>

            <Dialog open={showPasswordChange} onOpenChange={setShowPasswordChange}>
              <DialogContent className="bg-background">
                <DialogHeader>
                  <DialogTitle>Changer votre mot de passe</DialogTitle>
                  <DialogDescription>
                    Entrez votre mot de passe actuel et le nouveau mot de passe.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel *</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Entrez votre mot de passe actuel"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe *</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Entrez votre nouveau mot de passe"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum 8 caractères
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Confirmer le nouveau mot de passe *</Label>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      placeholder="Confirmez votre nouveau mot de passe"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleChangePassword}
                      className="flex-1 gradient-vibrant-horizontal border-0 hover:brightness-110"
                    >
                      Changer le mot de passe
                    </Button>
                    <Button
                      onClick={() => setShowPasswordChange(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            

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
