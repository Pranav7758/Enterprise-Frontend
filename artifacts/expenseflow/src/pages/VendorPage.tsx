import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Plus, Search, X, LayoutGrid, LayoutList } from "lucide-react";
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
        icon={Store}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-white/10 overflow-hidden">
              <button onClick={() => setView("grid")} className={cn("p-2 transition-colors", view === "grid" ? "bg-purple-500/20 text-purple-400" : "text-muted-foreground hover:bg-white/5")}>
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setView("list")} className={cn("p-2 transition-colors", view === "list" ? "bg-purple-500/20 text-purple-400" : "text-muted-foreground hover:bg-white/5")}>
                <LayoutList className="w-3.5 h-3.5" />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
              data-testid="button-add-vendor"
            >
              <Plus className="w-4 h-4" />
              Add Vendor
            </motion.button>
          </div>
        }
      />

      {/* Search */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 max-w-sm">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search vendors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
          data-testid="input-search-vendor"
        />
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(vendor)}
              data-testid={`card-vendor-${vendor.id}`}
            >
              <GlassCard hover glow="purple" className="cursor-pointer">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0" style={{ background: vendor.color }}>
                    {vendor.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">{vendor.name}</h3>
                    <p className="text-xs text-muted-foreground">{vendor.category}</p>
                  </div>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium border", vendor.status === "active" ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-slate-400 bg-slate-400/10 border-slate-400/20")}>
                    {vendor.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p className="truncate">{vendor.email}</p>
                  <p className="font-mono text-purple-300/70">{vendor.gstNumber}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Total spend</span>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(vendor.totalSpend)}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <GlassCard className="p-0 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/8 bg-white/2">
                {["Vendor", "Category", "GST Number", "Contact", "Total Spend", "Status"].map(h => (
                  <th key={h} className="text-left text-muted-foreground font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(vendor => (
                <tr key={vendor.id} onClick={() => setSelected(vendor)} className="border-b border-white/4 hover:bg-white/3 cursor-pointer transition-colors" data-testid={`row-vendor-${vendor.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: vendor.color }}>{vendor.initials}</div>
                      <span className="font-medium text-foreground">{vendor.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{vendor.category}</td>
                  <td className="px-4 py-3 font-mono text-purple-300/70">{vendor.gstNumber}</td>
                  <td className="px-4 py-3 text-muted-foreground">{vendor.contact}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{formatCurrency(vendor.totalSpend)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium border", vendor.status === "active" ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-slate-400 bg-slate-400/10 border-slate-400/20")}>
                      {vendor.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}

      {/* Vendor Detail Panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 border-l border-white/10 overflow-y-auto"
              style={{ background: "hsl(228 70% 10%)" }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-bold text-foreground">Vendor Details</h2>
                  <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-col items-center mb-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-3" style={{ background: selected.color }}>{selected.initials}</div>
                  <h3 className="text-base font-bold text-foreground text-center">{selected.name}</h3>
                  <p className="text-xs text-muted-foreground">{selected.category}</p>
                </div>
                <div className="space-y-2.5 text-xs">
                  {[
                    { label: "GST Number", value: selected.gstNumber },
                    { label: "Contact", value: selected.contact },
                    { label: "Email", value: selected.email },
                    { label: "Phone", value: selected.phone },
                    { label: "Address", value: selected.address },
                    { label: "Total Spend", value: formatCurrency(selected.totalSpend) },
                    { label: "Status", value: selected.status === "active" ? "Active" : "Inactive" },
                  ].map(item => (
                    <div key={item.label} className="border-b border-white/6 pb-2.5">
                      <p className="text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground mt-0.5">{item.value}</p>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 backdrop-blur-md z-50" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="glass-card rounded-2xl border border-white/10 w-full max-w-md p-6 pointer-events-auto shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-foreground">Add New Vendor</h2>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-white/8 text-muted-foreground"><X className="w-4 h-4" /></button>
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
                      <label className="block text-xs text-muted-foreground mb-1">{f.label}</label>
                      <input type={f.type} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50" data-testid={`input-vendor-${f.name}`} />
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-muted-foreground hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors" data-testid="button-save-vendor">Save Vendor</button>
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
