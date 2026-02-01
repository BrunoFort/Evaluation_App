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

    setTimeout(() => {
      if (!email) {
        setError("Please enter your email.");
        setLoading(false);
        return;
      }

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
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-8">

        <PageHeader
          title="Employee Login"
          subtitle="Access your profile and evaluations"
          align="center"
        />

        <Card padding="lg" shadow="md" className="space-y-6">

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
            />

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm text-neutral-600 pt-2">
            <Link to="/employee/forgot-password" className="hover:text-purple-600">
              Forgot password?
            </Link>

            <Link to="/employee/signup" className="hover:text-purple-600">
              Create account
            </Link>
          </div>

          <p className="text-center text-sm text-neutral-600 mt-4">
            Employer login instead{" "}
            <Link
              to="/employer/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Click here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
