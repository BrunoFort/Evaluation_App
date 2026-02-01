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

// EMPLOYER AUTH PAGES (confirmado)
import EmployerLoginPage from "@/app/(public)/employer/login/page.jsx";

// EMPLOYER DASHBOARD (confirmado)
import EmployerDashboardPage from "@/app/(dashboard)/employer/page.jsx";

// EMPLOYEE AUTH PAGES (confirmado)
import EmployeeLoginPage from "@/app/(public)/employee/login/page.jsx";

// EMPLOYEE COMPLETE REGISTRATION (confirmado)
import EmployeeCompleteRegistrationPage from "@/app/(public)/employee/complete-registration/page.jsx";

// EMPLOYEE DASHBOARD (AINDA NÃO CONFIRMADO — mantendo como estava)
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

        {/* COMPLETE REGISTRATION */}
        <Route
          path="/employee/complete-registration"
          element={<EmployeeCompleteRegistrationPage />}
        />

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
