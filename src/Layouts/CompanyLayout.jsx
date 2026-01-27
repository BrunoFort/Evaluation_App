import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export default function CompanyLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700 tracking-tight">
            Employer Panel
          </h1>

          import Button from "../components/ui/Button.jsx";

          <Button variant="danger" onClick={logout}>
          Logout
          </Button>

        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-6 text-sm font-medium text-slate-600">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/company"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Company
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Employees
          </NavLink>

          <NavLink
            to="/evaluations"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Evaluations
          </NavLink>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ProRef — Employer Access
      </footer>
    </div>
  );
}

