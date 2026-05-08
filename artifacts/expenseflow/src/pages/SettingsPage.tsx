import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Lock, Building2, Palette, Bell } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { getStoredUser, organizations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "organizations", label: "Organizations", icon: Building2 },
  { id: "preferences", label: "Preferences", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const user = getStoredUser();

  const [notifToggles, setNotifToggles] = useState({
    approvalRequests: true,
    expenseRejected: true,
    paymentProcessed: true,
    budgetAlerts: true,
    systemUpdates: false,
    weeklyReport: true,
  });

  const toggle = (key: keyof typeof notifToggles) => {
    setNotifToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" subtitle="Manage your account, security, and preferences" icon={Settings} />

      <div className="flex gap-5 flex-col lg:flex-row">
        {/* Sidebar nav */}
        <div className="lg:w-52 shrink-0">
          <GlassCard className="p-2">
            <ul className="space-y-0.5">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-purple-500/15 text-purple-300 border-l-2 border-purple-500 pl-[10px]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                    data-testid={`tab-settings-${tab.id}`}
                  >
                    <tab.icon className="w-4 h-4 shrink-0" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {activeTab === "profile" && (
              <GlassCard>
                <h2 className="text-sm font-bold text-foreground mb-5">Profile Settings</h2>
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
                      {user?.name?.split(' ').map(n => n[0]).join('').slice(0,2) ?? 'AC'}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-purple-600 border-2 border-background flex items-center justify-center text-white text-[10px]">+</button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{user?.name ?? "Alex Chen"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email ?? "alex@acmecorp.com"}</p>
                    <button className="text-xs text-purple-400 hover:text-purple-300 mt-1 transition-colors">Change avatar</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: user?.name ?? "Alex Chen" },
                    { label: "Email", value: user?.email ?? "alex@acmecorp.com" },
                    { label: "Phone", value: "+1 (555) 234-5678" },
                    { label: "Department", value: "Finance" },
                    { label: "Job Title", value: "VP of Finance" },
                    { label: "Location", value: "San Francisco, CA" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs text-muted-foreground mb-1.5">{f.label}</label>
                      <input defaultValue={f.value} className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50 transition-all" data-testid={`input-profile-${f.label.toLowerCase().replace(/\s/g, '-')}`} />
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-end">
                  <button className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors" data-testid="button-save-profile">Save Changes</button>
                </div>
              </GlassCard>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <GlassCard>
                  <h2 className="text-sm font-bold text-foreground mb-4">Change Password</h2>
                  <div className="space-y-3 max-w-sm">
                    {["Current Password", "New Password", "Confirm New Password"].map(f => (
                      <div key={f}>
                        <label className="block text-xs text-muted-foreground mb-1.5">{f}</label>
                        <input type="password" className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-purple-500/50" placeholder="••••••••" data-testid={`input-${f.toLowerCase().replace(/\s/g, '-')}`} />
                      </div>
                    ))}
                    <button className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors mt-1" data-testid="button-change-password">Update Password</button>
                  </div>
                </GlassCard>
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-foreground">Two-Factor Authentication</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-xs font-medium bg-green-400/10 px-2.5 py-1 rounded-full border border-green-400/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Enabled
                    </div>
                  </div>
                  <div className="h-32 rounded-xl bg-white/4 flex items-center justify-center border border-white/8">
                    <p className="text-xs text-muted-foreground">QR Code placeholder (Demo)</p>
                  </div>
                </GlassCard>
                <GlassCard>
                  <h2 className="text-sm font-bold text-foreground mb-4">Active Sessions</h2>
                  {[
                    { device: "MacBook Pro (Chrome)", location: "San Francisco, CA", current: true },
                    { device: "iPhone 15 (Safari)", location: "San Francisco, CA", current: false },
                    { device: "Windows PC (Edge)", location: "New York, NY", current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/6 last:border-0">
                      <div>
                        <p className="text-xs font-medium text-foreground">{session.device}</p>
                        <p className="text-[10px] text-muted-foreground">{session.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.current ? <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">Current</span> : <button className="text-[10px] text-red-400 hover:text-red-300">Revoke</button>}
                      </div>
                    </div>
                  ))}
                </GlassCard>
              </div>
            )}

            {activeTab === "organizations" && (
              <GlassCard>
                <h2 className="text-sm font-bold text-foreground mb-4">My Organizations</h2>
                <div className="space-y-3">
                  {organizations.map(org => (
                    <div key={org.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/8 hover:border-white/12 transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0" style={{ background: org.color }}>{org.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{org.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{org.role.replace('-', ' ')} · {org.users} members</p>
                      </div>
                      <button className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded-lg hover:bg-red-400/10 transition-colors">Leave</button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {activeTab === "preferences" && (
              <GlassCard>
                <h2 className="text-sm font-bold text-foreground mb-5">Preferences</h2>
                <div className="space-y-4 max-w-md">
                  {[
                    { label: "Language", options: ["English", "Spanish", "French", "German", "Japanese"] },
                    { label: "Timezone", options: ["UTC-8 Pacific Time", "UTC-5 Eastern Time", "UTC+0 GMT", "UTC+5:30 IST"] },
                    { label: "Date Format", options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"] },
                    { label: "Currency Display", options: ["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)"] },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs text-muted-foreground mb-1.5">{f.label}</label>
                      <select className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none" data-testid={`select-pref-${f.label.toLowerCase().replace(/\s/g, '-')}`}>
                        {f.options.map(o => <option key={o} className="bg-card">{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div className="flex justify-end mt-2">
                    <button className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors">Save Preferences</button>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "notifications" && (
              <GlassCard>
                <h2 className="text-sm font-bold text-foreground mb-5">Notification Preferences</h2>
                <div className="space-y-3">
                  {(Object.entries({
                    approvalRequests: "Approval Requests",
                    expenseRejected: "Expense Rejected",
                    paymentProcessed: "Payment Processed",
                    budgetAlerts: "Budget Alerts",
                    systemUpdates: "System Updates",
                    weeklyReport: "Weekly Summary Report",
                  }) as Array<[keyof typeof notifToggles, string]>).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-white/6 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Receive email and in-app notifications</p>
                      </div>
                      <button
                        onClick={() => toggle(key)}
                        className={cn("relative w-10 h-5 rounded-full transition-all duration-300", notifToggles[key] ? "bg-purple-600" : "bg-white/15")}
                        data-testid={`toggle-${key}`}
                      >
                        <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300", notifToggles[key] ? "left-5.5" : "left-0.5")} style={{ left: notifToggles[key] ? '22px' : '2px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
