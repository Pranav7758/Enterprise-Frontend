import { useState } from "react";
import { useLocation } from "wouter";
import { storeUser } from "@/lib/mock-data";
import { Eye, EyeOff, Loader2, ArrowRight, Building2, CheckCircle, TrendingUp, Lock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const companies = [
  { name: "Al Noor Holdings", initials: "AN", color: "#2563EB" },
  { name: "Gulf Tech Ventures", initials: "GT", color: "#0891b2" },
  { name: "Emirates Finance Ltd", initials: "EF", color: "#059669" },
  { name: "Desert Bloom Trading", initials: "DB", color: "#d97706" },
  { name: "Khaleeji Digital Media", initials: "KD", color: "#7c3aed" },
  { name: "Arabian Logistics Co", initials: "AL", color: "#dc2626" },
];

const stats = [
  { value: "6", label: "Companies" },
  { value: "AED 3.5M", label: "Monthly budget" },
  { value: "413", label: "Active users" },
];

const features = [
  { icon: Building2,   text: "Multi-company budget allocation" },
  { icon: CheckCircle, text: "Multi-level approval workflows" },
  { icon: TrendingUp,  text: "Real-time group spend analytics" },
  { icon: Lock,        text: "Role-based access per company" },
];

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("alex@alnoorholdings.ae");
  const [password, setPassword] = useState("password");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 950));
    storeUser({ name: "Alex Al Mansoori", email, role: "super-admin", org: "Al Noor Holdings" });
    setLoading(false);
    setLocation("/select-org");
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex flex-col w-[460px] xl:w-[520px] shrink-0 relative overflow-hidden bg-[#0F172A]">

        {/* Layered background decorations */}
        <div className="absolute inset-0">
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          {/* Blue gradient glow — top right */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)' }} />
          {/* Subtle glow — bottom left */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.15) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 flex flex-col h-full p-10">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Building2 className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <p className="text-white font-bold text-base tracking-tight leading-none">ExpenseFlow</p>
              <p className="text-slate-500 text-[10px] mt-0.5 tracking-wider uppercase">Group Management</p>
            </div>
          </div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-400 mb-4">
                Enterprise · UAE
              </p>
              <h1 className="text-[2.6rem] font-bold text-white leading-[1.12] tracking-tight mb-5">
                One platform<br />
                <span className="text-blue-400">all your companies.</span>
              </h1>
              <p className="text-slate-400 text-[15px] leading-relaxed mb-10 max-w-sm">
                Allocate monthly Dirham budgets, track spending, and manage approvals across every company in your group — from a single dashboard.
              </p>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3 mb-10"
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                    <f.icon className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300">{f.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Company avatar strip */}
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-3 font-semibold">Companies in this group</p>
              <div className="flex items-center gap-2 flex-wrap">
                {companies.map(c => (
                  <div
                    key={c.name}
                    title={c.name}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#0F172A] shadow-sm"
                    style={{ background: c.color }}
                  >
                    {c.initials}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-slate-500 text-[10px] font-bold">
                  +
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-xl font-bold text-white tabular-nums">{s.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right login panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800 text-base">ExpenseFlow</span>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Card top accent */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />

            <div className="p-8">
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                <p className="text-sm text-slate-500 mt-1">Sign in to your group management portal</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.ae"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Password</label>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-50 border border-[#E2E8F0] text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded accent-blue-600"
                      data-testid="input-remember"
                    />
                    <span className="text-sm text-slate-500">Keep me signed in</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/25 mt-2"
                  data-testid="button-submit"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                  ) : (
                    <>Sign in <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#F1F5F9]" />
                </div>
                <div className="relative flex justify-center text-xs text-slate-400 bg-white px-3 w-fit mx-auto">
                  Demo access
                </div>
              </div>

              {/* Demo hint */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5">
                <p className="text-xs text-blue-700 font-semibold mb-2">Quick sign-in for demo</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Email</span>
                    <span className="font-mono text-slate-700">alex@alnoorholdings.ae</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Password</span>
                    <span className="font-mono text-slate-700">any password</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-5">
            Protected by enterprise-grade security · AES-256 encryption
          </p>
        </div>
      </div>
    </div>
  );
}
