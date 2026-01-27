import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../../components/ui/Card.jsx";
import Input from "../../../components/ui/Input.jsx";
import Button from "../../../components/ui/Button.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";
import SectionCard from "../../../components/ui/SectionCard.jsx";

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
    return <p className="text-slate-500">Loading...</p>;
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

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionCard title="Basic Information">
            <Input
              label="Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />

            <Input
              label="Email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </SectionCard>

          <div className="flex justify-end gap-3">
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
