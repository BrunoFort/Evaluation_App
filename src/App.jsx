// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Guards
import { RequireEmployerAuth } from "./features/auth/RequireEmployerAuth";

// Páginas existentes
import DashboardAnalytics from "./Pages/DashboardAnalytics";
import CompanyReports from "./Pages/CompanyReports";
import EvaluationList from "./Pages/EvaluationList";
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

// Nova página protegida (future employer)
import ReferenceReportPage from "./features/reference/ReferenceReportPage";

export default function App() {
  return (
    <Routes>
      {/* Rota padrão → Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<DashboardAnalytics />} />
      <Route path="/reports" element={<CompanyReports />} />
      <Route path="/evaluations" element={<EvaluationList />} />
      <Route path="/evaluations/:id" element={<EvaluationDetails />} />

      <Route path="/employees/add" element={<AddEmployee />
