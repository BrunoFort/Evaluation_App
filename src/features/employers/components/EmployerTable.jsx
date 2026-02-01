// src/features/employers/components/EmployerTable.jsx

import Button from "/src/components/ui/Button.jsx";
import { Link } from "react-router-dom";
import { DeleteEmployerDialog } from "/src/features/employers/components/DeleteEmployerDialog.jsx";

export function EmployerTable({ employers, onDelete }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-neutral-200 bg-neutral-50">
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">ID</th>
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">Company Name</th>
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">Business Number</th>
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">Evaluator Name</th>
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">Evaluator Position</th>
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">Email</th>
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">Phone</th>
          <th className="p-3 text-left text-sm font-semibold text-neutral-700">Actions</th>
        </tr>
      </thead>

      <tbody>
        {employers.map((emp) => (
          <tr key={emp.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition">
            <td className="p-3 text-neutral-900">{emp.id}</td>
            <td className="p-3 text-neutral-900">{emp.companyName}</td>
            <td className="p-3 text-neutral-700">{emp.businessNumber}</td>
            <td className="p-3 text-neutral-700">{emp.evaluatorName}</td>
            <td className="p-3 text-neutral-700">{emp.evaluatorPosition}</td>
            <td className="p-3 text-neutral-700">{emp.email}</td>
            <td className="p-3 text-neutral-700">{emp.phone}</td>

            <td className="p-3 flex gap-2 justify-end">

              {/* Edit */}
              <Button
                variant="outline"
                asChild
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                <Link to={`/employers/edit/${emp.id}`}>Edit</Link>
              </Button>

              {/* Delete */}
              <DeleteEmployerDialog onConfirm={() => onDelete(emp.id)}>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </DeleteEmployerDialog>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
