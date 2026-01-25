// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Guards
import { RequireEmployerAuth } from "./features/auth/RequireEmployerAuth";

// Páginas existentes
import DashboardAnalytics from "./Pages/DashboardAnalytics";
import CompanyReports from "./Pages/CompanyReports";
import EvaluationsList from "./features/evaluations/pages/EvaluationsList";
import EvaluationDetails from "./Pages/EvaluationDetails";
import AddEmployee from "./Pages/AddEmployee";
import EmployeeEdit from "./Pages/EmployeeEdit";
import CompanySettings from "./Pages/CompanySettings";
import RoleManagement from "./Pages/RoleManagement";
import NotificationsCenter from "./Pages/NotificationsCenter";
import DepartmentManagement from "./Pages/DepartmentManagement";
import AuditLogs from "./Pages/AuditLogs";
import EmployeeSelfService from "./Pages/EmployeeSelfService";
import DocumentCenter from "./Pages/DocumentCenter";
import ThemeCustomizer from "./Pages/ThemeCustomizer";
import AdminPanel from "./Pages/AdminPanel";

// Auth pages
import EmployerLoginPage from "./features/auth/EmployerLoginPage";
import EmployerRegisterPage from "./features/auth/EmployerRegisterPage";

// Employee auth
import EmployeeCompleteRegistrationPage from "./features/employee-auth/EmployeeCompleteRegistrationPage";

// Reference
import ReferenceReportPage from "./features/reference/ReferenceReportPage";

// Evaluation create page
import EvaluationCreatePage from "./features/evaluations/pages/EvaluationCreatePage";

export default function App() {
  return (
    <Routes>
      {/* Rota padrão → Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rotas existentes */}
      <Route path="/dashboard" element={<DashboardAnalytics />} />
      <Route path="/reports" element={<CompanyReports />} />
      <Route path="/evaluations" element={<EvaluationsList />} />
      <Route path="/evaluations/:id" element={<EvaluationDetails />} />

      {/* 🆕 Criar avaliação */}
      <Route
        path="/evaluations/new"
        element={
          <RequireEmployerAuth>
            <EvaluationCreatePage />
          </RequireEmployerAuth>
        }
      />

      <Route path="/employees/add" element={<AddEmployee />} />
      <Route path="/employees/edit/:id" element={<EmployeeEdit />} />

      <Route path="/settings/company" element={<CompanySettings />} />
      <Route path="/settings/theme" element={<ThemeCustomizer />} />

      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/roles" element={<RoleManagement />} />
      <Route path="/admin/departments" element={<DepartmentManagement />} />
      <Route path="/admin/audit-logs" element={<AuditLogs />} />

      <Route path="/notifications" element={<NotificationsCenter />} />
      <Route path="/documents" element={<DocumentCenter />} />
      <Route path="/me" element={<EmployeeSelfService />} />

      {/* 🔐 Login do Employer */}
      <Route path="/employer/login" element={<EmployerLoginPage />} />

      {/* 🆕 Registro do Employer */}
      <Route path="/employer/register" element={<EmployerRegisterPage />} />

      {/* 🆕 Employee complete registration via token */}
      <Route
        path="/employee/complete-registration/:token"
        element={<EmployeeCompleteRegistrationPage />}
      />

      {/* 🔒 Rota protegida para o link de referência */}
      <Route
        path="/reference/:employeeId/:token"
        element={
          <RequireEmployerAuth>
            <ReferenceReportPage />
          </RequireEmployerAuth>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<div className="p-10 text-center">Page not found</div>}
      />
    </Routes>
  );
}
