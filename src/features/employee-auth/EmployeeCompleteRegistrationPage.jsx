import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { EmployeeCompleteRegistrationForm } from "./components/EmployeeCompleteRegistrationForm";

export default function EmployeeCompleteRegistrationPage() {
  const { token } = useParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleComplete(data) {
    // Aqui você salvaria no backend
    // Por enquanto, simulamos login automático

    login({
      role: "employee",
      ...data,
    });

    navigate("/me");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Complete Your Registration</h1>
      <p className="text-gray-600 mb-6">
        Please complete your profile to activate your account.
      </p>

      <EmployeeCompleteRegistrationForm onSubmit={handleComplete} />
    </div>
  );
}
