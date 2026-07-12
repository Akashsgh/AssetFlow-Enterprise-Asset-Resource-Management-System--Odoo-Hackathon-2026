import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

import Assets from '../pages/Assets/Assets';
import Bookings from '../pages/Bookings/Bookings';
import Maintenance from '../pages/Maintenance/Maintenance';
import Audits from '../pages/Audits/Audits';
import Reports from '../pages/Reports/Reports';
import Notifications from '../pages/Notifications/Notifications';
import Directory from '../pages/Directory/Directory';
import Settings from '../pages/Settings/Settings';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="audits" element={<Audits />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="directory" element={<Directory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
  );
};

export default AppRoutes;
