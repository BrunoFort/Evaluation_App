import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "/src/components/ui/Button.jsx";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { createPageUrl } from "../utils";

export default function CompanyRegistration() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // MOCK registration
    if (companyName && email) {
      navigate(createPageUrl("CompanyLogin"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <Card className="w-full max-w-lg shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">
            Register Your Company
          </h2>

          <p className="text-center text-slate-600 mb-6">
            Create your company account to start managing employee evaluations.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
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
              <label className="block text-sm font-medium text-slate-700 mb-1">
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate(createPageUrl("CompanyLogin"))}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Sign in here
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
