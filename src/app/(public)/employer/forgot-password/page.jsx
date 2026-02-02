import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "/src/lib/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployerForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/employer/reset-password",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-8">

        <PageHeader
          title="Reset Password"
          subtitle="Enter your email to receive a reset link"
          align="center"
        />

        <Card padding="lg" shadow="md" className="space-y-6">

          {sent ? (
            <div className="space-y-4 text-center">
              <p className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
                If an account exists for this email, a reset link has been sent.
              </p>

              <Link
                to="/employer/login"
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {error && (
                <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" fullWidth size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="flex justify-between text-sm text-neutral-600 pt-2">
                <Link to="/employer/login" className="hover:text-purple-600">
                  Back to login
                </Link>

                <Link to="/employer/signup" className="hover:text-purple-600">
                  Create account
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
