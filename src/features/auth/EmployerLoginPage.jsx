import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEmployerAuth } from "../auth/employer/useEmployerAuth";
import { supabase } from "/src/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

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

    // 1. Validar campos
    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    // 2. Login real via Supabase
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 3. Garantir que o usuário existe
    const user = data?.user;
    if (!user) {
      setError("Authentication failed. Please try again.");
      setLoading(false);
      return;
    }

    // 4. Registrar no seu contexto global
    login({
      role: "employer",
      email: user.email,
      employerId: user.id, // <- agora vem do Supabase
    });

    // 5. Redirecionar
    navigate("/employer");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md space-y-8">

        <PageHeader
          title="Employer Login"
          subtitle="Access your company dashboard"
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
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm text-slate-600 pt-2">
            <Link to="/employer/forgot-password" className="hover:text-blue-600">
              Forgot password?
            </Link>

            <Link to="/employer/signup" className="hover:text-blue-600">
              Create account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
