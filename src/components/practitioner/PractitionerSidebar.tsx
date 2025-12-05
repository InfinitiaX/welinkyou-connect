import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";

const menuItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    path: "/praticien/dashboard",
  },
  {
    title: "Mon Profil",
    icon: User,
    path: "/praticien/profil",
  },
  {
    title: "Mon Abonnement",
    icon: CreditCard,
    path: "/praticien/abonnement",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/praticien/parametres",
  },
];

interface PractitionerSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const PractitionerSidebar = ({ collapsed, onToggle }: PractitionerSidebarProps) => {
  const location = useLocation();
  const [notifications] = useState(3);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-primary z-50 flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <img src={logo} alt="WeLinkYou" className="h-12 w-auto" />
                <div>
                  <p className="text-white/60 text-xs">Espace Praticien</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {collapsed && (
            <img src={logo} alt="WeLinkYou" className="h-10 w-auto mx-auto" />
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-gold text-white hover:bg-gold-light shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-white/10 text-gold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActive ? "text-gold" : "group-hover:text-gold"
              )} />
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Notifications */}
      <div className="px-3 py-2">
        <div className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition-colors cursor-pointer",
          collapsed && "justify-center"
        )}>
          <div className="relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-gold text-white text-xs">
                {notifications}
              </Badge>
            )}
          </div>
          {!collapsed && (
            <span className="text-sm font-medium">Notifications</span>
          )}
        </div>
      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-white/10">
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center border border-gold/30">
            <User className="w-5 h-5 text-gold" />
          </div>
          
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-white text-sm font-medium truncate">Dr. Martin</p>
                <p className="text-white/50 text-xs truncate">Premium</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          variant="ghost"
          className={cn(
            "w-full mt-3 text-white/60 hover:text-white hover:bg-white/10",
            collapsed && "px-2"
          )}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2 text-sm">Déconnexion</span>}
        </Button>
      </div>
    </motion.aside>
  );
};
