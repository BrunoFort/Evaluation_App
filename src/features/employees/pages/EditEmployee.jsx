import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:4000/employees/${id}`);
      const data = await res.json();
      setEmployee(data);
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    await fetch(`http://localhost:4000/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });

    navigate(`/employees/${id}`);
  }

  if (!employee) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <p className="text-slate-500">Loading employee...</p>
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
          >
            Cancel
          </Button>
        }
      />

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          <SectionCard title="Basic Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
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
                <label className="block text-sm font-medium text-slate-700 mb-1">
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
            >
              Cancel
            </Button>

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
