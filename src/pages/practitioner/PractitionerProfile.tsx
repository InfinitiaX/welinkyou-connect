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
} from "lucide-react";
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

const languages = ["Français", "Arabe", "Anglais", "Espagnol", "Berbère"];

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

export const PractitionerProfile = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["Français", "Arabe"]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["Paris", "Casablanca"]);
  const [experiences, setExperiences] = useState([
    { id: 1, title: "Médecin généraliste", company: "Cabinet Martin", period: "2018 - Présent" },
    { id: 2, title: "Interne", company: "Hôpital Saint-Louis", period: "2015 - 2018" },
  ]);

  const addLanguage = (lang: string) => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const removeLanguage = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  };

  const addRegion = (region: string) => {
    if (!selectedRegions.includes(region)) {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const removeRegion = (region: string) => {
    setSelectedRegions(selectedRegions.filter((r) => r !== region));
  };

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
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Prévisualiser
          </Button>
          <Button className="gap-2 bg-gold hover:bg-gold-light text-primary">
            <Save className="w-4 h-4" />
            Enregistrer
          </Button>
        </div>
      </motion.div>

      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-sm bg-gradient-to-r from-gold/10 to-gold/5 border-l-4 border-l-gold">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-medium text-foreground">Profil complété à 85%</p>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez vos expériences pour atteindre 100%
                  </p>
                </div>
              </div>
              <Badge className="bg-gold text-primary">85%</Badge>
            </div>
          </CardContent>
        </Card>
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
          <TabsTrigger value="experience" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <FileText className="w-4 h-4" />
            Expériences
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
                    <Avatar className="w-24 h-24 border-4 border-gold/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        DM
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gold hover:bg-gold-light text-primary"
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
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Jean" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Martin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel</Label>
                    <Input id="email" type="email" defaultValue="dr.martin@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue="+33 6 12 34 56 78" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue="Médecin généraliste avec plus de 10 ans d'expérience, spécialisé dans l'accompagnement des patients franco-marocains..."
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Cette description apparaîtra sur votre profil public
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
                  <Label>Spécialité principale</Label>
                  <Select defaultValue="Médecine générale">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diplomas">Diplômes et certifications</Label>
                  <Textarea
                    id="diplomas"
                    rows={3}
                    defaultValue="Doctorat en médecine - Université Paris Descartes (2015)&#10;DU Médecine tropicale - Université de Bordeaux (2017)"
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration">Numéro d'inscription à l'ordre</Label>
                  <Input id="registration" defaultValue="75-XXXXX" />
                </div>

                <div className="space-y-2">
                  <Label>Tarifs de consultation</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price-france" className="text-sm text-muted-foreground">
                        En France (€)
                      </Label>
                      <Input id="price-france" type="number" defaultValue="50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price-morocco" className="text-sm text-muted-foreground">
                        Au Maroc (MAD)
                      </Label>
                      <Input id="price-morocco" type="number" defaultValue="400" />
                    </div>
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
                  <Languages className="w-5 h-5 text-gold" />
                  Langues parlées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedLanguages.map((lang) => (
                    <Badge
                      key={lang}
                      variant="secondary"
                      className="bg-primary/10 text-primary gap-1 pr-1"
                    >
                      {lang}
                      <button
                        onClick={() => removeLanguage(lang)}
                        className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={addLanguage}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Ajouter une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages
                      .filter((l) => !selectedLanguages.includes(l))
                      .map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  Zones géographiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map((region) => (
                    <Badge
                      key={region}
                      variant="secondary"
                      className="bg-gold/10 text-gold gap-1 pr-1"
                    >
                      {region}
                      <button
                        onClick={() => removeRegion(region)}
                        className="ml-1 hover:bg-gold/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={addRegion}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Ajouter une zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions
                      .filter((r) => !selectedRegions.includes(r))
                      .map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Expériences professionnelles</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {experiences.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Aucune expérience ajoutée</p>
                    <p className="text-sm">Cliquez sur "Ajouter" pour commencer</p>
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
