import { Building2, Users, DollarSign, Clock, TrendingUp, Activity } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatCurrency, formatDate, organizations, expenses, orgGrowthData, categoryData, monthlyExpenseData } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid
} from "recharts";

const CHART_COLORS = ["#2563EB", "#059669", "#D97706", "#DC2626", "#7C3AED", "#0891B2"];

const tooltipStyle = {
  background: '#fff',
  border: '1px solid #E2E8F0',
  borderRadius: 8,
  fontSize: 11,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

export default function SuperAdminDashboard() {
  const recentOrgs = organizations.slice(0, 4);
  const recentExpenses = expenses.slice(0, 6);

  const totalSpend = organizations.reduce((s, o) => s + o.monthlySpend, 0);
  const totalUsers = organizations.reduce((s, o) => s + o.users, 0);
  const pending = expenses.filter(e => e.status === 'pending').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Super Admin Dashboard" subtitle="System-wide overview across all organizations" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Organizations" value="4"                          trend="2 this quarter" trendUp      icon={Building2} iconColor="text-violet-600" iconBg="bg-violet-50" />
        <StatCard label="Total Users"          value={totalUsers.toString()}      trend="12% this month" trendUp      icon={Users}     iconColor="text-blue-600"   iconBg="bg-blue-50" />
        <StatCard label="Monthly Expenses"     value={formatCurrency(totalSpend)} trend="8.3%"           trendUp      icon={DollarSign}iconColor="text-emerald-600"iconBg="bg-emerald-50" />
        <StatCard label="Pending Approvals"    value={pending.toString()}         trend="Needs attention" trendUp={false} icon={Clock} iconColor="text-amber-600"  iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Monthly Expense Trends</h3>
              <p className="text-xs text-slate-400">All organizations combined</p>
            </div>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyExpenseData.slice(0, 5)}>
              <defs>
                <linearGradient id="gradExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatCurrency(v), '']} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#2563EB" strokeWidth={2} fill="url(#gradExp)" />
              <Area type="monotone" dataKey="paid"     name="Paid"     stroke="#059669" strokeWidth={2} fill="url(#gradPaid)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Pie */}
        <GlassCard>
          <div className="mb-3">
            <h3 className="font-semibold text-slate-800 text-sm">Expense by Category</h3>
            <p className="text-xs text-slate-400">Current month</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" animationDuration={800}>
                {categoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={0} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {categoryData.slice(0, 4).map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-slate-500">{c.name}</span>
                </div>
                <span className="font-semibold text-slate-700">{c.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Organization Growth</h3>
              <p className="text-xs text-slate-400">Onboarded organizations</p>
            </div>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={orgGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="orgs" name="Orgs" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Org list */}
        <GlassCard>
          <h3 className="font-semibold text-slate-800 text-sm mb-4">All Organizations</h3>
          <div className="space-y-1">
            {recentOrgs.map(org => (
              <div key={org.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: org.color }}>
                  {org.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{org.name}</p>
                  <p className="text-[10px] text-slate-400">{org.users} users · {org.activeProjects} projects</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800 tabular-nums">{formatCurrency(org.monthlySpend, org.currency)}</p>
                  <p className="text-[10px] text-slate-400">this month</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent expenses table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9]">
          <h3 className="text-sm font-semibold text-slate-800">Recent Expenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                {["ID", "Title", "Organization", "Amount", "Status", "Date"].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {recentExpenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-blue-600 text-[11px]">{exp.id}</td>
                  <td className="px-5 py-3 font-medium text-slate-800 max-w-[140px] truncate">{exp.title}</td>
                  <td className="px-5 py-3 text-slate-500">{exp.org}</td>
                  <td className="px-5 py-3 font-bold text-slate-900 tabular-nums">{formatCurrency(exp.amount)}</td>
                  <td className="px-5 py-3"><StatusBadge status={exp.status} /></td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(exp.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
