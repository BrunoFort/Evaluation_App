import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";

import { EmployerRegisterForm } from "/src/features/auth/employer/forms/EmployerRegisterForm";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployerRegisterPage() {
  const { login } = useEmployerAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(data) {
    setError("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      login({
        role: "employer",
        ...data,
      });

      navigate("/employer");
    } catch (err) {
      console.error(err);
      setError("There was an error creating your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-xl space-y-8">

        <PageHeader
          title="Employer Registration"
          subtitle="Create your company account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="space-y-6">

          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <EmployerRegisterForm
            onSubmit={handleRegister}
            loading={loading}
          />

          <div className="flex items-center justify-between text-sm text-neutral-600 pt-2">
            <Link to="/employer/login" className="hover:text-purple-600">
              Already have an account?
            </Link>

            <Link to="/employer/forgot-password" className="hover:text-purple-600">
              Forgot password?
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
