import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  delay?: number;
}

const colorVariants = {
  blue: "from-blue-500/20 to-blue-500/5 text-blue-600",
  green: "from-green-500/20 to-green-500/5 text-green-600",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-600",
  red: "from-red-500/20 to-red-500/5 text-red-600",
  purple: "from-purple-500/20 to-purple-500/5 text-purple-600",
};

export const AdminStatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'blue',
  delay = 0 
}: AdminStatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
          colorVariants[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive 
              ? "text-green-600 bg-green-50" 
              : "text-red-500 bg-red-50"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>

      <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-sm text-slate-500">{title}</p>
    </motion.div>
  );
};
