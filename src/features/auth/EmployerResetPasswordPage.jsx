import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployerResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validações básicas
    if (!password || !confirm) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // MOCK — substituir por backend real
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);

      // Opcional: redirecionar automaticamente após alguns segundos
      // setTimeout(() => navigate("/employer/login"), 2000);
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md space-y-8">

        <PageHeader
          title="Set New Password"
          subtitle="Choose a new password for your account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="bg-white/80 backdrop-blur space-y-6">

          {success ? (
            <div className="space-y-4 text-center">
              <p className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
                Your password has been successfully reset.
              </p>

              <Button
                fullWidth
                size="lg"
                onClick={() => navigate("/employer/login")}
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {error && (
                <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Input
                label="New Password"
                type="password"
                placeholder="Enter a new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="bg-white"
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={loading}
              >
                {loading ? "Saving..." : "Reset Password"}
              </Button>

              <div className="text-center text-sm text-slate-600 pt-2">
                <Link to="/employer/login" className="hover:text-blue-600">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
