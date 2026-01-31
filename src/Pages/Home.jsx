// ---------------------------------------------------------
// Home.jsx — Modelo B (C‑Prime — Premium Minimalista)
// ---------------------------------------------------------

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
          <Button className="bg-black text-white px-8 py-3 rounded-lg text-base hover:bg-neutral-800 transition">
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
          <Button className="bg-black text-white px-8 py-3 rounded-lg text-base hover:bg-neutral-800 transition">
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
    <section className="max-w-3xl mx-auto px-6 mt-24">
      <Card className="p-10 border border-neutral-200 bg-white rounded-xl">
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          View an Evaluation
        </h3>
        <p className="text-neutral-600 mb-6 text-base">
          Paste an evaluation link or token to access a candidate’s verified reference.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={evaluationLink}
            onChange={(e) => setEvaluationLink(e.target.value)}
            placeholder="Paste link or token..."
            className="flex-1 text-base"
          />
          <Button
            disabled={!evaluationLink}
            className="bg-black text-white px-6 py-3 text-base hover:bg-neutral-800 transition"
          >
            View
          </Button>
        </form>
      </Card>
    </section>
  );
}


// ---------------------------------------------------------
// Feature Grid (C‑Prime Minimalista)
// ---------------------------------------------------------
function FeatureGrid() {
  const features = [
    {
      icon: Building2,
      title: "Verified Company Accounts",
      desc: "Register your organization with validated business information.",
    },
    {
      icon: UserCheck,
      title: "Employee Profiles",
      desc: "Maintain structured employee records and work history.",
    },
    {
      icon: ClipboardCheck,
      title: "Standardized Evaluations",
      desc: "Create consistent, criteria‑based performance assessments.",
    },
    {
      icon: Shield,
      title: "Secure Reference Sharing",
      desc: "Share evaluations safely with hiring teams and recruiters.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="p-8 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition"
        >
          <f.icon className="w-10 h-10 text-neutral-900 mb-6" />
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">{f.title}</h3>
          <p className="text-neutral-600 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}


// ---------------------------------------------------------
// HOME PAGE — Modelo B (C‑Prime)
// ---------------------------------------------------------
export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="w-full border-b border-neutral-200 py-5 bg-white/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="text-2xl font-semibold text-neutral-900 tracking-tight">
            ProRef
          </span>

          <div className="flex items-center gap-8 text-base">
            <Link to="/employer/login" className="text-neutral-700 hover:text-black transition">
              Employer Login
            </Link>
            <Link to="/employee/login" className="text-neutral-700 hover:text-black transition">
              Employee Login
            </Link>

            <Link to="/employer/signup">
              <Button className="bg-black text-white px-6 py-2.5 rounded-md text-base hover:bg-neutral-800 transition">
                Register Company
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl font-semibold text-neutral-900 tracking-tight mb-8 leading-tight">
          Modern, Minimalist  
          <span className="block">Employee References</span>
        </h1>

        <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          A clean, structured way for companies to create trustworthy evaluations —  
          and for candidates to share them with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/employer/signup">
            <Button className="bg-black text-white px-10 py-4 rounded-lg text-lg hover:bg-neutral-800 transition">
              Register Company
            </Button>
          </Link>

          <Link to="/employer/login">
            <Button variant="outline" className="px-10 py-4 border-neutral-300 text-lg rounded-lg hover:border-black hover:text-black transition">
              Employer Login
            </Button>
          </Link>

          <Link to="/employee/login">
            <Button variant="outline" className="px-10 py-4 border-neutral-300 text-lg rounded-lg hover:border-black hover:text-black transition">
              Employee Login
            </Button>
          </Link>
        </div>

        <DashboardShortcut />
      </section>

      {/* View Evaluation */}
      <ViewEvaluationSection />

      {/* Features */}
      <section className="py-32 bg-neutral-50">
        <h2 className="text-4xl font-semibold text-neutral-900 text-center mb-20">
          What You Can Do with ProRef
        </h2>

        <FeatureGrid />
      </section>

      {/* CTA */}
      <section className="py-28 text-center bg-white">
        <h2 className="text-4xl font-semibold text-neutral-900 mb-4">
          Start Building Trusted References
        </h2>
        <p className="text-neutral-600 mb-10 text-lg">
          Register your company and begin creating verified evaluations today.
        </p>
        <Link to="/employer/signup">
          <Button className="bg-black text-white px-12 py-4 rounded-lg text-lg hover:bg-neutral-800 transition">
            Register Company
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 text-center text-base text-neutral-500">
        © {new Date().getFullYear()} ProRef — Professional Reference Platform
      </footer>
    </div>
  );
}
