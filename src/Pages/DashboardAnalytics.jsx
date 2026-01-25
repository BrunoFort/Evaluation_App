// src/Pages/DashboardAnalytics.jsx
import React, { useMemo } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent } from "../components/ui/card";
import { useEvaluations } from "../features/evaluations/hooks/useEvaluations";
import { useEmployees } from "../features/employees/hooks/useEmployees";

export default function DashboardAnalytics() {
  const { evaluations, loading: loadingEval } = useEvaluations();
  const { employees } = useEmployees();

  const {
    avgScore,
    avgRating,
    total,
    lastDate,
    scoresOverTime,
    topEmployees,
  } = useMemo(() => {
    if (!evaluations || evaluations.length === 0) {
      return {
        avgScore: 0,
        avgRating: 0,
        total: 0,
        lastDate: null,
        scoresOverTime: [],
        topEmployees: [],
      };
    }

    const total = evaluations.length;
    const sumScore = evaluations.reduce((acc, ev) => acc + (ev.score || 0), 0);
    const sumRating = evaluations.reduce(
      (acc, ev) => acc + (ev.starRating || 0),
      0
    );

    const avgScore = sumScore / total;
    const avgRating = sumRating / total;

    // Última data
    const sortedByDate = [...evaluations].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const lastDate = sortedByDate[0]?.date || null;

    // Scores ao longo do tempo (ordenados por data)
    const scoresOverTime = [...evaluations]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((ev) => ({
        date: ev.date,
        score: ev.score,
      }));

    // Top employees por média de score
    const byEmployee = new Map();
    evaluations.forEach((ev) => {
      if (!byEmployee.has(ev.employeeId)) {
        byEmployee.set(ev.employeeId, { sum: 0, count: 0 });
      }
      const entry = byEmployee.get(ev.employeeId);
      entry.sum += ev.score || 0;
      entry.count += 1;
    });

    const topEmployees = Array.from(byEmployee.entries())
      .map(([employeeId, { sum, count }]) => {
        const employee = employees.find((e) => e.id === employeeId);
        return {
          employeeId,
          name: employee?.fullName || `Employee #${employeeId}`,
          avgScore: sum / count,
          evaluationsCount: count,
        };
      })
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 3);

    return {
      avgScore,
      avgRating,
      total,
      lastDate,
      scoresOverTime,
      topEmployees,
    };
  }, [evaluations, employees]);

  if (loadingEval) {
    return (
      <CompanyLayout>
        <p>Loading analytics...</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Evaluation Analytics
      </h1>

      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Average Score</p>
            <p className="text-3xl font-bold">
              {total ? avgScore.toFixed(1) : "--"}/100
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Average Rating</p>
            <p className="text-3xl font-bold">
              {total ? avgRating.toFixed(2) : "--"} ★
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Evaluations</p>
            <p className="text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow">
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Last Evaluation Date</p>
            <p className="text-xl font-semibold">
              {lastDate || "No evaluations yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* “Gráfico” simples de scores ao longo do tempo */}
        <Card className="bg-white shadow">
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-4">
              Score over time
            </p>
            {scoresOverTime.length === 0 ? (
              <p className="text-sm text-slate-500">
                No data available yet.
              </p>
            ) : (
              <div className="space-y-2">
                {scoresOverTime.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{item.date}</span>
                      <span>{item.score}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded h-2">
                      <div
                        className="bg-blue-600 h-2 rounded"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top employees */}
        <Card className="bg-white shadow">
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-4">
              Top employees by average score
            </p>
            {topEmployees.length === 0 ? (
              <p className="text-sm text-slate-500">
                No evaluations available to rank employees.
              </p>
            ) : (
              <div className="space-y-3">
                {topEmployees.map((emp, idx) => (
                  <div
                    key={emp.employeeId}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-semibold">
                        #{idx + 1} {emp.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {emp.evaluationsCount} evaluation
                        {emp.evaluationsCount > 1 ? "s" : ""}
                      </p>
                    </div>
                    <p className="text-lg font-bold">
                      {emp.avgScore.toFixed(1)}/100
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CompanyLayout>
  );
}
