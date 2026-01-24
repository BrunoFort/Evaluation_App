import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function CompanyReports() {
  // MOCK data — substituir quando conectar backend
  const monthlyPerformance = [
    { month: "Jan", avg: 3.8 },
    { month: "Feb", avg: 4.1 },
    { month: "Mar", avg: 4.3 },
    { month: "Apr", avg: 4.0 },
    { month: "May", avg: 4.4 },
    { month: "Jun", avg: 4.6 },
  ];

  const employeeComparison = [
    { name: "John Doe", avg: 4.5 },
    { name: "Sarah Miller", avg: 4.8 },
    { name: "Carlos Silva", avg: 3.9 },
    { name: "Maria Santos", avg: 4.2 },
  ];

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Company Reports
      </h1>

      {/* Performance Over Time */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Performance Over Time
          </CardTitle>
        </CardHeader>

        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
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

      {/* Employee Comparison */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Employee Performance Comparison
          </CardTitle>
        </CardHeader>

        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={employeeComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="avg" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
