import React from "react";
import ShineLogo from "@/assets/shine-logo.png";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">

      {/* HEADER */}
      <header className="w-full bg-white border-b border-neutral-200 py-6 px-10 shadow-sm flex items-center gap-4">
        <img src={ShineLogo} alt="Shine Logo" className="w-12 h-12 object-contain" />
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Shine
        </h1>
      </header>

      {/* CONTENT */}
      <main className="flex-1 p-10 max-w-4xl mx-auto">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-neutral-500 text-sm border-t border-neutral-200">
        © {new Date().getFullYear()} Shine — Professional References
      </footer>

    </div>
  );
}
