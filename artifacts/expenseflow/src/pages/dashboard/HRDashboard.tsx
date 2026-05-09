import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      <PageHeader title="HR Module" subtitle="Employee settlements and final dues management" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Employee Settlements" value={employeeSettlements.length.toString()} trend="Active cases"      trendUp={false} icon={Users}     iconColor="text-blue-600"   iconBg="bg-blue-50" />
        <StatCard label="Pending Dues"         value={formatCurrency(totalDue)}             trend="Total outstanding" trendUp={false} icon={DollarSign}iconColor="text-amber-600"  iconBg="bg-amber-50" />
        <StatCard label="FNF Requests"         value={fnfCount.toString()}                  trend="Awaiting clearance" trendUp={false}icon={FileText}  iconColor="text-red-600"    iconBg="bg-red-50" />
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F1F5F9]">
          <h3 className="text-sm font-semibold text-slate-800">Employee Clearance Cases</h3>
        </div>
        <div className="divide-y divide-[#F8FAFC]">
          {employeeSettlements.map(emp => (
            <div key={emp.id} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {emp.employee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{emp.employee}</p>
                    <p className="text-xs text-slate-400">{emp.department} · Last Date: {emp.lastDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-md border font-medium",
                    emp.status === 'pending' ? "text-amber-700 bg-amber-50 border-amber-200" : "text-blue-700 bg-blue-50 border-blue-200"
                  )}>
                    {emp.status === 'pending' ? 'Pending' : 'In Progress'}
                  </span>
                  <p className="text-sm font-bold text-slate-900 tabular-nums">{formatCurrency(emp.dueAmount)}</p>
                </div>
              </div>

              <div className="ml-13 space-y-1 mb-3 pl-1">
                {emp.items.map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { setSelected(emp); setShowModal(true); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors"
                  data-testid={`button-fnf-${emp.id}`}
                >
                  <FileText className="w-3 h-3" /> Process FNF
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E2E8F0] text-slate-500 text-xs hover:bg-slate-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Timeline */}
      <GlassCard>
        <h3 className="font-semibold text-slate-800 text-sm mb-5">Settlement Timeline</h3>
        <div className="space-y-0">
          {[
            { step: "Resignation Accepted", done: true,  date: "Apr 28, 2026" },
            { step: "IT Asset Clearance",   done: true,  date: "May 2, 2026" },
            { step: "Finance Dues Verified",done: true,  date: "May 5, 2026" },
            { step: "HR Documents Signed",  done: false, date: "May 12, 2026" },
            { step: "Final Settlement Paid",done: false, date: "May 31, 2026" },
          ].map((item, i, arr) => (
            <div key={item.step} className="flex gap-4 pb-4">
              <div className="flex flex-col items-center">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2", item.done ? "bg-blue-600 border-blue-600" : "bg-white border-[#E2E8F0]")}>
                  {item.done && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                {i < arr.length - 1 && <div className={cn("w-0.5 flex-1 mt-1", item.done ? "bg-blue-200" : "bg-[#F1F5F9]")} style={{ minHeight: 20 }} />}
              </div>
              <div className="flex-1 pb-1">
                <p className={cn("text-sm font-medium", item.done ? "text-slate-800" : "text-slate-400")}>{item.step}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* FNF Modal */}
      <AnimatePresence>
        {showModal && selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xl w-full max-w-md p-6 pointer-events-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-slate-800">Final Settlement — {selected.employee}</h2>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-0 mb-5">
                  {selected.items.map(item => {
                    const parts = item.split(': ');
                    return (
                      <div key={item} className="flex items-center justify-between py-2.5 border-b border-[#F8FAFC] text-xs">
                        <span className="text-slate-500">{parts[0]}</span>
                        <span className="font-semibold text-slate-800">{parts[1]}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-sm font-semibold text-slate-800">Total Due</span>
                    <span className="text-xl font-bold text-blue-600 tabular-nums">{formatCurrency(selected.dueAmount)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-[#E2E8F0] text-sm text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors" data-testid="button-confirm-fnf">Process Settlement</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
