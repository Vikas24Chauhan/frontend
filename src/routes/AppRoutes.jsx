import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

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
import NeetssPage from "../pages/NeetssPage";
import BlogHome from "../pages/blog/BlogHome";
import BlogPage from "../pages/blog/BlogPage";
import AnnouncementsPage from "../pages/AnnouncementsPage";
import ContactUsPage from "../pages/ContactUsPage";
import PrivacyPolicy from "../pages/policies/PrivacyPolicy";
import TermsConditions from "../pages/policies/TermsConditions";
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
        <Route path="/neet-ss" element={<NeetssPage />} />
        <Route path="/blogs" element={<BlogHome />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
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
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="neet-pg" element={<NeetpgPage />} />
        <Route path="neet-ug" element={<NeetugPage />} />
      </Route> */}

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="neet-pg" element={<NeetpgPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
