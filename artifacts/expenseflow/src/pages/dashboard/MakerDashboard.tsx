import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Receipt, Clock, CheckCircle, XCircle, Plus, Upload, X } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, myExpenses, expenses } from "@/lib/mock-data";

export default function MakerDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", amount: "", category: "", vendor: "", date: "", notes: "" });

  const categories = ["Technology", "Marketing", "Operations", "Legal", "HR & Training", "Events", "Design", "Travel", "Software"];
  const vendors = ["Amazon Web Services", "Adobe Systems", "Digital Spark Agency", "Marriott Hotels", "Dell Technologies", "Salesforce Inc"];

  const approved = expenses.filter(e => e.status === "approved" && e.submittedBy === "Sarah Johnson").length;
  const rejected = expenses.filter(e => e.status === "rejected" && e.submittedBy === "Sarah Johnson").length;
  const pending  = expenses.filter(e => e.status === "pending"  && e.submittedBy === "Sarah Johnson").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Expenses"
        subtitle="Track and manage your expense submissions"
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            data-testid="button-new-expense"
          >
            <Plus className="w-4 h-4" />
            New Expense
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Submitted" value={myExpenses.length.toString()} trend="This month" trendUp icon={Receipt} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard label="Pending Review"  value={pending.toString()}           trend="Awaiting" trendUp={false} icon={Clock}       iconColor="text-amber-600"  iconBg="bg-amber-50" />
        <StatCard label="Approved"        value={approved.toString()}          trend="Paid out" trendUp icon={CheckCircle} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard label="Rejected"        value={rejected.toString()}          trend="To revise" trendUp={false} icon={XCircle}     iconColor="text-red-600"    iconBg="bg-red-50" />
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9]">
          <h3 className="text-sm font-semibold text-slate-800">My Recent Expenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                {["ID", "Title", "Amount", "Category", "Vendor", "Date", "Status"].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {myExpenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-blue-600 text-[11px] whitespace-nowrap">{exp.id}</td>
                  <td className="px-5 py-3 font-medium text-slate-800 max-w-[140px] truncate">{exp.title}</td>
                  <td className="px-5 py-3 font-semibold text-slate-900 tabular-nums whitespace-nowrap">{formatCurrency(exp.amount)}</td>
                  <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{exp.category}</td>
                  <td className="px-5 py-3 text-slate-500 max-w-[120px] truncate">{exp.vendor}</td>
                  <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{formatDate(exp.date)}</td>
                  <td className="px-5 py-3"><StatusBadge status={exp.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Create Expense Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-lg p-6 pointer-events-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-slate-900">New Expense</h2>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" data-testid="button-close-modal">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">Expense Title</label>
                      <input className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g. Q4 Software Licenses" data-testid="input-expense-title" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Amount (USD)</label>
                      <input type="number" className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} placeholder="0.00" data-testid="input-expense-amount" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
                      <input type="date" className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} data-testid="input-expense-date" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                      <select className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} data-testid="select-expense-category">
                        <option value="">Select category</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Vendor</label>
                      <select className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" value={form.vendor} onChange={e => setForm(f => ({...f, vendor: e.target.value}))} data-testid="select-expense-vendor">
                        <option value="">Select vendor</option>
                        {vendors.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">Notes</label>
                      <textarea rows={2} className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none" value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder="Additional context..." data-testid="input-expense-notes" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">Invoice (optional)</label>
                      <div className="flex items-center justify-center gap-3 p-4 rounded-lg border-2 border-dashed border-[#E2E8F0] hover:border-blue-400 hover:bg-blue-50/40 transition-colors cursor-pointer" data-testid="input-expense-invoice">
                        <Upload className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-500">Drag & drop or click to upload PDF/image</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-[#E2E8F0] text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                      data-testid="button-submit-expense"
                    >
                      Submit Expense
                    </button>
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
