import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "/src/lib/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import IconBack from "/src/components/ui/IconBack.jsx";

export default function EmployeeLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate("/employee");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
          >
            <IconBack />
            Back home
          </Link>
        </div>

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

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm text-neutral-600 pt-2">
            <Link to="/employee/forgot-password" className="hover:text-purple-600">
              Forgot password?
            </Link>

            <Link to="/employee/register" className="hover:text-purple-600">
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
