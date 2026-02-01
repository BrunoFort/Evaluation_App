import { Navigate, useLocation } from "react-router-dom";
import { useEmployerAuth } from "../hooks/useEmployerAuth";

export function RequireEmployerAuth({ children }) {
  const { employer, loading } = useEmployerAuth();
  const location = useLocation();

  if (loading) {
    return null; // Pode trocar por um spinner Shine depois
  }

  if (!employer) {
    return (
      <Navigate
        to="/employer/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
