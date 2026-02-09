import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "/src/lib/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployeeResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryReady(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setRecoveryReady(true);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!recoveryReady) {
      setError("This reset link is invalid or has expired. Please request a new one.");
      setLoading(false);
      return;
    }

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

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-8">

        <PageHeader
          title="Set New Password"
          subtitle="Choose a new password for your account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="space-y-6">

          {success ? (
            <div className="space-y-4 text-center">
              <p className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
                Your password has been successfully reset.
              </p>

              <Button
                fullWidth
                size="lg"
                onClick={() => navigate("/employee/login")}
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
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              {!recoveryReady && !error && (
                <div className="text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-sm">
                  This reset link appears to be invalid or expired.
                </div>
              )}

              <Button type="submit" fullWidth size="lg" disabled={loading}>
                {loading ? "Saving..." : "Reset Password"}
              </Button>

              <div className="text-center text-sm text-neutral-600 pt-2">
                <Link to="/employee/login" className="hover:text-purple-600">
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
