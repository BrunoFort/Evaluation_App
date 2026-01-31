import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Card from "@/components/ui/Card.jsx";
import { Star } from "lucide-react";

export default function PublicEvaluation() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvaluation() {
      try {
        setLoading(true);
        setError(null);

        // 🔧 Integração real virá depois
        // const response = await fetch(`/api/public-evaluation/${token}`);
        // const data = await response.json();

        // Simulação temporária:
        const data = {
          employeeName: "John Doe",
          companyName: "TechCorp Inc.",
          score: 4.5,
          position: "Software Developer",
          date: "2025-11-12",
          summary:
            "Excellent performance, strong communication, reliable team member.",
        };

        setEvaluation(data);
      } catch (err) {
        setError("Invalid or expired evaluation link.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvaluation();
  }, [token]);

  return (
    <PublicLayout>
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur p-8">

        {/* Loading */}
        {loading && (
          <p className="text-slate-600 text-center">Loading evaluation...</p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        {/* Evaluation */}
        {!loading && evaluation && (
          <>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">
              Employee Evaluation
            </h1>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                {evaluation.employeeName}
              </h2>
              <p className="text-slate-500 text-sm">
                Position: {evaluation.position}
              </p>
              <p className="text-slate-500 text-sm">
                Evaluated by: {evaluation.companyName}
              </p>
              <p className="text-slate-500 text-sm">
                Date: {evaluation.date}
              </p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Star className="text-yellow-500 fill-yellow-500" />
              <span className="text-xl font-bold">{evaluation.score}</span>
            </div>

            <p className="text-slate-700 leading-relaxed">
              {evaluation.summary}
            </p>
          </>
        )}

      </Card>
    </PublicLayout>
  );
}
