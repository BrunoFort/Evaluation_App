import { BrowserRouter, Routes, Route } from "react-router-dom";

// EMPLOYER AUTH
import { EmployerAuthProvider } from "./features/auth/employer/EmployerAuthProvider";
import { RequireEmployerAuth } from "./features/auth/employer/RequireEmployerAuth";

// EMPLOYEE AUTH
import { EmployeeAuthProvider } from "./features/auth/employee/EmployeeAuthProvider";
import { RequireEmployeeAuth } from "./features/auth/employee/RequireEmployeeAuth";

// EMPLOYER PAGES
import EmployerLoginPage from "./features/auth/EmployerLoginPage";
import EmployerRegisterPage from "./features/auth/EmployerRegisterPage";
import EmployerForgotPasswordPage from "./features/auth/EmployerForgotPasswordPage";
import EmployerResetPasswordPage from "./features/auth/EmployerResetPasswordPage";
import EmployerDashboardPage from "./features/employer-dashboard/EmployerDashboardPage"; // exemplo

// EMPLOYEE PAGES
import EmployeeLoginPage from "./features/auth/EmployeeLoginPage";
import EmployeeRegisterPage from "./features/auth/EmployeeRegisterPage";
import EmployeeForgotPasswordPage from "./features/auth/EmployeeForgotPasswordPage";
import EmployeeResetPasswordPage from "./features/auth/EmployeeResetPasswordPage";
import EmployeeCompleteRegistrationPage from "./features/employee-auth/EmployeeCompleteRegistrationPage";
import EmployeeDashboardPage from "./features/employee-dashboard/EmployeeDashboardPage"; // exemplo

export default function App() {
  return (
    <BrowserRouter>

      {/** EMPLOYER PROVIDER */}
      <EmployerAuthProvider>
        <Routes>

          {/** EMPLOYER PUBLIC ROUTES */}
          <Route path="/employer/login" element={<EmployerLoginPage />} />
          <Route path="/employer/signup" element={<EmployerRegisterPage />} />
          <Route path="/employer/forgot-password" element={<EmployerForgotPasswordPage />} />
          <Route path="/employer/reset-password" element={<EmployerResetPasswordPage />} />

          {/** EMPLOYER PROTECTED ROUTES */}
          <Route
            path="/employer"
            element={
              <RequireEmployerAuth>
                <EmployerDashboardPage />
              </RequireEmployerAuth>
            }
          />

        </Routes>
      </EmployerAuthProvider>

      {/** EMPLOYEE PROVIDER */}
      <EmployeeAuthProvider>
        <Routes>

          {/** EMPLOYEE PUBLIC ROUTES */}
          <Route path="/employee/login" element={<EmployeeLoginPage />} />
          <Route path="/employee/signup" element={<EmployeeRegisterPage />} />
          <Route path="/employee/forgot-password" element={<EmployeeForgotPasswordPage />} />
          <Route path="/employee/reset-password" element={<EmployeeResetPasswordPage />} />
          <Route path="/employee/complete-registration" element={<EmployeeCompleteRegistrationPage />} />

          {/** EMPLOYEE PROTECTED ROUTES */}
          <Route
            path="/employee"
            element={
              <RequireEmployeeAuth>
                <EmployeeDashboardPage />
              </RequireEmployeeAuth>
            }
          />

        </Routes>
      </EmployeeAuthProvider>

    </BrowserRouter>
  );
}
