import { Navigate } from "react-router-dom";
import { useEmployerAuth } from "../hooks/useEmployerAuth";

export default function ProtectedRoute({ children }) {
  const { employer } = useEmployerAuth();

  if (!employer) {
    return <Navigate to="/employer/login" replace />;
  }

  return children;
}
