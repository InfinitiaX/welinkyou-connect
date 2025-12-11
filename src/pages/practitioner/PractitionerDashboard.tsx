import { motion } from "framer-motion";
import { Eye, MousePointerClick, Star, Award, TrendingUp, MessageSquare, Calendar } from "lucide-react";
import { StatCard } from "@/components/practitioner/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Mock data
const viewsData = [
  { date: "1 Nov", vues: 45 },
  { date: "5 Nov", vues: 62 },
  { date: "10 Nov", vues: 58 },
  { date: "15 Nov", vues: 89 },
  { date: "20 Nov", vues: 95 },
  { date: "25 Nov", vues: 78 },
  { date: "30 Nov", vues: 112 },
];

const recentReviews = [
  {
    id: 1,
    name: "Sophie M.",
    avatar: "",
    rating: 5,
    comment: "Excellent professionnel, très à l'écoute et compétent.",
    date: "Il y a 2 jours",
  },
  {
    id: 2,
    name: "Ahmed K.",
    avatar: "",
    rating: 4,
    comment: "Très satisfait de la consultation, je recommande.",
    date: "Il y a 5 jours",
  },
  {
    id: 3,
    name: "Marie L.",
    avatar: "",
    rating: 5,
    comment: "Service impeccable et conseils précieux.",
    date: "Il y a 1 semaine",
  },
];

const notifications = [
  {
    id: 1,
    type: "review",
    message: "Nouvelle évaluation reçue de Sophie M.",
    time: "Il y a 2h",
    read: false,
  },
  {
    id: 2,
    type: "view",
    message: "Votre profil a atteint 100 vues ce mois",
    time: "Il y a 5h",
    read: false,
  },
  {
    id: 3,
    type: "subscription",
    message: "Votre abonnement sera renouvelé dans 7 jours",
    time: "Hier",
    read: true,
  },
];

export const PractitionerDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Bonjour, Dr. Martin 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Voici un aperçu de votre activité sur WeLinkYou
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-gradient-start text-gradient-start bg-gradient-start/5">
            <Award className="w-3 h-3 mr-1" />
            Premium
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
            Profil vérifié
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Vues du profil"
          value="1,247"
          icon={Eye}
          trend={{ value: 12, isPositive: true }}
          description="Ce mois"
          delay={0.1}
        />
        <StatCard
          title="Clics sur profil"
          value="324"
          icon={MousePointerClick}
          trend={{ value: 8, isPositive: true }}
          description="Ce mois"
          delay={0.2}
        />
        <StatCard
          title="Note moyenne"
          value="4.8"
          icon={Star}
          description="Sur 47 avis"
          delay={0.3}
        />
        <StatCard
          title="Grade plateforme"
          value="Or"
          icon={Award}
          description="Top 15% des praticiens"
          delay={0.4}
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-primary">
                  Évolution des vues
                </CardTitle>
                <Badge variant="secondary" className="bg-primary/5 text-primary">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  30 derniers jours
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <defs>
                      <linearGradient id="colorVues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(280, 85%, 55%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="vues"
                      stroke="hsl(280, 85%, 55%)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVues)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                Notifications
                <Badge className="gradient-vibrant text-white text-xs">3 nouvelles</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl transition-colors ${
                    notif.read ? "bg-gray-50" : "bg-gradient-start/5 border border-gradient-start/20"
                  }`}
                >
                  <p className="text-sm text-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gradient-end" />
                Dernières évaluations
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground">
                47 avis au total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {review.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-gold text-gold"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Grade Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 shadow-sm gradient-vibrant text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Grade Or</h3>
                    <p className="text-white/70 text-sm">Prochain niveau: Platine</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Continuez à recevoir des avis positifs et à compléter votre profil pour atteindre le grade Platine.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression vers Platine</span>
                    <span className="text-gold">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-white/20" />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/80">Profil complet à 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/80">Plus de 40 avis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-white/80">Note moyenne &gt; 4.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="text-white/50">Membre depuis +1 an</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
