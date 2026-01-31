import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Menu,
  LogOut,
} from "lucide-react";

import { useEmployerAuth } from "@/features/auth/employer/useEmployerAuth";

export default function EmployerLayout({ children }) {
  const { employer, logout } = useEmployerAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  async function handleLogout() {
    await logout();
    navigate("/employer/login");
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-slate-200 shadow-sm transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-blue-600" />
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-slate-900">ProRef</h1>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            to="/"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            open={sidebarOpen}
          />

          <SidebarItem
            to="/company"
            icon={<Building2 className="w-5 h-5" />}
            label="Company"
            open={sidebarOpen}
          />

          <SidebarItem
            to="/employees"
            icon={<Users className="w-5 h-5" />}
            label="Employees"
            open={sidebarOpen}
          />

          <SidebarItem
            to="/evaluations"
            icon={<ClipboardCheck className="w-5 h-5" />}
            label="Evaluations"
            open={sidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center px-6 justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-slate-100 transition"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>

          <div className="text-sm text-slate-600">
            {employer?.companyName}
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarItem({ to, icon, label, open }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
    >
      {icon}
      {open && label}
    </Link>
  );
}
