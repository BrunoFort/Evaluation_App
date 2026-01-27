import { Navigate } from "react-router-dom";

export function RequireEmployeeAuth({ children }) {
  const employee = localStorage.getItem("employee");

  if (!employee) {
    return <Navigate to="/employee/login" replace />;
  }

  return children;
}
