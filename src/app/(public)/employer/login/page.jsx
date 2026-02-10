import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEmployerAuth } from "@/features/auth/employer/hooks/useEmployerAuth";
import { supabase } from "@/lib/supabaseClient";

import Card from "@/components/ui/card.jsx";
import Input from "@/components/ui/input.jsx";
import Button from "@/components/ui/Button.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import IconHome from "@/components/ui/IconHome.jsx";

export default function EmployerLoginPage() {
  const { login } = useEmployerAuth();
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

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = data?.user;

    if (!user) {
      setError("Authentication failed. Please try again.");
      setLoading(false);
      return;
    }

    login({
      role: "employer",
      email: user.email,
      employerId: user.id,
    });

    navigate("/employer");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 leading-none"
          >
            <IconHome />
            <span className="relative top-[-1px]">Home</span>
          </Link>
        </div>

        <PageHeader
          title="Employer Login"
          subtitle="Access your company dashboard"
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
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm text-neutral-600 pt-2">
            <Link to="/employer/forgot-password" className="hover:text-purple-600">
              Forgot password?
            </Link>

            <Link to="/employer/register" className="hover:text-purple-600">
              Create account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
