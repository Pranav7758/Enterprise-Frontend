import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

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

export function StatCard({ label, value, trend, trendUp, icon: Icon, iconColor = 'text-blue-600', iconBg = 'bg-blue-50' }: StatCardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", iconBg)}>
          <Icon className={cn("w-4.5 h-4.5", iconColor)} style={{ width: 18, height: 18 }} />
        </div>
        {trend && (
          <span className={cn(
            "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
            trendUp
              ? "text-emerald-700 bg-emerald-50"
              : "text-red-600 bg-red-50"
          )}>
            {trendUp
              ? <TrendingUp className="w-3 h-3" />
              : <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}
