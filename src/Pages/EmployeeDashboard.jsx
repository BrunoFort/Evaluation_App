import React, { useEffect, useState } from "react";
import PublicLayout from "../Layouts/PublicLayout";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  // Logout do empregado
  function handleLogout() {
    localStorage.removeItem("employee");
    window.location.href = "/employee/login";
  }

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
      <PublicLayout>
        <p className="text-slate-500">Loading...</p>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="space-y-6">

        {/* Header com logout */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">
            Welcome, {employee.name}
          </h1>

          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>

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
    </PublicLayout>
  );
}
