// src/Pages/DashboardAnalytics.jsx
import React from "react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { Users, ClipboardCheck, Building2 } from "lucide-react";

export default function DashboardAnalytics() {
  return (
    <EmployerLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          icon={<Users className="w-8 h-8 text-blue-600" />}
          title="Employees"
          value="24"
        />

        <DashboardCard
          icon={<ClipboardCheck className="w-8 h-8 text-green-600" />}
          title="Evaluations"
          value="58"
        />

        <DashboardCard
          icon={<Building2 className="w-8 h-8 text-purple-600" />}
          title="Companies"
          value="1"
        />
      </div>
    </EmployerLayout>
  );
}

function DashboardCard({ icon, title, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
      <div className="p-3 bg-slate-100 rounded-lg">
        {icon}
      </div>

      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
