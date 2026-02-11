import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import { EmployerRegisterForm } from "/src/features/auth/employer/forms/EmployerRegisterForm";

import { supabase } from "/src/lib/supabaseClient";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import ProfilePhotoUploader from "/src/features/shared-photo/ProfilePhotoUploader";
import {
  loadPhoto,
  removePhoto,
  savePhoto,
  readFileAsDataUrl,
} from "/src/features/shared-photo/photoStorage";
import {
  dataUrlToBlob,
  uploadProfilePhoto,
  updateAuthAvatar,
} from "/src/features/shared-photo/supabasePhotoStorage";

export default function EmployerRegisterPage() {
  const navigate = useNavigate();
  const { login } = useEmployerAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const registerPhotoKey = "employer-register-photo";

  useEffect(() => {
    setPhotoUrl(loadPhoto(registerPhotoKey));
  }, []);

  async function handlePhotoUpload(file) {
    const dataUrl = await readFileAsDataUrl(file);
    setPhotoUrl(dataUrl);
    savePhoto(registerPhotoKey, dataUrl);
  }

  function handlePhotoDelete() {
    setPhotoUrl(null);
    removePhoto(registerPhotoKey);
  }

  async function handleRegister(data) {
    setError("");
    setLoading(true);

    try {
      // 1) cria usuário de autenticação
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/employer/login`
          : undefined;

      const { data: auth, error: authError } = await supabase.auth.signUp({
        email: data.contactEmail,
        password: data.password,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (authError) throw authError;
      if (!auth?.user) {
        throw new Error("User session not returned by Supabase.");
      }

      const {
        password,
        confirmPassword,
        ...employerPayload
      } = data;

      employerPayload.id = auth.user.id;

      const storedPhoto = loadPhoto(registerPhotoKey);
      if (storedPhoto) {
        toast.info("Photo will be uploaded after you verify and sign in.");
      }

      // 2) cria employer no banco
      const { error: registerError } = await supabase.rpc("register_employer", {
        payload: employerPayload,
      });
      if (registerError) {
        throw registerError;
      }

      // 3) redireciona para login com aviso de validacao
      navigate(
        `/employer/login?verify=1&email=${encodeURIComponent(auth.user.email)}`
      );
    } catch (err) {
      console.error(err);
      const message = err?.message || "There was an error creating your account.";
      setError(message);
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
          <div className="flex justify-end">
            <ProfilePhotoUploader
              photoUrl={photoUrl}
              onUpload={handlePhotoUpload}
              onDelete={handlePhotoDelete}
            />
          </div>

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
