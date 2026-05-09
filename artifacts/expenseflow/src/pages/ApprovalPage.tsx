import { CheckCircle, Clock, XCircle, Check, X } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, expenses } from "@/lib/mock-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

const stages = [
  { label: "Pending",  status: "pending",  icon: Clock,        color: "text-amber-600",   bg: "bg-amber-50",    border: "border-amber-200", count_bg: "bg-amber-100 text-amber-700" },
  { label: "Approved", status: "approved", icon: CheckCircle,  color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200", count_bg: "bg-emerald-100 text-emerald-700" },
  { label: "Rejected", status: "rejected", icon: XCircle,      color: "text-red-600",     bg: "bg-red-50",      border: "border-red-200", count_bg: "bg-red-100 text-red-700" },
];

export default function ApprovalPage() {
  const [localApproved, setLocalApproved] = useState<string[]>([]);
  const [localRejected, setLocalRejected] = useState<string[]>([]);

  const pendingExpenses  = expenses.filter(e => e.status === "pending"  && !localApproved.includes(e.id) && !localRejected.includes(e.id));
  const approvedExpenses = [...expenses.filter(e => e.status === "approved"), ...expenses.filter(e => localApproved.includes(e.id))];
  const rejectedExpenses = [...expenses.filter(e => e.status === "rejected"), ...expenses.filter(e => localRejected.includes(e.id))];

  const columnData = [pendingExpenses, approvedExpenses, rejectedExpenses];

  return (
    <div className="space-y-5">
      <PageHeader title="Approval Workflow" subtitle="Review, approve, or reject expense submissions" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {stages.map((stage, si) => {
          const stageExpenses = columnData[si];
          return (
            <div key={stage.label} className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
              {/* Column header */}
              <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <div className={cn("p-1.5 rounded-md", stage.bg, "border", stage.border)}>
                  <stage.icon className={cn("w-3.5 h-3.5", stage.color)} />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">{stage.label}</h3>
                <span className={cn("ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full", stage.count_bg)}>
                  {stageExpenses.length}
                </span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-2 min-h-[200px]">
                {stageExpenses.length === 0 && (
                  <div className="text-center py-10 text-xs text-slate-400">No expenses here</div>
                )}
                {stageExpenses.slice(0, 6).map(exp => {
                  const isLocallyApproved = localApproved.includes(exp.id);
                  const isLocallyRejected = localRejected.includes(exp.id);
                  const displayStatus = isLocallyApproved ? "approved" : isLocallyRejected ? "rejected" : exp.status;
                  return (
                    <div key={exp.id} className="bg-white border border-[#E2E8F0] rounded-lg p-3 hover:border-slate-300 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-xs font-semibold text-slate-800 leading-tight flex-1">{exp.title}</p>
                        <StatusBadge status={displayStatus as "draft" | "pending" | "approved" | "rejected" | "paid"} />
                      </div>
                      <p className="text-[10px] text-slate-400 mb-2">{exp.submittedBy} · {formatDate(exp.date)}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 tabular-nums">{formatCurrency(exp.amount)}</span>
                        {stage.status === "pending" && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => setLocalRejected(p => [...p, exp.id])}
                              className="w-6 h-6 rounded-md bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-colors"
                              data-testid={`button-reject-${exp.id}`}
                            >
                              <X className="w-3 h-3 text-red-600" />
                            </button>
                            <button
                              onClick={() => setLocalApproved(p => [...p, exp.id])}
                              className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                              data-testid={`button-approve-${exp.id}`}
                            >
                              <Check className="w-3 h-3 text-emerald-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit trail */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9]">
          <h3 className="text-sm font-semibold text-slate-800">Approval Audit Trail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                {["Expense ID", "Title", "Submitted By", "Amount", "Action", "By", "Date"].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {expenses.filter(e => e.approvedBy).slice(0, 6).map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-blue-600 text-[11px]">{exp.id}</td>
                  <td className="px-5 py-3 max-w-[120px] truncate font-medium text-slate-800">{exp.title}</td>
                  <td className="px-5 py-3 text-slate-500">{exp.submittedBy}</td>
                  <td className="px-5 py-3 font-bold text-slate-900 tabular-nums">{formatCurrency(exp.amount)}</td>
                  <td className="px-5 py-3">
                    <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-medium border",
                      exp.status === "approved" || exp.status === "paid"
                        ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                        : "text-red-700 bg-red-50 border-red-200"
                    )}>
                      {exp.status === "approved" || exp.status === "paid" ? "Approved" : "Rejected"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{exp.approvedBy}</td>
                  <td className="px-5 py-3 text-slate-500">{exp.approvedAt ? formatDate(exp.approvedAt) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
