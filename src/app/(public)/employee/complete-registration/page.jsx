import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeAuth } from "/src/features/auth/employee/hooks/useEmployeeAuth";
import { EmployeeCompleteRegistrationForm } from "/src/features/employee-auth/components/EmployeeCompleteRegistrationForm";

export default function EmployeeCompleteRegistrationPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useEmployeeAuth();

  function handleComplete(data) {
    // Validação real do token aconteceria aqui
    login({
      id: data.id,
      name: data.name,
      email: data.email,
      role: "employee",
    });

    navigate("/employee");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-lg space-y-8">
        <h1 className="text-3xl font-bold text-center text-neutral-900">
          Complete Your Registration
        </h1>

        <p className="text-center text-neutral-600">
          Set your password and finish creating your employee account.
        </p>

        <EmployeeCompleteRegistrationForm onSubmit={handleComplete} />
      </div>
    </div>
  );
}

