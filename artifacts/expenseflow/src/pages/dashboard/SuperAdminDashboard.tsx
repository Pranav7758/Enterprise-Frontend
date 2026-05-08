import { motion } from "framer-motion";
import { Building2, Users, DollarSign, Clock, TrendingUp, Activity } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatCurrency, formatDate, organizations, expenses, orgGrowthData, categoryData, monthlyExpenseData } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, CartesianGrid
} from "recharts";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-3 py-2 border border-white/10 text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SuperAdminDashboard() {
  const recentOrgs = organizations.slice(0, 4);
  const recentExpenses = expenses.slice(0, 6);

  const totalSpend = organizations.reduce((s, o) => s + o.monthlySpend, 0);
  const totalUsers = organizations.reduce((s, o) => s + o.users, 0);
  const pending = expenses.filter(e => e.status === 'pending').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Super Admin Dashboard" subtitle="System-wide overview across all organizations" icon={Building2} />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Organizations" value="4" trend="2 this quarter" trendUp icon={Building2} iconColor="text-purple-400" iconBg="bg-purple-500/10" delay={0} />
        <StatCard label="Total Users" value={totalUsers.toString()} trend="12% this month" trendUp icon={Users} iconColor="text-cyan-400" iconBg="bg-cyan-500/10" delay={0.05} />
        <StatCard label="Monthly Expenses" value={formatCurrency(totalSpend)} trend="8.3%" trendUp icon={DollarSign} iconColor="text-green-400" iconBg="bg-green-500/10" delay={0.1} />
        <StatCard label="Pending Approvals" value={pending.toString()} trend="Needs attention" trendUp={false} icon={Clock} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.15} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Org growth */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Monthly Expense Trends</h3>
                <p className="text-xs text-muted-foreground">All organizations combined</p>
              </div>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyExpenseData.slice(0, 5)}>
                <defs>
                  <linearGradient id="gradExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#7c3aed" strokeWidth={2} fill="url(#gradExp)" />
                <Area type="monotone" dataKey="paid" name="Paid" stroke="#06b6d4" strokeWidth={2} fill="url(#gradPaid)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Category breakdown */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard className="h-full">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground text-sm">Expense by Category</h3>
              <p className="text-xs text-muted-foreground">Current month</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" animationDuration={800}>
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} strokeWidth={0} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, '']} content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return <div className="glass-card rounded-xl px-3 py-2 border border-white/10 text-xs"><p style={{ color: d.color }} className="font-semibold">{d.name}: {d.value}%</p></div>;
                  }
                  return null;
                }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {categoryData.slice(0, 4).map(c => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground">{c.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{c.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Org growth bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Organization Growth</h3>
                <p className="text-xs text-muted-foreground">Onboarded organizations over time</p>
              </div>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={orgGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orgs" name="Orgs" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Organizations table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <GlassCard className="h-full">
            <h3 className="font-semibold text-foreground text-sm mb-4">All Organizations</h3>
            <div className="space-y-2">
              {recentOrgs.map(org => (
                <div key={org.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/4 transition-colors">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: org.color }}>
                    {org.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{org.name}</p>
                    <p className="text-[10px] text-muted-foreground">{org.users} users · {org.activeProjects} projects</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-foreground">{formatCurrency(org.monthlySpend, org.currency)}</p>
                    <p className="text-[10px] text-muted-foreground">this month</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Recent activity */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <GlassCard>
          <h3 className="font-semibold text-foreground text-sm mb-4">Recent Expenses</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left text-muted-foreground font-medium pb-2.5">ID</th>
                  <th className="text-left text-muted-foreground font-medium pb-2.5">Title</th>
                  <th className="text-left text-muted-foreground font-medium pb-2.5 hidden md:table-cell">Organization</th>
                  <th className="text-left text-muted-foreground font-medium pb-2.5">Amount</th>
                  <th className="text-left text-muted-foreground font-medium pb-2.5">Status</th>
                  <th className="text-left text-muted-foreground font-medium pb-2.5 hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map(exp => (
                  <tr key={exp.id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                    <td className="py-2.5 font-mono text-purple-400">{exp.id}</td>
                    <td className="py-2.5 font-medium text-foreground max-w-[140px] truncate">{exp.title}</td>
                    <td className="py-2.5 text-muted-foreground hidden md:table-cell">{exp.org}</td>
                    <td className="py-2.5 font-semibold text-foreground">{formatCurrency(exp.amount)}</td>
                    <td className="py-2.5"><StatusBadge status={exp.status} /></td>
                    <td className="py-2.5 text-muted-foreground hidden sm:table-cell">{formatDate(exp.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
