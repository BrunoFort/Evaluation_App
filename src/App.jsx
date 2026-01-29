import { Routes, Route, Outlet } from "react-router-dom";

// HOME
import Home from "./Pages/Home";

// PUBLIC
import PublicEvaluation from "./Pages/PublicEvaluation/PublicEvaluation";

// EMPLOYER AUTH
import { EmployerAuthProvider } from "./features/auth/employer/EmployerAuthProvider";
import { RequireEmployerAuth } from "./features/auth/employer/RequireEmployerAuth";

// EMPLOYEE AUTH
import { EmployeeAuthProvider } from "./features/auth/employee/EmployeeAuthProvider";
import { RequireEmployeeAuth } from "./features/auth/employee/RequireEmployeeAuth";

// EMPLOYER AUTH PAGES
import EmployerLoginPage from "./features/auth/EmployerLoginPage";
import EmployerRegisterPage from "./features/auth/EmployerRegisterPage";
import EmployerForgotPasswordPage from "./features/auth/EmployerForgotPasswordPage";
import EmployerResetPasswordPage from "./features/auth/EmployerResetPasswordPage";

// EMPLOYER DASHBOARD
import EmployerDashboardPage from "./features/employer-dashboard/EmployerDashboardPage";
import EmployerAnalyticsPage from "./features/employer-dashboard/EmployerAnalyticsPage";

// EMPLOYEE AUTH PAGES
import EmployeeLoginPage from "./features/auth/EmployeeLoginPage";
import EmployeeRegisterPage from "./features/auth/EmployeeRegisterPage";
import EmployeeForgotPasswordPage from "./features/auth/EmployeeForgotPasswordPage";
import EmployeeResetPasswordPage from "./features/auth/EmployeeResetPasswordPage";
import EmployeeCompleteRegistrationPage from "./features/employee-auth/EmployeeCompleteRegistrationPage";

// EMPLOYEE DASHBOARD
import EmployeeDashboardPage from "./features/employee-dashboard/EmployeeDashboardPage";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC HOME */}
      <Route path="/" element={<Home />} />

      {/* PUBLIC EVALUATION PAGE */}
      <Route path="/reference/public" element={<PublicEvaluation />} />

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
        <Route path="/employer/signup" element={<EmployerRegisterPage />} />
        <Route path="/employer/forgot-password" element={<EmployerForgotPasswordPage />} />
        <Route path="/employer/reset-password" element={<EmployerResetPasswordPage />} />

        {/* PROTECTED */}
        <Route
          path="/employer"
          element={
            <RequireEmployerAuth>
              <EmployerDashboardPage />
            </RequireEmployerAuth>
          }
        />

        <Route
          path="/employer/analytics"
          element={
            <RequireEmployerAuth>
              <EmployerAnalyticsPage />
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
