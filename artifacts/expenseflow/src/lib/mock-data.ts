export type Role = 'super-admin' | 'org-admin' | 'maker' | 'approver' | 'finance' | 'hr';
export type ExpenseStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'paid';

export interface Organization {
  id: string;
  name: string;
  initials: string;
  color: string;
  currency: string;
  users: number;
  monthlySpend: number;
  activeProjects: number;
  role: Role;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  vendor: string;
  date: string;
  status: ExpenseStatus;
  submittedBy: string;
  org: string;
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
  paidAt?: string;
}

export interface Vendor {
  id: string;
  name: string;
  initials: string;
  color: string;
  category: string;
  gstNumber: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  totalSpend: number;
}

export interface Notification {
  id: string;
  type: 'approval' | 'rejected' | 'payment' | 'otp' | 'settlement' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface User {
  name: string;
  email: string;
  role: Role;
  org: string;
  avatar?: string;
}

export const organizations: Organization[] = [
  {
    id: '1', name: 'Acme Corp', initials: 'AC', color: '#7c3aed',
    currency: 'USD', users: 142, monthlySpend: 284500, activeProjects: 24, role: 'super-admin',
  },
  {
    id: '2', name: 'TechVentures Inc', initials: 'TV', color: '#0891b2',
    currency: 'EUR', users: 67, monthlySpend: 156200, activeProjects: 12, role: 'org-admin',
  },
  {
    id: '3', name: 'Global Finance Ltd', initials: 'GF', color: '#059669',
    currency: 'GBP', users: 89, monthlySpend: 412800, activeProjects: 31, role: 'finance',
  },
  {
    id: '4', name: 'StartupHub', initials: 'SH', color: '#d97706',
    currency: 'INR', users: 23, monthlySpend: 45600, activeProjects: 6, role: 'maker',
  },
];

export const expenses: Expense[] = [
  { id: 'EXP-001', title: 'Q4 AWS Infrastructure', amount: 12500, category: 'Technology', vendor: 'Amazon Web Services', date: '2026-05-01', status: 'approved', submittedBy: 'Sarah Johnson', org: 'Acme Corp', approvedBy: 'James Wilson', approvedAt: '2026-05-02' },
  { id: 'EXP-002', title: 'Team Offsite Venue & Catering', amount: 8750, category: 'Events', vendor: 'Marriott Hotels', date: '2026-05-03', status: 'pending', submittedBy: 'Mike Chen', org: 'Acme Corp' },
  { id: 'EXP-003', title: 'Annual Software Licenses', amount: 24000, category: 'Software', vendor: 'Adobe Systems', date: '2026-04-28', status: 'paid', submittedBy: 'Emma Davis', org: 'Acme Corp', approvedBy: 'James Wilson', approvedAt: '2026-04-29', paidAt: '2026-05-01' },
  { id: 'EXP-004', title: 'Marketing Campaign Q2', amount: 35000, category: 'Marketing', vendor: 'Digital Spark Agency', date: '2026-04-25', status: 'approved', submittedBy: 'Alex Brown', org: 'TechVentures Inc', approvedBy: 'Lisa Park' },
  { id: 'EXP-005', title: 'Office Supplies & Equipment', amount: 3200, category: 'Operations', vendor: 'Staples Business', date: '2026-05-05', status: 'draft', submittedBy: 'Tom Harris', org: 'Acme Corp' },
  { id: 'EXP-006', title: 'Legal Consultation Fees', amount: 15000, category: 'Legal', vendor: 'Morrison & Associates', date: '2026-04-20', status: 'rejected', submittedBy: 'Clara White', org: 'Global Finance Ltd', notes: 'Amount exceeds monthly legal budget cap' },
  { id: 'EXP-007', title: 'Cloud Security Audit', amount: 9800, category: 'Technology', vendor: 'CyberShield Inc', date: '2026-05-02', status: 'pending', submittedBy: 'Ryan Lee', org: 'TechVentures Inc' },
  { id: 'EXP-008', title: 'Employee Training Program', amount: 6500, category: 'HR & Training', vendor: 'SkillPath Academy', date: '2026-04-30', status: 'approved', submittedBy: 'Priya Sharma', org: 'Acme Corp', approvedBy: 'James Wilson' },
  { id: 'EXP-009', title: 'Product Design Sprint', amount: 18000, category: 'Design', vendor: 'Studio Nucleus', date: '2026-05-06', status: 'pending', submittedBy: 'Jake Miller', org: 'StartupHub' },
  { id: 'EXP-010', title: 'International Travel – SF Summit', amount: 4200, category: 'Travel', vendor: 'United Airlines / Marriott', date: '2026-04-15', status: 'paid', submittedBy: 'Sarah Johnson', org: 'Acme Corp', approvedBy: 'James Wilson', paidAt: '2026-04-17' },
  { id: 'EXP-011', title: 'Data Analytics Platform', amount: 22000, category: 'Software', vendor: 'Tableau Software', date: '2026-05-04', status: 'pending', submittedBy: 'Nathan Clark', org: 'Global Finance Ltd' },
  { id: 'EXP-012', title: 'PR & Communications Retainer', amount: 11000, category: 'Marketing', vendor: 'BrandVoice PR', date: '2026-04-22', status: 'approved', submittedBy: 'Olivia Martinez', org: 'TechVentures Inc' },
  { id: 'EXP-013', title: 'Server Hardware Upgrade', amount: 45000, category: 'Technology', vendor: 'Dell Technologies', date: '2026-04-10', status: 'paid', submittedBy: 'Ryan Lee', org: 'Global Finance Ltd', paidAt: '2026-04-14' },
  { id: 'EXP-014', title: 'Recruitment Agency Fees', amount: 8000, category: 'HR & Training', vendor: 'Talent Bridge', date: '2026-05-07', status: 'draft', submittedBy: 'Priya Sharma', org: 'Acme Corp' },
  { id: 'EXP-015', title: 'Quarterly Board Meeting', amount: 5500, category: 'Events', vendor: 'Grand Hyatt Hotel', date: '2026-05-08', status: 'approved', submittedBy: 'Emma Davis', org: 'Acme Corp' },
  { id: 'EXP-016', title: 'Customer Support Software', amount: 7800, category: 'Software', vendor: 'Zendesk Inc', date: '2026-04-18', status: 'paid', submittedBy: 'Tom Harris', org: 'StartupHub', paidAt: '2026-04-20' },
  { id: 'EXP-017', title: 'Brand Photography Session', amount: 4500, category: 'Design', vendor: 'Pixel Perfect Studios', date: '2026-05-03', status: 'rejected', submittedBy: 'Jake Miller', org: 'StartupHub', notes: 'Not aligned with current quarter budget' },
  { id: 'EXP-018', title: 'Insurance Premium Renewal', amount: 62000, category: 'Legal', vendor: 'Prudential Business', date: '2026-04-05', status: 'paid', submittedBy: 'Clara White', org: 'Global Finance Ltd', paidAt: '2026-04-07' },
  { id: 'EXP-019', title: 'Sales CRM Subscription', amount: 9600, category: 'Software', vendor: 'Salesforce Inc', date: '2026-05-01', status: 'pending', submittedBy: 'Alex Brown', org: 'Acme Corp' },
  { id: 'EXP-020', title: 'Networking Event Sponsorship', amount: 15000, category: 'Marketing', vendor: 'TechConf Global', date: '2026-04-28', status: 'approved', submittedBy: 'Olivia Martinez', org: 'TechVentures Inc' },
];

export const vendors: Vendor[] = [
  { id: 'V-001', name: 'Amazon Web Services', initials: 'AW', color: '#f97316', category: 'Cloud Infrastructure', gstNumber: 'GSTIN29AAA1234B1Z5', contact: 'James Porter', email: 'enterprise@aws.amazon.com', phone: '+1-800-555-0192', address: '410 Terry Ave N, Seattle, WA 98109', status: 'active', totalSpend: 145000 },
  { id: 'V-002', name: 'Marriott Hotels', initials: 'MH', color: '#dc2626', category: 'Hospitality & Events', gstNumber: 'GSTIN27AAB5678C2Y6', contact: 'Laura Kim', email: 'corporate@marriott.com', phone: '+1-301-380-3000', address: '10400 Fernwood Rd, Bethesda, MD 20817', status: 'active', totalSpend: 42000 },
  { id: 'V-003', name: 'Adobe Systems', initials: 'AS', color: '#ef4444', category: 'Software & Creative', gstNumber: 'GSTIN06AAC9012D3X7', contact: 'Michael Torres', email: 'enterprise@adobe.com', phone: '+1-408-536-6000', address: '345 Park Avenue, San Jose, CA 95110', status: 'active', totalSpend: 96000 },
  { id: 'V-004', name: 'Digital Spark Agency', initials: 'DS', color: '#8b5cf6', category: 'Marketing & Design', gstNumber: 'GSTIN33ADD2345E4W8', contact: 'Rachel Green', email: 'hello@digitalspark.io', phone: '+1-512-555-0147', address: '221 W 5th St, Austin, TX 78701', status: 'active', totalSpend: 71000 },
  { id: 'V-005', name: 'Morrison & Associates', initials: 'MA', color: '#0891b2', category: 'Legal Services', gstNumber: 'GSTIN19ABE6789F5V9', contact: 'David Morrison', email: 'legal@morrisonassoc.com', phone: '+1-212-555-0132', address: '1285 Avenue of the Americas, NY 10019', status: 'active', totalSpend: 58000 },
  { id: 'V-006', name: 'Dell Technologies', initials: 'DT', color: '#059669', category: 'Hardware & Infrastructure', gstNumber: 'GSTIN36ABF3456G6U1', contact: 'Chris Anderson', email: 'enterprise@dell.com', phone: '+1-800-624-9897', address: 'One Dell Way, Round Rock, TX 78682', status: 'active', totalSpend: 210000 },
  { id: 'V-007', name: 'Salesforce Inc', initials: 'SF', color: '#0ea5e9', category: 'CRM Software', gstNumber: 'GSTIN27ABG7890H7T2', contact: 'Jennifer Walsh', email: 'enterprise@salesforce.com', phone: '+1-415-901-7000', address: 'Salesforce Tower, 415 Mission St, SF 94105', status: 'active', totalSpend: 48000 },
  { id: 'V-008', name: 'CyberShield Inc', initials: 'CS', color: '#d97706', category: 'Cybersecurity', gstNumber: 'GSTIN09ABH1234I8S3', contact: 'Mark Stevens', email: 'enterprise@cybershield.io', phone: '+1-703-555-0198', address: '1875 K Street NW, Washington, DC 20006', status: 'active', totalSpend: 29000 },
  { id: 'V-009', name: 'SkillPath Academy', initials: 'SP', color: '#7c3aed', category: 'Training & Education', gstNumber: 'GSTIN24ABI5678J9R4', contact: 'Anna Williams', email: 'corporate@skillpath.com', phone: '+1-800-873-7545', address: '6900 Squibb Rd, Mission, KS 66202', status: 'inactive', totalSpend: 16000 },
  { id: 'V-010', name: 'Zendesk Inc', initials: 'ZD', color: '#16a34a', category: 'Customer Support Software', gstNumber: 'GSTIN29ABJ2345K1Q5', contact: 'Sophia Chen', email: 'enterprise@zendesk.com', phone: '+1-415-418-7506', address: '1019 Market St, San Francisco, CA 94103', status: 'active', totalSpend: 38000 },
];

export const notifications: Notification[] = [
  { id: 'N-001', type: 'approval', title: 'Approval Required', description: 'EXP-007 "Cloud Security Audit" ($9,800) needs your review', timestamp: '2026-05-08T09:15:00', read: false },
  { id: 'N-002', type: 'approval', title: 'New Expense Submitted', description: 'EXP-009 "Product Design Sprint" from Jake Miller awaits approval', timestamp: '2026-05-08T08:42:00', read: false },
  { id: 'N-003', type: 'payment', title: 'Payment Processed', description: 'EXP-003 "Annual Software Licenses" ($24,000) has been paid to Adobe Systems', timestamp: '2026-05-07T16:30:00', read: false },
  { id: 'N-004', type: 'rejected', title: 'Expense Rejected', description: 'EXP-006 "Legal Consultation Fees" was rejected — exceeds budget cap', timestamp: '2026-05-07T14:15:00', read: true },
  { id: 'N-005', type: 'otp', title: 'OTP Verification Required', description: 'Verify payment of $45,000 to Dell Technologies with OTP', timestamp: '2026-05-07T11:00:00', read: true },
  { id: 'N-006', type: 'settlement', title: 'FNF Settlement Alert', description: 'Final settlement for James Porter (Engineering) pending clearance', timestamp: '2026-05-06T17:30:00', read: true },
  { id: 'N-007', type: 'approval', title: 'Budget Alert', description: 'Marketing department has reached 92% of Q2 budget allocation', timestamp: '2026-05-06T10:00:00', read: true },
  { id: 'N-008', type: 'payment', title: 'Bank Transfer Confirmed', description: '$62,000 transferred to Prudential Business for insurance renewal', timestamp: '2026-05-05T15:45:00', read: true },
  { id: 'N-009', type: 'system', title: 'New Organization Added', description: 'StartupHub has been onboarded to ExpenseFlow by system admin', timestamp: '2026-05-05T09:00:00', read: true },
  { id: 'N-010', type: 'approval', title: 'Approval Reminder', description: '3 expenses pending your approval for more than 48 hours', timestamp: '2026-05-04T12:00:00', read: true },
  { id: 'N-011', type: 'rejected', title: 'Expense Rejected', description: 'EXP-017 "Brand Photography Session" was rejected — off-budget', timestamp: '2026-05-04T10:30:00', read: true },
  { id: 'N-012', type: 'settlement', title: 'Settlement Completed', description: 'Employee settlement for Priya Sharma processed successfully', timestamp: '2026-05-03T14:00:00', read: true },
  { id: 'N-013', type: 'payment', title: 'Payment Processed', description: 'EXP-013 "Server Hardware Upgrade" ($45,000) paid to Dell Technologies', timestamp: '2026-05-01T11:15:00', read: true },
  { id: 'N-014', type: 'system', title: 'System Maintenance', description: 'Scheduled maintenance on May 10 from 2:00 AM – 4:00 AM UTC', timestamp: '2026-05-01T08:00:00', read: true },
  { id: 'N-015', type: 'otp', title: 'Login from New Device', description: 'New login detected from Chrome on MacOS — San Francisco, CA', timestamp: '2026-04-30T19:45:00', read: true },
];

export const monthlyExpenseData = [
  { month: 'Jan', expenses: 180000, approved: 162000, paid: 158000 },
  { month: 'Feb', expenses: 210000, approved: 195000, paid: 190000 },
  { month: 'Mar', expenses: 195000, approved: 178000, paid: 175000 },
  { month: 'Apr', expenses: 265000, approved: 241000, paid: 235000 },
  { month: 'May', expenses: 289500, approved: 215000, paid: 180000 },
  { month: 'Jun', expenses: 0, approved: 0, paid: 0 },
  { month: 'Jul', expenses: 0, approved: 0, paid: 0 },
  { month: 'Aug', expenses: 0, approved: 0, paid: 0 },
  { month: 'Sep', expenses: 0, approved: 0, paid: 0 },
  { month: 'Oct', expenses: 0, approved: 0, paid: 0 },
  { month: 'Nov', expenses: 0, approved: 0, paid: 0 },
  { month: 'Dec', expenses: 0, approved: 0, paid: 0 },
];

export const orgGrowthData = [
  { month: 'Dec', orgs: 1 },
  { month: 'Jan', orgs: 1 },
  { month: 'Feb', orgs: 2 },
  { month: 'Mar', orgs: 2 },
  { month: 'Apr', orgs: 3 },
  { month: 'May', orgs: 4 },
];

export const categoryData = [
  { name: 'Technology', value: 45, color: '#7c3aed' },
  { name: 'Marketing', value: 22, color: '#06b6d4' },
  { name: 'Operations', value: 15, color: '#10b981' },
  { name: 'Legal', value: 9, color: '#f59e0b' },
  { name: 'HR & Training', value: 5, color: '#ef4444' },
  { name: 'Events', value: 4, color: '#8b5cf6' },
];

export const cashFlowData = [
  { month: 'Jan', inflow: 250000, outflow: 180000 },
  { month: 'Feb', inflow: 280000, outflow: 210000 },
  { month: 'Mar', inflow: 260000, outflow: 195000 },
  { month: 'Apr', inflow: 310000, outflow: 265000 },
  { month: 'May', inflow: 295000, outflow: 289500 },
];

export const departmentBudgets = [
  { name: 'Engineering', budget: 120000, spent: 98000, percentage: 82 },
  { name: 'Marketing', budget: 80000, spent: 73600, percentage: 92 },
  { name: 'Sales', budget: 60000, spent: 42000, percentage: 70 },
  { name: 'Operations', budget: 40000, spent: 28000, percentage: 70 },
  { name: 'HR', budget: 30000, spent: 19500, percentage: 65 },
];

export const pendingApprovals: Expense[] = expenses.filter(e => e.status === 'pending');

export const myExpenses: Expense[] = expenses.filter(e => e.submittedBy === 'Sarah Johnson');

export const employeeSettlements = [
  { id: 'S-001', employee: 'James Porter', department: 'Engineering', dueAmount: 8500, status: 'pending', items: ['Pending expenses: $3,200', 'Travel reimbursement: $1,800', 'Tool allowance: $3,500'], joinDate: '2022-03-15', lastDate: '2026-05-31' },
  { id: 'S-002', employee: 'Maria Santos', department: 'Marketing', dueAmount: 5200, status: 'in-progress', items: ['Pending expenses: $2,100', 'Bonus payment: $3,100'], joinDate: '2021-08-01', lastDate: '2026-05-15' },
  { id: 'S-003', employee: 'Robert Kim', department: 'Sales', dueAmount: 11000, status: 'pending', items: ['Commission Q1: $6,500', 'Pending reimbursements: $4,500'], joinDate: '2020-01-10', lastDate: '2026-06-15' },
];

export const paymentQueue: Array<{ id: string; expense: Expense; bankAccount: string; processingDate: string; paymentStatus: 'pending_payment' | 'processing' | 'completed' }> = [
  { id: 'PQ-001', expense: expenses[1], bankAccount: '****4521 (HDFC)', processingDate: '2026-05-10', paymentStatus: 'pending_payment' },
  { id: 'PQ-002', expense: expenses[6], bankAccount: '****8834 (Chase)', processingDate: '2026-05-10', paymentStatus: 'processing' },
  { id: 'PQ-003', expense: expenses[10], bankAccount: '****2219 (Barclays)', processingDate: '2026-05-11', paymentStatus: 'pending_payment' },
  { id: 'PQ-004', expense: expenses[18], bankAccount: '****7743 (Citibank)', processingDate: '2026-05-11', paymentStatus: 'pending_payment' },
];

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem('expenseflow_user');
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function storeUser(user: User): void {
  localStorage.setItem('expenseflow_user', JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem('expenseflow_user');
}
