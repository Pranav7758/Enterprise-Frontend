import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, DollarSign, FileText, Check, X } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatCurrency, employeeSettlements } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function HRDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<typeof employeeSettlements[0] | null>(null);

  const totalDue = employeeSettlements.reduce((s, e) => s + e.dueAmount, 0);
  const fnfCount = employeeSettlements.filter(e => e.status === 'pending').length;

  return (
    <div className="space-y-6">
      <PageHeader title="HR Module" subtitle="Employee settlements and final dues management" icon={Users} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Employee Settlements" value={employeeSettlements.length.toString()} trend="Active cases" trendUp={false} icon={Users} iconColor="text-purple-400" iconBg="bg-purple-500/10" delay={0} />
        <StatCard label="Pending Dues" value={formatCurrency(totalDue)} trend="Total outstanding" trendUp={false} icon={DollarSign} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.05} />
        <StatCard label="FNF Requests" value={fnfCount.toString()} trend="Awaiting clearance" trendUp={false} icon={FileText} iconColor="text-red-400" iconBg="bg-red-500/10" delay={0.1} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard>
          <h3 className="font-semibold text-foreground text-sm mb-4">Employee Clearance Cases</h3>
          <div className="space-y-3">
            {employeeSettlements.map(emp => (
              <div key={emp.id} className="p-4 rounded-xl border border-white/8 hover:border-purple-500/20 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {emp.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{emp.employee}</p>
                      <p className="text-xs text-muted-foreground">{emp.department} · Last Date: {emp.lastDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border font-medium",
                      emp.status === 'pending' ? "text-amber-400 bg-amber-400/10 border-amber-400/20" : "text-blue-400 bg-blue-400/10 border-blue-400/20"
                    )}>
                      {emp.status === 'pending' ? 'Pending' : 'In Progress'}
                    </span>
                    <p className="text-sm font-bold text-foreground">{formatCurrency(emp.dueAmount)}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  {emp.items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => { setSelected(emp); setShowModal(true); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/25 transition-colors"
                    data-testid={`button-fnf-${emp.id}`}
                  >
                    <FileText className="w-3 h-3" />
                    Process FNF
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-xs hover:bg-white/8 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Settlement timeline */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <GlassCard>
          <h3 className="font-semibold text-foreground text-sm mb-4">Settlement Timeline</h3>
          <div className="relative space-y-0">
            {[
              { step: "Resignation Accepted", done: true, date: "Apr 28, 2026" },
              { step: "IT Asset Clearance", done: true, date: "May 2, 2026" },
              { step: "Finance Dues Verified", done: true, date: "May 5, 2026" },
              { step: "HR Documents Signed", done: false, date: "May 12, 2026" },
              { step: "Final Settlement Paid", done: false, date: "May 31, 2026" },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-4 pb-4">
                <div className="flex flex-col items-center">
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2", item.done ? "bg-purple-500 border-purple-500" : "bg-white/5 border-white/20")}>
                    {item.done && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  {i < arr.length - 1 && <div className={cn("w-0.5 flex-1 mt-1", item.done ? "bg-purple-500/40" : "bg-white/10")} style={{ minHeight: 20 }} />}
                </div>
                <div className="flex-1 pb-1">
                  <p className={cn("text-sm font-medium", item.done ? "text-foreground" : "text-muted-foreground")}>{item.step}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* FNF Modal */}
      <AnimatePresence>
        {showModal && selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 backdrop-blur-md z-50" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="glass-card rounded-2xl border border-white/10 w-full max-w-md p-6 pointer-events-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-foreground">Final Settlement — {selected.employee}</h2>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-2.5 text-xs mb-5">
                  {selected.items.map(item => {
                    const parts = item.split(': ');
                    return (
                      <div key={item} className="flex items-center justify-between py-2 border-b border-white/6">
                        <span className="text-muted-foreground">{parts[0]}</span>
                        <span className="font-semibold text-foreground">{parts[1]}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-semibold text-foreground">Total Due</span>
                    <span className="text-lg font-bold text-purple-400">{formatCurrency(selected.dueAmount)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-white/10 text-xs text-muted-foreground hover:bg-white/5 transition-colors">Cancel</button>
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors" data-testid="button-confirm-fnf">Process Settlement</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
