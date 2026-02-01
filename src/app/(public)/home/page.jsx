import { Link } from "react-router-dom";
import ShineLogo from "@/assets/shine-logo.png";
import { Building2, Users, LogIn } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-neutral-50">

      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-purple-600 to-pink-600 text-white flex flex-col py-10 px-6 shadow-xl">

        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
          <img
            src={ShineLogo}
            alt="Shine Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            to="/employer/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium hover:bg-white/20 transition"
          >
            <Building2 className="w-5 h-5 text-white" />
            Employer Portal
          </Link>

          <Link
            to="/employee/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium hover:bg-white/20 transition"
          >
            <Users className="w-5 h-5 text-white" />
            Candidate Portal
          </Link>
        </nav>

        <div className="flex-1" />

        {/* Login */}
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium hover:bg-white/20 transition text-white"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </Link>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="w-full bg-white border-b border-neutral-200 py-5 px-10 flex justify-between items-center shadow-sm">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Welcome to ProRef
          </h1>
        </header>

        {/* CONTENT */}
        <main className="p-10 max-w-4xl">

          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Modern, Ethical, and Secure Professional References
          </h2>

          <p className="text-lg text-neutral-700 leading-relaxed mb-10">
            ProRef empowers employers and candidates with a transparent, secure, and
            real‑world‑ready reference management experience.  
            Clear workflows, strong privacy controls, and a trusted environment built
            for modern hiring.
          </p>

          {/* CTA GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <Link
              to="/employer/login"
              className="w-full py-4 rounded-lg border border-neutral-300 hover:border-purple-600 hover:bg-purple-50 transition text-neutral-900 font-medium text-center"
            >
              Employer Portal
            </Link>

            <Link
              to="/employee/login"
              className="w-full py-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-medium text-center"
            >
              Candidate Portal
            </Link>
          </div>

          {/* SECONDARY ACTIONS */}
          <div className="mt-10 space-y-2">
            <p className="text-sm text-neutral-500">New to ProRef?</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/employer/signup"
                className="text-sm text-purple-600 hover:underline"
              >
                Create Employer Account
              </Link>

              <Link
                to="/employee/signup"
                className="text-sm text-purple-600 hover:underline"
              >
                Create Candidate Account
              </Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
