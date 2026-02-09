import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import ShineLogo from "@/assets/shine-logo.png";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";

export default function EmployerDashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useEmployerAuth();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/employer" },
    { label: "Employees", icon: Users, path: "/employer/employees" },
    { label: "Evaluations", icon: ClipboardList, path: "/employer/evaluations" },
    { label: "Analytics", icon: BarChart3, path: "/employer/analytics" },
    { label: "Settings", icon: Settings, path: "/employer/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col py-8 px-6">

        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <img
            src={ShineLogo}
            alt="Shine Logo"
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item, i) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition
                  ${
                    active
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    active ? "text-purple-700" : "text-neutral-500"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Logout */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100 transition"
          onClick={async () => {
            await logout();
            navigate("/employer/login");
          }}
        >
          <LogOut className="w-5 h-5 text-neutral-500" />
          Logout
        </button>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="w-full bg-white border-b border-neutral-200 py-4 px-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Employer Dashboard
          </h1>

          {/* PROFILE AREA */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/employer/settings")}
          >
            {/* Avatar (placeholder for now) */}
            <div className="w-12 h-12 rounded-full bg-neutral-300 overflow-hidden">
              {/* Quando você implementar upload, basta trocar por <img src={profileUrl} /> */}
            </div>

            <span className="text-neutral-700 font-medium">Profile</span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
