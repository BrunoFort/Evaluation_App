// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { RequireEmployerAuth } from "./features/auth/RequireEmployerAuth";

// Dashboard
import DashboardAnalytics from "./Pages/DashboardAnalytics";

// Auth pages
import EmployerLoginPage from "./features/auth/EmployerLoginPage";
import EmployerRegisterPage from "./features/auth/EmployerRegisterPage";

// Evaluations
import EvaluationsList from "./features/evaluations/pages/EvaluationsList";
import EvaluationCreatePage from "./features/evaluations/pages/EvaluationCreatePage";
import EvaluationView from "./features/evaluations/pages/EvaluationView";
import PublicEvaluationView from "./features/evaluations/pages/PublicEvaluationView";

// Legacy public evaluation page (optional)
import PublicEvaluation from "./Pages/PublicEvaluation/PublicEvaluation";

// Company Panel
import CompanyPanel from "./Pages/CompanyPanel";

// Employees
import EmployeesList from "./features/employees/pages/EmployeesList";
import AddEmployee from "./features/employees/pages/AddEmployee";
import EmployeeProfile from "./features/employees/pages/EmployeeProfile";
import EditEmployee from "./features/employees/pages/EditEmployee";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/PublicEvaluation" element={<PublicEvaluation />} />
      <Route path="/evaluation/:token" element={<PublicEvaluationView />} />

      {/* Auth */}
      <Route path="/employer/login" element={<EmployerLoginPage />} />
      <Route path="/employer/register" element={<EmployerRegisterPage />} />

      {/* Company Panel */}
      <Route
        path="/company"
        element={
          <RequireEmployerAuth>
            <CompanyPanel />
          </RequireEmployerAuth>
        }
      />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <RequireEmployerAuth>
            <DashboardAnalytics />
          </RequireEmployerAuth>
        }
      />

      {/* Employees */}
      <Route
        path="/employees"
        element={
          <RequireEmployerAuth>
            <EmployeesList />
          </RequireEmployerAuth>
        }
      />

      <Route
        path="/employees/new"
        element={
          <RequireEmployerAuth>
            <AddEmployee />
          </RequireEmployerAuth>
        }
      />

      <Route
        path="/employees/:id"
        element={
          <RequireEmployerAuth>
            <EmployeeProfile />
          </RequireEmployerAuth>
        }
      />

      <Route
        path="/employees/:id/edit"
        element={
          <RequireEmployerAuth>
            <EditEmployee />
          </RequireEmployerAuth>
        }
      />

      {/* Evaluations */}
      <Route
        path="/evaluations"
        element={
          <RequireEmployerAuth>
            <EvaluationsList />
          </RequireEmployerAuth>
        }
      />

      <Route
        path="/evaluations/new"
        element={
          <RequireEmployerAuth>
            <EvaluationCreatePage />
          </RequireEmployerAuth>
        }
      />

      <Route
        path="/evaluations/:id"
        element={
          <RequireEmployerAuth>
            <EvaluationView />
          </RequireEmployerAuth>
        }
      />
    </Routes>
  );
}

export default App;
