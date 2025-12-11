import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Trash2, 
  RefreshCw,
  Calendar,
  User,
  Search,
  Filter,
  AlertTriangle,
  Eye
} from "lucide-react";
import { mockRegistrationRequests } from "@/data/mockPractitioners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DocumentEntry {
  id: string;
  name: string;
  url: string;
  practitionerName: string;
  practitionerEmail: string;
  submittedAt: string;
  status: 'pending' | 'validated' | 'rejected';
  consentStatus: 'valid' | 'expired' | 'requested';
}

export const AdminDocuments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDocument, setSelectedDocument] = useState<DocumentEntry | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConsentDialogOpen, setIsConsentDialogOpen] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  // Transform mock data into flat document list
  const allDocuments: DocumentEntry[] = mockRegistrationRequests.flatMap(request =>
    request.documents.map((doc, index) => ({
      id: `${request.id}-${index}`,
      name: doc.name,
      url: doc.url,
      practitionerName: `${request.firstName} ${request.lastName}`,
      practitionerEmail: request.email,
      submittedAt: request.submittedAt,
      status: doc.status,
      consentStatus: Math.random() > 0.7 ? 'expired' : 'valid' as 'valid' | 'expired' | 'requested',
    }))
  );

  const [documents, setDocuments] = useState<DocumentEntry[]>(allDocuments);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.practitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteDocument = () => {
    if (selectedDocument) {
      setDocuments(prev => prev.filter(d => d.id !== selectedDocument.id));
      toast({
        title: "Document supprimé",
        description: `Le document "${selectedDocument.name}" a été supprimé définitivement.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setSelectedDocument(null);
    }
  };

  const handleRequestConsent = () => {
    if (selectedDocument) {
      setDocuments(prev => prev.map(d => 
        d.id === selectedDocument.id 
          ? { ...d, consentStatus: 'requested' as const }
          : d
      ));
      toast({
        title: "Demande envoyée",
        description: `Une demande de consentement a été envoyée à ${selectedDocument.practitionerEmail}.`,
      });
      setIsConsentDialogOpen(false);
      setSelectedDocument(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">En attente</Badge>;
      case 'validated':
        return <Badge className="bg-green-100 text-green-700">Validé</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700">Rejeté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getConsentBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return <Badge className="bg-green-100 text-green-700">Consentement valide</Badge>;
      case 'expired':
        return <Badge className="bg-orange-100 text-orange-700">Consentement expiré</Badge>;
      case 'requested':
        return <Badge className="bg-blue-100 text-blue-700">Demande envoyée</Badge>;
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
        <h1 className="text-3xl font-bold text-primary">Documents</h1>
        <p className="text-muted-foreground mt-1">Gérez tous les documents soumis par les praticiens</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{documents.length}</p>
                  <p className="text-sm text-muted-foreground">Total documents</p>
                </div>
                <FileText className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {documents.filter(d => d.status === 'validated').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Validés</p>
                </div>
                <FileText className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {documents.filter(d => d.status === 'pending').length}
                  </p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
                <FileText className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {documents.filter(d => d.consentStatus === 'expired').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Consentement expiré</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom de document ou praticien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="validated">Validés</SelectItem>
            <SelectItem value="rejected">Rejetés</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gradient-end" />
              Liste des documents ({filteredDocuments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucun document trouvé</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-start/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-gradient-end" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{doc.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {doc.practitionerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(doc.submittedAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {getStatusBadge(doc.status)}
                          {getConsentBadge(doc.consentStatus)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDocument(doc);
                          setIsPdfViewerOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      {doc.consentStatus === 'expired' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setIsConsentDialogOpen(true);
                          }}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Demander consentement
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedDocument(doc);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* PDF Viewer Dialog */}
      <Dialog open={isPdfViewerOpen} onOpenChange={setIsPdfViewerOpen}>
        <DialogContent className="max-w-5xl h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gradient-end" />
              {selectedDocument?.name}
            </DialogTitle>
            <DialogDescription>
              Document de {selectedDocument?.practitionerName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 h-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {selectedDocument && (
              <iframe
                src={selectedDocument.url}
                className="w-full h-full min-h-[500px]"
                title={selectedDocument.name}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPdfViewerOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Supprimer définitivement ce document
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer définitivement le document "{selectedDocument?.name}" de {selectedDocument?.practitionerName} ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDocument}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Consent Request Dialog */}
      <Dialog open={isConsentDialogOpen} onOpenChange={setIsConsentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              Demander un nouveau consentement
            </DialogTitle>
            <DialogDescription>
              Un email sera envoyé à {selectedDocument?.practitionerEmail} pour demander l'autorisation de conserver le document "{selectedDocument?.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Conformément au RGPD, le praticien devra renouveler son consentement pour que vous puissiez continuer à conserver ses documents personnels.
            </p>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> Si le praticien ne répond pas dans les 30 jours, le document devra être supprimé.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConsentDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleRequestConsent} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-1" />
              Envoyer la demande
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
