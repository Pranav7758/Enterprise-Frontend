import { useState } from "react";
import { useLocation } from "wouter";
import { organizations, formatCurrency, getStoredUser, storeUser, clearUser } from "@/lib/mock-data";
import { Search, Plus, LogOut, Users, FolderOpen, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrgSelectPage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const user = getStoredUser();

  const filtered = organizations.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (org: typeof organizations[0]) => {
    if (user) storeUser({ ...user, org: org.name, role: org.role });
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Select Organization</h1>
          <p className="text-sm text-slate-500">
            Welcome back, <span className="text-slate-800 font-medium">{user?.name ?? "Alex"}</span>. Choose an organization to continue.
          </p>
        </div>

        {/* Search + action */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white border border-[#E2E8F0] shadow-sm">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search organizations..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              data-testid="input-search-org"
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            data-testid="button-create-org"
          >
            <Plus className="w-4 h-4" />
            New Org
          </button>
        </div>

        {/* Org list */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">No organizations found.</div>
          )}
          {filtered.map((org, i) => (
            <button
              key={org.id}
              onClick={() => handleSelect(org)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors group",
                i > 0 && "border-t border-[#F1F5F9]"
              )}
              data-testid={`card-org-${org.id}`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-base shrink-0"
                style={{ background: org.color }}
              >
                {org.initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-slate-800">{org.name}</p>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                    {org.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{org.users} users</span>
                  <span className="flex items-center gap-1"><FolderOpen className="w-3 h-3" />{org.activeProjects} projects</span>
                  <span>{org.currency}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-slate-800">{formatCurrency(org.monthlySpend, org.currency)}</p>
                <p className="text-[10px] text-slate-400">Monthly spend</p>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
            </button>
          ))}
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={() => { clearUser(); setLocation("/"); }}
            className="flex items-center gap-1.5 mx-auto text-sm text-slate-400 hover:text-red-500 transition-colors"
            data-testid="button-logout-org"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
