import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Register Company</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <Input
              placeholder="Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" className="w-full bg-blue-600 text-white">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
