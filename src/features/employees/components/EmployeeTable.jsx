// src/features/employees/components/EmployeeTable.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User, Briefcase, Building2, ArrowRight } from "lucide-react";

export default function EmployeeTable({ employees }) {
  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-slate-700 font-semibold">Employee</th>
            <th className="px-4 py-3 text-slate-700 font-semibold">Role</th>
            <th className="px-4 py-3 text-slate-700 font-semibold">Department</th>
            <th className="px-4 py-3 text-slate-700 font-semibold w-24"></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-900">{emp.name}</span>
                </div>
              </td>

              <td className="px-4 py-3 text-slate-700 flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-slate-500" />
                {emp.role || "No role"}
              </td>

              <td className="px-4 py-3 text-slate-700 flex items-center gap-1">
                <Building2 className="w-4 h-4 text-slate-500" />
                {emp.department || "No department"}
              </td>

              <td className="px-4 py-3 text-right">
                <Link
                  to={`/employees/${emp.id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                  View
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
