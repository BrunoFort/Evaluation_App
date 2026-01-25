import { EmployerRegisterForm } from "./components/EmployerRegisterForm";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

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

    navigate("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employer Registration</h1>
      <EmployerRegisterForm onSubmit={handleRegister} />
    </div>
  );
}
