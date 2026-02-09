import { Link } from "react-router-dom";
import { User, Briefcase } from "lucide-react";

export default function EmployeeCard({ employee }) {
  return (
    <Link
      to={`/employees/${employee.id}`}
      className="block bg-white border border-neutral-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center">
          <User className="w-7 h-7" />
        </div>

        {/* Info */}
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {employee.name}
          </h2>

          <p className="text-neutral-600 flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {employee.role || "No role assigned"}
          </p>

        </div>
      </div>
    </Link>
  );
}
