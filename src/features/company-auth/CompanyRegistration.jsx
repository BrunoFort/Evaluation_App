import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import Card from "@/components/ui/Card.jsx";

export default function CompanyRegistration() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // MOCK registration
    if (companyName && email) {
      navigate("/company/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-lg shadow-xl border border-neutral-200 bg-white rounded-2xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-2">
            Register Your Company
          </h2>

          <p className="text-center text-neutral-600 mb-6">
            Create your company account to start managing employee evaluations.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Company Name
              </label>
              <Input
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Company Email
              </label>
              <Input
                placeholder="Enter company email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-xl shadow-md transition-all"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/company/login")}
              className="text-purple-600 font-medium cursor-pointer hover:underline"
            >
              Sign in here
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}
