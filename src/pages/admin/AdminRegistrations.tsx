import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Clock, 
  Check, 
  X, 
  FileText, 
  Mail, 
  Phone,
  Eye
} from "lucide-react";
import { mockRegistrationRequests, RegistrationRequest } from "@/data/mockPractitioners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const AdminRegistrations = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<RegistrationRequest[]>(mockRegistrationRequests);
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: 'approved' as const } : r
      )
    );
    const request = requests.find(r => r.id === id);
    toast({
      title: "Demande approuvée",
      description: `${request?.firstName} ${request?.lastName} peut maintenant accéder à son espace praticien.`,
    });
    setIsDetailDialogOpen(false);
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: 'rejected' as const } : r
      )
    );
    const request = requests.find(r => r.id === id);
    toast({
      title: "Demande refusée",
      description: `La demande de ${request?.firstName} ${request?.lastName} a été refusée.`,
      variant: "destructive",
    });
    setIsRejectDialogOpen(false);
    setIsDetailDialogOpen(false);
    setRejectionReason("");
  };

  const openDetails = (request: RegistrationRequest) => {
    setSelectedRequest(request);
    setIsDetailDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-700">Approuvée</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700">Refusée</Badge>;
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
        <h1 className="text-3xl font-bold text-slate-900">Demandes d'inscription</h1>
        <p className="text-slate-500 mt-1">Gérez les nouvelles demandes de praticiens depuis /inscription-pro</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{pendingRequests.length}</p>
                  <p className="text-sm text-slate-500">En attente</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
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
                  <p className="text-2xl font-bold text-slate-900">
                    {requests.filter(r => r.status === 'approved').length}
                  </p>
                  <p className="text-sm text-slate-500">Approuvées</p>
                </div>
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {requests.filter(r => r.status === 'rejected').length}
                  </p>
                  <p className="text-sm text-slate-500">Refusées</p>
                </div>
                <X className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pending Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-yellow-500" />
              Demandes en attente ({pendingRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune demande en attente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {request.firstName[0]}{request.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {request.firstName} {request.lastName}
                        </h3>
                        <p className="text-sm text-slate-600">{request.specialty}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {request.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(request.submittedAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetails(request)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(request.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approuver
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsRejectDialogOpen(true);
                        }}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Refuser
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Historique des demandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {processedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                        {request.firstName[0]}{request.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {request.firstName} {request.lastName}
                        </p>
                        <p className="text-xs text-slate-500">{request.specialty}</p>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
            <DialogDescription>
              Examinez les informations du candidat avant de prendre une décision
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-white font-bold text-xl">
                  {selectedRequest.firstName[0]}{selectedRequest.lastName[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedRequest.firstName} {selectedRequest.lastName}
                  </h3>
                  <p className="text-slate-600">{selectedRequest.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-slate-500">Email</Label>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {selectedRequest.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-500">Téléphone</Label>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {selectedRequest.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-500">Description</Label>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                  {selectedRequest.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-500">Documents fournis</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-slate-500">Date de soumission</Label>
                <p className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {new Date(selectedRequest.submittedAt).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Fermer
            </Button>
            {selectedRequest?.status === 'pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsRejectDialogOpen(true);
                  }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Refuser
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => handleApprove(selectedRequest.id)}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approuver
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refuser la demande</DialogTitle>
            <DialogDescription>
              Indiquez la raison du refus (optionnel)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Raison du refus..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedRequest && handleReject(selectedRequest.id)}
            >
              Confirmer le refus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
