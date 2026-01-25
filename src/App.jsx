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

function App() {
  return (
    <Routes>
      {/* Login e Registro */}
      <Route path="/employer/login" element={<EmployerLoginPage />} />
      <Route path="/employer/register" element={<EmployerRegisterPage />} />

      {/* Dashboard protegido */}
      <Route
        path="/"
        element={
          <RequireEmployerAuth>
            <DashboardAnalytics />
          </RequireEmployerAuth>
        }
      />

      {/* Listagem de avaliações */}
      <Route
        path="/evaluations"
        element={
          <RequireEmployerAuth>
            <EvaluationsList />
          </RequireEmployerAuth>
        }
      />

      {/* Criar nova avaliação */}
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
