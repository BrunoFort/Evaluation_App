import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import Button from "/src/components/ui/Button.jsx";
import { Trash2, Edit3, Users } from "lucide-react";

export default function DepartmentManagement() {
  // MOCK departments
  const [departments, setDepartments] = useState([
    { id: 1, name: "Engineering", employees: 12 },
    { id: 2, name: "Human Resources", employees: 4 },
    { id: 3, name: "Finance", employees: 6 },
    { id: 4, name: "Marketing", employees: 8 },
  ]);

  const [newDepartment, setNewDepartment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const addDepartment = () => {
    if (!newDepartment.trim()) return;

    setDepartments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newDepartment,
        employees: 0,
      },
    ]);

    setNewDepartment("");
  };

  const deleteDepartment = (id) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = () => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === editingId ? { ...d, name: editingName } : d
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Department Management
      </h1>

      {/* Add new department */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Add New Department
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Department name"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            className="bg-white"
          />
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={addDepartment}
          >
            Add
          </Button>
        </CardContent>
      </Card>

      {/* Department list */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Departments
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <Users className="text-blue-600" />
                {editingId === dept.id ? (
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="bg-white"
                  />
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {dept.name}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {dept.employees} employees
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {editingId === dept.id ? (
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={saveEdit}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-100"
                    onClick={() => startEditing(dept.id, dept.name)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => deleteDepartment(dept.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
