import { useState } from "react";
import { motion } from "framer-motion";
import { Receipt, Plus, Search, Eye } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, expenses, type ExpenseStatus } from "@/lib/mock-data";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const statuses: Array<{ value: string; label: string }> = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "paid", label: "Paid" },
];

const PAGE_SIZE = 10;

export default function ExpenseListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = expenses.filter(e => {
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.vendor.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Expenses"
        subtitle={`${filtered.length} expenses across all organizations`}
        icon={Receipt}
        actions={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
            data-testid="button-new-expense"
          >
            <Plus className="w-4 h-4" />
            New Expense
          </motion.button>
        }
      />

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search by title, vendor, or ID..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              data-testid="input-search-expense"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {statuses.map(s => (
              <button
                key={s.value}
                onClick={() => { setStatusFilter(s.value); setPage(1); }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                  statusFilter === s.value
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : "bg-white/5 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                )}
                data-testid={`filter-status-${s.value}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/8 bg-white/2">
                  {["ID", "Title", "Amount", "Category", "Vendor", "Submitted By", "Date", "Status", ""].map(h => (
                    <th key={h} className="text-left text-muted-foreground font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 && (
                  <tr><td colSpan={9} className="text-center text-muted-foreground py-12 text-sm">No expenses found.</td></tr>
                )}
                {paginated.map((exp, i) => (
                  <tr key={exp.id} className={cn("border-b border-white/4 hover:bg-white/3 transition-colors", i % 2 === 0 ? "" : "bg-white/1")}>
                    <td className="px-4 py-3 font-mono text-purple-400 whitespace-nowrap">{exp.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground max-w-[160px] truncate">{exp.title}</td>
                    <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap">{formatCurrency(exp.amount)}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{exp.category}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[120px] truncate">{exp.vendor}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{exp.submittedBy}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatDate(exp.date)}</td>
                    <td className="px-4 py-3"><StatusBadge status={exp.status as ExpenseStatus} /></td>
                    <td className="px-4 py-3">
                      <Link href={`/expenses/${exp.id}`}>
                        <button className="p-1.5 rounded-lg hover:bg-purple-500/15 text-muted-foreground hover:text-purple-400 transition-colors" data-testid={`button-view-${exp.id}`}>
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/8">
            <p className="text-xs text-muted-foreground">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 rounded-lg text-xs border border-white/10 disabled:opacity-40 hover:bg-white/5 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn("w-7 h-7 rounded-lg text-xs transition-colors", page === p ? "bg-purple-600 text-white" : "hover:bg-white/5 text-muted-foreground")}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 rounded-lg text-xs border border-white/10 disabled:opacity-40 hover:bg-white/5 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
