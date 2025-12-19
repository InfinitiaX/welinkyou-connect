import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Languages,
  Briefcase,
  FileText,
  Save,
  Eye,
  Camera,
  Plus,
  X,
  CheckCircle,
  File,
  Download,
  ExternalLink,
  Shield,
  Star,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { categories, countries, cities } from "@/data/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const specialties = [
  "Médecine générale",
  "Cardiologie",
  "Dermatologie",
  "Psychiatrie",
  "Avocat",
  "Notaire",
  "Expert-comptable",
  "Architecte",
];

const availableLanguages = [
  { id: "fr", name: "Français", flag: "🇫🇷" },
  { id: "ar", name: "Arabe", flag: "🇲🇦" },
  { id: "en", name: "Anglais", flag: "🇬🇧" },
  { id: "es", name: "Espagnol", flag: "🇪🇸" },
  { id: "ber", name: "Berbère", flag: "🪔" },
];

const experienceOptions = [
  { value: "1-3", label: "1-3 ans" },
  { value: "4-7", label: "4-7 ans" },
  { value: "8-12", label: "8-12 ans" },
  { value: "12+", label: "Plus de 12 ans" },
];

const regions = [
  "Paris",
  "Lyon",
  "Marseille",
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Fès",
];

const mockDocuments = [
  { id: 1, name: "Diplôme de médecine", type: "diploma", status: "validated", date: "2024-01-15" },
  { id: 2, name: "Pièce d'identité", type: "identity", status: "validated", date: "2024-01-15" },
  { id: 3, name: "Attestation d'exercice", type: "registration", status: "validated", date: "2024-01-15" },
  { id: 4, name: "Extrait KBIS / RC", type: "business", status: "pending", date: "2024-01-20" },
  { id: 5, name: "Attestation assurance RC Pro", type: "insurance", status: "validated", date: "2024-01-15" },
  { id: 6, name: "Charte WeLinkYou signée", type: "charter", status: "validated", date: "2024-01-15" },
];

export const PractitionerProfile = () => {

  const [formData, setFormData] = useState({
    // Personal
    firstName: "Jean",
    lastName: "Martin",
    email: "dr.martin@example.com",
    phone: "+33 6 12 34 56 78",
    whatsapp: "",
    country: "france",
    city: "paris",
    // Professional
    professionType: "regulated",
    category: "sante",
    subcategory: "medecin-generaliste",
    specialties: ["Cardiologie", "Médecine interne"] as string[],
    experienceRange: "8-12",
    languages: ["fr", "ar", "en"] as string[],
    description: "Médecin généraliste avec plus de 10 ans d'expérience, spécialisé dans l'accompagnement des patients franco-marocains...",
    professionalLink: "",
    photoPreview: "",
    documents: {} as Record<string, { name: string; status: string; date?: string }>,
  });

  const [newSpecialty, setNewSpecialty] = useState("");

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData({ ...formData, specialties: [...formData.specialties, newSpecialty.trim()] });
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (s: string) => {
    setFormData({ ...formData, specialties: formData.specialties.filter((sp) => sp !== s) });
  };

  const addLanguage = (langId: string) => {
    if (!formData.languages.includes(langId)) {
      setFormData({ ...formData, languages: [...formData.languages, langId] });
    }
  };

  const removeLanguage = (langId: string) => {
    setFormData({ ...formData, languages: formData.languages.filter((l) => l !== langId) });
  };

  const addRegion = (region: string) => {
    if (!formData.city) setFormData({ ...formData });
  };

  const removeRegion = (region: string) => {
    // placeholder — regions are managed via selects
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const availableCities = formData.country && Array.isArray(cities[formData.country]) ? cities[formData.country] : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon Profil</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos informations professionnelles
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2 gradient-vibrant-horizontal border-0 hover:brightness-110">
            <Save className="w-4 h-4" />
            Enregistrer
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border shadow-sm p-1 h-auto flex-wrap">
          <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <User className="w-4 h-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="specialty" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Briefcase className="w-4 h-4" />
            Spécialité
          </TabsTrigger>
          <TabsTrigger value="languages" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Languages className="w-4 h-4" />
            Langues & Zones
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <File className="w-4 h-4" />
            Mes Documents
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-gradient-start/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        DM
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-vibrant text-white hover:brightness-110"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium">Photo de profil</h3>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG ou GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom <span className="text-destructive">*</span></Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom <span className="text-destructive">*</span></Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel <span className="text-destructive">*</span></Label>
                    <Input id="email" name="email" type="email" value={formData.email} disabled className="bg-muted cursor-not-allowed" />
                    <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone <span className="text-destructive">*</span></Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="+212 6 12 34 56 78" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays <span className="text-destructive">*</span></Label>
                    <select id="country" name="country" value={formData.country} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground">
                      <option value="">Sélectionnez un pays</option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <select id="city" name="city" value={formData.city} onChange={handleInputChange} disabled={!formData.country} className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground disabled:opacity-50">
                      <option value="">Sélectionnez une ville</option>
                      {availableCities.map((c:any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professionalLink">Lien professionnel</Label>
                    <Input id="professionalLink" name="professionalLink" value={formData.professionalLink} onChange={handleInputChange} placeholder="https://..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Biographie</Label>
                  <Textarea id="description" name="description" rows={4} value={formData.description} onChange={handleInputChange} className="resize-none" />
                  <p className="text-xs text-muted-foreground">Cette description apparaîtra sur votre profil public</p>
                </div>

                {/* Professional Summary */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-gradient-end/5 border border-primary/10">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Résumé professionnel
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Domaine :</span>{" "}
                      <span className="font-medium text-foreground">
                        {categories.find(c => c.id === formData.category)?.name || "Non défini"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Spécialité :</span>{" "}
                      <span className="font-medium text-foreground">
                        {categories.find(c => c.id === formData.category)?.subcategories?.find((s:any) => s.id === formData.subcategory)?.name || "Non définie"}
                      </span>
                    </div>
                    {formData.specialties.length > 0 && (
                      <div className="md:col-span-2">
                        <span className="text-muted-foreground">Spécialités additionnelles :</span>{" "}
                        <span className="font-medium text-foreground">
                          {formData.specialties.join(", ")}
                        </span>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <span className="text-muted-foreground">Langues :</span>{" "}
                      <span className="font-medium text-foreground">
                        {formData.languages.map(langId => availableLanguages.find(l => l.id === langId)?.name).filter(Boolean).join(", ") || "Non définies"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Pour modifier ces informations, rendez-vous dans les onglets "Spécialité" et "Langues & Zones".
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium">Profil visible</p>
                    <p className="text-sm text-muted-foreground">
                      Votre profil est visible dans l'annuaire
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Specialty Tab */}
        <TabsContent value="specialty">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Spécialité et expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Domaine d'expertise <span className="text-destructive">*</span></Label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground">
                    <option value="">Sélectionnez un domaine</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Spécialité principale</Label>
                  <select id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleInputChange} disabled={!formData.category} className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground disabled:opacity-50">
                    <option value="">Sélectionnez une spécialité</option>
                    {categories.find((c) => c.id === formData.category)?.subcategories?.map((s:any) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    Spécialités additionnelles
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="px-3 py-1.5 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 cursor-pointer" onClick={() => removeSpecialty(specialty)}>
                        {specialty}
                        <X className="w-3 h-3 ml-2" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input value={newSpecialty} onChange={(e) => setNewSpecialty(e.target.value)} placeholder="Ex: Droit des sociétés" className="h-12 rounded-xl" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())} />
                    <Button type="button" variant="outline" onClick={addSpecialty} className="h-12 px-4 rounded-xl"><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Années d'expérience <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {experienceOptions.map((option) => (
                      <button key={option.value} type="button" onClick={() => setFormData({ ...formData, experienceRange: option.value })} className={formData.experienceRange === option.value ? 'p-4 rounded-xl border-2 border-primary bg-primary/10 text-primary font-medium' : 'p-4 rounded-xl border-2 border-border hover:border-primary/50'}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Languages & Zones Tab */}
        <TabsContent value="languages">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Languages className="w-5 h-5 text-gradient-end" />
                Langues parlées <span className="text-destructive">*</span>
              </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((langId) => {
                    const lang = availableLanguages.find((l) => l.id === langId);
                    return (
                      <Badge key={langId} variant="secondary" className="bg-primary/10 text-primary gap-1 pr-1">
                        {lang?.flag} {lang?.name}
                        <button onClick={() => removeLanguage(langId)} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
                <Select onValueChange={(val) => addLanguage(val)}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Ajouter une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages
                      .filter((l) => !formData.languages.includes(l.id))
                      .map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gradient-end" />
                Zones géographiques
              </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.country ? (
                    <Badge variant="secondary" className="bg-gradient-end/10 text-gradient-end gap-1 pr-1">
                      {countries.find(c => c.id === formData.country)?.flag} {countries.find(c => c.id === formData.country)?.name}
                    </Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucun pays sélectionné</p>
                  )}
                  {formData.city ? (
                    <Badge variant="secondary" className="bg-gradient-end/10 text-gradient-end gap-1 pr-1">
                      {cities[formData.country]?.find((c:any) => c.id === formData.city)?.name}
                    </Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucune ville sélectionnée</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <File className="w-5 h-5 text-gradient-end" />
                  Documents soumis lors de l'inscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Info message about document modification */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Documents non modifiables</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Les documents soumis lors de l'inscription ne peuvent pas être modifiés directement. 
                      Si vous souhaitez mettre à jour un document, veuillez nous contacter via la page <a href="/contact" className="underline hover:text-amber-900">Contact</a>.
                    </p>
                  </div>
                </div>

                {mockDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-start/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gradient-end" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{doc.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Soumis le {new Date(doc.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className={
                            doc.status === "validated"
                              ? "bg-green-100 text-green-700"
                              : doc.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {doc.status === "validated"
                            ? "Validé"
                            : doc.status === "pending"
                            ? "En attente"
                            : "Rejeté"}
                        </Badge>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {mockDocuments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <File className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Aucun document soumis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
