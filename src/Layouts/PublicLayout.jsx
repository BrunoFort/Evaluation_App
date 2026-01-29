import React from "react";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">

      {/* Header */}
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">ProRef</h1>
        <p className="text-slate-500 text-sm">Verified Professional References</p>
      </header>

      {/* Main content */}
      <main className="w-full max-w-3xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-10 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} ProRef — Public Access
      </footer>
    </div>
  );
}
