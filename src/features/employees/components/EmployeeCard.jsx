// src/features/employees/components/EmployeeCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User, Briefcase, Building2 } from "lucide-react";

export default function EmployeeCard({ employee }) {
  return (
    <Link
      to={`/employees/${employee.id}`}
      className="block bg-white border border-slate-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
          <User className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {employee.name}
          </h2>

          <p className="text-slate-600 flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {employee.role || "No role assigned"}
          </p>

          <p className="text-slate-600 flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            {employee.department || "No department"}
          </p>
        </div>
      </div>
    </Link>
  );
}
