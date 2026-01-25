import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export function RequireEmployerAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== "employer") {
    return (
      <Navigate
        to="/employer/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
}
