import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

import { EmployerRegisterForm } from "./components/EmployerRegisterForm";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployerRegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleRegister(data) {
    // Aqui você salvaria no backend
    // Por enquanto, simulamos login automático
    login({
      role: "employer",
      ...data,
    });

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-xl space-y-8">

        <PageHeader
          title="Employer Registration"
          subtitle="Create your company account"
        />

        <Card className="p-8 shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
          <EmployerRegisterForm onSubmit={handleRegister} />
        </Card>

      </div>
    </div>
  );
}
