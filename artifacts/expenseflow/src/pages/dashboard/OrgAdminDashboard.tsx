import { Users, DollarSign, Clock, Store, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, departmentBudgets, expenses } from "@/lib/mock-data";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

const radialData = [{ name: "Budget Used", value: 78, fill: "#2563EB" }];

export default function OrgAdminDashboard() {
  const pending = expenses.filter(e => e.status === "pending");

  return (
    <div className="space-y-6">
      <PageHeader title="Organization Admin" subtitle="Acme Corp — manage users, budgets, and departments" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Active Users"       value="142"    trend="4% this week" trendUp      icon={Users}      iconColor="text-blue-600"    iconBg="bg-blue-50" />
        <StatCard label="Total Expenses"     value="$284.5K" trend="8.3%"        trendUp      icon={DollarSign} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard label="Pending Approvals"  value="12"     trend="3 urgent"     trendUp={false} icon={Clock}   iconColor="text-amber-600"  iconBg="bg-amber-50" />
        <StatCard label="Vendor Count"       value="34"     trend="2 new"        trendUp      icon={Store}      iconColor="text-violet-600"  iconBg="bg-violet-50" />
        <StatCard label="Budget Usage"       value="78%"    trend="On track"     trendUp      icon={TrendingUp} iconColor="text-blue-600"    iconBg="bg-blue-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Budget gauge */}
        <GlassCard className="flex flex-col items-center">
          <h3 className="font-semibold text-slate-800 text-sm mb-3 self-start">Budget Overview</h3>
          <ResponsiveContainer width="100%" height={160}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
              <RadialBar dataKey="value" cornerRadius={6} background={{ fill: '#F1F5F9' }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center -mt-6">
            <p className="text-3xl font-bold text-blue-600">78%</p>
            <p className="text-xs text-slate-500">of $400K used</p>
          </div>
          <p className="mt-4 text-xs text-slate-400 text-center">$88K remaining this month</p>
        </GlassCard>

        {/* Department budgets chart */}
        <GlassCard className="lg:col-span-2">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Department Budgets</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={departmentBudgets} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                formatter={(v: number) => [formatCurrency(v), '']}
                contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 11, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Bar dataKey="budget" name="Budget" fill="#DBEAFE" radius={[0, 3, 3, 0]} />
              <Bar dataKey="spent"  name="Spent"  fill="#2563EB" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Department cards */}
      <div>
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Department Overview</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {departmentBudgets.map(dept => (
            <div key={dept.name} className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all cursor-pointer">
              <p className="text-xs font-semibold text-slate-700 mb-2.5">{dept.name}</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                <div
                  className={cn("h-1.5 rounded-full transition-all", dept.percentage > 85 ? "bg-red-500" : dept.percentage > 70 ? "bg-amber-500" : "bg-blue-500")}
                  style={{ width: `${dept.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">{formatCurrency(dept.spent)}</span>
                <span className={cn("font-semibold", dept.percentage > 85 ? "text-red-600" : dept.percentage > 70 ? "text-amber-600" : "text-emerald-600")}>{dept.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending approvals */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Pending Approvals</h3>
          <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />{pending.length} pending
          </span>
        </div>
        <div className="divide-y divide-[#F8FAFC]">
          {pending.slice(0, 5).map(exp => (
            <div key={exp.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <span className="font-mono text-[11px] text-blue-600 w-20 shrink-0">{exp.id}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800 truncate">{exp.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{exp.submittedBy}</p>
              </div>
              <span className="text-sm font-bold text-slate-900 tabular-nums">{formatCurrency(exp.amount)}</span>
              <StatusBadge status={exp.status} />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
