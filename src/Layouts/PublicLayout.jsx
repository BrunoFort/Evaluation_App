import React from "react";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">Candidate Evaluation</h1>
        <p className="text-slate-500 text-sm">
          Confidential report shared directly by the candidate
        </p>
      </header>

      <main className="w-full max-w-3xl">{children}</main>

      <footer className="mt-10 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} ProRef — Confidential Access
      </footer>
    </div>
  );
}
