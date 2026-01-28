import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployeeLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // MOCK — substituir por backend real
    setTimeout(() => {
      if (!email) {
        setError("Please enter your email.");
        setLoading(false);
        return;
      }

      // Simula login
      localStorage.setItem(
        "employee",
        JSON.stringify({
          email,
          employeeId: 1,
          name: "Demo Employee",
        })
      );

      navigate("/employee");
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md space-y-8">

        <PageHeader
          title="Employee Login"
          subtitle="Access your profile and evaluations"
          align="center"
        />

        <Card padding="lg" shadow="md" className="bg-white/80 backdrop-blur space-y-6">

          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm text-slate-600 pt-2">
            <Link to="/employee/forgot-password" className="hover:text-blue-600">
              Forgot password?
            </Link>

            <Link to="/employee/signup" className="hover:text-blue-600">
              Create account
            </Link>
          </div>

          <p className="text-center text-sm text-slate-600 mt-4">
            Employer login instead{" "}
            <Link
              to="/employer/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Click here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
