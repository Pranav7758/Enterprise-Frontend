import { Bell, Search, ChevronDown, Building2, UserCog, Check } from "lucide-react";
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

const roleDotColors: Record<Role, string> = {
  'super-admin': 'bg-purple-500',
  'org-admin':   'bg-blue-500',
  'maker':       'bg-emerald-500',
  'approver':    'bg-amber-500',
  'finance':     'bg-cyan-500',
  'hr':          'bg-pink-500',
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
      storeUser({ ...user, role });
      onRoleChange(role);
      setLocation("/dashboard");
    }
    setShowUserMenu(false);
  };

  const closeAll = () => { setShowUserMenu(false); setShowOrgMenu(false); setShowNotifications(false); };

  return (
    <header className="h-14 flex items-center justify-between px-5 bg-white border-b border-[#E2E8F0] shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 w-64 px-3 py-1.5 rounded-md bg-slate-50 border border-[#E2E8F0] text-slate-400 text-sm cursor-pointer hover:border-slate-300 transition-colors">
        <Search className="w-3.5 h-3.5 shrink-0" />
        <span className="text-xs text-slate-400 flex-1">Search expenses, vendors...</span>
        <kbd className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-mono">⌘K</kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Org switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowOrgMenu(!showOrgMenu); setShowUserMenu(false); setShowNotifications(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-[#E2E8F0] text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition-colors"
            data-testid="button-org-switcher"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs">{user?.org ?? "Acme Corp"}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          {showOrgMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-lg border border-[#E2E8F0] shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 border-b border-[#F1F5F9]">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Switch Organization</p>
              </div>
              <div className="p-1.5">
                {organizations.map(org => (
                  <button
                    key={org.id}
                    onClick={() => { if (user) { storeUser({ ...user, org: org.name }); } closeAll(); }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: org.color }}>
                      {org.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 truncate">{org.name}</p>
                      <p className="text-[10px] text-slate-400">{org.currency}</p>
                    </div>
                    {user?.org === org.name && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
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
            className="relative p-2 rounded-md bg-slate-50 border border-[#E2E8F0] text-slate-500 hover:text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
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
            <div className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-lg border border-[#E2E8F0] shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#F1F5F9] flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Notifications</p>
                <span className="text-xs text-blue-600 font-medium">{unread} unread</span>
              </div>
              <div className="max-h-72 overflow-y-auto scrollbar-thin">
                {allNotifications.slice(0, 6).map(n => (
                  <div key={n.id} className={cn("flex gap-3 px-4 py-3 border-b border-[#F8FAFC] hover:bg-slate-50 transition-colors", !n.read && "bg-blue-50/40")}>
                    <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", n.read ? "bg-slate-300" : "bg-blue-500")} />
                    <div>
                      <p className="text-xs font-medium text-slate-800">{n.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[#F1F5F9]">
                <button onClick={() => { closeAll(); window.location.hash = '#/notifications'; }} className="w-full text-center text-xs text-blue-600 hover:text-blue-700 py-0.5">
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
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-md bg-slate-50 border border-[#E2E8F0] hover:bg-slate-100 hover:border-slate-300 transition-colors"
            data-testid="button-user-menu"
          >
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'AC'}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name ?? "Alex Chen"}</p>
              <div className="flex items-center gap-1">
                <span className={cn("w-1.5 h-1.5 rounded-full", roleDotColors[currentRole])} />
                <p className="text-[10px] text-slate-500">{roleLabels[currentRole]}</p>
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-lg border border-[#E2E8F0] shadow-lg z-50 overflow-hidden">
              <div className="p-1.5 border-b border-[#F1F5F9]">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold px-2 py-1">Switch Role (Demo)</p>
                {(Object.keys(roleLabels) as Role[]).map(role => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left hover:bg-slate-50 transition-colors",
                      currentRole === role ? "bg-blue-50" : ""
                    )}
                    data-testid={`button-role-${role}`}
                  >
                    <span className={cn("w-2 h-2 rounded-full shrink-0", roleDotColors[role])} />
                    <span className="text-xs text-slate-700 flex-1">{roleLabels[role]}</span>
                    {currentRole === role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => { clearUser(); window.location.href = import.meta.env.BASE_URL || '/'; }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors text-xs"
                  data-testid="button-logout-menu"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showUserMenu || showOrgMenu || showNotifications) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}
    </header>
  );
}
