import React, { useEffect, useState } from "react";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (stored) {
      const emp = JSON.parse(stored);
      setEmployee(emp);

      fetch(`http://localhost:4000/evaluations?employeeId=${emp.id}`)
        .then((res) => res.json())
        .then(setEvaluations);
    }
  }, []);

  if (!employee) {
    return (
      <EmployeeLayout>
        <p className="text-slate-500">Loading...</p>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8">

        {/* Perfil resumido */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          {employee.photoUrl ? (
            <img
              src={employee.photoUrl}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover border"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              No Photo
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">{employee.name}</h1>
            <p className="text-slate-600">{employee.email}</p>

            <Link
              to="/employee/profile/edit"
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              Edit Profile →
            </Link>
          </div>
        </div>

        {/* Avaliações */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Your Evaluations
          </h2>

          {evaluations.length === 0 ? (
            <p className="text-slate-500">No evaluations yet.</p>
          ) : (
            <ul className="space-y-3">
              {evaluations.map((ev) => (
                <li
                  key={ev.id}
                  className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                >
                  <Link
                    to={`/employee/evaluation/${ev.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {ev.title}
                  </Link>

                  <p className="text-sm text-slate-500">
                    {new Date(ev.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}
