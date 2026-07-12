# AssetFlow — Dashboard, Reports & Notifications Module

Enterprise-grade React frontend for the AssetFlow Asset & Resource Management System
(Odoo Hackathon 2026). This package covers **only** the Dashboard, Reports, and
Notifications modules, as scoped — no authentication, Asset CRUD, or Employee CRUD.

## Stack

- React 18 + Vite
- Tailwind CSS (dark mode via `class` strategy)
- React Router v6
- Axios (centralized client + interceptors)
- Recharts (Pie, Bar, Line, Horizontal Bar, Area, Donut)
- Framer Motion (hover/entry micro-interactions)
- Lucide React icons

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

## Folder structure

```
src/
  pages/
    Dashboard/Dashboard.jsx
    Reports/Reports.jsx
    Notifications/Notifications.jsx
  components/
    Layout/            DashboardLayout, Sidebar, Header
    Dashboard/
      Cards/            StatsCard, QuickActionCard
      Charts/           ChartCard + 6 chart components
      Tables/           ActivityTable, StatusBadge
    Notifications/       NotificationBell, NotificationDropdown, NotificationCard
    Reports/              ReportCard, ReportFilters
    Common/               EmptyState, LoadingSkeleton, ErrorState
  hooks/                  useDashboardStats, useDashboardCharts, useActivities,
                          useNotifications, useReports, useDebounce
  services/               api.js (axios instance), dashboardService, notificationService,
                          reportService
  context/                ThemeContext (dark mode), NotificationContext (dropdown UI state)
  utils/                  constants, formatters, exportUtils
```

## API contract expected by this module

| Method | Endpoint                          | Used by                     |
|--------|------------------------------------|------------------------------|
| GET    | `/dashboard`                       | dashboardService.getOverview |
| GET    | `/dashboard/stats`                 | useDashboardStats            |
| GET    | `/dashboard/charts`                | useDashboardCharts           |
| GET    | `/dashboard/activities`            | useActivities                |
| GET    | `/notifications`                   | useNotifications             |
| PATCH  | `/notifications/:id/read`          | useNotifications.markAsRead  |
| PATCH  | `/notifications/read-all`          | useNotifications.markAllAsRead |
| GET    | `/reports`                         | useReports                   |
| POST   | `/reports/export/pdf`              | useReports.exportReport      |
| POST   | `/reports/export/excel`            | useReports.exportReport      |

Every hook exposes `{ data, loading, error, retry }` (naming varies slightly per
resource) so components can render loading skeletons, error states with retry,
and empty states without additional wiring.

### Expected shapes (illustrative)

`GET /dashboard/stats` →
```json
{
  "totalAssets": { "value": 1240, "changePercent": 4.2, "status": "positive", "trend": [{"value":10},{"value":14}] },
  "availableAssets": { "value": 512, "changePercent": -1.1, "status": "negative", "trend": [] }
}
```

`GET /dashboard/charts` →
```json
{
  "assetCategoryDistribution": [{ "name": "Laptops", "value": 420 }],
  "assetStatus": [{ "status": "Available", "count": 512 }],
  "monthlyAllocation": [{ "month": "Jan", "allocated": 80 }],
  "departmentWiseAssets": [{ "department": "Engineering", "count": 300 }],
  "maintenanceCostTrend": [{ "month": "Jan", "cost": 4200 }],
  "bookingUtilization": [{ "name": "Utilized", "value": 68 }, { "name": "Available", "value": 32 }]
}
```

`GET /dashboard/activities` → `{ "items": [...], "total": 120 }`, each item:
`{ "id", "time", "user", "department", "action", "status" }`

`GET /notifications` → `{ "items": [...] }`, each item:
`{ "id", "title", "description", "time", "priority", "category", "read" }`

`GET /reports` → `{ "items": [{ "id", "label", "description", "summary": [{ "label", "value" }] }] }`

## Notes

- All data-fetching components handle loading (skeletons), error (with retry),
  and empty states — no dummy/static UI ships to production.
- Dark mode toggles the `dark` class on `<html>`; respects
  `prefers-color-scheme` on first load.
- Quick Action cards route via React Router; wire their `to` targets to the
  relevant Asset/Booking/Maintenance modules once those are implemented.
