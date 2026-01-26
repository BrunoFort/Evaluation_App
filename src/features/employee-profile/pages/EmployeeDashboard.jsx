import React, { useEffect, useState } from "react";
import CandidateLayout from "@/Layouts/CandidateLayout";
import { Link } from "react-router-dom";
import { FileText, Star, User } from "lucide-react";

function Stars({ score }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.round(score)
              ? "text-yellow-400 fill-yellow-400"
              : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function CandidateDashboard() {
  const [candidate, setCandidate] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("candidate");
    if (stored) {
      const c = JSON.parse(stored);
      setCandidate(c);

      fetch(`http://localhost:4000/evaluations?employeeId=${c.id}`)
        .then((res) => res.json())
        .then(setEvaluations);
    }
  }, []);

  if (!candidate) {
    return (
      <CandidateLayout>
        <p className="text-slate-500">Loading...</p>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <div className="space-y-8">
        {/* Candidate Header */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
          {candidate.photoUrl ? (
            <img
              src={candidate.photoUrl}
              alt="Candidate"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="w-8 h-8 text-slate-500" />
            </div>
          )}

          <div>
            <p className="text-xl font-bold text-slate-900">
              {candidate.name}
            </p>
            <p className="text-sm text-slate-600">{candidate.email}</p>
          </div>
        </div>

        {/* Evaluations List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Your Evaluations
          </h2>

          {evaluations.length === 0 && (
            <p className="text-slate-500 text-sm">
              You have no evaluations yet.
            </p>
          )}

          {evaluations.map((ev) => (
            <div
              key={ev.id}
              className="border border-slate-200 rounded-lg p-4 bg-slate-50"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-slate-900">{ev.title}</p>
                <Stars score={ev.overallScore} />
              </div>

              <p className="text-sm text-slate-500 mb-3">
                {new Date(ev.createdAt).toLocaleDateString()}
              </p>

              {/* Consolidated Summary */}
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-700">
                  <strong>Strengths:</strong> {ev.strengths || "—"}
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Areas for Improvement:</strong>{" "}
                  {ev.improvements || "—"}
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Suggestions:</strong> {ev.suggestions || "—"}
                </p>
              </div>

              {/* Status */}
              <p className="text-xs text-slate-500 mb-3">
