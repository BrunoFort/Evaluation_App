import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import Card from "@/components/ui/Card.jsx";
import Input from "@/components/ui/Input.jsx";
import Textarea from "@/components/ui/Textarea.jsx";
import Button from "@/components/ui/Button.jsx";

export default function EmployeeProfileEdit() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    position: "",
    bio: "",
  });

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);

      // MOCK — integração real virá depois
      const data = {
        name: "John Doe",
        email: "john.doe@example.com",
        position: "Software Developer",
        bio: "Passionate about building clean, scalable applications.",
      };

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK — integração real virá depois
    navigate("/employee/profile");
  };

  return (
    <EmployeeDashboardLayout>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-neutral-900 mb-10">
          Edit Your Profile
        </h1>

        <Card className="p-8 shadow-xl border border-neutral-200 bg-white rounded-2xl">

          {loading ? (
            <p className="text-neutral-600 text-center">Loading profile...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Position
                </label>
                <Input
                  value={profile.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  placeholder="Your role or job title"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Bio
                </label>
                <Textarea
                  rows={5}
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Tell us a bit about yourself..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  onClick={() => navigate("/employee/profile")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Save Changes
                </Button>
              </div>

            </form>
          )}

        </Card>
      </div>
    </EmployeeDashboardLayout>
  );
}
