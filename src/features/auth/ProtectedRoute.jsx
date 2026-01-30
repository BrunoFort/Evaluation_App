import { Navigate } from "react-router-dom";
import { useEmployerAuth } from "./employer/useEmployerAuth";

export default function ProtectedRoute({ children }) {
  const { employer } = useEmployerAuth();

  // Se não estiver logado, redireciona para login
  if (!employer) {
    return <Navigate to="/employer/login" replace />;
  }

  return children;
}
