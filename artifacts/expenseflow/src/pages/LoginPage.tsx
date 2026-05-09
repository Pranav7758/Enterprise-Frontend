import { useState } from "react";
import { useLocation } from "wouter";
import { storeUser } from "@/lib/mock-data";
import { Eye, EyeOff, Loader2, ArrowRight, Receipt, TrendingUp, Shield, Zap } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("alex@acmecorp.com");
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
    await new Promise(r => setTimeout(r, 900));
    storeUser({ name: "Alex Chen", email, role: "super-admin", org: "Acme Corp" });
    setLoading(false);
    setLocation("/select-org");
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#F8FAFC' }}>
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col w-[420px] shrink-0 bg-[#0F172A] p-10 relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Receipt className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">ExpenseFlow</span>
          </div>

          {/* Main copy */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Enterprise Expense Management</p>
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Control every rupee<br />across every team
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Manage expense submissions, approvals, and reimbursements across multiple organizations — all from one place.
            </p>

            <div className="space-y-3">
              {[
                { icon: Zap, text: "Real-time approval workflows" },
                { icon: Shield, text: "Role-based access control" },
                { icon: TrendingUp, text: "Spend analytics & reporting" },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
            {[
              { value: "4+", label: "Organizations" },
              { value: "$899K", label: "Monthly spend" },
              { value: "321", label: "Active users" },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Receipt className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-slate-800">ExpenseFlow</span>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-7 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900 mb-0.5">Sign in</h1>
            <p className="text-sm text-slate-500 mb-6">Welcome back — enter your credentials to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Work email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white border border-[#E2E8F0] text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                    data-testid="input-password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-3.5 h-3.5 rounded accent-blue-600" data-testid="input-remember" />
                  <span className="text-xs text-slate-500">Remember me</span>
                </label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                data-testid="button-submit"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                ) : (
                  <>Sign in <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-5">
              Demo mode — any email & password works
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
