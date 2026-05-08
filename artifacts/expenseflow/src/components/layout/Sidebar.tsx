import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Receipt, CheckCircle, Store, BarChart3,
  Users, Bell, Settings, LogOut, ChevronLeft, ChevronRight,
  Building2, CreditCard
} from "lucide-react";
import { clearUser, getStoredUser } from "@/lib/mock-data";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Expenses", href: "/expenses", icon: Receipt },
      { label: "Approvals", href: "/approvals", icon: CheckCircle },
      { label: "Vendors", href: "/vendors", icon: Store },
      { label: "Reports", href: "/reports", icon: BarChart3 },
    ],
  },
  {
    title: "People",
    items: [
      { label: "HR Module", href: "/hr", icon: Users },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();
  const user = getStoredUser();

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.startsWith("/dashboard");
    return location === href;
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden"
      style={{ background: "hsl(228 71% 9%)", borderRight: "1px solid hsl(228 40% 16%)" }}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full flex items-center justify-center bg-purple-600 border border-purple-500 text-white shadow-lg hover:bg-purple-500 transition-colors"
        data-testid="button-sidebar-toggle"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center shrink-0">
          <CreditCard className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-bold text-white text-base tracking-tight">ExpenseFlow</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Org info */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/2">
        <div className="w-7 h-7 rounded-lg bg-purple-700/40 flex items-center justify-center shrink-0">
          <Building2 className="w-3.5 h-3.5 text-purple-400" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-w-0"
            >
              <p className="text-xs font-semibold text-foreground truncate">{user?.org ?? "Acme Corp"}</p>
              <p className="text-[10px] text-muted-foreground capitalize">{user?.role?.replace('-', ' ') ?? "Super Admin"}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-2 mb-1.5 font-semibold"
                >
                  {group.title}
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <motion.a
                        whileHover={{ x: 2 }}
                        className={cn(
                          "flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                          collapsed ? "justify-center" : "",
                          active
                            ? "bg-purple-500/15 text-purple-300 border-l-2 border-purple-500 pl-[9px]"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        )}
                        data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                      >
                        <item.icon className={cn("shrink-0", active ? "w-4.5 h-4.5 text-purple-400" : "w-4.5 h-4.5")} style={{ width: '18px', height: '18px' }} />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.15 }}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/5 p-3">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0 text-white text-xs font-bold">
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'AC'}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-xs font-semibold text-foreground truncate">{user?.name ?? "Alex Chen"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email ?? "alex@acmecorp.com"}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { clearUser(); window.location.href = import.meta.env.BASE_URL || '/'; }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                data-testid="button-logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
