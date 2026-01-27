import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeLayout from "../Layouts/EmployeeLayout";
import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";

export default function EmployeeProfileEdit() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    bio: "",
    linkedin: "",
    github: "",
    photoUrl: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (stored) {
      setEmployee(JSON.parse(stored));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("employee", JSON.stringify(employee));
    navigate("/employee/profile");
  }

  return (
    <EmployeeLayout>
      <div className="max-w-2xl mx-auto space-y-10">

        <PageHeader
          title="Edit Profile"
          subtitle="Update your personal information"
          right={
            <Button
              variant="outline"
              onClick={() => navigate("/employee/profile")}
            >
              Cancel
            </Button>
          }
        />

        <Card>
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic Info */}
            <SectionCard title="Basic Information">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <Input
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <Input
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder="Your email"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Bio */}
            <SectionCard title="Bio">
              <textarea
                name="bio"
                value={employee.bio}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself..."
                className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
              />
            </SectionCard>

            {/* Links */}
            <SectionCard title="Links">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    LinkedIn
                  </label>
                  <Input
                    name="linkedin"
                    value={employee.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    GitHub
                  </label>
                  <Input
                    name="github"
                    value={employee.github}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
            </SectionCard>

            {/* Photo */}
            <SectionCard title="Profile Photo URL">
              <Input
                name="photoUrl"
                value={employee.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />

              {employee.photoUrl && (
                <img
                  src={employee.photoUrl}
                  alt="Preview"
                  className="h-24 w-24 rounded-full object-cover border mt-4"
                />
              )}
            </SectionCard>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
