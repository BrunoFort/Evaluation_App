import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { createPageUrl } from "../utils";

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // MOCK login
    if (email) {
      navigate(createPageUrl("EmployeeProfile"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Employee Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Employee Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" className="w-full bg-blue-600 text-white">
              Login
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Company login?{" "}
            <Link to={createPageUrl("CompanyLogin")} className="text-blue-600">
              Click here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
