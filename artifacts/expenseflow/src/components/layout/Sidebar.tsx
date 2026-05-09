import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Receipt, CheckCircle, Store, BarChart3,
  Users, Bell, Settings, LogOut,
  Building2, CreditCard, ChevronLeft, ChevronRight
} from "lucide-react";
import { clearUser, getStoredUser, type Role } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";

interface NavItem { label: string; href: string; icon: React.ElementType; }
interface NavGroup { title: string; items: NavItem[]; }

const roleLabels: Record<Role, string> = {
  'super-admin': 'Super Admin',
  'org-admin':   'Org Admin',
  'maker':       'Maker',
  'approver':    'Approver',
  'finance':     'Finance',
  'hr':          'HR',
};

const allNavGroups: NavGroup[] = [
  { title: "Overview", items: [
    { label: "Dashboard",     href: "/dashboard",     icon: LayoutDashboard },
  ]},
  { title: "Finance", items: [
    { label: "Expenses",      href: "/expenses",      icon: Receipt },
    { label: "Approvals",     href: "/approvals",     icon: CheckCircle },
    { label: "Vendors",       href: "/vendors",       icon: Store },
    { label: "Reports",       href: "/reports",       icon: BarChart3 },
  ]},
  { title: "People", items: [
    { label: "HR Module",     href: "/hr",            icon: Users },
  ]},
  { title: "System", items: [
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Settings",      href: "/settings",      icon: Settings },
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

interface SidebarProps { collapsed: boolean; onToggle: () => void; }

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();
  const user = getStoredUser();
  const { currentRole } = useRole();
  const navGroups = getNavGroupsForRole(currentRole);
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'AC';

  const isActive = (href: string) =>
    href === "/dashboard" ? location.startsWith("/dashboard") : location === href;

  return (
    <aside
      style={{ width: collapsed ? 64 : 232, transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1)' }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden bg-[#0F172A] border-r border-[#1E293B]"
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-14 shrink-0 border-b border-[#1E293B]",
        collapsed ? "justify-center px-3" : "px-4 gap-2.5"
      )}>
        <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
          <CreditCard className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-white text-sm tracking-tight whitespace-nowrap flex-1">ExpenseFlow</span>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/8 transition-colors"
            title="Collapse"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {collapsed && (
          <button onClick={onToggle} className="absolute right-0 top-14 -translate-y-0 w-5 h-8 bg-[#1E293B] border border-[#334155] rounded-r flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Expand">
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Org / role */}
      <div className={cn(
        "flex items-center gap-2.5 shrink-0 border-b border-[#1E293B] py-3",
        collapsed ? "justify-center px-3" : "px-4"
      )}>
        <div className="w-7 h-7 rounded-md bg-[#1E293B] border border-[#334155] flex items-center justify-center shrink-0">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate">{user?.org ?? "Acme Corp"}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{roleLabels[currentRole]}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed && (
              <p className="text-[10px] uppercase tracking-[0.1em] text-slate-600 px-2 pb-1.5 font-semibold">
                {group.title}
              </p>
            )}
            {collapsed && <div className="mt-2" />}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <a
                        className={cn(
                          "group flex items-center rounded-md text-sm font-medium transition-colors cursor-pointer",
                          collapsed ? "justify-center w-9 h-9 mx-auto" : "gap-2.5 px-2.5 py-2",
                          active
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-slate-100 hover:bg-white/6"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <item.icon
                          className={cn("shrink-0 transition-colors", active ? "text-white" : "text-slate-500 group-hover:text-slate-300")}
                          style={{ width: 16, height: 16 }}
                        />
                        {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-[#1E293B] p-2 shrink-0">
        <div className={cn(
          "flex items-center gap-2.5 px-2 py-2 rounded-md",
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0 text-white text-[11px] font-bold">
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-200 truncate">{user?.name ?? "Alex Chen"}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email ?? "alex@acmecorp.com"}</p>
              </div>
              <button
                onClick={() => { clearUser(); window.location.href = import.meta.env.BASE_URL || '/'; }}
                className="p-1.5 rounded text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-colors ml-1 shrink-0"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
