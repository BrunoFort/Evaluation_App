import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Star, TrendingUp, ClipboardList } from "lucide-react";

export default function DashboardAnalytics() {
  // MOCK KPIs
  const kpis = {
    totalEmployees: 42,
    avgRating: 4.3,
    evaluationsThisMonth: 12,
    performanceTrend: "+8%",
  };

  // MOCK chart data
  const trendData = [
    { month: "Jan", avg: 3.8 },
    { month: "Feb", avg: 4.1 },
    { month: "Mar", avg: 4.3 },
    { month: "Apr", avg: 4.0 },
    { month: "May", avg: 4.4 },
    { month: "Jun", avg: 4.6 },
  ];

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Analytics Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <KpiCard
          icon={<Users className="text-blue-600" />}
          label="Total Employees"
          value={kpis.totalEmployees}
        />

        <KpiCard
          icon={<Star className="text-yellow-500" />}
          label="Average Rating"
          value={kpis.avgRating}
        />

        <KpiCard
          icon={<ClipboardList className="text-green-600" />}
          label="Evaluations This Month"
          value={kpis.evaluationsThisMonth}
        />

        <KpiCard
          icon={<TrendingUp className="text-indigo-600" />}
          label="Performance Trend"
          value={kpis.performanceTrend}
        />
      </div>

      {/* PERFORMANCE TREND CHART */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Performance Trend
          </CardTitle>
        </CardHeader>

        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}

function KpiCard({ icon, label, value }) {
  return (
    <Card className="shadow-lg border-2 border-blue-100 bg-white/80 backdrop-blur">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-4xl mb-3">{icon}</div>
        <p className="text-slate-600 text-sm">{label}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}
