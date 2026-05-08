import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  delay?: number;
}

export function StatCard({ label, value, trend, trendUp, icon: Icon, iconColor = 'text-purple-400', iconBg = 'bg-purple-500/10', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    >
      <GlassCard hover glow="purple" className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className={cn("p-2.5 rounded-xl", iconBg)}>
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
          {trend && (
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trendUp
                ? "text-green-400 bg-green-400/10"
                : "text-red-400 bg-red-400/10"
            )}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
