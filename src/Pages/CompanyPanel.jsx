import React from "react";
import CompanyLayout from "../Layouts/CompanyLayout";
import { useEmployerAuth } from "../features/auth/employer/useEmployerAuth";

export default function CompanyPanel() {
  const { employer } = useEmployerAuth();

  return (
    <CompanyLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Company Panel</h1>

        <p className="text-slate-700">
          Welcome, <strong>{employer?.companyName}</strong>
        </p>

        <div className="mt-4 p-4 bg-white shadow rounded border border-slate-200">
          <h2 className="text-xl font-semibold mb-2">Employer Information</h2>

          <p><strong>Email:</strong> {employer?.email}</p>
          <p><strong>Employer ID:</strong> {employer?.employerId}</p>
          <p><strong>Role:</strong> {employer?.role}</p>
        </div>
      </div>
    </CompanyLayout>
  );
}
