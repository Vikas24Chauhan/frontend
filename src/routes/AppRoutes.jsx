import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";

// Public
import HomePage from "../pages/HomePage";
import NeetugPage from "../pages/NeetugPage";
import NeetpgPage from "../pages/NeetpgPage";
import InicetPage from "../pages/InicetPage";
import AnnouncementsPage from "../pages/AnnouncementsPage";
import NotFound from "../pages/NotFound";

// Protected
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/neet-ug" element={<NeetugPage />} />
        <Route path="/neet-pg" element={<NeetpgPage />} />
        <Route path="/inicet" element={<InicetPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ================= Public Route ================= */}
      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* ================= Protected Route ================= */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
