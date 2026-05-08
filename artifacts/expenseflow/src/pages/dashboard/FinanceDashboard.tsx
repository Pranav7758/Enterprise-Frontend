import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, DollarSign, BarChart3, CheckCircle, X } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatCurrency, paymentQueue, cashFlowData } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

export default function FinanceDashboard() {
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentQueue[0] | null>(null);

  const payStatusColors: Record<string, string> = {
    pending_payment: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    processing: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    completed: "text-green-400 bg-green-400/10 border-green-400/20",
  };
  const payStatusLabels: Record<string, string> = {
    pending_payment: "Pending", processing: "Processing", completed: "Completed"
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Finance Dashboard" subtitle="Payment processing and reconciliation" icon={CreditCard} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Approved for Payment" value="$47.2K" trend="12 transactions" trendUp icon={CheckCircle} iconColor="text-green-400" iconBg="bg-green-500/10" delay={0} />
        <StatCard label="Payment Queue" value="4" trend="Process today" trendUp={false} icon={CreditCard} iconColor="text-purple-400" iconBg="bg-purple-500/10" delay={0.05} />
        <StatCard label="Bank Balance" value="$1.24M" trend="Updated today" trendUp icon={DollarSign} iconColor="text-cyan-400" iconBg="bg-cyan-500/10" delay={0.1} />
        <StatCard label="Reconciled" value="89%" trend="11% pending" trendUp icon={BarChart3} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard>
            <h3 className="font-semibold text-foreground text-sm mb-4">Cash Flow</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: 'hsl(228 70% 10%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }} formatter={(v: number) => [formatCurrency(v), '']} />
                <Area type="monotone" dataKey="inflow" name="Inflow" stroke="#10b981" strokeWidth={2} fill="url(#inflow)" />
                <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#7c3aed" strokeWidth={2} fill="url(#outflow)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard>
            <h3 className="font-semibold text-foreground text-sm mb-4">Payment Analytics</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(228 20% 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: 'hsl(228 70% 10%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }} formatter={(v: number) => [formatCurrency(v), '']} />
                <Line type="monotone" dataKey="outflow" name="Payments" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Payment Queue */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm">Payment Queue</h3>
            <button className="text-xs text-purple-400 hover:text-purple-300">Export</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/8">
                  {["Ref", "Expense", "Vendor", "Amount", "Bank Account", "Date", "Status", "Action"].map(h => (
                    <th key={h} className="text-left text-muted-foreground font-medium pb-2.5 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentQueue.map(pq => (
                  <tr key={pq.id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-purple-400">{pq.id}</td>
                    <td className="py-2.5 pr-4 max-w-[120px] truncate font-medium text-foreground">{pq.expense.title}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground max-w-[100px] truncate">{pq.expense.vendor}</td>
                    <td className="py-2.5 pr-4 font-bold text-foreground">{formatCurrency(pq.expense.amount)}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{pq.bankAccount}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{pq.processingDate}</td>
                    <td className="py-2.5 pr-4">
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium border", payStatusColors[pq.paymentStatus])}>
                        {payStatusLabels[pq.paymentStatus]}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => { setSelectedPayment(pq); setShowPayModal(true); }}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors text-[10px] font-medium"
                        data-testid={`button-process-${pq.id}`}
                      >
                        Process
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>

      {/* Bank statement upload */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <GlassCard>
          <h3 className="font-semibold text-foreground text-sm mb-3">Upload Bank Statement</h3>
          <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors cursor-pointer">
            <DollarSign className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Drag and drop your bank statement here</p>
            <p className="text-xs text-muted-foreground mt-1">Supports PDF, CSV, XLS formats</p>
            <button className="mt-3 px-4 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium hover:bg-purple-500/30 transition-colors">Browse Files</button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Process Payment Modal */}
      <AnimatePresence>
        {showPayModal && selectedPayment && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 backdrop-blur-md z-50" onClick={() => setShowPayModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="glass-card rounded-2xl border border-white/10 w-full max-w-md p-6 pointer-events-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-foreground">Process Payment</h2>
                  <button onClick={() => setShowPayModal(false)} className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground" data-testid="button-close-pay-modal"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <p className="text-muted-foreground">Payment Amount</p>
                    <p className="text-2xl font-bold text-foreground mt-0.5">{formatCurrency(selectedPayment.expense.amount)}</p>
                    <p className="text-muted-foreground mt-0.5">To: {selectedPayment.expense.vendor}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground block mb-1">Bank Account</label>
                    <select className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-foreground focus:outline-none">
                      <option className="bg-card">{selectedPayment.bankAccount}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-muted-foreground block mb-1">Reference Note</label>
                    <input className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-foreground focus:outline-none" defaultValue={`Payment for ${selectedPayment.expense.id}`} />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setShowPayModal(false)} className="flex-1 py-2 rounded-xl border border-white/10 text-muted-foreground hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={() => setShowPayModal(false)} className="flex-1 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold hover:bg-green-500/30 transition-colors" data-testid="button-confirm-payment">Confirm Payment</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
