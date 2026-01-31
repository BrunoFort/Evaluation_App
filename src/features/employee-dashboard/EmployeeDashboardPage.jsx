import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

export default function EmployeeDashboardPage() {
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
      <div className="max-w-3xl mx-auto space-y-10">

        <PageHeader
          title={`Welcome back, ${employee.name}`}
          subtitle="Here is an overview of your evaluations"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="text-center py-6">
            <p className="text-sm text-slate-500">Total Evaluations</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {evaluations.length}
            </p>
          </Card>

          <Card className="text-center py-6">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {evaluations.filter((ev) => ev.status === "completed").length}
            </p>
          </Card>

          <Card className="text-center py-6">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {evaluations.filter((ev) => ev.status === "pending").length}
            </p>
          </Card>
        </div>

        <Card className="flex items-center gap-6">
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
            <p className="text-xl font-semibold text-slate-900">
              {employee.name}
            </p>
            <p className="text-slate-600">{employee.email}</p>

            <Link
              to="/employee/profile"
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              View Profile →
            </Link>
          </div>
        </Card>

        <SectionCard title="Your Evaluations">
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

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-slate-500">
                      {new Date(ev.createdAt).toLocaleDateString()}
                    </p>

                    <StatusPill status={ev.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </EmployeeLayout>
  );
}

