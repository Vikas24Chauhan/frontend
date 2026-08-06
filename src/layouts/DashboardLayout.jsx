import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";
import "./DashboardLayout.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Navbar />

      {/* Main */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <NavLink to="/dashboard" end>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/neet-pg">
            <Stethoscope size={18} />
            NEET PG
          </NavLink>

          <NavLink to="/dashboard/neet-ug">
            <GraduationCap size={18} />
            NEET UG
          </NavLink>

          <NavLink to="/dashboard/inicet">
            <BookOpen size={18} />
            INI-CET
          </NavLink>

          <NavLink to="/dashboard/neet-ss">
            <ShieldCheck size={18} />
            NEET SS
          </NavLink>
        </aside>

        {/* Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardLayout;
