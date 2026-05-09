import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, DollarSign, BarChart3, CheckCircle, X, Upload } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatCurrency, paymentQueue, cashFlowData } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  background: '#fff',
  border: '1px solid #E2E8F0',
  borderRadius: 8,
  fontSize: 11,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

const payStatusConfig: Record<string, { label: string; className: string }> = {
  pending_payment: { label: "Pending",    className: "text-amber-700 bg-amber-50 border border-amber-200" },
  processing:      { label: "Processing", className: "text-blue-700 bg-blue-50 border border-blue-200" },
  completed:       { label: "Completed",  className: "text-emerald-700 bg-emerald-50 border border-emerald-200" },
};

export default function FinanceDashboard() {
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentQueue[0] | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Finance Dashboard" subtitle="Payment processing and reconciliation" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Approved for Payment" value="$47.2K" trend="12 transactions" trendUp      icon={CheckCircle} iconColor="text-emerald-600"iconBg="bg-emerald-50" />
        <StatCard label="Payment Queue"        value="4"      trend="Process today"   trendUp={false}icon={CreditCard}  iconColor="text-blue-600"   iconBg="bg-blue-50" />
        <StatCard label="Bank Balance"         value="$1.24M" trend="Updated today"   trendUp       icon={DollarSign}  iconColor="text-violet-600"  iconBg="bg-violet-50" />
        <StatCard label="Reconciled"           value="89%"    trend="11% pending"     trendUp       icon={BarChart3}   iconColor="text-amber-600"   iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Cash Flow</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatCurrency(v), '']} />
              <Area type="monotone" dataKey="inflow"  name="Inflow"  stroke="#059669" strokeWidth={2} fill="url(#inflow)" />
              <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#2563EB" strokeWidth={2} fill="url(#outflow)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Payment Analytics</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatCurrency(v), '']} />
              <Line type="monotone" dataKey="outflow" name="Payments" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Payment Queue */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Payment Queue</h3>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                {["Ref", "Expense", "Vendor", "Amount", "Bank Account", "Date", "Status", ""].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {paymentQueue.map(pq => (
                <tr key={pq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600 text-[11px]">{pq.id}</td>
                  <td className="px-4 py-3 max-w-[120px] truncate font-medium text-slate-800">{pq.expense.title}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[100px] truncate">{pq.expense.vendor}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 tabular-nums">{formatCurrency(pq.expense.amount)}</td>
                  <td className="px-4 py-3 text-slate-500">{pq.bankAccount}</td>
                  <td className="px-4 py-3 text-slate-500">{pq.processingDate}</td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-medium", payStatusConfig[pq.paymentStatus]?.className)}>
                      {payStatusConfig[pq.paymentStatus]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => { setSelectedPayment(pq); setShowPayModal(true); }}
                      className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors text-[10px] font-medium"
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

      {/* Bank statement upload */}
      <GlassCard>
        <h3 className="font-semibold text-slate-800 text-sm mb-3">Upload Bank Statement</h3>
        <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Drag and drop your bank statement here</p>
          <p className="text-xs text-slate-400 mt-1">PDF, CSV, XLS formats supported</p>
          <button className="mt-3 px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors">Browse Files</button>
        </div>
      </GlassCard>

      {/* Process Payment Modal */}
      <AnimatePresence>
        {showPayModal && selectedPayment && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setShowPayModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xl w-full max-w-md p-6 pointer-events-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-slate-800">Process Payment</h2>
                  <button onClick={() => setShowPayModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400" data-testid="button-close-pay-modal"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3 text-xs mb-5">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-blue-600 text-[10px] font-medium uppercase tracking-wider">Payment Amount</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{formatCurrency(selectedPayment.expense.amount)}</p>
                    <p className="text-slate-500 mt-0.5">To: {selectedPayment.expense.vendor}</p>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Bank Account</label>
                    <select className="w-full px-3 py-2 rounded-lg bg-white border border-[#E2E8F0] text-slate-700 focus:outline-none focus:border-blue-500">
                      <option>{selectedPayment.bankAccount}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Reference Note</label>
                    <input className="w-full px-3 py-2 rounded-lg bg-white border border-[#E2E8F0] text-slate-700 focus:outline-none focus:border-blue-500" defaultValue={`Payment for ${selectedPayment.expense.id}`} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowPayModal(false)} className="flex-1 py-2.5 rounded-lg border border-[#E2E8F0] text-sm text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={() => setShowPayModal(false)} className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors" data-testid="button-confirm-payment">Confirm Payment</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
