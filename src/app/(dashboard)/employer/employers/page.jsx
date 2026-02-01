// src/app/(dashboard)/employer/employers/page.jsx

import { Link } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Button from "/src/components/ui/Button.jsx";

import { useEmployers } from "/src/features/employers/hooks/useEmployers.js";
import { useDeleteEmployer } from "/src/features/employers/hooks/useDeleteEmployer.js";
import { EmployerTable } from "/src/features/employers/components/EmployerTable.jsx";

export default function EmployersListPage() {
  const { employers, loading, error } = useEmployers();
  const { remove } = useDeleteEmployer();

  if (loading) {
    return (
      <EmployerDashboardLayout>
        <p className="text-neutral-600 text-center py-10">Loading...</p>
      </EmployerDashboardLayout>
    );
  }

  if (error) {
    return (
      <EmployerDashboardLayout>
        <p className="text-neutral-600 text-center py-10">
          Failed to load employers.
        </p>
      </EmployerDashboardLayout>
    );
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-neutral-900">
            Employers
          </h1>

          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Link to="/employer/employers/create">New Employer</Link>
          </Button>
        </div>

        {/* Table */}
        <EmployerTable employers={employers} onDelete={remove} />

      </div>
    </EmployerDashboardLayout>
  );
}
