import { useRole } from "@/lib/role-context";
import SuperAdminDashboard from "./SuperAdminDashboard";
import OrgAdminDashboard from "./OrgAdminDashboard";
import MakerDashboard from "./MakerDashboard";
import ApproverDashboard from "./ApproverDashboard";
import FinanceDashboard from "./FinanceDashboard";
import HRDashboard from "./HRDashboard";

export default function RoleDashboard() {
  const { currentRole } = useRole();

  switch (currentRole) {
    case "super-admin":
      return <SuperAdminDashboard />;
    case "org-admin":
      return <OrgAdminDashboard />;
    case "maker":
      return <MakerDashboard />;
    case "approver":
      return <ApproverDashboard />;
    case "finance":
      return <FinanceDashboard />;
    case "hr":
      return <HRDashboard />;
    default:
      return <SuperAdminDashboard />;
  }
}
