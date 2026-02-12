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
    const existing = loadPhoto(registerPhotoKey);
    console.log("📋 Register page mounted - existing photo:", existing ? `found (${existing.length} chars)` : "not found");
    setPhotoUrl(existing);
  }, []);

  async function handlePhotoUpload(file) {
    console.log("📸 Photo upload started - file:", file.name, "size:", file.size);
    const dataUrl = await readFileAsDataUrl(file);
    console.log("📸 Data URL created -", dataUrl.length, "chars");
    setPhotoUrl(dataUrl);
    savePhoto(registerPhotoKey, dataUrl);
    console.log("✅ Photo saved to localStorage key: " + registerPhotoKey);
  }

  function handlePhotoDelete() {
    console.log("🗑️ Photo deleted from registration form");
    setPhotoUrl(null);
    removePhoto(registerPhotoKey);
  }

  async function handleRegister(data) {
    setError("");
    setLoading(true);
    console.log("🔴🔴🔴 INICIANDO REGISTRO COM DADOS:", data);

    try {
      // 1) cria usuário de autenticação
      console.log("📝 Passo 1: Criando usuário de autenticação...");

      const { data: auth, error: authError } = await supabase.auth.signUp({
        email: data.contactEmail,
        password: data.password,
      });

      console.log("📝 Resposta do signUp:", { auth, authError });

      if (authError) {
        console.error("❌ Erro no signUp:", authError);
        throw authError;
      }
      
      if (!auth?.user) {
        throw new Error("Sessão do usuário não retornada pelo Supabase.");
      }

      console.log("✅ Usuário de autenticação criado - userId:", auth.user.id);

      const {
        password,
        confirmPassword,
        ...employerPayload
      } = data;

      employerPayload.id = auth.user.id;

      console.log("📝 Passo 2: Verificando foto pendente...");
      const storedPhoto = loadPhoto(registerPhotoKey);
      if (storedPhoto) {
        console.log("✅ Foto encontrada em localStorage -", storedPhoto.length, "caracteres");
        toast.info("A foto será enviada após você verificar e fazer login.");
      } else {
        console.log("⚠️ Nenhuma foto encontrada em localStorage");
      }

      // 2) cria employer no banco
      console.log("📝 Passo 3: Registrando empregador via RPC...");
      console.log("📝 Payload do RPC:", employerPayload);
      
      const { data: rpcData, error: registerError } = await supabase.rpc("register_employer", {
        payload: employerPayload,
      });
      
      console.log("📝 Resposta do RPC:", { rpcData, registerError });

      if (registerError) {
        console.error("❌ Erro no RPC:", registerError);
        throw registerError;
      }

      // Se RPC retornar null, tenta inserir direto na tabela (fallback)
      if (!rpcData) {
        console.log("⚠️ RPC retornou null, tentando inserir direto na tabela...");
        
        const { data: directInsert, error: directError } = await supabase
          .from("employers")
          .insert([employerPayload])
          .select();
        
        console.log("📝 Resposta do INSERT direto:", { directInsert, directError });
        
        if (directError) {
          console.error("❌ Erro no INSERT direto:", directError);
          throw directError;
        }
      }

      console.log("✅ Empregador registrado com sucesso");
      console.log("📝 Passo 4: Redirecionando para login...");

      // 3) redireciona para login
      toast.success("Registro realizado com sucesso! Faça login para continuar.");
      navigate(`/employer/login`);
      console.log("✅ Navigate foi chamado!");
    } catch (err) {
      console.error("❌❌❌ ERRO NO REGISTRO:", err);
      console.error("Nome do erro:", err?.name);
      console.error("Mensagem do erro:", err?.message);
      console.error("Detalhes do erro:", err);
      
      const message = err?.message || "Houve um erro ao criar sua conta.";
      setError(message);
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
