import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import { EmployerRegisterForm } from "/src/features/auth/employer/forms/EmployerRegisterForm";

import { createEmployer } from "/src/features/employers/api/employersApi";
import { supabase } from "/src/lib/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployerRegisterPage() {
  const navigate = useNavigate();
  const { login } = useEmployerAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(data) {
    setError("");
    setLoading(true);

    try {
      // 1) cria usuário de autenticação
      const { data: auth, error: authError } = await supabase.auth.signUp({
        email: data.contactEmail,
        password: data.password,
      });

      if (authError) throw authError;

      const employerPayload = {
        ...data,
        id: auth.user.id,
      };

      // 2) cria employer no banco
      const employer = await createEmployer(employerPayload);

      // 3) login real
      login({
        role: "employer",
        email: auth.user.email,
        employerId: auth.user.id,
        ...employer,
      });

      // 4) redireciona
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
          subtitle="Create your employer account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="space-y-6">
          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <EmployerRegisterForm onSubmit={handleRegister} loading={loading} />

          <div className="flex items-center justify-between text-sm text-neutral-600 pt-2">
            <Link to="/employer/login" className="hover:text-purple-600">
              Already have an account?
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
