import { useState } from "react";
import { Receipt, Plus, Search, Eye } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, expenses, type ExpenseStatus } from "@/lib/mock-data";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const statuses = [
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
        actions={
          <button
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            data-testid="button-new-expense"
          >
            <Plus className="w-4 h-4" />
            New Expense
          </button>
        }
      />

      {/* Filters */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-3.5 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-md bg-slate-50 border border-[#E2E8F0]">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by title, vendor, or ID..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            data-testid="input-search-expense"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {statuses.map(s => (
            <button
              key={s.value}
              onClick={() => { setStatusFilter(s.value); setPage(1); }}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all border",
                statusFilter === s.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-slate-50 text-slate-600 border-[#E2E8F0] hover:bg-slate-100 hover:border-slate-300"
              )}
              data-testid={`filter-status-${s.value}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                {["ID", "Title", "Amount", "Category", "Vendor", "Submitted By", "Date", "Status", ""].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {paginated.length === 0 && (
                <tr><td colSpan={9} className="text-center text-slate-400 py-12 text-sm">No expenses found.</td></tr>
              )}
              {paginated.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600 text-[11px] whitespace-nowrap">{exp.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-[160px] truncate">{exp.title}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 tabular-nums whitespace-nowrap">{formatCurrency(exp.amount)}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{exp.category}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[120px] truncate">{exp.vendor}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{exp.submittedBy}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(exp.date)}</td>
                  <td className="px-4 py-3"><StatusBadge status={exp.status as ExpenseStatus} /></td>
                  <td className="px-4 py-3">
                    <Link href={`/expenses/${exp.id}`}>
                      <button className="p-1.5 rounded-md hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors" data-testid={`button-view-${exp.id}`}>
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
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#F1F5F9]">
          <p className="text-xs text-slate-400">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 rounded-md text-xs border border-[#E2E8F0] text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn("w-7 h-7 rounded-md text-xs transition-colors", page === p ? "bg-blue-600 text-white" : "hover:bg-slate-100 text-slate-500")}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 rounded-md text-xs border border-[#E2E8F0] text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
