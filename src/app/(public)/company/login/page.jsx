import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "/src/components/ui/Button.jsx";
import Input from "/src/components/ui/Input.jsx";
import Card from "/src/components/ui/Card.jsx";

export default function CompanyLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // MOCK login
    if (email && password) {
      navigate("/company");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-lg shadow-xl border border-neutral-200 bg-white rounded-2xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-2">
            Company Login
          </h2>

          <p className="text-center text-neutral-600 mb-6">
            Access your company dashboard to manage employee evaluations.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Company Email
              </label>
              <Input
                placeholder="Enter your company email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <Input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-xl shadow-md transition-all"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-600 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/company/register")}
              className="text-purple-600 font-medium cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

