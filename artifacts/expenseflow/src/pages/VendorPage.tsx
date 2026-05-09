import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, X, LayoutGrid, LayoutList } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatCurrency, vendors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function VendorPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<typeof vendors[0] | null>(null);

  const filtered = vendors.filter(v =>
    !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Vendors"
        subtitle={`${vendors.length} registered vendors`}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-md border border-[#E2E8F0] overflow-hidden bg-white">
              <button onClick={() => setView("grid")} className={cn("p-2 transition-colors", view === "grid" ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:bg-slate-50")}>
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setView("list")} className={cn("p-2 transition-colors border-l border-[#E2E8F0]", view === "list" ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:bg-slate-50")}>
                <LayoutList className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              data-testid="button-add-vendor"
            >
              <Plus className="w-4 h-4" /> Add Vendor
            </button>
          </div>
        }
      />

      {/* Search */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white border border-[#E2E8F0] shadow-sm max-w-sm">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search vendors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none w-full"
          data-testid="input-search-vendor"
        />
      </div>

      {/* Grid */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(vendor => (
            <div
              key={vendor.id}
              onClick={() => setSelected(vendor)}
              className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer transition-all"
              data-testid={`card-vendor-${vendor.id}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-base shrink-0" style={{ background: vendor.color }}>
                  {vendor.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 truncate">{vendor.name}</h3>
                  <p className="text-xs text-slate-400">{vendor.category}</p>
                </div>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-md font-medium border shrink-0",
                  vendor.status === "active" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-slate-500 bg-slate-50 border-slate-200"
                )}>
                  {vendor.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-400 mb-3">
                <p className="truncate">{vendor.email}</p>
                <p className="font-mono text-slate-500">{vendor.gstNumber}</p>
              </div>
              <div className="pt-3 border-t border-[#F8FAFC] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Total spend</span>
                <span className="text-sm font-bold text-slate-800 tabular-nums">{formatCurrency(vendor.totalSpend)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List */}
      {view === "list" && (
        <GlassCard className="p-0 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                {["Vendor", "Category", "GST Number", "Contact", "Total Spend", "Status"].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {filtered.map(vendor => (
                <tr key={vendor.id} onClick={() => setSelected(vendor)} className="hover:bg-slate-50 cursor-pointer transition-colors" data-testid={`row-vendor-${vendor.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: vendor.color }}>{vendor.initials}</div>
                      <span className="font-medium text-slate-800">{vendor.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{vendor.category}</td>
                  <td className="px-4 py-3 font-mono text-slate-500">{vendor.gstNumber}</td>
                  <td className="px-4 py-3 text-slate-500">{vendor.contact}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 tabular-nums">{formatCurrency(vendor.totalSpend)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-md font-medium border",
                      vendor.status === "active" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-slate-500 bg-slate-50 border-slate-200"
                    )}>
                      {vendor.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}

      {/* Vendor Detail Slide-over */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 bg-white border-l border-[#E2E8F0] shadow-xl overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-bold text-slate-800">Vendor Details</h2>
                  <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-col items-center mb-6 pb-5 border-b border-[#F1F5F9]">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-3" style={{ background: selected.color }}>{selected.initials}</div>
                  <h3 className="text-base font-bold text-slate-800 text-center">{selected.name}</h3>
                  <p className="text-xs text-slate-400">{selected.category}</p>
                </div>
                <div className="space-y-3 text-xs">
                  {[
                    { label: "GST Number", value: selected.gstNumber },
                    { label: "Contact", value: selected.contact },
                    { label: "Email", value: selected.email },
                    { label: "Phone", value: selected.phone },
                    { label: "Address", value: selected.address },
                    { label: "Total Spend", value: formatCurrency(selected.totalSpend) },
                    { label: "Status", value: selected.status === "active" ? "Active" : "Inactive" },
                  ].map(item => (
                    <div key={item.label} className="border-b border-[#F8FAFC] pb-3">
                      <p className="text-slate-400">{item.label}</p>
                      <p className="font-semibold text-slate-800 mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Vendor Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xl w-full max-w-md p-6 pointer-events-auto max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-slate-800">Add New Vendor</h2>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Vendor Name", name: "name", type: "text" },
                    { label: "GST Number", name: "gst", type: "text" },
                    { label: "Category", name: "category", type: "text" },
                    { label: "Contact Person", name: "contact", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Phone", name: "phone", type: "tel" },
                    { label: "Address", name: "address", type: "text" },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs font-medium text-slate-700 mb-1">{f.label}</label>
                      <input type={f.type} className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" data-testid={`input-vendor-${f.name}`} />
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-[#E2E8F0] text-sm text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors" data-testid="button-save-vendor">Save Vendor</button>
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
