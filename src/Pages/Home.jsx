// ---------------------------------------------------------
// Home.jsx — Estilo STRIPE / LINEAR (Premium, Minimalista)
// ---------------------------------------------------------

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "/src/components/ui/Button.jsx";
import Input from "/src/components/ui/input.jsx";
import Card from "/src/components/ui/card.jsx";

import {
  Building2,
  User,
  ExternalLink,
  Shield,
  ClipboardCheck,
  UserCheck,
} from "lucide-react";

import { useEmployerAuth } from "@/features/auth/employer/useEmployerAuth";
import { useEmployeeAuth } from "@/features/auth/employee/useEmployeeAuth";


// ---------------------------------------------------------
// Dashboard Shortcut (safe even if provider missing)
// ---------------------------------------------------------
function DashboardShortcut() {
  const employerAuth = useEmployerAuth?.();
  const employeeAuth = useEmployeeAuth?.();

  const employer = employerAuth?.employer;
  const employee = employeeAuth?.employee;

  if (employer) {
    return (
      <div className="flex justify-center mt-8">
        <Link to="/employer">
          <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
            Go to Employer Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (employee) {
    return (
      <div className="flex justify-center mt-8">
        <Link to="/employee">
          <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
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
    <div className="max-w-xl mx-auto mt-24">
      <Card className="p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ExternalLink className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">
            View Employee Evaluation
          </h3>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Enter an evaluation link or token to access a candidate’s verified reference.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={evaluationLink}
            onChange={(e) => setEvaluationLink(e.target.value)}
            placeholder="Paste link or token..."
            className="flex-1"
          />
          <Button disabled={!evaluationLink} className="bg-blue-600 text-white">
            View
          </Button>
        </form>
      </Card>
    </div>
  );
}


// ---------------------------------------------------------
// HOME PAGE — Stripe / Linear
// ---------------------------------------------------------
export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="w-full border-b border-slate-200 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-semibold text-slate-900 tracking-tight">
            ProRef
          </span>

          <div className="flex gap-6 text-sm">
            <Link to="/employer/login" className="text-slate-700 hover:text-slate-900">
              Employer Login
            </Link>
            <Link to="/employee/login" className="text-slate-700 hover:text-slate-900">
              Employee Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center">
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-6">
          Verified Employee References,
          <br />
          Built for Modern Hiring.
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          A streamlined platform for creating, managing, and sharing professional
          employee evaluations with confidence and clarity.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/employer/signup">
            <Button className="bg-blue-600 text-white px-10 py-3 rounded-lg text-base">
              Register Company
            </Button>
          </Link>

          <Link to="/employer/login">
            <Button variant="outline" className="px-10 py-3 border-slate-300 text-base">
              Employer Login
            </Button>
          </Link>

          <Link to="/employee/login">
            <Button variant="outline" className="px-10 py-3 border-slate-300 text-base">
              Employee Login
            </Button>
          </Link>
        </div>

        <DashboardShortcut />
      </section>

      {/* View Evaluation */}
      <ViewEvaluationSection />

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">
          What ProRef Enables
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            {
              icon: Building2,
              title: "Company Verification",
              desc: "Register your organization with validated business details.",
            },
            {
              icon: UserCheck,
              title: "Employee Management",
              desc: "Maintain structured employee profiles and work history.",
            },
            {
              icon: ClipboardCheck,
              title: "Performance Evaluations",
              desc: "Create consistent, criteria‑based evaluations with ease.",
            },
            {
              icon: Shield,
              title: "Secure Reference Sharing",
              desc: "Share evaluations safely with hiring teams and recruiters.",
            },
          ].map((f, i) => (
            <div key={i} className="text-center">
              <f.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Start Building Trusted References
          </h2>
          <p className="text-slate-600 mb-8">
            Register your company and begin creating verified evaluations today.
          </p>
          <Link to="/employer/signup">
            <Button className="bg-blue-600 text-white px-10 py-3 rounded-lg text-base">
              Register Company
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ProRef — Professional Reference Platform
      </footer>
    </div>
  );
}
