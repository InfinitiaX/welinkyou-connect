import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  MousePointerClick, 
  Award, 
  UserPlus, 
  TrendingUp,
  Star,
  Clock
} from "lucide-react";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { mockPlatformStats, mockRegistrationRequests, mockPractitioners } from "@/data/mockPractitioners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const visitData = [
  { name: "Lun", visites: 420, clics: 120 },
  { name: "Mar", visites: 380, clics: 98 },
  { name: "Mer", visites: 510, clics: 145 },
  { name: "Jeu", visites: 470, clics: 132 },
  { name: "Ven", visites: 590, clics: 178 },
  { name: "Sam", visites: 320, clics: 89 },
  { name: "Dim", visites: 280, clics: 67 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const pendingRequests = mockRegistrationRequests.filter(r => r.status === 'pending');
  const topPractitioners = [...mockPractitioners]
    .sort((a, b) => b.profileViews - a.profileViews)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de la plateforme WeLinkYou</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard
          title="Praticiens actifs"
          value={mockPlatformStats.activePractitioners}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <AdminStatCard
          title="Vues totales"
          value={mockPlatformStats.totalProfileViews.toLocaleString()}
          icon={Eye}
          trend={{ value: 8, isPositive: true }}
          delay={0.1}
        />
        <AdminStatCard
          title="Clics totaux"
          value={mockPlatformStats.totalProfileClicks.toLocaleString()}
          icon={MousePointerClick}
          trend={{ value: 5, isPositive: true }}
          delay={0.2}
        />
        <AdminStatCard
          title="Praticiens certifiés"
          value={mockPlatformStats.certifiedPractitioners}
          icon={Award}
          delay={0.3}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gradient-end" />
                  Trafic de la semaine
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitData}>
                    <defs>
                      <linearGradient id="colorVisitesAdmin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(280, 85%, 55%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorClicsAdmin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="visites"
                      stroke="hsl(280, 85%, 55%)"
                      fillOpacity={1}
                      fill="url(#colorVisitesAdmin)"
                      name="Visites"
                    />
                    <Area
                      type="monotone"
                      dataKey="clics"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorClicsAdmin)"
                      name="Clics"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-gradient-end" />
                Nouvelles demandes
              </CardTitle>
              <Badge variant="secondary" className="gradient-vibrant-soft text-white">
                {pendingRequests.length}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.slice(0, 3).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-vibrant flex items-center justify-center text-white font-medium">
                      {request.firstName[0]}{request.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-primary text-sm">
                        {request.firstName} {request.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">{request.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(request.submittedAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate('/admin/demandes')}
              >
                Voir toutes les demandes
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Practitioners */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gradient-end" />
                Top praticiens (vues)
              </CardTitle>
            <Button variant="outline" onClick={() => navigate('/admin/praticiens')}>
              Voir tous
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPractitioners.map((practitioner, index) => (
                <div
                  key={practitioner.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full gradient-vibrant-soft flex items-center justify-center font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-vibrant flex items-center justify-center text-white font-medium">
                      {practitioner.firstName[0]}{practitioner.lastName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-primary">
                          {practitioner.firstName} {practitioner.lastName}
                        </p>
                        {practitioner.isCertified && (
                          <Badge className="gradient-vibrant-soft text-white text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Certifié
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{practitioner.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{practitioner.profileViews.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">vues</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{practitioner.profileClicks}</p>
                      <p className="text-xs text-muted-foreground">clics</p>
                    </div>
                    <div className="flex items-center gap-1 text-gradient-end">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{practitioner.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
