import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Check,
  User,
  FileText,
  CreditCard,
  Eye,
  Camera,
  X,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories, countries, cities } from "@/data/categories";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Mes informations", icon: User },
  { id: 2, title: "Mes documents", icon: FileText },
  { id: 3, title: "Mon abonnement", icon: CreditCard },
  { id: 4, title: "Aperçu", icon: Eye },
];

const ProRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    category: "",
    subcategory: "",
    description: "",
    experience: "",
    languages: [] as string[],
    photo: null as File | null,
    photoPreview: "",
    documents: [] as { name: string; status: string }[],
    plan: "annual",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocs = Array.from(files).map((file) => ({
        name: file.name,
        status: "pending",
      }));
      setFormData({
        ...formData,
        documents: [...formData.documents, ...newDocs],
      });
    }
  };

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index),
    });
  };

  const currentCategory = categories.find((c) => c.id === formData.category);
  const availableCities = formData.country ? cities[formData.country] : [];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.country &&
          formData.category
        );
      case 2:
        return formData.documents.length > 0;
      case 3:
        return formData.plan;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-soft">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back link */}
          <Link
            to="/espace-professionnel"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'espace professionnel
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Progress bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: currentStep >= step.id ? 1 : 0.8 }}
                      className={cn(
                        "flex flex-col items-center",
                        currentStep >= step.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                          currentStep > step.id
                            ? "bg-primary text-primary-foreground"
                            : currentStep === step.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-muted"
                        )}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="mt-2 text-xs font-medium hidden sm:block">
                        {step.title}
                      </span>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "h-1 w-12 sm:w-24 lg:w-32 mx-2 rounded-full transition-colors",
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="card-premium p-8"
              >
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                      Mes informations
                    </h2>

                    {/* Photo upload */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-muted overflow-hidden">
                          {formData.photoPreview ? (
                            <img
                              src={formData.photoPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-10 h-10 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <label
                          htmlFor="photo"
                          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                        >
                          <Camera className="w-4 h-4" />
                        </label>
                        <input
                          type="file"
                          id="photo"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Photo de profil</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG. 400x400px recommandé.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays *</Label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                        >
                          <option value="">Sélectionnez un pays</option>
                          {countries.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.flag} {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          disabled={!formData.country}
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground disabled:opacity-50"
                        >
                          <option value="">Sélectionnez une ville</option>
                          {availableCities.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Domaine d'expertise *</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                        >
                          <option value="">Sélectionnez un domaine</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.icon} {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subcategory">Spécialité</Label>
                        <select
                          id="subcategory"
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={handleInputChange}
                          disabled={!formData.category}
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground disabled:opacity-50"
                        >
                          <option value="">Sélectionnez une spécialité</option>
                          {currentCategory?.subcategories.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Présentez votre parcours, votre expertise..."
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                      Mes documents
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Téléchargez vos justificatifs pour obtenir le badge vérifié.
                    </p>

                    {/* Upload zone */}
                    <label
                      htmlFor="documents"
                      className="block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-foreground font-medium mb-2">
                        Glissez vos fichiers ici ou cliquez pour parcourir
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF, JPG, PNG - Max 10 MB par fichier
                      </p>
                      <input
                        type="file"
                        id="documents"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Document list */}
                    {formData.documents.length > 0 && (
                      <div className="space-y-3 mt-6">
                        <h3 className="font-medium text-foreground">Documents ajoutés</h3>
                        {formData.documents.map((doc, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between p-4 bg-background-soft rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-primary" />
                              <span className="text-foreground">{doc.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs px-2 py-1 rounded-full bg-gold/20 text-gold">
                                En attente
                              </span>
                              <button
                                onClick={() => removeDocument(index)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="bg-primary/5 rounded-lg p-4 mt-6">
                      <h4 className="font-medium text-foreground mb-2">
                        Documents recommandés :
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Diplôme(s) ou certification(s)</li>
                        <li>• Attestation d'inscription à l'ordre professionnel</li>
                        <li>• Pièce d'identité</li>
                        <li>• Justificatif de domicile professionnel</li>
                      </ul>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                      Mon abonnement
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Choisissez la formule qui vous convient.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Monthly */}
                      <button
                        onClick={() => setFormData({ ...formData, plan: "monthly" })}
                        className={cn(
                          "p-6 rounded-xl border-2 text-left transition-all",
                          formData.plan === "monthly"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <p className="text-muted-foreground mb-2">Mensuel</p>
                        <p className="text-3xl font-bold text-foreground mb-1">
                          450 <span className="text-lg font-normal">DH</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          par mois, sans engagement
                        </p>
                      </button>

                      {/* Annual */}
                      <button
                        onClick={() => setFormData({ ...formData, plan: "annual" })}
                        className={cn(
                          "p-6 rounded-xl border-2 text-left transition-all relative",
                          formData.plan === "annual"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="absolute -top-3 right-4 px-3 py-1 bg-gold text-gold-foreground text-xs font-medium rounded-full">
                          -63%
                        </span>
                        <p className="text-muted-foreground mb-2">Annuel</p>
                        <p className="text-3xl font-bold text-foreground mb-1">
                          2000 <span className="text-lg font-normal">DH</span>
                        </p>
                        <p className="text-sm text-primary font-medium">
                          Économisez 3400 DH
                        </p>
                      </button>
                    </div>

                    <div className="bg-background-soft rounded-lg p-6 mt-6">
                      <h4 className="font-medium text-foreground mb-4">
                        Ce qui est inclus :
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Profil professionnel complet",
                          "Badge vérifié après validation",
                          "Visibilité dans les résultats de recherche",
                          "Statistiques de votre profil",
                          "Support dédié",
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                      Aperçu de votre profil
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Voici comment votre profil apparaîtra aux utilisateurs.
                    </p>

                    {/* Preview card */}
                    <div className="border border-border rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden">
                          {formData.photoPreview ? (
                            <img
                              src={formData.photoPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {formData.firstName || "Prénom"} {formData.lastName || "Nom"}
                          </h3>
                          <p className="text-primary font-medium">
                            {currentCategory?.name || "Domaine d'expertise"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formData.city
                              ? availableCities.find((c) => c.id === formData.city)?.name
                              : "Ville"},{" "}
                            {formData.country
                              ? countries.find((c) => c.id === formData.country)?.name
                              : "Pays"}
                          </p>
                        </div>
                        <div className="badge-verified text-xs">
                          <Check className="w-3 h-3" />
                          En cours
                        </div>
                      </div>
                      {formData.description && (
                        <p className="mt-4 text-muted-foreground text-sm">
                          {formData.description}
                        </p>
                      )}
                    </div>

                    <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                      <p className="text-sm text-foreground">
                        <strong>Note :</strong> Votre profil sera visible après
                        validation de vos documents par notre équipe (24-48h).
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!canProceed()}
                      className="btn-ripple gradient-primary border-0"
                    >
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button className="btn-ripple gradient-primary border-0">
                      Finaliser mon inscription
                      <Check className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProRegistration;
