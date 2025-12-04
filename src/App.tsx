import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ProfessionalDetail from "./pages/ProfessionalDetail";
import ProfessionalSpace from "./pages/ProfessionalSpace";
import About from "./pages/About";
import WhyWeLinkYou from "./pages/WhyWeLinkYou";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ProRegistration from "./pages/ProRegistration";
import NotFound from "./pages/NotFound";
import { PractitionerLayout } from "./components/practitioner/PractitionerLayout";
import { PractitionerDashboard } from "./pages/practitioner/PractitionerDashboard";
import { PractitionerProfile } from "./pages/practitioner/PractitionerProfile";
import { PractitionerSubscription } from "./pages/practitioner/PractitionerSubscription";
import { PractitionerSettings } from "./pages/practitioner/PractitionerSettings";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPractitioners } from "./pages/admin/AdminPractitioners";
import { AdminRegistrations } from "./pages/admin/AdminRegistrations";
import { AdminSettings } from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recherche" element={<SearchResults />} />
          <Route path="/professionnel/:id" element={<ProfessionalDetail />} />
          <Route path="/espace-professionnel" element={<ProfessionalSpace />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/pourquoi-welinkyou" element={<WhyWeLinkYou />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/inscription-pro" element={<ProRegistration />} />
          
          {/* Practitioner Dashboard Routes */}
          <Route path="/praticien" element={<PractitionerLayout />}>
            <Route path="dashboard" element={<PractitionerDashboard />} />
            <Route path="profil" element={<PractitionerProfile />} />
            <Route path="abonnement" element={<PractitionerSubscription />} />
            <Route path="parametres" element={<PractitionerSettings />} />
          </Route>

          {/* Super Admin Dashboard Routes */}
          <Route path="/dashboard/superadmin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="praticiens" element={<AdminPractitioners />} />
            <Route path="demandes" element={<AdminRegistrations />} />
            <Route path="parametres" element={<AdminSettings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
