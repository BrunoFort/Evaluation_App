import React, { useEffect, useState } from "react";
import CompanyLayout from "@/layouts/CompanyLayout";

import PageHeader from "@/components/ui/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import SectionCard from "@/components/ui/SectionCard.jsx";

export default function CompanyAnalyticsPage() {
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
      <div className="max-w-5xl mx-auto space-y-10">

        <PageHeader
          title="Dashboard Analytics"
          subtitle="Overview of your company activity"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard label="Employees" value={stats.employees} />
          <StatCard label="Evaluations" value={stats.evaluations} />
          <StatCard label="Pending Evaluations" value={stats.pendingEvaluations} />
        </div>

        <SectionCard title="Activity">
          <p className="text-slate-600 text-sm">
            Here you’ll soon see recent evaluations, trends and key metrics.
          </p>
        </SectionCard>
      </div>
    </CompanyLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <Card className="text-center py-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </Card>
  );
}
