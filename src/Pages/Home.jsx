import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "/src/components/ui/Button.jsx";
import Input from "/src/components/ui/input.jsx";
import Card from "/src/components/ui/card.jsx";

import {
  Building2,
  UserCheck,
  ClipboardCheck,
  Shield,
} from "lucide-react";

import { useEmployerAuth } from "@/features/auth/employer/useEmployerAuth";
import { useEmployeeAuth } from "@/features/auth/employee/useEmployeeAuth";

import ShineLogo from "@/assets/shine-logo.png"; // ajuste o caminho conforme sua estrutura


// ---------------------------------------------------------
// Dashboard Shortcut
// ---------------------------------------------------------
function DashboardShortcut() {
  const employerAuth = useEmployerAuth?.();
  const employeeAuth = useEmployeeAuth?.();

  if (employerAuth?.employer) {
    return (
      <div className="flex justify-center mt-12">
        <Link to="/employer">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg text-base shadow-lg hover:opacity-90 transition">
            Go to Employer Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (employeeAuth?.employee) {
    return (
      <div className="flex justify-center mt-12">
        <Link to="/employee">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg text-base shadow-lg hover:opacity-90 transition">
            Go to Employee Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return null;
}


// ---------------------------------------------------------
// View Evaluation Section
// ---------------------------------------------------------
function ViewEvaluationSection() {
  const navigate = useNavigate();
  const [evaluationLink, setEvaluationLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!evaluationLink) return;

    let token = evaluationLink;

    try {
      if (evaluationLink.includes("token=")) {
        const url = new URL(evaluationLink);
        token = url.searchParams.get("token");
      } else if (evaluationLink.includes("?")) {
        const params = new URLSearchParams(evaluationLink.split("?")[1]);
        token = params.get("token");
      }
    } catch {
      token = evaluationLink;
    }

    if (token) navigate(`/reference/public?token=${token}`);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 mt-24">
      <Card className="p-12 border border-purple-200 shadow-xl bg-white rounded-2xl">
        <h3 className="text-3xl font-bold text-purple-700 mb-3">
          View an Evaluation
        </h3>
        <p className="text-neutral-900 mb-8 text-lg">
          Paste an evaluation link or token to instantly review a candidate’s verified reference before making a decision.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            value={evaluationLink}
            onChange={(e) => setEvaluationLink(e.target.value)}
            placeholder="Paste link or token..."
            className="flex-1 text-lg border-purple-300 focus:border-purple-500"
          />
          <Button
            disabled={!evaluationLink}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:opacity-90 transition"
          >
            View
          </Button>
        </form>
      </Card>
    </section>
  );
}


// ---------------------------------------------------------
// Feature Grid
// ---------------------------------------------------------
function FeatureGrid() {
  const features = [
    {
      icon: Building2,
      title: "Verified Company Accounts",
      desc: "Register your organization with validated business information.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: UserCheck,
      title: "Employee Profiles",
      desc: "Maintain structured employee records and work history.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ClipboardCheck,
      title: "Standardized Evaluations",
      desc: "Create consistent, criteria‑based performance assessments.",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: Shield,
      title: "Secure Reference Sharing",
      desc: "Share evaluations safely with hiring teams and recruiters.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="p-10 rounded-2xl bg-white shadow-xl border border-neutral-200 hover:scale-[1.02] transition-transform"
        >
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${f.color} flex items-center justify-center mb-6 shadow-lg`}>
            <f.icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-neutral-900 mb-3">{f.title}</h3>
          <p className="text-neutral-600 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}


// ---------------------------------------------------------
// HOME PAGE — Shine (C‑Bold)
// ---------------------------------------------------------
export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="w-full border-b border-neutral-200 py-5 bg-white/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center py-2">
            <img
              src={ShineLogo}
              alt="Shine Logo"
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="flex items-center gap-8 text-base font-medium">
            <Link to="/employer/login" className="text-neutral-700 hover:text-purple-600 transition">
              Employer Login
            </Link>
            <Link to="/employee/login" className="text-neutral-700 hover:text-purple-600 transition">
              Employee Login
            </Link>

            <Link to="/employer/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-md shadow-lg hover:opacity-90 transition">
                Register Company
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-7xl font-extrabold text-neutral-900 tracking-tight mb-10 leading-tight">
          See how candidates  
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            really shine in their references
          </span>
        </h1>

        <p className="text-2xl text-neutral-600 max-w-3xl mx-auto mb-14 leading-relaxed">
          Shine lets you quickly access structured, verified evaluations for candidates,  
          so you can make hiring decisions with real, contextual insight—not just a résumé.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link to="/employer/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl text-xl shadow-xl hover:opacity-90 transition">
              Register Company
            </Button>
          </Link>

          <Link to="/employer/login">
            <Button variant="outline" className="px-12 py-4 border-purple-400 text-xl rounded-xl hover:border-purple-600 hover:text-purple-600 transition">
              Employer Login
            </Button>
          </Link>

          <Link to="/employee/login">
            <Button variant="outline" className="px-12 py-4 border-purple-400 text-xl rounded-xl hover:border-purple-600 hover:text-purple-600 transition">
              Employee Login
            </Button>
          </Link>
        </div>

        <DashboardShortcut />
      </section>

      {/* View Evaluation */}
      <ViewEvaluationSection />

      {/* Features */}
      <section className="py-32 bg-gradient-to-b from-purple-50 to-pink-50">
        <h2 className="text-5xl font-extrabold text-neutral-900 text-center mb-24">
          What Makes Shine Stand Out
        </h2>

        <FeatureGrid />
      </section>

      {/* CTA */}
      <section className="py-28 text-center bg-white">
        <h2 className="text-5xl font-extrabold text-neutral-900 mb-6">
          Start Building Trusted References
        </h2>
        <p className="text-neutral-600 mb-12 text-xl">
          Register your company and begin creating verified evaluations today.
        </p>
        <Link to="/employer/signup">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl text-xl shadow-xl hover:opacity-90 transition">
            Register Company
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 text-center text-base text-neutral-500">
        © {new Date().getFullYear()} Shine — Professional Reference Platform
      </footer>
    </div>
  );
}
