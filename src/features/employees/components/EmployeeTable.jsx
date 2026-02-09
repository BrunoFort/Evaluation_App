import { Link } from "react-router-dom";
import { User, Briefcase, ArrowRight } from "lucide-react";

export default function EmployeeTable({ employees }) {
  return (
    <div className="overflow-x-auto bg-white border border-neutral-200 rounded-lg shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-neutral-100 border-b border-neutral-200">
          <tr>
            <th className="px-4 py-3 text-neutral-700 font-semibold">Employee</th>
            <th className="px-4 py-3 text-neutral-700 font-semibold">Role</th>
            <th className="px-4 py-3 text-neutral-700 font-semibold w-24"></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="border-b border-neutral-100 hover:bg-neutral-50 transition"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>

                  <span className="font-medium text-neutral-900">{emp.name}</span>
                </div>
              </td>

              <td className="px-4 py-3 text-neutral-700 flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-neutral-500" />
                {emp.role || "No role"}
              </td>

              <td className="px-4 py-3 text-right">
                <Link
                  to={`/employees/${emp.id}`}
                  className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium transition"
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
