import React from "react";
import { Routes, Route } from "react-router-dom";

// Páginas
import Home from "./Pages/Home.jsx";
import CompanyLogin from "./Pages/CompanyLogin/CompanyLogin.jsx";
import CompanyRegistration from "./Pages/CompanyRegistration/CompanyRegistration.jsx";
import EmployeeLogin from "./Pages/EmployeeLogin/EmployeeLogin.jsx";
import PublicEvaluation from "./Pages/PublicEvaluation/PublicEvaluation.jsx";

export default function App() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Home />} />

      {/* Rotas da empresa */}
      <Route path="/CompanyLogin" element={<CompanyLogin />} />
      <Route path="/CompanyRegistration" element={<CompanyRegistration />} />

      {/* Rotas do funcionário */}
      <Route path="/EmployeeLogin" element={<EmployeeLogin />} />

      {/* Página pública de avaliação */}
      <Route path="/PublicEvaluation" element={<PublicEvaluation />} />
    </Routes>
  );
}
