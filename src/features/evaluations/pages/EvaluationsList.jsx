import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";

export default function EvaluationsList() {
  const [evaluations, setEvaluations] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:4000/evaluations")
      .then((res) => res.json())
      .then(setEvaluations);
  }, []);

  const filtered = evaluations.filter((ev) => {
    const matchesSearch = ev.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : ev.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <CompanyLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Evaluations</h1>

          <Button as={Link} to="/evaluations/new">
          New Evaluation
          </Button>

        </div>

        {/* Filtros */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search evaluations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 border border-slate-300 rounded-lg px-3 py-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Lista */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-slate-600 font-medium">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-slate-600 font-medium">
                  Employee
                </th>
                <th className="text-left px-4 py-3 text-slate-600 font-medium">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-slate-600 font-medium">
                  Created At
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>

            <tbody>
              {filtered.map((ev) => (
                <tr
                  key={ev.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-slate-900">{ev.title}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {ev.employeeName || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={ev.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {ev.createdAt
                      ? new Date(ev.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/evaluations/${ev.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-500"
                  >
                    No evaluations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CompanyLayout>
  );
}

function StatusPill({ status }) {
  const base =
    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium";

  if (status === "completed") {
    return (
      <span className={`${base} bg-emerald-50 text-emerald-700`}>
        Completed
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className={`${base} bg-amber-50 text-amber-700`}>
        Pending
      </span>
    );
  }

  return (
    <span className={`${base} bg-slate-50 text-slate-600`}>
      {status || "Unknown"}
    </span>
  );
}

