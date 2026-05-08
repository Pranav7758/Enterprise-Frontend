import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, XCircle, CreditCard, Shield, AlertCircle, Settings, Check } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { notifications, type Notification } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type FilterType = "all" | Notification["type"];

const filters: Array<{ value: FilterType; label: string }> = [
  { value: "all", label: "All" },
  { value: "approval", label: "Approvals" },
  { value: "payment", label: "Payments" },
  { value: "rejected", label: "Alerts" },
  { value: "otp", label: "Security" },
  { value: "system", label: "System" },
];

const typeConfig: Record<Notification["type"], { icon: React.ElementType; color: string; bg: string }> = {
  approval: { icon: CheckCircle, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  rejected: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  payment: { icon: CreditCard, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  otp: { icon: Shield, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  settlement: { icon: AlertCircle, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  system: { icon: Settings, color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20" },
};

function timeAgo(dateStr: string): string {
  const now = new Date("2026-05-08T12:00:00");
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [readState, setReadState] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map(n => [n.id, n.read]))
  );

  const markAllRead = () => {
    const all = Object.fromEntries(notifications.map(n => [n.id, true]));
    setReadState(all);
  };

  const markRead = (id: string) => {
    setReadState(prev => ({ ...prev, [id]: true }));
  };

  const filtered = notifications.filter(n => filter === "all" || n.type === filter);
  const unreadCount = filtered.filter(n => !readState[n.id]).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notifications`}
        icon={Bell}
        actions={
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:bg-white/8 transition-colors"
            data-testid="button-mark-all-read"
          >
            <Check className="w-3.5 h-3.5" />
            Mark all read
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn("px-3.5 py-2 rounded-xl text-xs font-medium transition-all border",
              filter === f.value
                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                : "text-muted-foreground border-white/8 hover:bg-white/5 hover:text-foreground"
            )}
            data-testid={`filter-notif-${f.value}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {filtered.map((notif, i) => {
          const config = typeConfig[notif.type];
          const isRead = readState[notif.id];
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => markRead(notif.id)}
              className={cn(
                "flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all",
                isRead
                  ? "glass-card border-white/6 hover:border-white/10"
                  : "border-purple-500/20 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.08)]",
                !isRead && "bg-purple-500/5"
              )}
              data-testid={`notif-${notif.id}`}
            >
              {/* Icon */}
              <div className={cn("p-2.5 rounded-xl border shrink-0", config.bg)}>
                <config.icon className={cn("w-4 h-4", config.color)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-semibold", isRead ? "text-muted-foreground" : "text-foreground")}>
                    {notif.title}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(notif.timestamp)}</span>
                    {!isRead && <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
