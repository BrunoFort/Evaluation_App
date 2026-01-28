import { Navigate, useLocation } from "react-router-dom";
import { useEmployeeAuth } from "./useEmployeeAuth";

export function RequireEmployeeAuth({ children }) {
  const { employee, loading } = useEmployeeAuth();
  const location = useLocation();

  if (loading) return null;

  if (!employee) {
    return <Navigate to="/employee/login" state={{ from: location }} replace />;
  }

  return children;
}
