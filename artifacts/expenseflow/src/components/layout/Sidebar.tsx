import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Receipt, CheckCircle, Store, BarChart3,
  Users, Bell, Settings, LogOut,
  Building2, CreditCard, PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { clearUser, getStoredUser, type Role } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}
interface NavGroup {
  title: string;
  items: NavItem[];
}

const roleLabels: Record<Role, string> = {
  'super-admin': 'Super Admin',
  'org-admin':   'Org Admin',
  'maker':       'Maker',
  'approver':    'Approver',
  'finance':     'Finance',
  'hr':          'HR',
};

const roleBadgeColors: Record<Role, string> = {
  'super-admin': 'text-purple-300 bg-purple-500/20 border-purple-500/30',
  'org-admin':   'text-cyan-300   bg-cyan-500/20   border-cyan-500/30',
  'maker':       'text-green-300  bg-green-500/20  border-green-500/30',
  'approver':    'text-amber-300  bg-amber-500/20  border-amber-500/30',
  'finance':     'text-blue-300   bg-blue-500/20   border-blue-500/30',
  'hr':          'text-pink-300   bg-pink-500/20   border-pink-500/30',
};

const allNavGroups: NavGroup[] = [
  { title: "Overview", items: [
    { label: "Dashboard",    href: "/dashboard",     icon: LayoutDashboard },
  ]},
  { title: "Finance", items: [
    { label: "Expenses",     href: "/expenses",      icon: Receipt },
    { label: "Approvals",    href: "/approvals",     icon: CheckCircle },
    { label: "Vendors",      href: "/vendors",       icon: Store },
    { label: "Reports",      href: "/reports",       icon: BarChart3 },
  ]},
  { title: "People", items: [
    { label: "HR Module",    href: "/hr",            icon: Users },
  ]},
  { title: "System", items: [
    { label: "Notifications",href: "/notifications", icon: Bell },
    { label: "Settings",     href: "/settings",      icon: Settings },
  ]},
];

const roleNavItems: Record<Role, string[]> = {
  'super-admin': ['Dashboard','Expenses','Approvals','Vendors','Reports','HR Module','Notifications','Settings'],
  'org-admin':   ['Dashboard','Expenses','Approvals','Vendors','Reports','Notifications','Settings'],
  'maker':       ['Dashboard','Expenses','Notifications','Settings'],
  'approver':    ['Dashboard','Approvals','Expenses','Notifications','Settings'],
  'finance':     ['Dashboard','Expenses','Vendors','Reports','Notifications','Settings'],
  'hr':          ['Dashboard','HR Module','Notifications','Settings'],
};

function getNavGroupsForRole(role: Role): NavGroup[] {
  const allowed = new Set(roleNavItems[role]);
  return allNavGroups
    .map(g => ({ ...g, items: g.items.filter(i => allowed.has(i.label)) }))
    .filter(g => g.items.length > 0);
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();
  const user = getStoredUser();
  const { currentRole } = useRole();
  const navGroups = getNavGroupsForRole(currentRole);
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'AC';

  const isActive = (href: string) =>
    href === "/dashboard" ? location.startsWith("/dashboard") : location === href;

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 232 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(228 75% 8%) 0%, hsl(228 70% 7%) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        minWidth: 0,
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center border-b border-white/5 h-14 shrink-0 px-3">
        {collapsed ? (
          /* Collapsed: just the toggle button, centered */
          <button
            onClick={onToggle}
            className="mx-auto flex items-center justify-center w-8 h-8 rounded-xl bg-white/8 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 transition-all duration-200"
            title="Expand sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        ) : (
          /* Expanded: logo + name + toggle */
          <>
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-sm tracking-tight whitespace-nowrap">ExpenseFlow</span>
            </div>
            <button
              onClick={onToggle}
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/8 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 transition-all duration-200 shrink-0 ml-2"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* ── Org / role chip ── */}
      <div className={cn(
        "flex items-center gap-2.5 shrink-0 border-b border-white/5",
        collapsed ? "justify-center py-3 px-2" : "py-3 px-3"
      )}>
        <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/20 flex items-center justify-center shrink-0">
          <Building2 className="w-3.5 h-3.5 text-purple-400" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate leading-tight">{user?.org ?? "Acme Corp"}</p>
            <span className={cn(
              "inline-flex items-center mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md border",
              roleBadgeColors[currentRole]
            )}>
              {roleLabels[currentRole]}
            </span>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentRole}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {navGroups.map((group) => (
              <div key={group.title} className="mb-1">
                {/* Section label — only in expanded */}
                {!collapsed && (
                  <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/50 px-3 pt-3 pb-1 font-bold whitespace-nowrap">
                    {group.title}
                  </p>
                )}
                {collapsed && <div className="pt-2" />}

                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link href={item.href}>
                          <a
                            className={cn(
                              "group relative flex items-center rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer",
                              collapsed
                                ? "justify-center w-10 h-10 mx-auto"
                                : "gap-3 px-3 py-2.5",
                              active
                                ? "text-purple-300 bg-purple-500/15"
                                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                            )}
                            title={collapsed ? item.label : undefined}
                          >
                            {/* Left accent bar (expanded only) */}
                            {active && !collapsed && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-purple-400" />
                            )}
                            {/* Active dot (collapsed only) */}
                            {active && collapsed && (
                              <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-l-full bg-purple-400" />
                            )}
                            <item.icon
                              style={{ width: 17, height: 17 }}
                              className={cn(
                                "shrink-0 transition-colors",
                                active ? "text-purple-400" : "text-slate-500 group-hover:text-slate-300"
                              )}
                            />
                            {!collapsed && (
                              <span className="whitespace-nowrap">{item.label}</span>
                            )}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </nav>

      {/* ── User footer ── */}
      <div className="border-t border-white/5 p-2 shrink-0">
        <div className={cn(
          "flex items-center gap-2.5 px-1.5 py-2 rounded-xl hover:bg-white/5 transition-colors",
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0 text-white text-[11px] font-bold">
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate leading-tight">{user?.name ?? "Alex Chen"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email ?? "alex@acmecorp.com"}</p>
              </div>
              <button
                onClick={() => { clearUser(); window.location.href = import.meta.env.BASE_URL || '/'; }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors ml-1 shrink-0"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
