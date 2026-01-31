import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

import ShineLogo from "@/assets/shine-logo.png"; // ajuste o caminho conforme sua estrutura

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/employer" },
    { label: "Employees", icon: Users, path: "/employer/employees" },
    { label: "Evaluations", icon: ClipboardList, path: "/employer/evaluations" },
    { label: "Settings", icon: Settings, path: "/employer/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">

      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-purple-600 to-pink-600 text-white flex flex-col py-10 px-6 shadow-xl">
        
        {/* Logo Shine */}
        <div className="flex items-center gap-3 mb-12">
          <img
            src={ShineLogo}
            alt="Shine Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-3xl font-extrabold tracking-tight">
            Shine
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item, i) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition
                  ${active ? "bg-white text-purple-700 shadow-md" : "hover:bg-white/20"}
                `}
              >
                <Icon className={`w-5 h-5 ${active ? "text-purple-700" : "text-white"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium hover:bg-white/20 transition text-white">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="w-full bg-white border-b border-neutral-200 py-5 px-10 flex justify-between items-center shadow-sm">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
            <span className="text-neutral-700 font-medium">You</span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
