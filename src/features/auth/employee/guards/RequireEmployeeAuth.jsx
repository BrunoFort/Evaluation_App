import { Navigate, useLocation } from "react-router-dom";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";

export function RequireEmployeeAuth({ children }) {
  const { employee, loading } = useEmployeeAuth();
  const location = useLocation();

  if (loading) {
    return null; // Pode trocar por um spinner Shine futuramente
  }

  if (!employee) {
    return (
      <Navigate
        to="/employee/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
