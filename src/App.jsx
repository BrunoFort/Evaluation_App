import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { supabase } from "/src/lib/supabaseClient";

// HOME
import HomePage from "@/app/(public)/home/page.jsx";

// PUBLIC EVALUATION PAGE
import PublicEvaluationPage from "@/app/public/evaluation/[token]/page.jsx";

// EMPLOYER AUTH
import { EmployerAuthProvider } from "@/features/auth/employer/providers/EmployerAuthProvider";
import { RequireEmployerAuth } from "@/features/auth/employer/guards/RequireEmployerAuth";

// EMPLOYEE AUTH
import { EmployeeAuthProvider } from "@/features/auth/employee/providers/EmployeeAuthProvider";
import { RequireEmployeeAuth } from "@/features/auth/employee/guards/RequireEmployeeAuth";

// EMPLOYER AUTH PAGES
import EmployerLoginPage from "@/app/(public)/employer/login/page.jsx";
import EmployerRegisterPage from "@/app/(public)/employer/register/page.jsx";
import EmployerForgotPasswordPage from "@/app/(public)/employer/forgot-password/page.jsx";
import EmployerResetPasswordPage from "@/app/(public)/employer/reset-password/page.jsx";

// EMPLOYER DASHBOARD
import EmployerDashboardPage from "@/app/(dashboard)/employer/page.jsx";

// EMPLOYER EMPLOYEES
import EmployerEmployeesPage from "@/app/(dashboard)/employer/employees/page.jsx";
import EmployerEmployeeAddPage from "@/app/(dashboard)/employer/employees/add/page.jsx";
import EmployerEmployeeEditPage from "@/app/(dashboard)/employer/employees/[id]/edit/page.jsx";

// EMPLOYER EVALUATIONS
import EmployerEvaluationCreatePage from "@/app/(dashboard)/employer/evaluations/create/page.jsx";

// EMPLOYER SETTINGS
import EmployerSettingsPage from "@/app/(dashboard)/employer/settings/page.jsx";

// EMPLOYEE AUTH PAGES
import EmployeeLoginPage from "@/app/(public)/employee/login/page.jsx";
import EmployeeCompleteRegistrationPage from "@/app/(public)/employee/complete-registration/page.jsx";
import EmployeeForgotPasswordPage from "@/app/(public)/employee/forgot-password/page.jsx";
import EmployeeResetPasswordPage from "@/app/(public)/employee/reset-password/page.jsx";

// EMPLOYEE DASHBOARD
import EmployeeDashboardPage from "@/app/(dashboard)/employee/page.jsx";

export default function App() {
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      console.log("Auth event:", event);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <Routes>

      {/* PUBLIC HOME */}
      <Route path="/" element={<HomePage />} />

      {/* PUBLIC EVALUATION PAGE */}
      <Route path="/reference/:token" element={<PublicEvaluationPage />} />

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
        <Route path="/employer/register" element={<EmployerRegisterPage />} />
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

        {/* EMPLOYER EMPLOYEES */}
        <Route
          path="/employer/employees"
          element={
            <RequireEmployerAuth>
              <EmployerEmployeesPage />
            </RequireEmployerAuth>
          }
        />

        <Route
          path="/employer/employees/add"
          element={
            <RequireEmployerAuth>
              <EmployerEmployeeAddPage />
            </RequireEmployerAuth>
          }
        />

        <Route
          path="/employer/employees/:id/edit"
          element={
            <RequireEmployerAuth>
              <EmployerEmployeeEditPage />
            </RequireEmployerAuth>
          }
        />

        {/* EMPLOYER EVALUATIONS */}
        <Route
          path="/employer/evaluations/create"
          element={
            <RequireEmployerAuth>
              <EmployerEvaluationCreatePage />
            </RequireEmployerAuth>
          }
        />

        {/* EMPLOYER SETTINGS */}
        <Route
          path="/employer/settings"
          element={
            <RequireEmployerAuth>
              <EmployerSettingsPage />
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
        <Route path="/employee/forgot-password" element={<EmployeeForgotPasswordPage />} />
        <Route path="/employee/reset-password" element={<EmployeeResetPasswordPage />} />

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
