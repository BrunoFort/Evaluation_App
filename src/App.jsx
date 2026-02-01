import { Routes, Route, Outlet } from "react-router-dom";

// HOME
import Home from "@/Pages/Home";

// PUBLIC
import PublicEvaluation from "@/Pages/PublicEvaluation/PublicEvaluation";

// EMPLOYER AUTH
import { EmployerAuthProvider } from "@/features/auth/employer/providers/EmployerAuthProvider";
import { RequireEmployerAuth } from "@/features/auth/employer/guards/RequireEmployerAuth";

// EMPLOYEE AUTH
import { EmployeeAuthProvider } from "@/features/auth/employee/providers/EmployeeAuthProvider";
import { RequireEmployeeAuth } from "@/features/auth/employee/guards/RequireEmployeeAuth";

// EMPLOYER AUTH PAGES (apenas o que você confirmou)
import EmployerLoginPage from "@/app/(public)/employer/login/page.jsx";

// EMPLOYER DASHBOARD (caminho que você confirmou)
import EmployerDashboardPage from "@/app/(dashboard)/employer/page.jsx";

// EMPLOYER ANALYTICS — AQUI NÃO VOU INVENTAR
// (só vou importar quando você disser onde está)

// EMPLOYEE AUTH PAGES — NÃO VOU MEXER NEM INVENTAR CAMINHO
// mantendo como estavam até você dizer onde realmente estão
import EmployeeLoginPage from "@/features/auth/EmployeeLoginPage";
import EmployeeRegisterPage from "@/features/auth/EmployeeRegisterPage";
import EmployeeForgotPasswordPage from "@/features/auth/EmployeeForgotPasswordPage";
import EmployeeResetPasswordPage from "@/features/auth/EmployeeResetPasswordPage";
import EmployeeCompleteRegistrationPage from "@/features/employee-auth/EmployeeCompleteRegistrationPage";

// EMPLOYEE DASHBOARD — idem, só ajusto quando você disser o caminho real
import EmployeeDashboardPage from "@/features/employee-dashboard/EmployeeDashboardPage";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC HOME */}
      <Route path="/" element={<Home />} />

      {/* PUBLIC EVALUATION PAGE */}
      <Route path="/reference/:token" element={<PublicEvaluation />} />

      {/* EMPLOYER ROUTES */}
      <Route
        element={
          <EmployerAuthProvider>
            <Outlet />
          </EmployerAuthProvider>
        }
      >
        {/* PUBLIC */}
        <Route path="/employer/login" element={<EmployerLoginPage />} />
        {/* signup / forgot / reset só voltam quando existirem de fato */}

        {/* PROTECTED */}
        <Route
          path="/employer"
          element={
            <RequireEmployerAuth>
              <EmployerDashboardPage />
            </RequireEmployerAuth>
          }
        />
      </Route>

      {/* EMPLOYEE ROUTES */}
      <Route
        element={
          <EmployeeAuthProvider>
            <Outlet />
          </EmployeeAuthProvider>
        }
      >
        {/* PUBLIC */}
        <Route path="/employee/login" element={<EmployeeLoginPage />} />
        <Route path="/employee/signup" element={<EmployeeRegisterPage />} />
        <Route path="/employee/forgot-password" element={<EmployeeForgotPasswordPage />} />
        <Route path="/employee/reset-password" element={<EmployeeResetPasswordPage />} />
        <Route path="/employee/complete-registration" element={<EmployeeCompleteRegistrationPage />} />

        {/* PROTECTED */}
        <Route
          path="/employee"
          element={
            <RequireEmployeeAuth>
              <EmployeeDashboardPage />
            </RequireEmployeeAuth>
          }
        />
      </Route>

    </Routes>
  );
}
