import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "/src/components/ui/Card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";

import {
  getEmployeeById,
  updateEmployee,
} from "/src/features/employees/api/employeesApi";

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        console.error("Failed to load employee:", err);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateEmployee(id, employee);
      navigate(`/employees/${id}`);
    } catch (err) {
      console.error("Failed to update employee:", err);
    } finally {
      setSaving(false);
    }
  }

  if (!employee) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <p className="text-neutral-500">Loading employee...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">

      <PageHeader
        title="Edit Employee"
        subtitle="Update employee information"
        right={
          <Button
            variant="outline"
            onClick={() => navigate(`/employees/${id}`)}
            className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
          >
            Cancel
          </Button>
        }
      />

      <Card className="p-8 border border-neutral-200 shadow-sm bg-white rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">

          <SectionCard title="Basic Information">
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Name
                </label>
                <Input
                  value={employee.name}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                  placeholder="Employee full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                  placeholder="email@example.com"
                />
              </div>

            </div>
          </SectionCard>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(`/employees/${id}`)}
              className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}

