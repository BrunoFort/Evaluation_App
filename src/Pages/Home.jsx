import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "/src/components/ui/Button.jsx";
import Input from "/src/components/ui/input.jsx";
import Card from "/src/components/ui/card.jsx";

import {
  ArrowLeft,
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
// Back Button (simple, elegant)
// ---------------------------------------------------------
function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
}


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
      <div className="flex justify-center mt-6">
        <Link to="/employer">
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Go to Employer Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (employee) {
    return (
      <div className="flex justify-center mt-6">
        <Link to="/employee">
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
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
    <div className="max-w-xl mx-auto mt-16">
      <Card className="p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ExternalLink className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">
            View Employee Evaluation
          </h3>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Paste an evaluation link or token to view a candidate’s professional reference.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
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
// HOME PAGE — Minimal, Professional, Clear
// ---------------------------------------------------------
export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">

      <BackButton />

      {/* Header */}
      <header className="w-full border-b border-slate-200 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-semibold text-slate-900">ProRef</span>

          <div className="flex gap-4">
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
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Professional Employee Reference Platform
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          Build trust. Save time. Hire with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/employer/signup">
            <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
              Register Company
            </Button>
          </Link>

          <Link to="/employer/login">
            <Button variant="outline" className="px-8 py-3 border-slate-300">
              Employer Login
            </Button>
          </Link>

          <Link to="/employee/login">
            <Button variant="outline" className="px-8 py-3 border-slate-300">
              Employee Login
            </Button>
          </Link>
        </div>

        <DashboardShortcut />
      </section>

      {/* View Evaluation */}
      <ViewEvaluationSection />

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
          What You Can Do With ProRef
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Building2,
              title: "Company Registration",
              desc: "Register your company with verified business details.",
            },
            {
              icon: UserCheck,
              title: "Employee Management",
              desc: "Add and manage employees with complete profiles.",
            },
            {
              icon: ClipboardCheck,
              title: "Performance Evaluations",
              desc: "Create structured evaluations with multiple criteria.",
            },
            {
              icon: Shield,
              title: "Secure Sharing",
              desc: "Share references safely during the hiring process.",
            },
          ].map((f, i) => (
            <Card key={i} className="p-6 border border-slate-200 shadow-sm">
              <f.icon className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-600 mb-6">
            Register your company and begin building verified professional references.
          </p>
          <Link to="/employer/signup">
            <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
              Register Company
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ProRef — Professional Reference Platform
      </footer>
    </div>
  );
}
