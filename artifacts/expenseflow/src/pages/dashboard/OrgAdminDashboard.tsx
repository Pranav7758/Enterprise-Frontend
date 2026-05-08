import { motion } from "framer-motion";
import { Users, DollarSign, Clock, Store, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, departmentBudgets, expenses } from "@/lib/mock-data";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

const radialData = [{ name: "Budget Used", value: 78, fill: "#7c3aed" }];

export default function OrgAdminDashboard() {
  const pending = expenses.filter(e => e.status === "pending");

  return (
    <div className="space-y-6">
      <PageHeader title="Organization Admin" subtitle="Acme Corp — manage users, budgets, and departments" icon={Users} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Active Users" value="142" trend="4% this week" trendUp icon={Users} iconColor="text-purple-400" iconBg="bg-purple-500/10" delay={0} />
        <StatCard label="Total Expenses" value="$284.5K" trend="8.3%" trendUp icon={DollarSign} iconColor="text-green-400" iconBg="bg-green-500/10" delay={0.05} />
        <StatCard label="Pending Approvals" value="12" trend="3 urgent" trendUp={false} icon={Clock} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.1} />
        <StatCard label="Vendor Count" value="34" trend="2 new" trendUp icon={Store} iconColor="text-cyan-400" iconBg="bg-cyan-500/10" delay={0.15} />
        <StatCard label="Budget Usage" value="78%" trend="On track" trendUp icon={TrendingUp} iconColor="text-purple-400" iconBg="bg-purple-500/10" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Budget gauge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard className="flex flex-col items-center">
            <h3 className="font-semibold text-foreground text-sm mb-4 self-start">Budget Overview</h3>
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'rgba(255,255,255,0.05)' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-center -mt-8">
              <p className="text-3xl font-bold text-purple-400">78%</p>
              <p className="text-xs text-muted-foreground">of $400K used</p>
            </div>
            <p className="mt-4 text-xs text-muted-foreground text-center">$88K remaining for this month</p>
          </GlassCard>
        </motion.div>

        {/* Department budgets */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <GlassCard>
            <h3 className="font-semibold text-foreground text-sm mb-4">Department Budgets</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={departmentBudgets} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip formatter={(v: number) => [formatCurrency(v), '']} contentStyle={{ background: 'hsl(228 70% 10%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }} />
                <Bar dataKey="budget" name="Budget" fill="rgba(124,58,237,0.2)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="spent" name="Spent" fill="#7c3aed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Department cards */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h3 className="font-semibold text-foreground text-sm mb-3">Department Overview</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {departmentBudgets.map((dept, i) => (
            <GlassCard key={dept.name} hover className="p-4">
              <p className="text-xs font-semibold text-foreground mb-2">{dept.name}</p>
              <div className="w-full bg-white/8 rounded-full h-1.5 mb-2">
                <div
                  className={cn("h-1.5 rounded-full transition-all", dept.percentage > 85 ? "bg-red-400" : dept.percentage > 70 ? "bg-amber-400" : "bg-purple-500")}
                  style={{ width: `${dept.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">{formatCurrency(dept.spent)}</span>
                <span className={cn("font-semibold", dept.percentage > 85 ? "text-red-400" : dept.percentage > 70 ? "text-amber-400" : "text-green-400")}>{dept.percentage}%</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Pending approvals */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm">Pending Approvals</h3>
            <span className="flex items-center gap-1.5 text-xs text-amber-400"><AlertTriangle className="w-3.5 h-3.5" />{pending.length} pending</span>
          </div>
          <div className="space-y-2">
            {pending.slice(0, 5).map(exp => (
              <div key={exp.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/4 transition-colors">
                <span className="font-mono text-xs text-purple-400 w-20 shrink-0">{exp.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{exp.title}</p>
                  <p className="text-[10px] text-muted-foreground">{exp.submittedBy}</p>
                </div>
                <span className="text-sm font-bold text-foreground">{formatCurrency(exp.amount)}</span>
                <StatusBadge status={exp.status} />
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
