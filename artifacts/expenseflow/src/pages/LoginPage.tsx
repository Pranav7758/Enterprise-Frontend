import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { storeUser } from "@/lib/mock-data";
import { Eye, EyeOff, Loader2, CreditCard, ArrowRight, Zap, Shield, Globe } from "lucide-react";

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
    await new Promise(r => setTimeout(r, 1200));
    storeUser({ name: "Alex Chen", email, role: "super-admin", org: "Acme Corp" });
    setLoading(false);
    setLocation("/select-org");
  };

  const features = [
    { icon: Zap, text: "Real-time expense tracking" },
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Globe, text: "Multi-organization management" },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "hsl(228 81% 7%)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-2/5 relative overflow-hidden p-10"
        style={{ background: "linear-gradient(135deg, hsl(263 78% 10%) 0%, hsl(228 81% 8%) 50%, hsl(192 91% 8%) 100%)" }}>
        {/* Animated blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-12 -right-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-purple-500/20"
          style={{ background: "rgba(124,58,237,0.05)" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">ExpenseFlow</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                Multi-Organization<br />Expense Intelligence
              </h2>
              <p className="text-purple-300/80 text-sm leading-relaxed mb-8">
                The command center your finance team deserves. Manage expenses, approvals, and settlements across all your organizations from one unified platform.
              </p>
              <div className="space-y-3">
                {features.map((f, i) => (
                  <motion.div
                    key={f.text}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <f.icon className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-sm text-white/70">{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "4+", label: "Organizations" },
              { value: "$899K", label: "Monthly processed" },
              { value: "321", label: "Active users" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-3 border border-white/8" style={{ background: "rgba(255,255,255,0.04)" }}>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[11px] text-purple-300/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center">
              <CreditCard className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <span className="text-lg font-bold text-white">ExpenseFlow</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
            <p className="text-sm text-muted-foreground mb-7">Sign in to your account to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                  data-testid="input-email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                    data-testid="input-password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-3.5 h-3.5 rounded accent-purple-500" data-testid="input-remember" />
                  <span className="text-xs text-muted-foreground">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors disabled:opacity-60 shadow-lg shadow-purple-500/20"
                data-testid="button-submit"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-5">
              Use any email & password to sign in (demo mode)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
