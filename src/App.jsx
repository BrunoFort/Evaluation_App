import React from "react";
import { Routes, Route } from "react-router-dom";

// Páginas
import Home from "./Pages/Home.jsx";
import CompanyLogin from "./Pages/CompanyLogin.jsx";
import CompanyRegistration from "./Pages/CompanyRegistration.jsx";
import EmployeeLogin from "./Pages/EmployeeLogin.jsx";
import PublicEvaluation from "./Pages/PublicEvaluation/PublicEvaluation.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CompanyLogin" element={<CompanyLogin />} />
      <Route path="/CompanyRegistration" element={<CompanyRegistration />} />
      <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
      <Route path="/PublicEvaluation" element={<PublicEvaluation />} />
    </Routes>
  );
}
