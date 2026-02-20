import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { SHIME_LOGO_BLACK } from "@/lib/branding";

export default function HomePage() {
  const [token, setToken] = useState("");

  const handleAccessLink = () => {
    const raw = token.trim();
    if (!raw) return;

    let normalized = raw;

    try {
      const url = new URL(raw, window.location.origin);
      const paramToken = url.searchParams.get("token");
      if (paramToken) {
        normalized = paramToken;
      } else if (url.pathname.includes("/reference/")) {
        normalized = url.pathname.split("/reference/").pop() || raw;
      }
    } catch {
      if (raw.includes("/reference/")) {
        normalized = raw.split("/reference/").pop() || raw;
      }
    }

    window.location.href = `/reference/${normalized}`;
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center">

      {/* LOGO */}
      <section className="min-h-screen w-full flex items-center justify-center px-6">
        <img
          src={SHIME_LOGO_BLACK}
          alt="Shime Logo"
          className="w-[32rem] h-[32rem] max-w-[90vw] max-h-[90vh] object-contain"
        />
      </section>

      {/* HERO */}
      <section className="max-w-4xl text-center space-y-6 mb-16 px-6">
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
          Fast, Secure Access to Employee Evaluations  
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Helping Employees Shime
          </span>
        </h1>

        <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
          Shime streamlines how employers access verified evaluations while empowering employees to present their strengths with confidence.
        </p>
      </section>

      {/* CTA BUTTONS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 w-full max-w-xl px-6">

        <Link
          to="/employer/login"
          className="w-full py-4 rounded-lg border border-neutral-300 hover:border-purple-600 hover:bg-purple-50 transition text-neutral-900 font-semibold text-center shadow-sm"
        >
          Employer Portal
        </Link>

        <Link
          to="/employee/login"
          className="w-full py-4 rounded-lg text-white font-semibold text-center transition shadow-md
                     bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
        >
          Employee Portal
        </Link>

      </section>

      {/* DIRECT LINK ACCESS (DISCREET) */}
      <section className="w-full max-w-xl mb-20 opacity-80 px-6">
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Received a Shime evaluation link? (Employer access only)
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Paste link or token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 border border-neutral-300 rounded-lg px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
          />

          <button
            onClick={handleAccessLink}
            className="px-5 py-2 rounded-lg font-medium text-white transition text-sm
                       bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            Access
          </button>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="w-full max-w-5xl mb-24 px-6">
        <h2 className="text-3xl font-bold text-neutral-900 text-center mb-10">
          Why Shime?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-white shadow-md rounded-xl p-8 text-center space-y-4 border border-neutral-200">
            <ShieldCheck className="w-10 h-10 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold text-neutral-900">Secure & Trusted</h3>
            <p className="text-neutral-600 text-sm">
              Evaluations are encrypted and accessible only to authorized employers.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white shadow-md rounded-xl p-8 text-center space-y-4 border border-neutral-200">
            <Clock className="w-10 h-10 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold text-neutral-900">Fast Access</h3>
            <p className="text-neutral-600 text-sm">
              Employers receive instant access to employee evaluations with no delays.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white shadow-md rounded-xl p-8 text-center space-y-4 border border-neutral-200">
            <Sparkles className="w-10 h-10 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold text-neutral-900">Employees Shime</h3>
            <p className="text-neutral-600 text-sm">
              Employees control their data and showcase their strengths with confidence.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl border-t border-neutral-200 pt-6 mt-10 text-center text-neutral-500 text-sm px-6">
        © {new Date().getFullYear()} Shime — Empowering professional growth with clarity and trust.
      </footer>

    </main>
  );
}

