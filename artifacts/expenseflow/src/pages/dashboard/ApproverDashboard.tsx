import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const handleApprove = () => {
    if (!selected) return;
    setShowOtp(true);
  };

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
      <PageHeader title="Approver Dashboard" subtitle="Review and act on expense submissions" icon={CheckCircle} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Approvals" value={queue.length.toString()} trend="Action required" trendUp={false} icon={Clock} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0} />
        <StatCard label="Today's Queue" value="3" trend="Due today" trendUp={false} icon={AlertTriangle} iconColor="text-red-400" iconBg="bg-red-500/10" delay={0.05} />
        <StatCard label="Approved This Week" value="24" trend="Well done" trendUp icon={CheckCircle} iconColor="text-green-400" iconBg="bg-green-500/10" delay={0.1} />
        <StatCard label="Budget Alerts" value="2" trend="Departments near cap" trendUp={false} icon={AlertTriangle} iconColor="text-purple-400" iconBg="bg-purple-500/10" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard>
            <h3 className="font-semibold text-foreground text-sm mb-4">Approval Queue</h3>
            <div className="space-y-2">
              {queue.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">All caught up! No pending approvals.</div>
              )}
              {queue.map(exp => (
                <div
                  key={exp.id}
                  onClick={() => setSelected(exp)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-purple-500/20 transition-all"
                  data-testid={`row-approval-${exp.id}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{exp.title}</p>
                    <p className="text-[10px] text-muted-foreground">{exp.submittedBy} · {formatDate(exp.date)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">{formatCurrency(exp.amount)}</p>
                    <p className="text-[10px] text-purple-400">{exp.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Review panel */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard className="h-full">
            {!selected ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Select an expense to review</p>
                <p className="text-xs text-muted-foreground">Click any item from the queue to see its full details</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{selected.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{selected.id}</p>
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
                    <div key={item.label} className="p-2.5 rounded-xl bg-white/4">
                      <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      <p className="text-xs font-semibold text-foreground mt-0.5 truncate">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Invoice placeholder */}
                <div className="h-20 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Invoice preview not available (demo)</p>
                </div>

                {/* Status timeline */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status Timeline</p>
                  <div className="flex items-center gap-0">
                    {steps.map((step, i) => (
                      <div key={step} className="flex items-center flex-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 2 ? "bg-purple-500" : "bg-white/10"}`}>
                          {i < 2 && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          {i < steps.length - 1 && <div className={`h-0.5 ${i < 1 ? "bg-purple-500" : "bg-white/10"}`} />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {steps.map(s => <p key={s} className="text-[9px] text-muted-foreground">{s}</p>)}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><MessageSquare className="w-3 h-3" /> Comment</label>
                  <textarea rows={2} value={comment} onChange={e => setComment(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-foreground focus:outline-none focus:border-purple-500/40 resize-none" placeholder="Add a note..." data-testid="input-approval-comment" />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-1.5 flex-1 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors justify-center"
                    data-testid="button-reject"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex items-center gap-1.5 flex-1 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 text-xs font-medium transition-colors justify-center"
                    data-testid="button-approve"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtp && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 backdrop-blur-md z-50" onClick={() => setShowOtp(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="glass-card rounded-2xl border border-white/10 w-full max-w-sm p-6 pointer-events-auto text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-base font-bold text-foreground mb-1">OTP Verification</h2>
                <p className="text-xs text-muted-foreground mb-5">Enter the 6-digit code sent to your registered mobile</p>
                <div className="flex gap-2 justify-center mb-5">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      maxLength={1}
                      value={digit}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/, "");
                        const next = [...otp];
                        next[i] = val;
                        setOtp(next);
                        if (val && i < 5) (document.getElementById(`otp-${i+1}`) as HTMLInputElement)?.focus();
                      }}
                      id={`otp-${i}`}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 text-center text-sm font-bold text-foreground focus:outline-none focus:border-purple-500/50"
                      data-testid={`input-otp-${i}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-4">Demo code: <span className="text-purple-400 font-mono">123456</span></p>
                <div className="flex gap-2">
                  <button onClick={() => setShowOtp(false)} className="flex-1 py-2 rounded-xl border border-white/10 text-xs text-muted-foreground hover:bg-white/5 transition-colors">Cancel</button>
                  <button onClick={handleOtpConfirm} className="flex-1 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 text-xs font-medium transition-colors" data-testid="button-otp-confirm">Confirm & Approve</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
