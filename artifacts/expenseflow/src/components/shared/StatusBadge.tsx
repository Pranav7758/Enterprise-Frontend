import { cn } from "@/lib/utils";
import { ExpenseStatus } from "@/lib/mock-data";

const statusConfig: Record<ExpenseStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'text-slate-400 bg-slate-400/10 border border-slate-400/20' },
  pending: { label: 'Pending', className: 'text-amber-400 bg-amber-400/10 border border-amber-400/20 shadow-[0_0_8px_rgba(245,158,11,0.2)]' },
  approved: { label: 'Approved', className: 'text-green-400 bg-green-400/10 border border-green-400/20 shadow-[0_0_8px_rgba(34,197,94,0.2)]' },
  rejected: { label: 'Rejected', className: 'text-red-400 bg-red-400/10 border border-red-400/20 shadow-[0_0_8px_rgba(239,68,68,0.2)]' },
  paid: { label: 'Paid', className: 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 shadow-[0_0_8px_rgba(6,182,212,0.2)]' },
};

interface StatusBadgeProps {
  status: ExpenseStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", config.className, className)}>
      {config.label}
    </span>
  );
}
