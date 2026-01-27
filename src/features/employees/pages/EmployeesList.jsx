import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/employees")
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CompanyLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>

          <Link
            to="/employees/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Employee
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((emp) => (
            <div
              key={emp.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Foto */}
              {emp.photoUrl ? (
                <img
                  src={emp.photoUrl}
                  alt={emp.name}
                  className="h-20 w-20 rounded-full object-cover border mb-4"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 mb-4">
                  No Photo
                </div>
              )}

              {/* Nome */}
              <h2 className="text-lg font-semibold text-slate-900">
                {emp.name}
              </h2>

              <p className="text-slate-600 text-sm">{emp.email}</p>

              {/* Ações */}
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/employees/${emp.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </Link>

                <Link
                  to={`/employees/${emp.id}/edit`}
                  className="text-slate-600 hover:underline text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-slate-500 text-center">No employees found.</p>
        )}
      </div>
    </CompanyLayout>
  );
}
