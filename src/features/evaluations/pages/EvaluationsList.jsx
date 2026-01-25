// src/features/evaluations/pages/EvaluationsList.jsx
import React, { useState, useMemo } from "react";
import { useEvaluations } from "../hooks/useEvaluations";
import { useDeleteEvaluation } from "../hooks/useDeleteEvaluation";
import { EvaluationTable } from "../components/EvaluationTable";
import { Button } from "../../../components/ui/button";
import CompanyLayout from "../../../layouts/CompanyLayout";

export default function EvaluationsList() {
  const { evaluations, loading } = useEvaluations();
  const { remove, loading: deleting } = useDeleteEvaluation();

  // -----------------------------
  // Filtros e busca
  // -----------------------------
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState("");
  const [rating, setRating] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  // -----------------------------
  // Filtragem e ordenação
  // -----------------------------
  const filtered = useMemo(() => {
    let list = [...evaluations];

    // Busca por nome do funcionário
    if (search.trim() !== "") {
      list = list.filter((ev) =>
        (ev.employeeName || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    // Score mínimo
    if (minScore !== "") {
      list = list.filter((ev) => ev.score >= Number(minScore));
    }

    // Rating
    if (rating !== "") {
      list = list.filter((ev) => ev.starRating === Number(rating));
    }

    // Ordenação por data
    list.sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return sortNewest ? db - da : da - db;
    });

    return list;
  }, [evaluations, search, minScore, rating, sortNewest]);

  // -----------------------------
  // Exclusão
  // -----------------------------
  async function handleDelete(id) {
    const result = await remove(id);
    if (result.success) {
      alert("Evaluation deleted successfully.");
    }
  }

  if (loading) {
    return (
      <CompanyLayout>
        <p>Loading evaluations...</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">All Evaluations</h1>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => (window.location.href = "/evaluations/new")}
        >
          + New Evaluation
        </Button>
      </div>

      {/* -----------------------------
          Filtros e busca
      ------------------------------ */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Busca */}
        <div>
          <label className="text-sm text-slate-600">Search by employee</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="e.g. John, Sarah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Score mínimo */}
        <div>
          <label className="text-sm text-slate-600">Min score</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="e.g. 80"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm text-slate-600">Rating</label>
          <select
            className="border p-2 w-full rounded"
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

        {/* Ordenação */}
        <div>
          <label className="text-sm text-slate-600">Sort by date</label>
          <select
            className="border p-2 w-full rounded"
            value={sortNewest ? "newest" : "oldest"}
            onChange={(e) => setSortNewest(e.target.value === "newest")}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {/* -----------------------------
          Tabela
      ------------------------------ */}
      <EvaluationTable
        evaluations={filtered}
        onView={(id) => (window.location.href = `/evaluations/${id}`)}
        onDelete={handleDelete}
      />

      {deleting && (
        <p className="text-sm text-slate-500 mt-3">Deleting evaluation...</p>
      )}
    </CompanyLayout>
  );
}
