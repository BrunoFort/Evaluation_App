import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { EmployerRegisterForm } from "/src/features/auth/employer/forms/EmployerRegisterForm";

import { supabase } from "/src/lib/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployerRegisterPage() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleRegister(data) {
    setError("");
    setSuccessMessage("");
    setFieldErrors({});
    setLoading(true);
    console.log("🔴🔴🔴 INICIANDO REGISTRO COM DADOS:", data);

    try {
      const normalizedEmail = (data.contactEmail || "").toLowerCase();
      const redirectTo = `${window.location.origin}/employer/login`;
      const { data: registerData, error: registerError } = await supabase.functions.invoke(
        "register-employer",
        {
          body: {
            ...data,
            contactEmail: normalizedEmail,
            redirectTo,
          },
        }
      );

      if (registerError || registerData?.error) {
        const isDuplicate = registerData?.code === "duplicate" || registerError?.message?.includes("duplicate");
        const message = isDuplicate
          ? "An employer with this email already exists. Try a different email address or login."
          : registerData?.error || registerError?.message || "Failed to create account.";
        if (isDuplicate) {
          setFieldErrors({ contactEmail: message });
        } else {
          setError(message);
        }
        toast.error(message);
        return;
      }

      toast.success("Registration completed. Check your email to confirm your account.");
      setSuccessMessage(
        "Registration completed. We sent a confirmation email. Please confirm to finish your account."
      );
    } catch (err) {
      console.error("❌❌❌ ERRO NO REGISTRO:", err);
      console.error("Nome do erro:", err?.name);
      console.error("Mensagem do erro:", err?.message);
      console.error("Detalhes do erro:", err);
      
      const rawMessage = err?.message || "Houve um erro ao criar sua conta.";
      const isDuplicate = rawMessage.includes("employers_email_key") || rawMessage.includes("duplicate key");
      const message = isDuplicate
        ? "An employer with this email already exists. Try a different email address or login."
        : rawMessage;
      if (isDuplicate) {
        setFieldErrors({ contactEmail: message });
      } else {
        setError(message);
      }
      toast.error(message);
    } finally {
      setLoading(false);
      console.log("✅ handleRegister finalizado");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-xl space-y-8">
        <PageHeader
          title="Employer Registration"
          subtitle="Create your account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="space-y-6">
          {successMessage && (
            <div className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!successMessage && (
            <EmployerRegisterForm
              onSubmit={handleRegister}
              loading={loading}
              serverErrors={fieldErrors}
              onClearServerError={(field) => {
                if (!field) {
                  setFieldErrors({});
                  return;
                }
                setFieldErrors((prev) => ({ ...prev, [field]: "" }));
              }}
            />
          )}

          {successMessage && (
            <Link
              to="/employer/login"
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
            >
              Return to Login
            </Link>
          )}

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
