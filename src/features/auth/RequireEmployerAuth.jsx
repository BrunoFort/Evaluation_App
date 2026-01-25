// src/features/auth/RequireEmployerAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireEmployerAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // Se não estiver logado, redireciona para login
  if (!user) {
    return <Navigate to="/employer/login" state={{ from: location }} replace />;
  }

  // Se estiver logado, libera o acesso
  return children;
}
