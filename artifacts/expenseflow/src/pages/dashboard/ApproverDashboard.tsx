import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, AlertTriangle, Check, X, MessageSquare, Shield } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, pendingApprovals, type Expense } from "@/lib/mock-data";

export default function ApproverDashboard() {
  const [selected, setSelected] = useState<Expense | null>(null);
  const [comment, setComment] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [approved, setApproved] = useState<string[]>([]);

  const queue = pendingApprovals.filter(e => !approved.includes(e.id));

  const handleApprove = () => { if (!selected) return; setShowOtp(true); };

  const handleOtpConfirm = () => {
    if (selected) {
      setApproved(prev => [...prev, selected.id]);
      setSelected(null);
      setShowOtp(false);
      setOtp(["", "", "", "", "", ""]);
      setComment("");
    }
  };

  const steps = ["Submitted", "Under Review", "Decision", "Payment"];

  return (
    <div className="space-y-6">
      <PageHeader title="Approver Dashboard" subtitle="Review and act on expense submissions" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Approvals"   value={queue.length.toString()} trend="Action required"   trendUp={false} icon={Clock}          iconColor="text-amber-600"  iconBg="bg-amber-50" />
        <StatCard label="Today's Queue"        value="3"                       trend="Due today"         trendUp={false} icon={AlertTriangle}   iconColor="text-red-600"    iconBg="bg-red-50" />
        <StatCard label="Approved This Week"   value="24"                      trend="Great progress"    trendUp         icon={CheckCircle}     iconColor="text-emerald-600"iconBg="bg-emerald-50" />
        <StatCard label="Budget Alerts"        value="2"                       trend="Near cap"          trendUp={false} icon={AlertTriangle}   iconColor="text-violet-600" iconBg="bg-violet-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Queue */}
        <GlassCard className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F1F5F9]">
            <h3 className="text-sm font-semibold text-slate-800">Approval Queue</h3>
          </div>
          <div className="divide-y divide-[#F8FAFC]">
            {queue.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">All caught up! No pending approvals.</div>
            )}
            {queue.map(exp => (
              <button
                key={exp.id}
                onClick={() => setSelected(exp)}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50 transition-colors"
                data-testid={`row-approval-${exp.id}`}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{exp.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{exp.submittedBy} · {formatDate(exp.date)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900 tabular-nums">{formatCurrency(exp.amount)}</p>
                  <p className="text-[10px] text-blue-600">{exp.category}</p>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Review panel */}
        <GlassCard>
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-slate-700 mb-1">Select an expense to review</p>
              <p className="text-xs text-slate-400">Click any item from the queue to see full details</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">{selected.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{selected.id}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Amount", value: formatCurrency(selected.amount) },
                  { label: "Category", value: selected.category },
                  { label: "Vendor", value: selected.vendor },
                  { label: "Submitted By", value: selected.submittedBy },
                ].map(item => (
                  <div key={item.label} className="p-2.5 rounded-lg bg-slate-50 border border-[#F1F5F9]">
                    <p className="text-[10px] text-slate-400">{item.label}</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="h-16 rounded-lg border-2 border-dashed border-[#E2E8F0] flex items-center justify-center">
                <p className="text-xs text-slate-400">Invoice preview not available (demo)</p>
              </div>

              {/* Status timeline */}
              <div>
                <p className="text-xs text-slate-400 mb-2">Status Timeline</p>
                <div className="flex items-center">
                  {steps.map((step, i) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 2 ? "bg-blue-600" : "bg-slate-100 border border-[#E2E8F0]"}`}>
                        {i < 2 && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < 1 ? "bg-blue-600" : "bg-slate-200"}`} />}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  {steps.map(s => <p key={s} className="text-[9px] text-slate-400">{s}</p>)}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 flex items-center gap-1 mb-1.5"><MessageSquare className="w-3 h-3" /> Comment</label>
                <textarea rows={2} value={comment} onChange={e => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-[#E2E8F0] text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 resize-none transition-all"
                  placeholder="Add a note..." data-testid="input-approval-comment" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1.5 flex-1 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium transition-colors justify-center"
                  data-testid="button-reject"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 flex-1 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-medium transition-colors justify-center"
                  data-testid="button-approve"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Approve
                </button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtp && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setShowOtp(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xl w-full max-w-sm p-6 pointer-events-auto text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-amber-500" />
                </div>
                <h2 className="text-base font-bold text-slate-800 mb-1">OTP Verification</h2>
                <p className="text-xs text-slate-500 mb-5">Enter the 6-digit code sent to your mobile</p>
                <div className="flex gap-2 justify-center mb-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i} maxLength={1} value={digit}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/, "");
                        const next = [...otp]; next[i] = val; setOtp(next);
                        if (val && i < 5) (document.getElementById(`otp-${i+1}`) as HTMLInputElement)?.focus();
                      }}
                      id={`otp-${i}`}
                      className="w-10 h-10 rounded-lg bg-slate-50 border border-[#E2E8F0] text-center text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      data-testid={`input-otp-${i}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mb-4">Demo code: <span className="text-blue-600 font-mono font-semibold">123456</span></p>
                <div className="flex gap-2">
                  <button onClick={() => setShowOtp(false)} className="flex-1 py-2 rounded-lg border border-[#E2E8F0] text-xs text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={handleOtpConfirm} className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors" data-testid="button-otp-confirm">Confirm & Approve</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
