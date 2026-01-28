import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployeeForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
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

      setSent(true);
      setLoading(false);
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md space-y-8">

        <PageHeader
          title="Reset Password"
          subtitle="Enter your email to receive a reset link"
          align="center"
        />

        <Card padding="lg" shadow="md" className="bg-white/80 backdrop-blur space-y-6">

          {sent ? (
            <div className="space-y-4 text-center">
              <p className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
                If an account exists for this email, a reset link has been sent.
              </p>

              <Link
                to="/employee/login"
                className="text-blue-600 hover:text-blue-800 text-sm"
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
                className="bg-white"
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="flex justify-between text-sm text-slate-600 pt-2">
                <Link to="/employee/login" className="hover:text-blue-600">
                  Back to login
                </Link>

                <Link to="/employee/signup" className="hover:text-blue-600">
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
