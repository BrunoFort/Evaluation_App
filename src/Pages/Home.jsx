// ---------------------------------------------------------
// Home.jsx — Versão C‑Prime (Clean, Moderna, Jovem, Profissional)
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
  ExternalLink,
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
      <div className="flex justify-center mt-10">
        <Link to="/employer">
          <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-base shadow-md hover:shadow-lg transition">
            Go to Employer Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (employeeAuth?.employee) {
    return (
      <div className="flex justify-center mt-10">
        <Link to="/employee">
          <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-base shadow-md hover:shadow-lg transition">
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
      <Card className="p-10 border border-slate-200 shadow-sm bg-white rounded-2xl">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          View an Evaluation
        </h3>
        <p className="text-slate-600 mb-6">
          Paste an evaluation link or token to access a candidate’s verified reference.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={evaluationLink}
            onChange={(e) => setEvaluationLink(e.target.value)}
            placeholder="Paste link or token..."
            className="flex-1"
          />
          <Button
            disabled={!evaluationLink}
            className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition"
          >
            View
          </Button>
        </form>
      </Card>
    </section>
  );
}


// ---------------------------------------------------------
// HOME PAGE — C‑Prime
// ---------------------------------------------------------
export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="w-full border-b border-slate-200 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-semibold text-slate-900 tracking-tight">
            ProRef
          </span>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/employer/login" className="text-slate-700 hover:text-blue-600 transition">
              Employer Login
            </Link>
            <Link to="/employee/login" className="text-slate-700 hover:text-blue-600 transition">
              Employee Login
            </Link>

            <Link to="/employer/signup">
              <Button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm shadow hover:bg-blue-700 transition">
                Register Company
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
          Clear, Modern Employee References  
          <span className="block text-blue-600">Built for Today’s Hiring</span>
        </h1>

        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          ProRef helps companies create structured, trustworthy evaluations that candidates
          can share with confidence — and hiring teams can rely on.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/employer/signup">
            <Button className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition">
              Register Company
            </Button>
          </Link>

          <Link to="/employer/login">
            <Button variant="outline" className="px-10 py-4 border-slate-300 text-lg rounded-xl hover:border-blue-600 hover:text-blue-600 transition">
              Employer Login
            </Button>
          </Link>

          <Link to="/employee/login">
            <Button variant="outline" className="px-10 py-4 border-slate-300 text-lg rounded-xl hover:border-blue-600 hover:text-blue-600 transition">
              Employee Login
            </Button>
          </Link>
        </div>

        <DashboardShortcut />
      </section>

      {/* View Evaluation */}
      <ViewEvaluationSection />

      {/* Features */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-20">
            What You Can Do with ProRef
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                title: "Secure Sharing",
                desc: "Share evaluations safely with hiring teams and recruiters.",
              },
            ].map((f, i) => (
              <Card
                key={i}
                className="p-8 border border-slate-200 bg-white rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer text-center"
              >
                <f.icon className="w-10 h-10 text-blue-600 mx-auto mb-6" />
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-white">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Start Building Trusted References
        </h2>
        <p className="text-slate-600 mb-10 text-lg">
          Register your company and begin creating verified evaluations today.
        </p>
        <Link to="/employer/signup">
          <Button className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition">
            Register Company
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ProRef — Professional Reference Platform
      </footer>
    </div>
  );
}
