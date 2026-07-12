export const KPI_KEYS = {
  TOTAL_ASSETS: 'totalAssets',
  AVAILABLE_ASSETS: 'availableAssets',
  ALLOCATED_ASSETS: 'allocatedAssets',
  UNDER_MAINTENANCE: 'underMaintenance',
  PENDING_TRANSFERS: 'pendingTransfers',
  UPCOMING_RETURNS: 'upcomingReturns',
  ACTIVE_BOOKINGS: 'activeBookings',
  EMPLOYEES: 'employees',
  DEPARTMENTS: 'departments',
  MAINTENANCE_REQUESTS: 'maintenanceRequests',
};

export const NOTIFICATION_CATEGORIES = {
  ASSET_ALLOCATION: 'asset_allocation',
  TRANSFER: 'transfer',
  BOOKING: 'booking',
  MAINTENANCE: 'maintenance',
  WARRANTY_EXPIRY: 'warranty_expiry',
  AUDIT: 'audit',
};

export const NOTIFICATION_CATEGORY_LABELS = {
  [NOTIFICATION_CATEGORIES.ASSET_ALLOCATION]: 'Asset Allocation',
  [NOTIFICATION_CATEGORIES.TRANSFER]: 'Transfer',
  [NOTIFICATION_CATEGORIES.BOOKING]: 'Booking',
  [NOTIFICATION_CATEGORIES.MAINTENANCE]: 'Maintenance',
  [NOTIFICATION_CATEGORIES.WARRANTY_EXPIRY]: 'Warranty Expiry',
  [NOTIFICATION_CATEGORIES.AUDIT]: 'Audit',
};

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export const ACTIVITY_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress',
};

export const REPORT_TYPES = [
  { id: 'department', label: 'Department Report', description: 'Asset distribution and utilization by department' },
  { id: 'asset', label: 'Asset Report', description: 'Full inventory status and lifecycle detail' },
  { id: 'booking', label: 'Booking Report', description: 'Booking volume, utilization and conflicts' },
  { id: 'maintenance', label: 'Maintenance Report', description: 'Maintenance requests, cost and downtime' },
  { id: 'utilization', label: 'Utilization Report', description: 'Asset usage efficiency across the org' },
];

export const CHART_COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#a855f7',
  '#06b6d4',
  '#ec4899',
  '#84cc16',
];
