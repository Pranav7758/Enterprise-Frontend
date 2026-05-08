import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const pending = expenses.filter(e => e.status === "pending" && e.submittedBy === "Sarah Johnson").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Expenses"
        subtitle="Track and manage your expense submissions"
        icon={Receipt}
        actions={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
            data-testid="button-new-expense"
          >
            <Plus className="w-4 h-4" />
            New Expense
          </motion.button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Submitted" value={myExpenses.length.toString()} trend="This month" trendUp icon={Receipt} iconColor="text-purple-400" iconBg="bg-purple-500/10" delay={0} />
        <StatCard label="Pending Review" value={pending.toString()} trend="Awaiting approval" trendUp={false} icon={Clock} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.05} />
        <StatCard label="Approved" value={approved.toString()} trend="Ready for payment" trendUp icon={CheckCircle} iconColor="text-green-400" iconBg="bg-green-500/10" delay={0.1} />
        <StatCard label="Rejected" value={rejected.toString()} trend="Needs revision" trendUp={false} icon={XCircle} iconColor="text-red-400" iconBg="bg-red-500/10" delay={0.15} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard>
          <h3 className="font-semibold text-foreground text-sm mb-4">My Recent Expenses</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/8">
                  {["ID", "Title", "Amount", "Category", "Vendor", "Date", "Status"].map(h => (
                    <th key={h} className="text-left text-muted-foreground font-medium pb-2.5 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myExpenses.map(exp => (
                  <tr key={exp.id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-purple-400">{exp.id}</td>
                    <td className="py-2.5 pr-4 font-medium text-foreground max-w-[120px] truncate">{exp.title}</td>
                    <td className="py-2.5 pr-4 font-semibold text-foreground">{formatCurrency(exp.amount)}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{exp.category}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground max-w-[100px] truncate">{exp.vendor}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{formatDate(exp.date)}</td>
                    <td className="py-2.5"><StatusBadge status={exp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>

      {/* Create Expense Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass-card rounded-2xl border border-white/10 w-full max-w-lg p-6 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-foreground">Create New Expense</h2>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors" data-testid="button-close-modal">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Expense Title</label>
                      <input className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g. Q4 Software Licenses" data-testid="input-expense-title" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Amount (USD)</label>
                      <input type="number" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} placeholder="0.00" data-testid="input-expense-amount" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Date</label>
                      <input type="date" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} data-testid="input-expense-date" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Category</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} data-testid="select-expense-category">
                        <option value="">Select category</option>
                        {categories.map(c => <option key={c} value={c} className="bg-card">{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Vendor</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50" value={form.vendor} onChange={e => setForm(f => ({...f, vendor: e.target.value}))} data-testid="select-expense-vendor">
                        <option value="">Select vendor</option>
                        {vendors.map(v => <option key={v} value={v} className="bg-card">{v}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Notes</label>
                      <textarea rows={2} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50 resize-none" value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder="Additional context..." data-testid="input-expense-notes" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Invoice (optional)</label>
                      <div className="flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer" data-testid="input-expense-invoice">
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Drag & drop or click to upload PDF/image</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-muted-foreground hover:bg-white/5 transition-colors">Cancel</button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
                      data-testid="button-submit-expense"
                    >
                      Submit Expense
                    </motion.button>
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
