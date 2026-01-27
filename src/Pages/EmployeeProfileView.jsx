import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmployeeLayout from "../Layouts/EmployeeLayout";
import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";

export default function EmployeeProfileView() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (stored) {
      setEmployee(JSON.parse(stored));
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
      <div className="max-w-2xl mx-auto space-y-10">

        <PageHeader
          title="My Profile"
          subtitle="Manage your personal information"
          right={
            <Link
              to="/employee/profile/edit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </Link>
          }
        />

        <Card className="space-y-6">

          {/* Foto */}
          <div className="flex items-center gap-4">
            {employee.photoUrl ? (
              <img
                src={employee.photoUrl}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                No Photo
              </div>
            )}

            <div>
              <p className="text-lg font-semibold text-slate-900">
                {employee.name}
              </p>
              <p className="text-slate-600">{employee.email}</p>
            </div>
          </div>

          {/* Bio */}
          {employee.bio && (
            <SectionCard title="Bio">
              <p className="text-slate-700 whitespace-pre-line">
                {employee.bio}
              </p>
            </SectionCard>
          )}

          {/* Links */}
          <SectionCard title="Links">
            <div className="space-y-2">
              {employee.linkedin && (
                <p>
                  <a
                    href={employee.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </p>
              )}

              {employee.github && (
                <p>
                  <a
                    href={employee.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub Profile
                  </a>
                </p>
              )}
            </div>
          </SectionCard>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
