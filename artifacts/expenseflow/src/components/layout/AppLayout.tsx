import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { getStoredUser } from "@/lib/mock-data";
import { RoleProvider, useRole } from "@/lib/role-context";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayoutInner({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { currentRole, setRole } = useRole();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!getStoredUser()) {
      setLocation("/");
    }
  }, [setLocation]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar currentRole={currentRole} onRoleChange={setRole} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${location}-${currentRole}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-6 h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <RoleProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </RoleProvider>
  );
}
