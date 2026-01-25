import React from "react";
import CompanyLayout from "../Layouts/CompanyLayout";
import { useAuth } from "../features/auth/AuthProvider";

export default function CompanyPanel() {
  const { user } = useAuth();

  return (
    <CompanyLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Company Panel</h1>

        <p className="text-slate-700">
          Welcome, <strong>{user?.companyName}</strong>
        </p>

        <div className="mt-4 p-4 bg-white shadow rounded border border-slate-200">
          <h2 className="text-xl font-semibold mb-2">Employer Information</h2>

          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Employer ID:</strong> {user?.employerId}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>
    </CompanyLayout>
  );
}
