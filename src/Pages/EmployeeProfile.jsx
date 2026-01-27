import React, { useEffect, useState } from "react";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { Link } from "react-router-dom";

export default function EmployeeProfile() {
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
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 max-w-xl mx-auto">

        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

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
            <p className="text-lg font-semibold text-slate-900">{employee.name}</p>
            <p className="text-slate-600">{employee.email}</p>
          </div>
        </div>

        {/* Bio */}
        {employee.bio && (
          <div>
            <h2 className="text-sm font-medium text-slate-700 mb-1">Bio</h2>
            <p className="text-slate-600 whitespace-pre-line">{employee.bio}</p>
          </div>
        )}

        {/* Links */}
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

        {/* Botão de editar */}
        <div className="pt-4">
          <Link
            to="/employee/profile/edit"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </EmployeeLayout>
  );
}
