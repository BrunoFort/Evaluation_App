import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import { api } from "../utils/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    departmentId: ""
  });

  const [loading, setLoading] = useState(true);

  // Buscar funcionário pelo ID
  useEffect(() => {
    api.get(`/employees/${id}`)
      .then((data) => setEmployee(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    await api.put(`/employees/${id}`, employee);
    navigate("/employees"); // ajuste se sua rota for diferente
  };

  if (loading) {
    return (
      <CompanyLayout>
        <p className="p-10 text-center text-slate-600">Carregando funcionário...</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Editar Funcionário
      </h1>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Informações do Funcionário
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nome
            </label>
            <Input
              name="name"
              value={employee.name}
              onChange={handleChange}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Cargo
            </label>
            <Input
              name="role"
              value={employee.role}
              onChange={handleChange}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Departamento (ID)
            </label>
            <Input
              name="departmentId"
              value={employee.departmentId}
              onChange={handleChange}
              className="bg-white"
            />
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
