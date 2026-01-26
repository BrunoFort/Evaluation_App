// src/features/evaluations/pages/EvaluationsList.jsx
import React, { useState, useMemo } from "react";
import { useEvaluations } from "../hooks/useEvaluations";
import { useDeleteEvaluation } from "../hooks/useDeleteEvaluation";
import { EvaluationTable } from "../components/EvaluationTable";
import { Button } from "../../../components/ui/button";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { ClipboardCheck } from "lucide-react";

export default function EvaluationsList() {
  const { evaluations, loading } = useEvaluations();
  const { remove, loading: deleting } = useDeleteEvaluation();

  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState("");
  const [rating, setRating] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  const filtered = useMemo(() => {
    let list = [...evaluations];

    if (search.trim() !== "") {
      list = list.filter((ev) =>
        (ev.employeeName || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minScore !== "") {
      list = list.filter((ev) => ev.score >= Number(minScore));
    }

    if (rating !== "") {
      list = list.filter((ev) => ev.starRating === Number(rating));
    }

    list.sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return sortNewest ? db - da : da - db;
    });

    return list;
  }, [evaluations, search, minScore, rating, sortNewest]);

  async function handleDelete(id) {
    const result = await remove(id);
    if (result.success) {
      alert("Evaluation deleted successfully.");
    }
  }

  if (loading) {
    return (
      <EmployerLayout>
        <p className="text-slate-500">Loading evaluations...</p>
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <ClipboardCheck className="w-7 h-7 text-blue-600" />
          All Evaluations
        </h1>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => (window.location.href = "/evaluations/new")}
        >
          + New Evaluation
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 border border-slate-200">
        <div>
          <label className="text-sm text-slate-600">Search by employee</label>
          <input
            type="text"
            className="border p-2 w-full rounded-lg"
            placeholder="e.g. John, Sarah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Min score</label>
          <input
            type="number"
            className="border p-2 w-full rounded-lg"
            placeholder="e.g. 80"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Rating</label>
          <select
            className="border p-2 w-full rounded-lg"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">1 ★</option>
            <option value="2">2 ★</option>
            <option value="3">3 ★</option>
            <option value="4">4 ★</option>
            <option value="5">5 ★</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-600">Sort by date</label>
          <select
            className="border p-2 w-full rounded-lg"
            value={sortNewest ? "newest" : "oldest"}
            onChange={(e) => setSortNewest(e.target.value === "newest")}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <EvaluationTable
        evaluations={filtered}
        onView={(id) => (window.location.href = `/evaluations/${id}`)}
        onDelete={handleDelete}
      />

      {deleting && (
        <p className="text-sm text-slate-500 mt-3">Deleting evaluation...</p>
      )}
    </EmployerLayout>
  );
}
