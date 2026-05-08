import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatCurrency, monthlyExpenseData, categoryData, cashFlowData, departmentBudgets, organizations } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend, LineChart, Line
} from "recharts";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Expense Trends", "By Category", "By Department", "Org Comparison"];

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

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [dateRange, setDateRange] = useState("This Month");

  const dateRanges = ["This Month", "Last Quarter", "This Year", "Custom"];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Detailed financial insights across all organizations"
        icon={BarChart3}
        actions={
          <div className="flex items-center gap-1.5">
            {dateRanges.map(d => (
              <button
                key={d}
                onClick={() => setDateRange(d)}
                className={cn("px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                  dateRange === d ? "bg-purple-600 text-white" : "bg-white/5 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("px-3.5 py-2 rounded-xl text-xs font-medium transition-all border",
              activeTab === tab
                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                : "text-muted-foreground border-white/8 hover:bg-white/5 hover:text-foreground"
            )}
            data-testid={`tab-${tab.toLowerCase().replace(/\s/g, '-')}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Total Expenses", value: "$899.1K", sub: "All orgs this month" },
              { label: "Approved", value: "$831.0K", sub: "92.4% approval rate" },
              { label: "Paid Out", value: "$738.0K", sub: "88.8% paid" },
              { label: "Avg per Expense", value: "$21.4K", sub: "Across 42 expenses" },
            ].map(item => (
              <GlassCard key={item.label} hover>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.label}</p>
                <p className="text-[10px] text-purple-400 mt-1">{item.sub}</p>
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Expense Overview</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyExpenseData.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="expenses" name="Expenses" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paid" name="Paid" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard>
              <h3 className="text-sm font-semibold text-foreground mb-4">Cash Flow Analysis</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={cashFlowData}>
                  <defs>
                    <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="inflow" name="Inflow" stroke="#10b981" strokeWidth={2} fill="url(#inflowGrad)" />
                  <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#7c3aed" strokeWidth={2} fill="url(#outflowGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </motion.div>
      )}

      {activeTab === "Expense Trends" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Expense vs Approval Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyExpenseData.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'hsl(228 20% 55%)' }} />
                <Line type="monotone" dataKey="expenses" name="Submitted" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 4 }} />
                <Line type="monotone" dataKey="approved" name="Approved" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
                <Line type="monotone" dataKey="paid" name="Paid" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      )}

      {activeTab === "By Category" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Expense Distribution by Category</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" animationDuration={800} label={({ name, value }) => `${name}: ${value}%`} labelLine={false}>
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} strokeWidth={0} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, 'Share']} contentStyle={{ background: 'hsl(228 70% 10%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {categoryData.map(cat => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                      <span className="text-foreground font-medium">{cat.name}</span>
                    </div>
                    <span className="text-muted-foreground">{cat.value}%</span>
                  </div>
                  <div className="w-full bg-white/8 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${cat.value}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {activeTab === "By Department" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Department Budget vs Spend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentBudgets}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="budget" name="Budget" fill="rgba(124,58,237,0.25)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Spent" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      )}

      {activeTab === "Org Comparison" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Organization Expense Comparison</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={organizations.map(o => ({ name: o.name.split(' ')[0], spend: o.monthlySpend, users: o.users }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="spend" name="Monthly Spend" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {organizations.map((org, i) => (
              <motion.div key={org.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <GlassCard hover>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: org.color }}>{org.initials}</div>
                    <p className="text-xs font-semibold text-foreground truncate">{org.name}</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(org.monthlySpend, org.currency)}</p>
                  <p className="text-[10px] text-muted-foreground">{org.users} users · {org.activeProjects} projects</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
