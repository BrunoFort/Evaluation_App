import React from "react";

export default function EmployeeLayout({ children }) {
  function handleLogout() {
    localStorage.removeItem("employee");
    window.location.href = "/employee/login";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="w-full max-w-3xl flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-blue-700">Employee Panel</h1>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="w-full max-w-3xl">{children}</main>

      {/* Footer */}
      <footer className="mt-10 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} ProRef — Employee Access
      </footer>
    </div>
  );
}
