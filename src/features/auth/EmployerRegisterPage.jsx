import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

import { EmployerRegisterForm } from "./components/EmployerRegisterForm";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import Button from "/src/components/ui/Button.jsx";

export default function EmployerRegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(data) {
    setError("");
    setLoading(true);

    try {
      // Aqui você salvaria no backend real
      // Por enquanto, simulamos login automático
      await new Promise((resolve) => setTimeout(resolve, 600));

      login({
        role: "employer",
        ...data,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("There was an error creating your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-xl space-y-8">

        <PageHeader
          title="Employer Registration"
          subtitle="Create your company account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="bg-white/80 backdrop-blur space-y-6">

          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <EmployerRegisterForm
            onSubmit={handleRegister}
            loading={loading}
          />

          <div className="flex items-center justify-between text-sm text-slate-600 pt-2">
            <Link to="/employer/login" className="hover:text-blue-600">
              Already have an account?
            </Link>

            <Link to="/employer/forgot-password" className="hover:text-blue-600">
              Forgot password?
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
