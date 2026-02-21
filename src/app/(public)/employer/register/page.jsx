import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import { EmployerRegisterForm } from "/src/features/auth/employer/forms/EmployerRegisterForm";

import { supabase } from "/src/lib/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployerRegisterPage() {
  const navigate = useNavigate();
  const { login } = useEmployerAuth();

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
      let createdUserId = null;
      const normalizedEmail = (data.contactEmail || "").toLowerCase();

      const { data: availability, error: availabilityError } = await supabase.functions.invoke(
        "check-email-availability",
        { body: { email: normalizedEmail, role: "employer" } }
      );

      if (availabilityError) {
        console.warn("Employer availability check failed:", availabilityError);
        setError("We could not verify this email. Please try again.");
        toast.error("We could not verify this email. Please try again.");
        return;
      }

      if (availability?.exists) {
        const message = "An employer with this email already exists. Try a different email address or login.";
        setFieldErrors({ contactEmail: message });
        toast.error(message);
        return;
      }

      // 1) cria usuário de autenticação
      console.log("📝 Passo 1: Criando usuário de autenticação...");

      const redirectTo = `${window.location.origin}/employer/login`;

      const { data: auth, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail || data.contactEmail,
        password: data.password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            first_name: data.firstName,
          },
        },
      });

      console.log("📝 Resposta do signUp:", { auth, authError });

      if (authError) {
        console.error("❌ Erro no signUp:", authError);
        throw authError;
      }
      
      if (!auth?.user) {
        throw new Error("Sessão do usuário não retornada pelo Supabase.");
      }

      createdUserId = auth.user.id;

      const confirmationSentAt = auth.user.confirmation_sent_at;
      const isEmailConfirmed = Boolean(auth.user.email_confirmed_at || auth.user.confirmed_at);

      if (!confirmationSentAt && !isEmailConfirmed) {
        const resendEmail = normalizedEmail || data.contactEmail;
        const { error: resendError } = await supabase.auth.resend({
          type: "signup",
          email: resendEmail,
          options: { emailRedirectTo: redirectTo },
        });

        if (resendError) {
          console.warn("⚠️ Failed to resend confirmation email:", resendError);
          toast.warning("We could not send the confirmation email automatically. Please use the login page to resend.");
        }
      }

      console.log("✅ Usuário de autenticação criado - userId:", auth.user.id);

      const {
        password,
        confirmPassword,
        ...employerPayload
      } = data;

      employerPayload.id = auth.user.id;

      // 2) cria employer no banco
      console.log("📝 Passo 2: Registrando empregador via RPC...");
      console.log("📝 Payload do RPC:", employerPayload);
      
      const { data: rpcData, error: registerError } = await supabase.rpc("register_employer", {
        payload: employerPayload,
      });
      
      console.log("📝 Resposta do RPC:", { rpcData, registerError });

      if (registerError) {
        console.error("❌ Erro no RPC:", registerError);
        if (createdUserId) {
          await supabase.functions.invoke("delete-auth-user", {
            body: { userId: createdUserId },
          });
        }
        throw registerError;
      }

      // RPC retorna null, mas isso é normal se está criando o registro
      if (!rpcData) {
        console.log("⚠️ RPC retornou null, mas pode ter criado o register normalmente");
      }

      console.log("✅ Empregador registrado com sucesso");

      console.log("📝 Passo 3: Registro concluido - exibindo mensagem...");

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
