import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
