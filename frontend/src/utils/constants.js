export const APP_NAME = 'AssetFlow';

export const ROUTES = {
  dashboard: '/',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  assets: '/assets',
  bookings: '/bookings',
  maintenance: '/maintenance',
  audits: '/audits',
  reports: '/reports',
  notifications: '/notifications',
  directory: '/directory',
  settings: '/settings',
};

export const ASSET_STATUS = {
  AVAILABLE: 'Available',
  IN_USE: 'In Use',
  MAINTENANCE: 'Under Maintenance',
  RETIRED: 'Retired',
};

export const ASSET_CATEGORIES = {
  HARDWARE: 'Hardware',
  SOFTWARE: 'Software',
  FURNITURE: 'Furniture',
  VEHICLE: 'Vehicle',
  INFRASTRUCTURE: 'Infrastructure',
};

export const BOOKING_STATUS = {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const MAINTENANCE_STATUS = {
  PENDING: 'Pending',
  IN_REPAIR: 'In Repair',
  RESOLVED: 'Resolved',
};

export const PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const AUDIT_STATUS = {
  COMPLETED: 'Completed',
  INCOMPLETE: 'Incomplete',
  IN_PROGRESS: 'In Progress',
};
