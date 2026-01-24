import React, { useEffect, useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { api } from "../utils/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { createPageUrl } from "../utils/createPageUrl";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/employees")
      .then((data) => setEmployees(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <CompanyLayout>
        <p className="p-10 text-center text-slate-600">Carregando funcionários...</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Funcionários</h1>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Lista de Funcionários
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900">{emp.name}</p>
                <p className="text-slate-600 text-sm">Cargo: {emp.role}</p>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() =>
                  (window.location.href = createPageUrl("EditEmployee", emp.id))
                }
              >
                Editar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
