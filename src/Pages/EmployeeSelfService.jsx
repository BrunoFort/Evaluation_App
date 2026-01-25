// src/Pages/EmployeeSelfService.jsx
import React, { useMemo, useState } from "react";
import { useAuth } from "../features/auth/AuthProvider";
import { useEvaluations } from "../features/evaluations/hooks/useEvaluations";
import { generateReferenceToken } from "../utils/generateReferenceToken";

export default function EmployeeSelfService() {
  const { user } = useAuth();
  const { evaluations, loading } = useEvaluations();

  const [interviewerEmail, setInterviewerEmail] = useState("");
  const [lastLink, setLastLink] = useState("");

  if (!user || user.role !== "employee") {
    return (
      <div className="p-6">
        <p>You must be logged in as an employee to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading your evaluations...</p>
      </div>
    );
  }

  const employeeEvaluations = evaluations.filter(
    (ev) => ev.employeeId === user.employeeId
  );

  const { avgScore, avgStars } = useMemo(() => {
    if (employeeEvaluations.length === 0) {
      return { avgScore: "N/A", avgStars: "N/A" };
    }

    const score =
      employeeEvaluations.reduce((sum, ev) => sum + ev.score, 0) /
      employeeEvaluations.length;

    const stars =
      employeeEvaluations.reduce((sum, ev) => sum + ev.starRating, 0) /
      employeeEvaluations.length;

    return {
      avgScore: score.toFixed(1),
      avgStars: stars.toFixed(1),
    };
  }, [employeeEvaluations]);

  function handleSendLink(e) {
    e.preventDefault();

    if (!interviewerEmail) return;

    const token = generateReferenceToken();
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const link = `${origin}/reference/${user.employeeId}/${token}`;

    // Aqui, em produção, você chamaria o backend para:
    // - salvar o token vinculado ao employee
    // - enviar o e-mail real para o interviewerEmail
    // Por enquanto, só simulamos:
    console.log("Send reference link to:", interviewerEmail);
    console.log("Link:", link);

    setLastLink(link);
    setInterviewerEmail("");
    alert("Reference link generated (simulated send).");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header do employee */}
      <section className="border-b pb-4">
        <h1 className="text-3xl font-bold">{user.fullName}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500 mt-2">
          This is your personal profile. You can see a consolidated view of
          your evaluations and share a reference link with future employers.
        </p>
      </section>

      {/* Visão consolidada */}
      <section className="flex gap-6">
        <div>
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-semibold">{avgScore}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Average Rating</p>
          <p className="text-2xl font-semibold">
            {avgStars === "N/A"
              ? "N/A"
              : "★".repeat(Math.round(Number(avgStars)))}
          </p>
        </div>
      </section>

      {/* Envio de link de referência */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Send Reference Link</h2>
        <p className="text-sm text-gray-600">
          During your interview, you can send a secure reference link to the
          interviewer. They must be registered as an employer to access your
          detailed reference report.
        </p>

        <form onSubmit={handleSendLink} className="space-y-3 max-w-md">
          <div>
            <label className="block text-sm mb-1">
              Interviewer&apos;s email
            </label>
            <input
              type="email"
              className="border p-2 w-full"
              value={interviewerEmail}
              onChange={(e) => setInterviewerEmail(e.target.value)}
              placeholder="interviewer@company.com"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send reference link
          </button>
        </form>

        {lastLink && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">
              Last generated link (for debugging / copy):
            </p>
            <code className="block bg-gray-100 p-2 text-xs break-all">
              {lastLink}
            </code>
          </div>
        )}
      </section>
    </div>
  );
}
