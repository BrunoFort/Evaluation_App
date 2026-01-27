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
      <div className="space-y-10">

        {/* Título */}
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {employee.name}
        </h1>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardCard
            label="Total Evaluations"
            value={evaluations.length}
          />
          <DashboardCard
            label="Completed"
            value={evaluations.filter((ev) => ev.status === "completed").length}
          />
          <DashboardCard
            label="Pending"
            value={evaluations.filter((ev) => ev.status === "pending").length}
          />
        </div>

        {/* Card de perfil */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-6">
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
            <p className="text-xl font-semibold text-slate-900">{employee.name}</p>
            <p className="text-slate-600">{employee.email}</p>

            <Link
              to="/employee/profile"
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              View Profile →
            </Link>
          </div>
        </div>

        {/* Lista de avaliações */}
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
                  className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition"
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

function DashboardCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
