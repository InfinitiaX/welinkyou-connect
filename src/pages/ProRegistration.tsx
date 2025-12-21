import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  Star,
  Shield,
  Clock,
  Languages,
  Award,
  Building,
  MessageCircle,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { countries, cities } from "@/data/categories";
import { cn } from "@/lib/utils";
import { useRegistration } from "@/hooks/useRegistration";
import { useToast } from "@/hooks/use-toast";
import { useAuth, getDashboardUrl } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import type { ApiDomaine } from "@/types/api";

const steps = [
  { id: 1, title: "Informations", icon: User, description: "Vos coordonnées" },
  { id: 2, title: "Profil", icon: Briefcase, description: "Expertise & langues" },
  { id: 3, title: "Documents", icon: FileText, description: "Justificatifs" },
  { id: 4, title: "Abonnement", icon: CreditCard, description: "Votre formule" },
  { id: 5, title: "Aperçu", icon: Eye, description: "Vérification" },
];

const availableLanguages = [
  { id: "fr", name: "Français", flag: "🇫🇷", code: "FR" },
  { id: "ar", name: "Arabe", flag: "🇲🇦", code: "MA" },
  { id: "en", name: "Anglais", flag: "🇬🇧", code: "GB" },
  { id: "es", name: "Espagnol", flag: "🇪🇸", code: "ES" },
  { id: "de", name: "Allemand", flag: "🇩🇪", code: "DE" },
  { id: "it", name: "Italien", flag: "🇮🇹", code: "IT" },
];

const experienceOptions = [
  { value: "1-3", label: "1-3 ans" },
  { value: "4-7", label: "4-7 ans" },
  { value: "8-12", label: "8-12 ans" },
  { value: "12+", label: "Plus de 12 ans" },
];

const allDocuments = [
  { id: "diploma", name: "Diplôme", description: "Diplôme ou certificat professionnel", icon: Award, requiredForRegulated: true },
  { id: "identity", name: "Preuve d'identité", description: "Passeport ou CIN", icon: User, requiredForRegulated: true },
  { id: "registration", name: "Numéro d'enregistrement", description: "Attestation d'exercice", icon: FileText, requiredForRegulated: true },
  { id: "kbis", name: "Extrait d'immatriculation", description: "KBIS ou Registre de Commerce", icon: Building, requiredForRegulated: true },
  { id: "charter", name: "Charte WeLinkYou signée", description: "Engagement sur les conditions d'utilisation", icon: Shield, requiredForRegulated: true },
  { id: "insurance", name: "Attestation d'assurance", description: "Assurance responsabilité professionnelle", icon: Shield, requiredForRegulated: true },
];

const ProRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  
  // Rediriger si déjà connecté
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      toast({
        title: "Vous êtes déjà connecté",
        description: "Vous avez été redirigé vers votre tableau de bord.",
      });
      navigate(getDashboardUrl(user.role), { replace: true });
    }
  }, [authLoading, isAuthenticated, user, navigate, toast]);
  
  // Charger les domaines depuis l'API
  const [domaines, setDomaines] = useState<ApiDomaine[]>([]);
  const [domainesLoading, setDomainesLoading] = useState(true);
  
  useEffect(() => {
    const loadDomaines = async () => {
      try {
        const data = await api.getDomaines();
        setDomaines(data);
      } catch (err) {
        console.error("Erreur lors du chargement des domaines:", err);
        toast({
          title: "Erreur",
          description: "Impossible de charger les domaines. Veuillez rafraîchir la page.",
          variant: "destructive",
        });
      } finally {
        setDomainesLoading(false);
      }
    };
    loadDomaines();
  }, [toast]);
  
  // Hook d'inscription avec sauvegarde locale
  const {
    localDraft,
    isSaving,
    isFinalizing,
    error: registrationError,
    lastSaved,
    saveToLocal,
    finalizeRegistration,
    clearLocalDraft,
  } = useRegistration({
    onAutoSave: () => {
      // Toast silencieux pour ne pas spammer
    },
    onError: (err) => {
      toast({
        title: "Erreur",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "",
    city: "",
    // Step 2 - Professional Profile
    professionType: "" as "" | "regulated" | "non-regulated",
    category: "",
    subcategory: "",
    specialties: [] as string[],
    description: "",
    experience: "",
    languages: [] as string[],
    professionalLink: "",
    // Photo
    photo: null as File | null,
    photoPreview: "",
    // Documents
    documents: {} as Record<string, { file: File | null; name: string; status: string }>,
    // Plan
    plan: "annual",
  });

  // Charger les données du brouillon local si existant
  useEffect(() => {
    if (localDraft?.formData && !draftLoaded) {
      const fd = localDraft.formData;
      setFormData(prev => ({
        ...prev,
        firstName: fd.firstName || prev.firstName,
        lastName: fd.lastName || prev.lastName,
        email: fd.email || localDraft.email || prev.email,
        phone: fd.phone || prev.phone,
        whatsapp: fd.whatsapp || prev.whatsapp,
        country: fd.country || prev.country,
        city: fd.city || prev.city,
        professionType: fd.professionType || prev.professionType,
        category: fd.category || prev.category,
        subcategory: fd.subcategory || prev.subcategory,
        specialties: fd.specialties || prev.specialties,
        description: fd.description || prev.description,
        experience: fd.experience || prev.experience,
        languages: fd.languages || prev.languages,
        professionalLink: fd.professionalLink || prev.professionalLink,
        plan: fd.plan || prev.plan,
      }));
      setCurrentStep(localDraft.currentStep || 1);
      // Marquer l'email comme vérifié si un brouillon existe
      if (localDraft.email) {
        setEmailChecked(true);
      }
      setDraftLoaded(true);
    }
  }, [localDraft, draftLoaded]);

  const [newSpecialty, setNewSpecialty] = useState("");

  // Sauvegarder dans localStorage
  const saveCurrentData = useCallback((step: number) => {
    const dataToSave = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      country: formData.country,
      city: formData.city,
      professionType: formData.professionType,
      category: formData.category,
      subcategory: formData.subcategory,
      specialties: formData.specialties,
      description: formData.description,
      experience: formData.experience,
      languages: formData.languages,
      professionalLink: formData.professionalLink,
      plan: formData.plan,
    };
    saveToLocal(step, dataToSave);
  }, [formData, saveToLocal]);

  // Gérer le changement d'étape avec sauvegarde locale
  const handleStepChange = (newStep: number) => {
    if (newStep > currentStep && !canProceed()) return;
    
    // Sauvegarder la nouvelle étape courante
    saveCurrentData(newStep);
    setCurrentStep(newStep);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
  };

  // Sauvegarder le brouillon quand l'email est renseigné
  const handleEmailBlur = () => {
    if (formData.email && !emailChecked) {
      setEmailChecked(true);
      // Sauvegarder le brouillon en localStorage
      saveToLocal(currentStep, formData);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier que c'est une image
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Format invalide",
          description: "Seuls les formats JPG, PNG et WebP sont acceptés.",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }
      
      // Vérifier la taille (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: "Image trop volumineuse",
          description: "La taille maximum est de 5 MB.",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }
      
      // Mise à jour locale immédiate avec preview
      const preview = URL.createObjectURL(file);
      setFormData({
        ...formData,
        photo: file,
        photoPreview: preview,
      });
      
      // Upload vers le backend si email disponible
      if (formData.email) {
        try {
          await api.uploadProfilePhoto({
            email: formData.email,
            draft_id: localDraft?.id,
            photo: file,
          });
          
          toast({
            title: "Photo uploadée",
            description: "Votre photo de profil a été sauvegardée.",
          });
        } catch (err) {
          console.error("Erreur upload photo:", err);
          // On garde quand même la preview locale
          toast({
            title: "Avertissement",
            description: "La photo sera sauvegardée localement en attendant.",
            variant: "default",
          });
        }
      }
    }
  };

  const handleDocumentUpload = async (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier que c'est un PDF
      if (file.type !== "application/pdf") {
        toast({
          title: "Format invalide",
          description: "Seuls les fichiers PDF sont acceptés.",
          variant: "destructive",
        });
        // Réinitialiser l'input
        e.target.value = "";
        return;
      }
      
      // Vérifier la taille (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximum est de 10 MB.",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }
      
      // Mise à jour locale immédiate (les fichiers seront uploadés à la finalisation)
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [docId]: { file, name: file.name, status: "pending" },
        },
      });
    }
  };

  const removeDocument = (docId: string) => {
    const newDocs = { ...formData.documents };
    delete newDocs[docId];
    setFormData({ ...formData, documents: newDocs });
  };

  const toggleLanguage = (langId: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.includes(langId)
        ? formData.languages.filter((l) => l !== langId)
        : [...formData.languages, langId],
    });
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()],
      });
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((s) => s !== specialty),
    });
  };

  // Trouver le domaine sélectionné depuis les données de l'API
  const currentDomaine = domaines.find((d) => d.id === formData.category);
  const availableCities = formData.country ? cities[formData.country] : [];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.country
        );
      case 2:
        return formData.professionType && formData.category && formData.languages.length > 0;
      case 3: {
        // For regulated professions, all documents are required
        // For non-regulated, at least KBIS and insurance are required
        if (formData.professionType === "regulated") {
          const requiredDocs = allDocuments.map(d => d.id);
          return requiredDocs.every(docId => formData.documents[docId]);
        } else {
          // Non-regulated: only kbis and insurance are required
          return formData.documents["kbis"] && formData.documents["insurance"];
        }
      }
      case 4:
        return formData.plan;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background-soft to-primary/5">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Check className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Inscription réussie ! 🎉
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Votre demande d'inscription a été soumise avec succès. Notre équipe va examiner vos documents et valider votre profil dans les 24-48h ouvrées.
              </p>

              <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">Prochaines étapes</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Vous recevrez un email de confirmation à <strong className="text-foreground">{formData.email || "votre adresse"}</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Notre équipe vérifiera vos documents sous 24-48h
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Une fois validé, votre profil sera visible sur notre plateforme
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="h-12 px-6 rounded-xl">
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link to="/recherche">
                  <Button className="h-12 px-6 rounded-xl gradient-primary border-0">
                    Découvrir les professionnels
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
          {/* Header */}
          <div className="max-w-5xl mx-auto mb-8">
            <Link
              to="/espace-professionnel"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'espace professionnel
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Star className="w-4 h-4" />
                Rejoignez notre réseau de professionnels vérifiés
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Créez votre profil professionnel
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                En quelques minutes, gagnez en visibilité auprès d'une clientèle franco-marocaine qualifiée
              </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Progress Steps - Horizontal Timeline */}
            <div className="mb-10 px-4">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-border hidden md:block" />
                <div
                  className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-500 hidden md:block"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                <div className="flex flex-wrap justify-between relative">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "flex flex-col items-center w-1/5 min-w-[80px]",
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                          currentStep > step.id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                            : currentStep === step.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-card border-2 border-border"
                        )}
                        onClick={() => currentStep > step.id && handleStepChange(step.id)}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="mt-3 text-xs font-semibold hidden sm:block">{step.title}</span>
                      <span className="text-[10px] text-muted-foreground hidden lg:block">{step.description}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
              >
                {/* Step Header */}
                <div className="px-8 py-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
                      {steps[currentStep - 1] && (() => { const StepIcon = steps[currentStep - 1].icon; return <StepIcon className="w-6 h-6" />; })()}
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground">
                        {steps[currentStep - 1]?.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Étape {currentStep} sur {steps.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      {/* Photo Upload - Centered */}
                      <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 p-1">
                            <div className="w-full h-full rounded-full bg-card overflow-hidden">
                              {formData.photoPreview ? (
                                <img
                                  src={formData.photoPreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                  <User className="w-12 h-12 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                          <label
                            htmlFor="photo"
                            className="absolute bottom-0 right-0 w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
                          >
                            <Camera className="w-5 h-5" />
                          </label>
                          <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Photo de profil professionnelle
                        </p>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Prénom <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Yasmine"
                            className="h-12 rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Nom <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="El Mansouri"
                            className="h-12 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Contact Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onBlur={handleEmailBlur}
                              placeholder="y.elmansouri@cabinet.ma"
                              className={cn(
                                "h-12 rounded-xl pr-10",
                                emailChecked && "border-green-500"
                              )}
                            />
                            {isSaving && (
                              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                            )}
                            {emailChecked && !isSaving && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                            )}
                          </div>
                          {localDraft && (
                            <p className="text-xs text-green-600">
                              ✓ Brouillon trouvé, vos données seront sauvegardées automatiquement
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            Téléphone <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+212 6 12 34 56 78"
                            className="h-12 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-green-500" />
                          WhatsApp (si différent)
                        </Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="+212 6 12 34 56 78"
                          className="h-12 rounded-xl"
                        />
                      </div>

                      {/* Location */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="country" className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" />
                            Pays <span className="text-destructive">*</span>
                          </Label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                          <Label htmlFor="city" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            Ville
                          </Label>
                          <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!formData.country}
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
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
                    </div>
                  )}

                  {/* Step 2: Professional Profile */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {/* Profession Type Selection */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          Type de profession <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, professionType: "regulated" })}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                              formData.professionType === "regulated"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                              formData.professionType === "regulated"
                                ? "border-primary bg-primary"
                                : "border-gold"
                            )}>
                              {formData.professionType === "regulated" && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Profession réglementée</span>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Avocat, médecin, expert-comptable, notaire, etc.
                              </p>
                            </div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, professionType: "non-regulated" })}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                              formData.professionType === "non-regulated"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                              formData.professionType === "non-regulated"
                                ? "border-primary bg-primary"
                                : "border-gold"
                            )}>
                              {formData.professionType === "non-regulated" && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Profession non réglementée</span>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Consultant, coach, formateur, artisan, etc.
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Category & Subcategory */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            Domaine d'expertise <span className="text-destructive">*</span>
                          </Label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            disabled={domainesLoading}
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                          >
                            <option value="">
                              {domainesLoading ? "Chargement..." : "Sélectionnez un domaine"}
                            </option>
                            {domaines.map((d) => (
                              <option key={d.id} value={d.id}>
                                {d.icon} {d.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subcategory" className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            Spécialité principale
                          </Label>
                          <select
                            id="subcategory"
                            name="subcategory"
                            value={formData.subcategory}
                            onChange={handleInputChange}
                            disabled={!formData.category}
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                          >
                            <option value="">Sélectionnez une spécialité</option>
                            {currentDomaine?.specialites?.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Specialties Tags */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-primary" />
                          Spécialités additionnelles
                        </Label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="px-3 py-1.5 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 cursor-pointer"
                              onClick={() => removeSpecialty(specialty)}
                            >
                              {specialty}
                              <X className="w-3 h-3 ml-2" />
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newSpecialty}
                            onChange={(e) => setNewSpecialty(e.target.value)}
                            placeholder="Ex: Droit des sociétés"
                            className="h-12 rounded-xl"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addSpecialty}
                            className="h-12 px-4 rounded-xl"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          Années d'expérience
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {experienceOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, experience: option.value })}
                              className={cn(
                                "p-4 rounded-xl border-2 text-center transition-all",
                                formData.experience === option.value
                                  ? "border-primary bg-primary/10 text-primary font-medium"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Languages className="w-4 h-4 text-primary" />
                          Langues parlées <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {availableLanguages.map((lang) => (
                            <button
                              key={lang.id}
                              type="button"
                              onClick={() => toggleLanguage(lang.id)}
                              className={cn(
                                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                formData.languages.includes(lang.id)
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <span className="text-2xl">{lang.flag}</span>
                              <span className={cn(
                                "font-medium",
                                formData.languages.includes(lang.id) ? "text-primary" : "text-foreground"
                              )}>
                                {lang.name}
                              </span>
                              {formData.languages.includes(lang.id) && (
                                <Check className="w-4 h-4 text-primary ml-auto" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description" className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          À propos de vous
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Présentez votre parcours, votre expertise et ce qui vous distingue..."
                          rows={5}
                          className="rounded-xl resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          Cette description apparaîtra sur votre profil public
                        </p>
                      </div>

                      {/* Professional Link */}
                      <div className="space-y-2">
                        <Label htmlFor="professionalLink" className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          Lien professionnel
                        </Label>
                        <Input
                          id="professionalLink"
                          name="professionalLink"
                          type="url"
                          value={formData.professionalLink}
                          onChange={handleInputChange}
                          placeholder="https://www.linkedin.com/in/votre-profil ou votre site web"
                          className="h-12 rounded-xl"
                        />
                        <p className="text-xs text-muted-foreground">
                          Site web, page LinkedIn ou autre profil professionnel
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Documents */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="bg-primary/5 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Mes documents – Profil vérifié</p>
                            <p className="text-sm text-muted-foreground">
                              La vérification de vos documents nous permet d'attribuer le badge "Profil vérifié" 
                              et d'assurer la confiance des utilisateurs.
                            </p>
                            {formData.professionType === "non-regulated" && (
                              <p className="text-xs text-primary mt-2 font-medium">
                                Profession non réglementée : seuls l'extrait d'immatriculation et l'attestation d'assurance sont obligatoires.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {allDocuments.map((doc) => {
                          const isRequired = formData.professionType === "regulated" || doc.id === "kbis" || doc.id === "insurance";
                          
                          return (
                            <div
                              key={doc.id}
                              className={cn(
                                "p-4 rounded-xl border-2 transition-all",
                                formData.documents[doc.id]
                                  ? "border-primary/50 bg-primary/5"
                                  : "border-dashed border-border hover:border-primary/30"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                  formData.documents[doc.id]
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                )}>
                                  <doc.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-medium text-foreground">{doc.name}</h4>
                                    {isRequired ? (
                                      <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded-full">
                                        Requis
                                      </span>
                                    ) : (
                                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                                        Optionnel
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-0.5">{doc.description}</p>
                                  
                                  {formData.documents[doc.id] ? (
                                    <div className="flex items-center gap-3 mt-2">
                                      <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border">
                                        <FileText className="w-4 h-4 text-primary" />
                                        <span className="text-sm text-foreground truncate max-w-[180px]">
                                          {formData.documents[doc.id].name}
                                        </span>
                                      </div>
                                      <button
                                        onClick={() => removeDocument(doc.id)}
                                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <label className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg cursor-pointer hover:bg-primary/20 transition-colors">
                                      <Upload className="w-4 h-4" />
                                      <span className="text-sm font-medium">Choisir un PDF</span>
                                      <input
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        onChange={(e) => handleDocumentUpload(doc.id, e)}
                                        className="hidden"
                                      />
                                    </label>
                                  )}
                                </div>
                                {formData.documents[doc.id] && (
                                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex-shrink-0">
                                    <Clock className="w-3 h-3" />
                                    En attente
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Formats acceptés : PDF, JPG, PNG • Max 10 MB par fichier
                      </p>
                    </div>
                  )}

                  {/* Step 4: Subscription */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Monthly */}
                        <button
                          onClick={() => setFormData({ ...formData, plan: "monthly" })}
                          className={cn(
                            "p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                            formData.plan === "monthly"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <p className="text-muted-foreground mb-2 font-medium">Mensuel</p>
                          <p className="text-4xl font-bold text-foreground mb-1">
                            450 <span className="text-lg font-normal text-muted-foreground">DH</span>
                          </p>
                          <p className="text-sm text-muted-foreground">par mois, sans engagement</p>
                          {formData.plan === "monthly" && (
                            <div className="absolute top-4 right-4">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Check className="w-4 h-4" />
                              </div>
                            </div>
                          )}
                        </button>

                        {/* Annual */}
                        <button
                          onClick={() => setFormData({ ...formData, plan: "annual" })}
                          className={cn(
                            "p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                            formData.plan === "annual"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <span className="absolute -top-0.5 -right-0.5 px-4 py-1.5 gradient-gold text-gold-foreground text-xs font-bold rounded-bl-xl rounded-tr-xl">
                            ÉCONOMISEZ 63%
                          </span>
                          <p className="text-muted-foreground mb-2 font-medium">Annuel</p>
                          <p className="text-4xl font-bold text-foreground mb-1">
                            2000 <span className="text-lg font-normal text-muted-foreground">DH</span>
                          </p>
                          <p className="text-sm text-primary font-medium">Économisez 3400 DH/an</p>
                          {formData.plan === "annual" && (
                            <div className="absolute top-4 right-4 mt-6">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Check className="w-4 h-4" />
                              </div>
                            </div>
                          )}
                        </button>
                      </div>

                      <div className="bg-card border border-border rounded-2xl p-6">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          Inclus dans votre abonnement
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Profil professionnel complet",
                            "Badge vérifié après validation",
                            "Visibilité dans les résultats",
                            "Statistiques de votre profil",
                            "Support dédié prioritaire",
                            "Mises à jour illimitées",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                              <span className="text-muted-foreground text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Preview */}
                  {currentStep === 5 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Main content */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Hero card */}
                        <div className="card-premium p-6">
                          <div className="flex flex-col sm:flex-row gap-6">
                            {/* Photo */}
                            <div className="relative flex-shrink-0">
                              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-muted overflow-hidden ring-4 ring-primary/20">
                                {formData.photoPreview ? (
                                  <img
                                    src={formData.photoPreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <User className="w-12 h-12 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              {/* Verified Badge */}
                              <div className="absolute -bottom-2 -right-2">
                                <div className="badge-verified">
                                  <Shield className="w-4 h-4" />
                                  Vérifié
                                </div>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-2">
                                {formData.firstName || "Prénom"} {formData.lastName || "Nom"}
                              </h3>
                              <p className="text-primary text-lg font-medium mb-4">
                                {currentDomaine?.name || "Domaine"} - {
                                  currentDomaine?.specialites?.find(s => s.id === formData.subcategory)?.name || "Spécialité"
                                }
                              </p>

                              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" />
                                  <span>
                                    {formData.city
                                      ? availableCities.find((c) => c.id === formData.city)?.name
                                      : "Ville"}, {formData.country
                                      ? countries.find((c) => c.id === formData.country)?.name
                                      : "Pays"} {formData.country === "france" ? "🇫🇷" : formData.country === "morocco" ? "🇲🇦" : ""}
                                  </span>
                                </div>
                                {formData.experience && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{experienceOptions.find(e => e.value === formData.experience)?.label.replace(" ans", "")} ans d'expérience</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5">
                                <Star className="w-5 h-5 fill-gold text-gold" />
                                <span className="font-semibold text-foreground text-lg">4.9</span>
                                <span className="text-muted-foreground">(0 avis)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* À propos */}
                        <div className="card-premium p-6">
                          <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary" />
                            À propos
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {formData.description || "Aucune description ajoutée"}
                          </p>
                        </div>

                        {/* Spécialités */}
                        {formData.specialties.length > 0 && (
                          <div className="card-premium p-6">
                            <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                              <Award className="w-5 h-5 text-primary" />
                              Spécialités
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {formData.specialties.map((specialty) => (
                                <span
                                  key={specialty}
                                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Langues parlées */}
                        {formData.languages.length > 0 && (
                          <div className="card-premium p-6">
                            <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                              <Globe className="w-5 h-5 text-primary" />
                              Langues parlées
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {formData.languages.map((langId) => {
                                const lang = availableLanguages.find(l => l.id === langId);
                                return lang ? (
                                  <span
                                    key={langId}
                                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium"
                                  >
                                    {lang.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sidebar - Contact */}
                      <div className="lg:col-span-1">
                        <div className="card-premium p-6 sticky top-28">
                          <h4 className="text-lg font-semibold text-foreground mb-6">
                            Contacter {formData.firstName || "Prénom"}
                          </h4>

                          <div className="space-y-3">
                            {/* WhatsApp */}
                            <Button
                              size="lg"
                              className="w-full btn-ripple gap-2 bg-[#25D366] hover:bg-[#20BD5A] border-0"
                            >
                              <MessageCircle className="w-5 h-5" />
                              WhatsApp
                            </Button>

                            {/* Phone */}
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full gap-2"
                            >
                              <Phone className="w-5 h-5" />
                              Appeler
                            </Button>

                            {/* Email */}
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full gap-2"
                            >
                              <Mail className="w-5 h-5" />
                              Email
                            </Button>
                          </div>

                          <div className="mt-6 pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground text-center">
                              <span className="flex items-center justify-center gap-2 mb-1">
                                <Phone className="w-4 h-4 text-primary" />
                                {formData.phone || "+212 6 XX XX XX XX"}
                              </span>
                              <span className="flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                {formData.email || "email@example.com"}
                              </span>
                            </p>
                          </div>

                          {/* Category badge */}
                          <div className="mt-6 pt-6 border-t border-border">
                            <div className="text-center">
                              <span className="text-sm text-muted-foreground">Catégorie</span>
                              <p className="font-medium text-foreground">
                                {currentDomaine?.icon} {currentDomaine?.name || "Domaine"}
                              </p>
                              <p className="text-sm text-primary">
                                {currentDomaine?.specialites?.find(s => s.id === formData.subcategory)?.name || "Spécialité"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => handleStepChange(currentStep - 1)}
                      disabled={currentStep === 1}
                      className="h-12 px-6 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>

                    {currentStep < 5 ? (
                      <Button
                        onClick={() => handleStepChange(currentStep + 1)}
                        disabled={!canProceed() || isSaving}
                        className="h-12 px-8 rounded-xl btn-ripple gradient-primary border-0"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sauvegarde...
                          </>
                        ) : (
                          <>
                            Continuer
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setShowPasswordModal(true)}
                        disabled={isSubmitting || isFinalizing}
                        className="h-12 px-8 rounded-xl btn-ripple gradient-primary border-0"
                      >
                        {isSubmitting || isFinalizing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Traitement...
                          </>
                        ) : (
                          <>
                            Finaliser mon inscription
                            <Check className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Indicateur de sauvegarde */}
                  {lastSaved && (
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Dernière sauvegarde : {lastSaved.toLocaleTimeString()}
                    </div>
                  )}

                  {registrationError && (
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      {registrationError}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
          )}

        {/* Modal de création de mot de passe */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Créez votre mot de passe
              </h3>
              <p className="text-muted-foreground mb-6">
                Ce mot de passe vous permettra d'accéder à votre espace professionnel.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Minimum 8 caractères"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="passwordConfirm">Confirmer le mot de passe</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Retapez votre mot de passe"
                    className="mt-1"
                  />
                </div>

                {passwordError && (
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {passwordError}
                  </p>
                )}

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword("");
                      setPasswordConfirm("");
                      setPasswordError("");
                    }}
                    className="flex-1"
                    disabled={isFinalizing}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={async () => {
                      // Validation
                      if (password.length < 8) {
                        setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
                        return;
                      }
                      if (password !== passwordConfirm) {
                        setPasswordError("Les mots de passe ne correspondent pas.");
                        return;
                      }

                      setIsSubmitting(true);
                      
                      // Convertir formData vers le format attendu par l'API
                      const registrationData = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        whatsapp: formData.whatsapp,
                        country: formData.country,
                        city: formData.city,
                        professionType: formData.professionType,
                        category: formData.category,
                        subcategory: formData.subcategory,
                        specialties: formData.specialties,
                        description: formData.description,
                        experience: formData.experience,
                        languages: formData.languages,
                        professionalLink: formData.professionalLink,
                        plan: formData.plan,
                      };
                      
                      // Préparer les documents à uploader
                      const documentsToUpload = Object.entries(formData.documents)
                        .filter(([, doc]) => doc.file)
                        .map(([docType, doc]) => ({
                          docType,
                          file: doc.file as File,
                        }));
                      
                      const result = await finalizeRegistration(
                        registrationData, 
                        password, 
                        passwordConfirm,
                        documentsToUpload
                      );
                      
                      if (result) {
                        setShowPasswordModal(false);
                        setIsSuccess(true);
                        toast({
                          title: "Inscription réussie ! 🎉",
                          description: "Votre profil est en attente de validation.",
                        });
                      }
                      setIsSubmitting(false);
                    }}
                    disabled={isFinalizing || !password || !passwordConfirm}
                    className="flex-1 gradient-primary border-0"
                  >
                    {isFinalizing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Création...
                      </>
                    ) : (
                      "Créer mon compte"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProRegistration;
