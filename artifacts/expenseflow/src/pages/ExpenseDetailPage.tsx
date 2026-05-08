import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, CreditCard, FileText } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, expenses, type ExpenseStatus } from "@/lib/mock-data";

export default function ExpenseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const expense = expenses.find(e => e.id === id);

  if (!expense) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <p className="text-foreground font-semibold mb-2">Expense not found</p>
        <Link href="/expenses"><button className="text-sm text-purple-400 hover:text-purple-300">← Back to expenses</button></Link>
      </div>
    );
  }

  const steps: Array<{ label: string; done: boolean; date?: string; icon: React.ElementType }> = [
    { label: "Submitted", done: true, date: expense.date, icon: FileText },
    { label: "Under Review", done: expense.status !== "draft", date: expense.approvedAt, icon: Clock },
    { label: expense.status === "rejected" ? "Rejected" : "Approved", done: ["approved", "paid"].includes(expense.status), date: expense.approvedAt, icon: Check },
    { label: "Paid", done: expense.status === "paid", date: expense.paidAt, icon: CreditCard },
  ];

  const activity = [
    { label: "Expense created", by: expense.submittedBy, date: expense.date },
    ...(expense.status !== "draft" ? [{ label: "Sent for review", by: "System", date: expense.date }] : []),
    ...(expense.approvedBy ? [{ label: `${expense.status === "rejected" ? "Rejected" : "Approved"} by approver`, by: expense.approvedBy, date: expense.approvedAt ?? "" }] : []),
    ...(expense.paidAt ? [{ label: "Payment processed", by: "Finance Team", date: expense.paidAt }] : []),
  ];

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/expenses"><button className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Expenses</button></Link>
        <span>/</span>
        <span className="text-foreground font-medium">{expense.id}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">{expense.title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{expense.id} · Submitted by {expense.submittedBy}</p>
        </div>
        <StatusBadge status={expense.status as ExpenseStatus} />
      </div>

      {/* Status tracker */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-4">Status Tracker</h3>
          <div className="flex items-start">
            {steps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${step.done ? "bg-purple-500 border-purple-500 shadow-[0_0_12px_rgba(124,58,237,0.4)]" : "bg-white/5 border-white/15"}`}>
                    <step.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${step.done ? "bg-purple-500/60" : "bg-white/10"}`} />
                  )}
                </div>
                <div className="mt-2 text-center px-1">
                  <p className={`text-[11px] font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                  {step.date && <p className="text-[9px] text-muted-foreground">{formatDate(step.date)}</p>}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Details + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="h-full">
            <h3 className="text-sm font-semibold text-foreground mb-4">Expense Details</h3>
            <div className="space-y-3">
              {[
                { label: "Amount", value: formatCurrency(expense.amount) },
                { label: "Category", value: expense.category },
                { label: "Vendor", value: expense.vendor },
                { label: "Organization", value: expense.org },
                { label: "Date", value: formatDate(expense.date) },
                ...(expense.approvedBy ? [{ label: "Approved By", value: expense.approvedBy }] : []),
                ...(expense.notes ? [{ label: "Notes", value: expense.notes }] : []),
              ].map(item => (
                <div key={item.label} className="flex items-start justify-between py-2 border-b border-white/6">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-semibold text-foreground text-right max-w-[200px]">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Invoice placeholder */}
            <div className="mt-4 h-24 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1">
              <FileText className="w-6 h-6 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Invoice preview</p>
              <p className="text-[10px] text-muted-foreground">(No file uploaded in demo)</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="h-full">
            <h3 className="text-sm font-semibold text-foreground mb-4">Activity Timeline</h3>
            <div className="relative space-y-0">
              {activity.map((item, i, arr) => (
                <div key={i} className="flex gap-3 pb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                    </div>
                    {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-white/8 mt-1" style={{ minHeight: 20 }} />}
                  </div>
                  <div className="flex-1 pb-1">
                    <p className="text-xs font-medium text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">By {item.by} · {formatDate(item.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
