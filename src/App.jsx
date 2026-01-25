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

// Public Evaluation Page
import PublicEvaluation from "./Pages/PublicEvaluation/PublicEvaluation";

// Company Panel (Employer Profile)
import CompanyPanel from "./Pages/CompanyPanel";

function App() {
  return (
    <Routes>
      {/* Public route for viewing evaluations */}
      <Route path="/PublicEvaluation" element={<PublicEvaluation />} />

      {/* Login and Registration */}
      <Route path="/employer/login" element={<EmployerLoginPage />} />
      <Route path="/employer/register" element={<EmployerRegisterPage />} />

      {/* Protected: Company Panel */}
      <Route
        path="/company"
        element={
          <RequireEmployerAuth>
            <CompanyPanel />
          </RequireEmployerAuth>
        }
      />

      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <RequireEmployerAuth>
            <DashboardAnalytics />
          </RequireEmployerAuth>
        }
      />

      {/* Protected: Evaluations List */}
      <Route
        path="/evaluations"
        element={
          <RequireEmployerAuth>
            <EvaluationsList />
          </RequireEmployerAuth>
        }
      />

      {/* Protected: Create Evaluation */}
      <Route
        path="/evaluations/new"
        element={
          <RequireEmployerAuth>
            <EvaluationCreatePage />
          </RequireEmployerAuth>
        }
      />
    </Routes>
  );
}

export default App;
