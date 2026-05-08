import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { organizations, formatCurrency, getStoredUser, storeUser, clearUser } from "@/lib/mock-data";
import { Search, Plus, LogOut, Users, FolderOpen, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrgSelectPage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const user = getStoredUser();

  const filtered = organizations.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (org: typeof organizations[0]) => {
    if (user) {
      storeUser({ ...user, org: org.name, role: org.role });
    }
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: "hsl(228 81% 7%)" }}>
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Select Organization</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, <span className="text-purple-400 font-medium">{user?.name ?? "Alex"}</span>. Choose an organization to continue.
          </p>
        </div>

        {/* Search + actions */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search organizations..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              data-testid="input-search-org"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
            data-testid="button-create-org"
          >
            <Plus className="w-4 h-4" />
            Create Org
          </motion.button>
        </div>

        {/* Org cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((org, i) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => handleSelect(org)}
              className="glass-card rounded-2xl p-5 border border-white/8 cursor-pointer hover:border-purple-500/30 hover:-translate-y-0.5 group transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)]"
              data-testid={`card-org-${org.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    style={{ background: org.color }}
                  >
                    {org.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-purple-300 transition-colors">{org.name}</h3>
                    <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">
                      <CheckCircle className="w-2.5 h-2.5" />
                      {org.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-muted-foreground px-2 py-1 rounded-lg bg-white/5">
                  {org.currency}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/4">
                  <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{org.users}</p>
                    <p className="text-[10px] text-muted-foreground">Users</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/4">
                  <FolderOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{org.activeProjects}</p>
                    <p className="text-[10px] text-muted-foreground">Projects</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Monthly spend</span>
                <span className="text-sm font-bold text-foreground">{formatCurrency(org.monthlySpend, org.currency)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => { clearUser(); setLocation("/"); }}
            className="flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-red-400 transition-colors"
            data-testid="button-logout-org"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
