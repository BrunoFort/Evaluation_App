// ---------------------------------------------------------
// Home.jsx — Estilo NOTION / BASECAMP (Clean, Humano)
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
      <div className="mt-6">
        <Link to="/employer">
          <Button className="bg-slate-900 text-white px-6 py-2 rounded-md text-sm">
            Go to Employer Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (employee) {
    return (
      <div className="mt-6">
        <Link to="/employee">
          <Button className="bg-slate-900 text-white px-6 py-2 rounded-md text-sm">
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
    <section className="max-w-4xl mx-auto px-6 mt-16">
      <Card className="p-6 border border-slate-200 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <ExternalLink className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-900">
            View an employee evaluation
          </h3>
        </div>

        <p className="text-xs text-slate-600 mb-4">
          Paste an evaluation link or token to access a candidate’s professional reference.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            value={evaluationLink}
            onChange={(e) => setEvaluationLink(e.target.value)}
            placeholder="Paste link or token..."
            className="flex-1 text-sm"
          />
          <Button
            disabled={!evaluationLink}
            className="bg-slate-900 text-white px-5 py-2 text-sm rounded-md"
          >
            View
          </Button>
        </form>
      </Card>
    </section>
  );
}


// ---------------------------------------------------------
// HOME PAGE — Notion / Basecamp
// ---------------------------------------------------------
export default function Home() {
  const features = [
    {
      icon: Building2,
      title: "Company accounts",
      desc: "Register your organization with verified business details.",
    },
    {
      icon: UserCheck,
      title: "Employee records",
      desc: "Maintain structured employee profiles and work history.",
    },
    {
      icon: ClipboardCheck,
      title: "Evaluations",
      desc: "Create consistent, criteria‑based performance assessments.",
    },
    {
      icon: Shield,
      title: "Secure sharing",
      desc: "Share references safely with hiring teams.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-900" />
            <span className="text-sm font-semibold text-slate-900 tracking-tight">
              ProRef
            </span>
          </div>

          <div className="flex gap-4 text-xs">
            <Link to="/employer/login" className="text-slate-700 hover:text-slate-900">
              Employer login
            </Link>
            <Link to="/employee/login" className="text-slate-700 hover:text-slate-900">
              Employee login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
              Professional reference platform
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 leading-snug">
              Clear, verified employee references for confident hiring.
            </h1>

            <p className="text-sm text-slate-600 mb-8 leading-relaxed max-w-md">
              ProRef helps organizations document performance, collect structured feedback,
              and share professional references in a consistent, secure way.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/employer/signup">
                <Button className="bg-slate-900 text-white px-6 py-2 rounded-md text-sm">
                  Register company
                </Button>
              </Link>

              <Link to="/employer/login">
                <Button
                  variant="outline"
                  className="px-6 py-2 border-slate-300 text-sm text-slate-800 bg-white"
                >
                  Employer login
                </Button>
              </Link>

              <Link to="/employee/login">
                <Button
                  variant="outline"
                  className="px-6 py-2 border-slate-300 text-sm text-slate-800 bg-white"
                >
                  Employee login
                </Button>
              </Link>
            </div>

            <DashboardShortcut />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              How ProRef fits into your hiring process
            </h2>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Capture structured performance evaluations for current employees.</li>
              <li>• Generate professional references that are consistent and easy to interpret.</li>
              <li>• Share evaluation links securely with hiring managers and recruiters.</li>
              <li>• Give candidates a transparent, portable record of their work history.</li>
            </ul>
          </div>
        </section>

        {/* View Evaluation */}
        <ViewEvaluationSection />

        {/* Features */}
        <section className="mt-20">
          <h2 className="text-sm font-semibold text-slate-900 mb-6">
            What you can manage with ProRef
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card
                key={i}
                className="p-5 border border-slate-200 bg-white text-sm shadow-sm"
              >
                <f.icon className="w-5 h-5 text-slate-800 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 border border-dashed border-slate-300 rounded-lg p-6 bg-slate-50">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            Ready to formalize your reference process?
          </h2>
          <p className="text-xs text-slate-600 mb-4 max-w-md">
            Create a company account and start building structured, reusable evaluations
            for your team.
          </p>
          <Link to="/employer/signup">
            <Button className="bg-slate-900 text-white px-6 py-2 rounded-md text-sm">
              Register company
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-xs text-slate-500">
          <span>© {new Date().getFullYear()} ProRef — Professional reference platform</span>
          <span>Built for Canadian businesses</span>
        </div>
      </footer>
    </div>
  );
}
