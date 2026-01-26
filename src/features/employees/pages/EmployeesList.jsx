// src/features/employees/pages/EmployeesList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { useEmployees } from "../hooks/useEmployees";
import { Users, LayoutGrid, Table, Search } from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeTable from "../components/EmployeeTable";

export default function EmployeesList() {
  const { employees, loading } = useEmployees();
  const [viewMode, setViewMode] = useState("table"); // "table" | "cards"
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployerLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-7 h-7 text-blue-600" />
          Employees
        </h1>

        <Link
          to="/employees/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Employee
        </Link>
      </div>

      {/* Search + View Mode */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-2 rounded-lg border ${
              viewMode === "table"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            <Table className="w-5 h-5" />
          </button>

          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-2 rounded-lg border ${
              viewMode === "cards"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-slate-500">Loading employees...</p>
      ) : filteredEmployees.length === 0 ? (
        <p className="text-slate-500">No employees found.</p>
      ) : viewMode === "table" ? (
        <EmployeeTable employees={filteredEmployees} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      )}
    </EmployerLayout>
  );
}
