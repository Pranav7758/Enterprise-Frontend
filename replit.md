# ExpenseFlow — Multi-Organization Expense Management

Premium enterprise-grade dark luxury fintech dashboard for managing expenses across multiple organizations.

## Run & Operate

- `pnpm --filter @workspace/expenseflow run dev` — run the frontend (port varies)
- `pnpm --filter @workspace/expenseflow run typecheck` — typecheck the app

## Stack

- React 19 + Vite 7, TypeScript 5.9
- Tailwind CSS v4 + custom dark navy theme (glassmorphism utilities)
- Framer Motion (animations), Recharts (charts), Lucide React (icons)
- Wouter (routing), shadcn/ui components
- All data is static/mock — no backend required

## Where things live

- `artifacts/expenseflow/src/` — all app source
- `src/lib/mock-data.ts` — all mock data, organizations, expenses, vendors, notifications
- `src/index.css` — full dark navy theme, glassmorphism utilities
- `src/App.tsx` — all routes (wouter)
- `src/components/layout/` — Sidebar, Navbar, AppLayout
- `src/components/shared/` — GlassCard, StatCard, StatusBadge, PageHeader
- `src/pages/` — all pages
- `src/pages/dashboard/` — role-specific dashboards

## Pages

- `/` — Login (split-panel with animated blobs)
- `/select-org` — Organization selection card grid
- `/dashboard` — Super Admin Dashboard (org overview, charts)
- `/dashboard/org-admin` — Org Admin (budget gauges, department budgets)
- `/dashboard/maker` — Maker (submit expenses modal)
- `/dashboard/approver` — Approver (OTP verification flow)
- `/dashboard/finance` — Finance (payment queue, cash flow charts)
- `/dashboard/hr` — HR Module (FNF settlements)
- `/expenses` — Expense list (paginated table, status filters)
- `/expenses/:id` — Expense detail (status tracker, activity timeline)
- `/vendors` — Vendor management (grid/list toggle, slide-out panel)
- `/approvals` — Kanban-style approval workflow
- `/reports` — Analytics with 5 tab views and multiple chart types
- `/notifications` — Filterable notification feed
- `/settings` — Profile, Security, Organizations, Preferences, Notifications

## Auth

- localStorage-based: key `expenseflow_user` stores `{ name, email, role, org }`
- Role switching available in Navbar dropdown (demo)
- 6 roles: super-admin, org-admin, maker, approver, finance, hr

## User preferences

- Dark-only theme (no light mode toggle)
- Glassmorphism cards throughout
- Neon purple (#7c3aed) + cyan (#06b6d4) accent palette
- Framer Motion page transitions and micro-animations
