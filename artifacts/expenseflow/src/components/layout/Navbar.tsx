import { Bell, Search, ChevronDown, Building2, UserCog } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { getStoredUser, storeUser, clearUser, notifications as allNotifications, organizations, type Role } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const roleLabels: Record<Role, string> = {
  'super-admin': 'Super Admin',
  'org-admin': 'Org Admin',
  'maker': 'Maker',
  'approver': 'Approver',
  'finance': 'Finance',
  'hr': 'HR',
};


interface NavbarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export function Navbar({ currentRole, onRoleChange }: NavbarProps) {
  const user = getStoredUser();
  const [, setLocation] = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showOrgMenu, setShowOrgMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const unread = allNotifications.filter(n => !n.read).length;

  const handleRoleSwitch = (role: Role) => {
    if (user) {
      const updated = { ...user, role };
      storeUser(updated);
      onRoleChange(role);
      setLocation("/dashboard");
    }
    setShowUserMenu(false);
  };

  return (
    <header
      className="h-14 flex items-center justify-between px-5 border-b shrink-0"
      style={{ background: "hsl(228 71% 9%)", borderColor: "hsl(228 40% 16%)" }}
    >
      {/* Search */}
      <div className="flex items-center gap-2 w-64 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-muted-foreground text-sm cursor-pointer hover:bg-white/8 transition-colors">
        <Search className="w-3.5 h-3.5" />
        <span className="text-xs">Search...</span>
        <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">⌘K</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Org switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowOrgMenu(!showOrgMenu); setShowUserMenu(false); setShowNotifications(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-sm font-medium text-foreground hover:bg-white/8 transition-colors"
            data-testid="button-org-switcher"
          >
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs">{user?.org ?? "Acme Corp"}</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
          {showOrgMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden" style={{ background: "hsl(228 70% 10%)" }}>
              <div className="p-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 pb-1">Switch Organization</p>
                {organizations.map(org => (
                  <button
                    key={org.id}
                    onClick={() => { if (user) { storeUser({ ...user, org: org.name }); } setShowOrgMenu(false); }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-sm hover:bg-white/8 transition-colors",
                      user?.org === org.name ? "bg-purple-500/10" : ""
                    )}
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: org.color }}>
                      {org.initials}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{org.name}</p>
                      <p className="text-[10px] text-muted-foreground">{org.currency}</p>
                    </div>
                    {user?.org === org.name && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); setShowOrgMenu(false); }}
            className="relative p-2 rounded-xl bg-white/5 border border-white/8 text-muted-foreground hover:text-foreground hover:bg-white/8 transition-colors"
            data-testid="button-notifications"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                {unread}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden" style={{ background: "hsl(228 70% 10%)" }}>
              <div className="p-3 border-b border-white/8 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Notifications</p>
                <span className="text-xs text-purple-400">{unread} unread</span>
              </div>
              <div className="max-h-72 overflow-y-auto scrollbar-thin">
                {allNotifications.slice(0, 6).map(n => (
                  <div key={n.id} className={cn("flex gap-2.5 px-3 py-2.5 border-b border-white/4 hover:bg-white/4", !n.read && "bg-purple-500/5")}>
                    <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", n.read ? "bg-muted-foreground/30" : "bg-purple-400")} />
                    <div>
                      <p className="text-xs font-medium text-foreground">{n.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <button
                  onClick={() => { setShowNotifications(false); window.location.hash = '#/notifications'; }}
                  className="w-full text-center text-xs text-purple-400 hover:text-purple-300 py-1"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowOrgMenu(false); setShowNotifications(false); }}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors"
            data-testid="button-user-menu"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'AC'}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-foreground leading-tight">{user?.name ?? "Alex Chen"}</p>
              <p className="text-[10px] text-muted-foreground">{roleLabels[currentRole]}</p>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden" style={{ background: "hsl(228 70% 10%)" }}>
              <div className="p-2 border-b border-white/8">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 pb-1">Switch Role (Demo)</p>
                {(Object.keys(roleLabels) as Role[]).map(role => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-white/8 transition-colors",
                      currentRole === role ? "bg-purple-500/10" : ""
                    )}
                    data-testid={`button-role-${role}`}
                  >
                    <UserCog className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground">{roleLabels[role]}</span>
                    {currentRole === role && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                  </button>
                ))}
              </div>
              <div className="p-2">
                <button
                  onClick={() => { clearUser(); window.location.href = import.meta.env.BASE_URL || '/'; }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors text-xs"
                  data-testid="button-logout-menu"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {(showUserMenu || showOrgMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowUserMenu(false); setShowOrgMenu(false); setShowNotifications(false); }}
        />
      )}
    </header>
  );
}
