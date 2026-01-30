// ---------------------------------------------------------
// App.jsx — com teste Tailwind (bg-red-500)
// ---------------------------------------------------------

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx"; // sua Home C-Plus
// importe outras páginas se existirem
// import EmployerLogin from "./...";
// import EmployeeLogin from "./...";

export default function App() {
  return (
    <Router>
      {/* TESTE TAILWIND — deve aparecer com fundo vermelho e texto branco */}
      <div className="bg-red-500 text-white p-6 text-center font-bold">
        SE VOCÊ ESTÁ VENDO ESTE BLOCO VERMELHO, O TAILWIND ESTÁ FUNCIONANDO
      </div>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Exemplo de outras rotas */}
        {/* <Route path="/employer/login" element={<EmployerLogin />} /> */}
        {/* <Route path="/employee/login" element={<EmployeeLogin />} /> */}
      </Routes>
    </Router>
  );
}
