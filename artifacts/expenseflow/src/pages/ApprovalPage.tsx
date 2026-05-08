import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, Check, X } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, expenses } from "@/lib/mock-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

const stages = [
  { label: "Pending", status: "pending", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Approved", status: "approved", icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
  { label: "Rejected", status: "rejected", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
];

export default function ApprovalPage() {
  const [localApproved, setLocalApproved] = useState<string[]>([]);
  const [localRejected, setLocalRejected] = useState<string[]>([]);

  const getStatus = (id: string) => {
    if (localApproved.includes(id)) return "approved";
    if (localRejected.includes(id)) return "rejected";
    return null;
  };

  const pendingExpenses = expenses.filter(e => e.status === "pending" && !localApproved.includes(e.id) && !localRejected.includes(e.id));
  const approvedExpenses = [...expenses.filter(e => e.status === "approved"), ...expenses.filter(e => localApproved.includes(e.id))];
  const rejectedExpenses = [...expenses.filter(e => e.status === "rejected"), ...expenses.filter(e => localRejected.includes(e.id))];

  const columnData = [pendingExpenses, approvedExpenses, rejectedExpenses];

  return (
    <div className="space-y-5">
      <PageHeader title="Approval Workflow" subtitle="Review, approve, or reject expense submissions" icon={CheckCircle} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {stages.map((stage, si) => {
          const stageExpenses = columnData[si];
          return (
            <motion.div key={stage.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.08 }}>
              <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(13,21,53,0.5)" }}>
                {/* Column header */}
                <div className="flex items-center gap-2.5 p-4 border-b border-white/8">
                  <div className={cn("p-1.5 rounded-lg", stage.bg)}>
                    <stage.icon className={cn("w-3.5 h-3.5", stage.color)} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{stage.label}</h3>
                  <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-white/8 text-muted-foreground">
                    {stageExpenses.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="p-3 space-y-2.5 min-h-[200px]">
                  {stageExpenses.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground">No expenses here</div>
                  )}
                  {stageExpenses.slice(0, 6).map(exp => {
                    const localStatus = getStatus(exp.id);
                    const displayStatus = localStatus ?? exp.status;
                    return (
                      <div key={exp.id} className="glass-card rounded-xl p-3 border border-white/6 hover:border-white/12 transition-all">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-xs font-semibold text-foreground leading-tight flex-1">{exp.title}</p>
                          <StatusBadge status={displayStatus as "draft" | "pending" | "approved" | "rejected" | "paid"} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mb-1">{exp.submittedBy} · {formatDate(exp.date)}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-foreground">{formatCurrency(exp.amount)}</span>
                          {stage.status === "pending" && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => setLocalRejected(p => [...p, exp.id])}
                                className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                data-testid={`button-reject-${exp.id}`}
                              >
                                <X className="w-3 h-3 text-red-400" />
                              </button>
                              <button
                                onClick={() => setLocalApproved(p => [...p, exp.id])}
                                className="w-6 h-6 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                                data-testid={`button-approve-${exp.id}`}
                              >
                                <Check className="w-3 h-3 text-green-400" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Audit trail */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-4">Approval Audit Trail</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/8">
                  {["Expense ID", "Title", "Submitted By", "Amount", "Action", "By", "Date"].map(h => (
                    <th key={h} className="text-left text-muted-foreground font-medium pb-2.5 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expenses.filter(e => e.approvedBy).slice(0, 6).map(exp => (
                  <tr key={exp.id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-purple-400">{exp.id}</td>
                    <td className="py-2.5 pr-4 max-w-[120px] truncate font-medium text-foreground">{exp.title}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{exp.submittedBy}</td>
                    <td className="py-2.5 pr-4 font-bold text-foreground">{formatCurrency(exp.amount)}</td>
                    <td className="py-2.5 pr-4">
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium border",
                        exp.status === "approved" || exp.status === "paid" ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-red-400 bg-red-400/10 border-red-400/20"
                      )}>
                        {exp.status === "approved" || exp.status === "paid" ? "Approved" : "Rejected"}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{exp.approvedBy}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{exp.approvedAt ? formatDate(exp.approvedAt) : "—"}</td>
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
