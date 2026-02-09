import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Share2, LogOut } from "lucide-react";
import ShineLogo from "@/assets/shine-logo.png";
import { useEmployeeAuth } from "/src/features/auth/employee/hooks/useEmployeeAuth";

export default function EmployeeDashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useEmployeeAuth();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/employee" },
    { label: "My Evaluations", icon: ClipboardList, path: "/employee/evaluations" },
    { label: "Share Reference", icon: Share2, path: "/employee/share" },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">

      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-purple-600 to-pink-600 text-white flex flex-col py-10 px-6 shadow-xl">

        <div className="flex items-center justify-center mb-12">
          <img src={ShineLogo} alt="Shine Logo" className="w-32 h-32 object-contain" />
        </div>

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

        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium hover:bg-white/20 transition text-white"
          onClick={async () => {
            await logout();
            navigate("/employee/login");
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        <header className="w-full bg-white border-b border-neutral-200 py-5 px-10 flex justify-between items-center shadow-sm">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Employee Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
            <span className="text-neutral-700 font-medium">You</span>
          </div>
        </header>

        <main className="p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
