import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { getStoredUser } from "@/lib/mock-data";

import LoginPage from "@/pages/LoginPage";
import OrgSelectPage from "@/pages/OrgSelectPage";
import RoleDashboard from "@/pages/dashboard/RoleDashboard";
import HRDashboard from "@/pages/dashboard/HRDashboard";
import ExpenseListPage from "@/pages/ExpenseListPage";
import ExpenseDetailPage from "@/pages/ExpenseDetailPage";
import VendorPage from "@/pages/VendorPage";
import ApprovalPage from "@/pages/ApprovalPage";
import ReportsPage from "@/pages/ReportsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import SettingsPage from "@/pages/SettingsPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = getStoredUser();
  if (!user) {
    return <Redirect to="/" />;
  }
  return <AppLayout>{children}</AppLayout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/select-org" component={OrgSelectPage} />

      {/* Dashboard — role-aware, one route for all roles */}
      <Route path="/dashboard">
        <ProtectedRoute><RoleDashboard /></ProtectedRoute>
      </Route>

      {/* Main modules */}
      <Route path="/expenses">
        <ProtectedRoute><ExpenseListPage /></ProtectedRoute>
      </Route>
      <Route path="/expenses/:id">
        {(params) => (
          <ProtectedRoute><ExpenseDetailPage /></ProtectedRoute>
        )}
      </Route>
      <Route path="/vendors">
        <ProtectedRoute><VendorPage /></ProtectedRoute>
      </Route>
      <Route path="/approvals">
        <ProtectedRoute><ApprovalPage /></ProtectedRoute>
      </Route>
      <Route path="/reports">
        <ProtectedRoute><ReportsPage /></ProtectedRoute>
      </Route>
      <Route path="/hr">
        <ProtectedRoute><HRDashboard /></ProtectedRoute>
      </Route>
      <Route path="/notifications">
        <ProtectedRoute><NotificationsPage /></ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute><SettingsPage /></ProtectedRoute>
      </Route>

      {/* Fallback */}
      <Route>
        <ProtectedRoute>
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <p className="text-2xl font-bold text-foreground mb-2">404</p>
            <p className="text-muted-foreground text-sm">Page not found</p>
          </div>
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
