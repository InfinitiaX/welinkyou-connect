import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Award, 
  Eye, 
  EyeOff, 
  Edit, 
  MoreHorizontal,
  Star,
  Check,
  X,
  Filter
} from "lucide-react";
import { mockPractitioners, Practitioner } from "@/data/mockPractitioners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const AdminPractitioners = () => {
  const { toast } = useToast();
  const [practitioners, setPractitioners] = useState<Practitioner[]>(mockPractitioners);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingPractitioner, setEditingPractitioner] = useState<Practitioner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredPractitioners = practitioners.filter((p) => {
    const matchesSearch = 
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleCertification = (id: string) => {
    setPractitioners(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isCertified: !p.isCertified } : p
      )
    );
    const practitioner = practitioners.find(p => p.id === id);
    toast({
      title: practitioner?.isCertified ? "Badge retiré" : "Badge attribué",
      description: `Le badge certifié a été ${practitioner?.isCertified ? 'retiré de' : 'attribué à'} ${practitioner?.firstName} ${practitioner?.lastName}`,
    });
  };

  const toggleVisibility = (id: string) => {
    setPractitioners(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isVisible: !p.isVisible } : p
      )
    );
    const practitioner = practitioners.find(p => p.id === id);
    toast({
      title: practitioner?.isVisible ? "Profil masqué" : "Profil visible",
      description: `${practitioner?.firstName} ${practitioner?.lastName} est maintenant ${practitioner?.isVisible ? 'masqué' : 'visible'} sur /recherche`,
    });
  };

  const handleEdit = (practitioner: Practitioner) => {
    setEditingPractitioner({ ...practitioner });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingPractitioner) {
      setPractitioners(prev =>
        prev.map(p =>
          p.id === editingPractitioner.id ? editingPractitioner : p
        )
      );
      toast({
        title: "Profil mis à jour",
        description: `Les modifications de ${editingPractitioner.firstName} ${editingPractitioner.lastName} ont été enregistrées.`,
      });
      setIsEditDialogOpen(false);
      setEditingPractitioner(null);
    }
  };

  const changeStatus = (id: string, status: 'active' | 'pending' | 'suspended') => {
    setPractitioners(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status } : p
      )
    );
    toast({
      title: "Statut modifié",
      description: `Le statut a été changé en "${status}"`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Actif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-700">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Gestion des professionnels</h1>
        <p className="text-muted-foreground mt-1">Gérez les profils, badges et visibilité des professionnels</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, spécialité ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="suspended">Suspendus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Practitioners Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gradient-end" />
              Professionnels ({filteredPractitioners.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Professionnel</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead className="text-center">Vues</TableHead>
                  <TableHead className="text-center">Clics</TableHead>
                  <TableHead className="text-center">Note</TableHead>
                  <TableHead className="text-center">Badge</TableHead>
                  <TableHead className="text-center">Visible</TableHead>
                  <TableHead className="text-center">Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPractitioners.map((practitioner) => (
                  <TableRow key={practitioner.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-vibrant flex items-center justify-center text-white font-medium text-sm">
                          {practitioner.firstName[0]}{practitioner.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-primary">{practitioner.firstName} {practitioner.lastName}</p>
                          <p className="text-xs text-muted-foreground">{practitioner.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{practitioner.specialty}</TableCell>
                    <TableCell className="text-center font-medium">{practitioner.profileViews.toLocaleString()}</TableCell>
                    <TableCell className="text-center font-medium">{practitioner.profileClicks}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gradient-end">
                        <Star className="w-4 h-4 fill-current" />
                        {practitioner.rating}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={practitioner.isCertified ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCertification(practitioner.id)}
                        className={practitioner.isCertified ? "gradient-vibrant border-0" : ""}
                      >
                        <Award className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={practitioner.isVisible ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleVisibility(practitioner.id)}
                        className={practitioner.isVisible ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {practitioner.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(practitioner.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(practitioner)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleCertification(practitioner.id)}>
                            <Award className="w-4 h-4 mr-2" />
                            {practitioner.isCertified ? "Retirer le badge" : "Attribuer le badge"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleVisibility(practitioner.id)}>
                            {practitioner.isVisible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                            {practitioner.isVisible ? "Masquer" : "Afficher"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => changeStatus(practitioner.id, 'active')}>
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            Activer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeStatus(practitioner.id, 'suspended')}>
                            <X className="w-4 h-4 mr-2 text-red-500" />
                            Suspendre
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
            <DialogDescription>
              Modifiez les informations du professionnel
            </DialogDescription>
          </DialogHeader>
          {editingPractitioner && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={editingPractitioner.firstName}
                    onChange={(e) => setEditingPractitioner({ ...editingPractitioner, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={editingPractitioner.lastName}
                    onChange={(e) => setEditingPractitioner({ ...editingPractitioner, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingPractitioner.email}
                    onChange={(e) => setEditingPractitioner({ ...editingPractitioner, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={editingPractitioner.phone}
                    onChange={(e) => setEditingPractitioner({ ...editingPractitioner, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Spécialité</Label>
                <Input
                  id="specialty"
                  value={editingPractitioner.specialty}
                  onChange={(e) => setEditingPractitioner({ ...editingPractitioner, specialty: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingPractitioner.description}
                  onChange={(e) => setEditingPractitioner({ ...editingPractitioner, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Années d'expérience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={editingPractitioner.experience}
                    onChange={(e) => setEditingPractitioner({ ...editingPractitioner, experience: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={editingPractitioner.status}
                    onValueChange={(value: 'active' | 'pending' | 'suspended') => 
                      setEditingPractitioner({ ...editingPractitioner, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="suspended">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
