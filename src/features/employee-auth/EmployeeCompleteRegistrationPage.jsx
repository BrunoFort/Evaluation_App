import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeAuth } from "../auth/employee/useEmployeeAuth";
import { EmployeeCompleteRegistrationForm } from "./components/EmployeeCompleteRegistrationForm";

export default function EmployeeCompleteRegistrationPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useEmployeeAuth();

  function handleComplete(data) {
    // Aqui você faria a validação do token e salvaria no backend
    // Por enquanto, simulamos login automático

    login({
      id: data.id,
      name: data.name,
      email: data.email,
      role: "employee",
    });

    navigate("/employee");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-lg space-y-8">
        <h1 className="text-3xl font-bold text-center text-slate-900">
          Complete Your Registration
        </h1>

        <p className="text-center text-slate-600">
          Set your password and finish creating your employee account.
        </p>

        <EmployeeCompleteRegistrationForm onSubmit={handleComplete} />
      </div>
    </div>
  );
}
