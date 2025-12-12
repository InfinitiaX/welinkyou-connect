import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, User, Plus, Trash2, Save, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AdminSettings = () => {
  const { toast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [openCreateAdmin, setOpenCreateAdmin] = useState(false);
  
  // Admin profile
  const [adminProfile, setAdminProfile] = useState({
    firstName: "Ahmed",
    lastName: "Benali",
    email: "admin@welinkyou.com",
    phone: "+33 6 12 34 56 78",
  });

  const [editedProfile, setEditedProfile] = useState(adminProfile);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Super admins list
  const [superAdmins, setSuperAdmins] = useState([
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Benali",
      email: "admin@welinkyou.com",
      status: "Actif",
      createdAt: "2025-01-01",
    },
    {
      id: 2,
      firstName: "Sophia",
      lastName: "Martin",
      email: "sophia@welinkyou.com",
      status: "Actif",
      createdAt: "2025-02-15",
    },
  ]);

  // New admin form
  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Notification settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    newRegistrationAlert: true,
    weeklyReport: false,
    autoApprove: false,
    maintenanceMode: false,
  });

  const handleSaveProfile = () => {
    setAdminProfile(editedProfile);
    setIsEditingProfile(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

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

  const handleCreateAdmin = () => {
    if (!newAdmin.firstName || !newAdmin.lastName || !newAdmin.email || !newAdmin.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    const newSuperAdmin = {
      id: superAdmins.length + 1,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      email: newAdmin.email,
      status: "Actif",
      createdAt: new Date().toISOString().split('T')[0],
    };

    setSuperAdmins([...superAdmins, newSuperAdmin]);
    setNewAdmin({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setOpenCreateAdmin(false);

    toast({
      title: "Super Admin créé",
      description: `${newAdmin.firstName} ${newAdmin.lastName} a été ajouté avec succès.`,
    });
  };

  const handleDeleteAdmin = (id: number) => {
    if (id === superAdmins[0].id) {
      toast({
        title: "Erreur",
        description: "Vous ne pouvez pas supprimer le super admin principal.",
        variant: "destructive",
      });
      return;
    }

    setSuperAdmins(superAdmins.filter((admin) => admin.id !== id));
    toast({
      title: "Super Admin supprimé",
      description: "Le super admin a été supprimé avec succès.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos modifications ont été sauvegardées avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Paramètres</h1>
        <p className="text-muted-foreground mt-1">Gérez votre profil et les super admins</p>
      </motion.div>

      <div className="grid gap-6">
        {/* My Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-gradient-end" />
                Mon Profil
              </CardTitle>
              <CardDescription>
                Modifiez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isEditingProfile ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Prénom</p>
                      <p className="font-semibold">{adminProfile.firstName}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Nom</p>
                      <p className="font-semibold">{adminProfile.lastName}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{adminProfile.email}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-semibold">{adminProfile.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      className="gradient-vibrant-horizontal border-0 hover:brightness-110"
                    >
                      Modifier mon profil
                    </Button>
                    <Button
                      onClick={() => setShowPasswordChange(true)}
                      variant="outline"
                    >
                      Changer mon mot de passe
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={editedProfile.firstName}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={editedProfile.lastName}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      className="gradient-vibrant-horizontal border-0 hover:brightness-110"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingProfile(false);
                        setEditedProfile(adminProfile);
                      }}
                      variant="outline"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Super Admins Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gradient-end" />
                  Gestion des Super Admins
                </CardTitle>
                <CardDescription>
                  Gérez les comptes super administrateur
                </CardDescription>
              </div>
              <Dialog open={openCreateAdmin} onOpenChange={setOpenCreateAdmin}>
                <DialogTrigger asChild>
                  <Button className="gradient-vibrant-horizontal border-0 hover:brightness-110">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer Super Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-background">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau Super Admin</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations pour créer un nouveau compte super administrateur.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newFirstName">Prénom *</Label>
                      <Input
                        id="newFirstName"
                        placeholder="Prénom"
                        value={newAdmin.firstName}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newLastName">Nom *</Label>
                      <Input
                        id="newLastName"
                        placeholder="Nom"
                        value={newAdmin.lastName}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">Email *</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        placeholder="email@example.com"
                        value={newAdmin.email}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mot de passe *</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Mot de passe"
                        value={newAdmin.password}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={newAdmin.confirmPassword}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleCreateAdmin}
                        className="flex-1 gradient-vibrant-horizontal border-0 hover:brightness-110"
                      >
                        Créer
                      </Button>
                      <Button
                        onClick={() => setOpenCreateAdmin(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {superAdmins.map((admin, index) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">
                        {admin.firstName} {admin.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Status: {admin.status}</span>
                        <span>Créé le: {admin.createdAt}</span>
                        {index === 0 && (
                          <span className="text-primary font-semibold">(Admin Principal)</span>
                        )}
                      </div>
                    </div>
                    {index !== 0 && (
                      <Button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Change Password Dialog */}
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

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="opacity-50 pointer-events-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gradient-end" />
                Notifications
              </CardTitle>
              <CardDescription>
                Gérez vos préférences de notifications (bientôt disponible)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les alertes par email</p>
                </div>
                <Switch
                  disabled
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alertes nouvelles inscriptions</Label>
                  <p className="text-sm text-muted-foreground">Être notifié des nouvelles demandes</p>
                </div>
                <Switch
                  disabled
                  checked={settings.newRegistrationAlert}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, newRegistrationAlert: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rapport hebdomadaire</Label>
                  <p className="text-sm text-muted-foreground">Recevoir un résumé chaque semaine</p>
                </div>
                <Switch
                  disabled
                  checked={settings.weeklyReport}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, weeklyReport: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Settings Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={handleSaveSettings}
            className="w-full md:w-auto gradient-vibrant-horizontal border-0 hover:brightness-110"
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer les modifications
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
