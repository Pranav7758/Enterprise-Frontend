import { cn } from "@/lib/utils";
import { ExpenseStatus } from "@/lib/mock-data";

const statusConfig: Record<ExpenseStatus, { label: string; className: string }> = {
  draft:    { label: 'Draft',    className: 'text-slate-600 bg-slate-100 border border-slate-200' },
  pending:  { label: 'Pending',  className: 'text-amber-700 bg-amber-50 border border-amber-200' },
  approved: { label: 'Approved', className: 'text-emerald-700 bg-emerald-50 border border-emerald-200' },
  rejected: { label: 'Rejected', className: 'text-red-700 bg-red-50 border border-red-200' },
  paid:     { label: 'Paid',     className: 'text-blue-700 bg-blue-50 border border-blue-200' },
};

interface StatusBadgeProps {
  status: ExpenseStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium",
      config.className,
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        status === 'draft' && 'bg-slate-400',
        status === 'pending' && 'bg-amber-400',
        status === 'approved' && 'bg-emerald-500',
        status === 'rejected' && 'bg-red-500',
        status === 'paid' && 'bg-blue-500',
      )} />
      {config.label}
    </span>
  );
}
