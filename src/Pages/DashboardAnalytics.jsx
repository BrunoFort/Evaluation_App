import React, { useEffect, useState } from "react";
import CompanyLayout from "../Layouts/CompanyLayout";

export default function DashboardAnalytics() {
  const [stats, setStats] = useState({
    employees: 0,
    evaluations: 0,
    pendingEvaluations: 0,
  });

  useEffect(() => {
    async function loadData() {
      const [employeesRes, evaluationsRes] = await Promise.all([
        fetch("http://localhost:4000/employees"),
        fetch("http://localhost:4000/evaluations"),
      ]);

      const employees = await employeesRes.json();
      const evaluations = await evaluationsRes.json();

      const pending = evaluations.filter((ev) => ev.status === "pending").length;

      setStats({
        employees: employees.length,
        evaluations: evaluations.length,
        pendingEvaluations: pending,
      });
    }

    loadData();
  }, []);

  return (
    <CompanyLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            label="Employees"
            value={stats.employees}
          />
          <StatCard
            label="Evaluations"
            value={stats.evaluations}
          />
          <StatCard
            label="Pending Evaluations"
            value={stats.pendingEvaluations}
          />
        </div>

        {/* Espaço para próximos gráficos / listas */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Activity
          </h2>
          <p className="text-slate-500 text-sm">
            Here you’ll soon see recent evaluations, trends and key metrics.
          </p>
        </div>
      </div>
    </CompanyLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
