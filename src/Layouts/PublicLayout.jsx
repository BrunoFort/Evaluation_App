import React from "react";
import { Link } from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/"
            className="text-xl font-bold text-blue-700 tracking-tight hover:text-blue-800 transition"
          >
            ProRef
          </Link>

          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <Link
              to="/employee/login"
              className="hover:text-blue-600 transition"
            >
              Employee Login
            </Link>

            <Link
              to="/employer/login"
              className="hover:text-blue-600 transition"
            >
              Employer Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ProRef — Professional References Platform
      </footer>
    </div>
  );
}
