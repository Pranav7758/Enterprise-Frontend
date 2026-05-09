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
    id: '1', name: 'Al Noor Holdings', initials: 'AN', color: '#2563EB',
    currency: 'AED', users: 142, monthlySpend: 1045000, activeProjects: 24, role: 'super-admin',
  },
  {
    id: '2', name: 'Gulf Tech Ventures', initials: 'GT', color: '#0891b2',
    currency: 'AED', users: 67, monthlySpend: 573600, activeProjects: 12, role: 'org-admin',
  },
  {
    id: '3', name: 'Emirates Finance Ltd', initials: 'EF', color: '#059669',
    currency: 'AED', users: 89, monthlySpend: 1516000, activeProjects: 31, role: 'finance',
  },
  {
    id: '4', name: 'Desert Bloom Trading', initials: 'DB', color: '#d97706',
    currency: 'AED', users: 23, monthlySpend: 167500, activeProjects: 6, role: 'maker',
  },
  {
    id: '5', name: 'Khaleeji Digital Media', initials: 'KD', color: '#7c3aed',
    currency: 'AED', users: 38, monthlySpend: 284000, activeProjects: 9, role: 'org-admin',
  },
  {
    id: '6', name: 'Arabian Logistics Co', initials: 'AL', color: '#dc2626',
    currency: 'AED', users: 54, monthlySpend: 398000, activeProjects: 14, role: 'approver',
  },
];

export const expenses: Expense[] = [
  { id: 'EXP-001', title: 'Q2 Cloud Infrastructure (Azure)', amount: 45900, category: 'Technology', vendor: 'Microsoft Gulf', date: '2026-05-01', status: 'approved', submittedBy: 'Sarah Al Mansoori', org: 'Al Noor Holdings', approvedBy: 'James Wilson', approvedAt: '2026-05-02' },
  { id: 'EXP-002', title: 'Annual Summit — Venue & Catering', amount: 32150, category: 'Events', vendor: 'Atlantis The Palm', date: '2026-05-03', status: 'pending', submittedBy: 'Mike Hassan', org: 'Al Noor Holdings' },
  { id: 'EXP-003', title: 'Enterprise Software Licenses', amount: 88200, category: 'Software', vendor: 'Oracle Middle East', date: '2026-04-28', status: 'paid', submittedBy: 'Emma Al Zaabi', org: 'Al Noor Holdings', approvedBy: 'James Wilson', approvedAt: '2026-04-29', paidAt: '2026-05-01' },
  { id: 'EXP-004', title: 'Brand Campaign Q2 — Digital', amount: 128500, category: 'Marketing', vendor: 'TBWA\\ RAAD Dubai', date: '2026-04-25', status: 'approved', submittedBy: 'Alex Brahimi', org: 'Gulf Tech Ventures', approvedBy: 'Lisa Park' },
  { id: 'EXP-005', title: 'Office Furniture & Fitout', amount: 11750, category: 'Operations', vendor: 'IKEA Business UAE', date: '2026-05-05', status: 'draft', submittedBy: 'Tom Rashid', org: 'Al Noor Holdings' },
  { id: 'EXP-006', title: 'Legal Advisory — Contract Review', amount: 55100, category: 'Legal', vendor: 'Al Tamimi & Company', date: '2026-04-20', status: 'rejected', submittedBy: 'Clara Al Naqbi', org: 'Emirates Finance Ltd', notes: 'Amount exceeds monthly legal budget cap' },
  { id: 'EXP-007', title: 'Cybersecurity Audit & Assessment', amount: 36000, category: 'Technology', vendor: 'Help AG', date: '2026-05-02', status: 'pending', submittedBy: 'Ryan Khalid', org: 'Gulf Tech Ventures' },
  { id: 'EXP-008', title: 'Leadership Training Program', amount: 23900, category: 'HR & Training', vendor: 'Meirc Training & Consulting', date: '2026-04-30', status: 'approved', submittedBy: 'Priya Sharma', org: 'Al Noor Holdings', approvedBy: 'James Wilson' },
  { id: 'EXP-009', title: 'UX Design Sprint — Mobile App', amount: 66100, category: 'Design', vendor: 'Publicis Middle East', date: '2026-05-06', status: 'pending', submittedBy: 'Jake Al Mousa', org: 'Desert Bloom Trading' },
  { id: 'EXP-010', title: 'Executive Travel — World Expo', amount: 15400, category: 'Travel', vendor: 'Emirates Airlines / Jumeirah', date: '2026-04-15', status: 'paid', submittedBy: 'Sarah Al Mansoori', org: 'Al Noor Holdings', approvedBy: 'James Wilson', paidAt: '2026-04-17' },
  { id: 'EXP-011', title: 'Data Analytics Platform License', amount: 80800, category: 'Software', vendor: 'SAP Middle East', date: '2026-05-04', status: 'pending', submittedBy: 'Nathan Clarke', org: 'Emirates Finance Ltd' },
  { id: 'EXP-012', title: 'PR Retainer — Media Relations', amount: 40400, category: 'Marketing', vendor: 'Weber Shandwick MENA', date: '2026-04-22', status: 'approved', submittedBy: 'Olivia Martinez', org: 'Gulf Tech Ventures' },
  { id: 'EXP-013', title: 'Data Centre Hardware Upgrade', amount: 165300, category: 'Technology', vendor: 'Dell EMC Middle East', date: '2026-04-10', status: 'paid', submittedBy: 'Ryan Khalid', org: 'Emirates Finance Ltd', paidAt: '2026-04-14' },
  { id: 'EXP-014', title: 'Recruitment Agency — Tech Hires', amount: 29400, category: 'HR & Training', vendor: 'Nadia Middle East', date: '2026-05-07', status: 'draft', submittedBy: 'Priya Sharma', org: 'Al Noor Holdings' },
  { id: 'EXP-015', title: 'Board Meeting — DIFC Boardroom', amount: 20200, category: 'Events', vendor: 'Gate District — DIFC', date: '2026-05-08', status: 'approved', submittedBy: 'Emma Al Zaabi', org: 'Al Noor Holdings' },
  { id: 'EXP-016', title: 'Customer Support Platform', amount: 28650, category: 'Software', vendor: 'Freshworks MENA', date: '2026-04-18', status: 'paid', submittedBy: 'Tom Rashid', org: 'Desert Bloom Trading', paidAt: '2026-04-20' },
  { id: 'EXP-017', title: 'Campaign Photography & Video', amount: 16550, category: 'Design', vendor: 'Desert Eye Productions', date: '2026-05-03', status: 'rejected', submittedBy: 'Jake Al Mousa', org: 'Desert Bloom Trading', notes: 'Not aligned with current quarter budget' },
  { id: 'EXP-018', title: 'Group Insurance Premium Renewal', amount: 227700, category: 'Legal', vendor: 'AXA Green Crescent UAE', date: '2026-04-05', status: 'paid', submittedBy: 'Clara Al Naqbi', org: 'Emirates Finance Ltd', paidAt: '2026-04-07' },
  { id: 'EXP-019', title: 'CRM Platform — Annual Subscription', date: '2026-05-01', amount: 35300, category: 'Software', vendor: 'Salesforce MEA', status: 'pending', submittedBy: 'Alex Brahimi', org: 'Al Noor Holdings' },
  { id: 'EXP-020', title: 'GITEX Sponsorship Package', amount: 55100, category: 'Marketing', vendor: 'DWTC Events', date: '2026-04-28', status: 'approved', submittedBy: 'Olivia Martinez', org: 'Gulf Tech Ventures' },
];

export const vendors: Vendor[] = [
  { id: 'V-001', name: 'Microsoft Gulf FZE', initials: 'MS', color: '#0078d4', category: 'Cloud & Software', gstNumber: 'TRN100234567890003', contact: 'Ahmed Al Suwaidi', email: 'enterprise@microsoft.com', phone: '+971-4-391-0000', address: 'Microsoft Gulf, DIC, Dubai, UAE', status: 'active', totalSpend: 532000 },
  { id: 'V-002', name: 'Atlantis The Palm', initials: 'AP', color: '#dc2626', category: 'Hospitality & Events', gstNumber: 'TRN100345678901114', contact: 'Laura Kim', email: 'corporate@atlantis.com', phone: '+971-4-426-2000', address: 'Palm Jumeirah, Dubai, UAE', status: 'active', totalSpend: 154600 },
  { id: 'V-003', name: 'Oracle Middle East', initials: 'OR', color: '#ef4444', category: 'Enterprise Software', gstNumber: 'TRN100456789012225', contact: 'Michael Torres', email: 'enterprise@oracle.com', phone: '+971-4-440-2500', address: 'Oracle Tower, Media City, Dubai, UAE', status: 'active', totalSpend: 352600 },
  { id: 'V-004', name: 'TBWA\\ RAAD Dubai', initials: 'TB', color: '#8b5cf6', category: 'Marketing & Creative', gstNumber: 'TRN100567890123336', contact: 'Rachel Green', email: 'hello@tbwaraad.com', phone: '+971-4-444-7800', address: 'Business Bay, Dubai, UAE', status: 'active', totalSpend: 260700 },
  { id: 'V-005', name: 'Al Tamimi & Company', initials: 'AT', color: '#0891b2', category: 'Legal Services', gstNumber: 'TRN100678901234447', contact: 'David Morrison', email: 'info@tamimi.com', phone: '+971-4-364-1641', address: 'DIFC Gate Building, Dubai, UAE', status: 'active', totalSpend: 213000 },
  { id: 'V-006', name: 'Dell EMC Middle East', initials: 'DE', color: '#059669', category: 'Hardware & Infrastructure', gstNumber: 'TRN100789012345558', contact: 'Chris Anderson', email: 'enterprise@dell.com', phone: '+971-4-501-4300', address: 'Dubai Internet City, Dubai, UAE', status: 'active', totalSpend: 771000 },
  { id: 'V-007', name: 'Salesforce MEA', initials: 'SF', color: '#0ea5e9', category: 'CRM Software', gstNumber: 'TRN100890123456669', contact: 'Jennifer Walsh', email: 'mea@salesforce.com', phone: '+971-4-457-8900', address: 'One Central, DWTC, Dubai, UAE', status: 'active', totalSpend: 176400 },
  { id: 'V-008', name: 'Help AG', initials: 'HA', color: '#d97706', category: 'Cybersecurity', gstNumber: 'TRN100901234567770', contact: 'Mark Stevens', email: 'info@helpag.com', phone: '+971-4-375-4600', address: 'DIC, Dubai, UAE', status: 'active', totalSpend: 106500 },
  { id: 'V-009', name: 'Meirc Training & Consulting', initials: 'MT', color: '#7c3aed', category: 'Training & Education', gstNumber: 'TRN101012345678881', contact: 'Anna Williams', email: 'info@meirc.com', phone: '+971-4-331-1503', address: 'Al Barsha, Dubai, UAE', status: 'active', totalSpend: 58800 },
  { id: 'V-010', name: 'Freshworks MENA', initials: 'FW', color: '#16a34a', category: 'Customer Support Software', gstNumber: 'TRN101123456789992', contact: 'Sophia Chen', email: 'mena@freshworks.com', phone: '+971-4-299-5000', address: 'DMCC, JLT, Dubai, UAE', status: 'active', totalSpend: 139700 },
];

export const notifications: Notification[] = [
  { id: 'N-001', type: 'approval', title: 'Approval Required', description: 'EXP-007 "Cybersecurity Audit" (AED 36,000) needs your review', timestamp: '2026-05-08T09:15:00', read: false },
  { id: 'N-002', type: 'approval', title: 'New Expense Submitted', description: 'EXP-009 "UX Design Sprint" from Jake Al Mousa awaits approval', timestamp: '2026-05-08T08:42:00', read: false },
  { id: 'N-003', type: 'payment', title: 'Payment Processed', description: 'EXP-003 "Enterprise Software Licenses" (AED 88,200) paid to Oracle ME', timestamp: '2026-05-07T16:30:00', read: false },
  { id: 'N-004', type: 'rejected', title: 'Expense Rejected', description: 'EXP-006 "Legal Advisory" was rejected — exceeds monthly budget cap', timestamp: '2026-05-07T14:15:00', read: true },
  { id: 'N-005', type: 'otp', title: 'OTP Verification Required', description: 'Verify payment of AED 165,300 to Dell EMC Middle East with OTP', timestamp: '2026-05-07T11:00:00', read: true },
  { id: 'N-006', type: 'settlement', title: 'FNF Settlement Alert', description: 'Final settlement for Ahmed Al Suwaidi (Engineering) pending clearance', timestamp: '2026-05-06T17:30:00', read: true },
  { id: 'N-007', type: 'approval', title: 'Budget Alert', description: 'Marketing has reached 92% of Q2 budget allocation (AED 80,000)', timestamp: '2026-05-06T10:00:00', read: true },
  { id: 'N-008', type: 'payment', title: 'Bank Transfer Confirmed', description: 'AED 227,700 transferred to AXA Green Crescent for insurance renewal', timestamp: '2026-05-05T15:45:00', read: true },
  { id: 'N-009', type: 'system', title: 'New Company Onboarded', description: 'Desert Bloom Trading has been added to the group by Super Admin', timestamp: '2026-05-05T09:00:00', read: true },
  { id: 'N-010', type: 'approval', title: 'Approval Reminder', description: '3 expenses pending your approval for more than 48 hours', timestamp: '2026-05-04T12:00:00', read: true },
  { id: 'N-011', type: 'rejected', title: 'Expense Rejected', description: 'EXP-017 "Campaign Photography" was rejected — off-budget', timestamp: '2026-05-04T10:30:00', read: true },
  { id: 'N-012', type: 'settlement', title: 'Settlement Completed', description: 'Employee settlement for Priya Sharma processed successfully', timestamp: '2026-05-03T14:00:00', read: true },
  { id: 'N-013', type: 'payment', title: 'Payment Processed', description: 'EXP-013 "Data Centre Hardware Upgrade" (AED 165,300) paid to Dell EMC', timestamp: '2026-05-01T11:15:00', read: true },
  { id: 'N-014', type: 'system', title: 'System Maintenance', description: 'Scheduled maintenance on May 10 from 2:00 AM – 4:00 AM GST', timestamp: '2026-05-01T08:00:00', read: true },
  { id: 'N-015', type: 'otp', title: 'Login from New Device', description: 'New login detected from Chrome on MacOS — Dubai, UAE', timestamp: '2026-04-30T19:45:00', read: true },
];

export const monthlyExpenseData = [
  { month: 'Jan', expenses: 661400, approved: 595260, paid: 580800 },
  { month: 'Feb', expenses: 771400, approved: 716400, paid: 698000 },
  { month: 'Mar', expenses: 716700, approved: 654000, paid: 643000 },
  { month: 'Apr', expenses: 973300, approved: 885300, paid: 863750 },
  { month: 'May', expenses: 1062800, approved: 789850, paid: 661400 },
  { month: 'Jun', expenses: 0, approved: 0, paid: 0 },
  { month: 'Jul', expenses: 0, approved: 0, paid: 0 },
  { month: 'Aug', expenses: 0, approved: 0, paid: 0 },
  { month: 'Sep', expenses: 0, approved: 0, paid: 0 },
  { month: 'Oct', expenses: 0, approved: 0, paid: 0 },
  { month: 'Nov', expenses: 0, approved: 0, paid: 0 },
  { month: 'Dec', expenses: 0, approved: 0, paid: 0 },
];

export const orgGrowthData = [
  { month: 'Dec', orgs: 2 },
  { month: 'Jan', orgs: 3 },
  { month: 'Feb', orgs: 4 },
  { month: 'Mar', orgs: 5 },
  { month: 'Apr', orgs: 5 },
  { month: 'May', orgs: 6 },
];

export const categoryData = [
  { name: 'Technology', value: 45, color: '#2563EB' },
  { name: 'Marketing', value: 22, color: '#0891b2' },
  { name: 'Operations', value: 15, color: '#059669' },
  { name: 'Legal', value: 9, color: '#d97706' },
  { name: 'HR & Training', value: 5, color: '#dc2626' },
  { name: 'Events', value: 4, color: '#7c3aed' },
];

export const cashFlowData = [
  { month: 'Jan', inflow: 918500, outflow: 661400 },
  { month: 'Feb', inflow: 1028200, outflow: 771400 },
  { month: 'Mar', inflow: 954700, outflow: 716700 },
  { month: 'Apr', inflow: 1139100, outflow: 973300 },
  { month: 'May', inflow: 1083550, outflow: 1062800 },
];

export const departmentBudgets = [
  { name: 'Engineering', budget: 440800, spent: 361500, percentage: 82 },
  { name: 'Marketing', budget: 293900, spent: 270400, percentage: 92 },
  { name: 'Sales', budget: 220500, spent: 154350, percentage: 70 },
  { name: 'Operations', budget: 147000, spent: 102900, percentage: 70 },
  { name: 'HR', budget: 110200, spent: 71600, percentage: 65 },
];

export const pendingApprovals: Expense[] = expenses.filter(e => e.status === 'pending');

export const myExpenses: Expense[] = expenses.filter(e => e.submittedBy === 'Sarah Al Mansoori');

export const employeeSettlements = [
  {
    id: 'S-001', employee: 'Ahmed Al Suwaidi', department: 'Engineering',
    dueAmount: 31250, status: 'pending',
    items: ['Pending expenses: AED 11,750', 'Travel reimbursement: AED 6,600', 'Tool allowance: AED 12,900'],
    joinDate: '2022-03-15', lastDate: '2026-05-31',
  },
  {
    id: 'S-002', employee: 'Maria Santos', department: 'Marketing',
    dueAmount: 19100, status: 'in-progress',
    items: ['Pending expenses: AED 7,700', 'Bonus payment: AED 11,400'],
    joinDate: '2021-08-01', lastDate: '2026-05-15',
  },
  {
    id: 'S-003', employee: 'Robert Kim', department: 'Sales',
    dueAmount: 40400, status: 'pending',
    items: ['Commission Q1: AED 23,900', 'Pending reimbursements: AED 16,500'],
    joinDate: '2020-01-10', lastDate: '2026-06-15',
  },
];

export const paymentQueue: Array<{
  id: string; expense: Expense; bankAccount: string;
  processingDate: string; paymentStatus: 'pending_payment' | 'processing' | 'completed';
}> = [
  { id: 'PQ-001', expense: expenses[1], bankAccount: '****4521 (Emirates NBD)', processingDate: '2026-05-10', paymentStatus: 'pending_payment' },
  { id: 'PQ-002', expense: expenses[6], bankAccount: '****8834 (FAB)', processingDate: '2026-05-10', paymentStatus: 'processing' },
  { id: 'PQ-003', expense: expenses[10], bankAccount: '****2219 (ADCB)', processingDate: '2026-05-11', paymentStatus: 'pending_payment' },
  { id: 'PQ-004', expense: expenses[18], bankAccount: '****7743 (Mashreq Bank)', processingDate: '2026-05-11', paymentStatus: 'pending_payment' },
];

export function formatCurrency(amount: number, currency = 'AED'): string {
  return new Intl.NumberFormat('en-AE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AE', { month: 'short', day: 'numeric', year: 'numeric' });
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
