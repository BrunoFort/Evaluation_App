import { useEffect, useState } from "react";
import CompanyLayout from "/src/layouts/CompanyLayout.jsx";
import { supabase } from "/src/lib/supabaseClient";

import PageHeader from "/src/components/ui/PageHeader.jsx";
import Card from "/src/components/ui/Card.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";

export default function CompanyAnalyticsPage() {
  const [stats, setStats] = useState({
    employees: 0,
    evaluations: 0,
    pendingEvaluations: 0,
  });

  useEffect(() => {
    async function loadData() {
      const [employeesRes, evaluationsRes, pendingRes] = await Promise.all([
        supabase.from("employees").select("id", { count: "exact", head: true }),
        supabase.from("evaluations").select("id", { count: "exact", head: true }),
        supabase
          .from("evaluations")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);

      setStats({
        employees: employeesRes.count || 0,
        evaluations: evaluationsRes.count || 0,
        pendingEvaluations: pendingRes.count || 0,
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
          <p className="text-neutral-600 text-sm">
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
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
    </Card>
  );
}
