import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Clock } from "lucide-react";
import ShineLogo from "@/assets/shine-logo.png";

export default function HomePage() {
  const [token, setToken] = useState("");

  const handleAccessLink = () => {
    if (!token.trim()) return;
    window.location.href = `/reference/${token}`;
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center px-6 py-16">

      {/* LOGO */}
      <div className="w-full max-w-6xl flex items-center mb-16">
        <img
          src={ShineLogo}
          alt="Shine Logo"
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* HERO */}
      <section className="max-w-4xl text-center space-y-6 mb-16">
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900">
          Seamless, Secure Access to Employee Evaluations  
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Empowering Employees to Shine
          </span>
        </h1>

        <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
          Shine enables employers to review verified employee evaluations quickly and safely,
          while giving employees full control over how their professional story is shared.
        </p>
      </section>

      {/* CTA BUTTONS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 w-full max-w-xl">

        <Link
          to="/employer/login"
          className="w-full py-4 rounded-lg border border-neutral-300 hover:border-purple-600 hover:bg-purple-50 transition text-neutral-900 font-medium text-center"
        >
          Employer Portal
        </Link>

        <Link
          to="/employee/login"
          className="w-full py-4 rounded-lg text-white font-medium text-center transition
                     bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
        >
          Employee Portal
        </Link>

      </section>

      {/* DIRECT LINK ACCESS */}
      <section className="w-full max-w-xl mb-20">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Received a Shine evaluation link by email?
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Paste the access link or token here"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button
            onClick={handleAccessLink}
            className="px-6 py-3 rounded-lg font-medium text-white transition flex items-center gap-2
                       bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            Access
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-neutral-900 text-center mb-10">
          Why Shine?
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
            <h3 className="text-xl font-semibold text-neutral-900">Employees Shine</h3>
            <p className="text-neutral-600 text-sm">
              Employees control their data and showcase their strengths with confidence.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

