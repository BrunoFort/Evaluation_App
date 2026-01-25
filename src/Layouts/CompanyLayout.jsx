// src/Layouts/CompanyLayout.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import { Building2, LayoutDashboard, Users, ClipboardCheck, LogOut } from "lucide-react";

export default function CompanyLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/employer/login");
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">ProRef</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">{user?.companyName}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/company"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            <Building2 className="w-5 h-5" />
            Company Panel
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <Link
            to="/employees"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            <Users className="w-5 h-5" />
            Employees
          </Link>

          <Link
            to="/evaluations"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            <ClipboardCheck className="w-5 h-5" />
            Evaluations
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
