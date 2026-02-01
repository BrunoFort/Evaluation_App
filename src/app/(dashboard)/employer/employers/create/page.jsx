// src/app/(dashboard)/employer/employers/create/page.jsx

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import { EmployerForm } from "/src/features/employers/components/EmployerForm.jsx";
import { useCreateEmployer } from "/src/features/employers/hooks/useCreateEmployer.js";

export default function EmployerCreatePage() {
  const navigate = useNavigate();
  const { create, loading } = useCreateEmployer();

  async function handleCreate(data) {
    try {
      await create(data);
      toast.success("Employer created successfully!");
      navigate("/employer/employers");
    } catch (err) {
      toast.error("Failed to create employer");
      console.error(err);
    }
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-2xl mx-auto space-y-10">

        <h1 className="text-4xl font-bold text-neutral-900">
          Create Employer
        </h1>

        <EmployerForm
          defaultValues={{
            companyName: "",
            businessNumber: "",
            evaluatorName: "",
            evaluatorPosition: "",
            email: "",
            phone: "",
          }}
          onSubmit={handleCreate}
          isSubmitting={loading}
        />

      </div>
    </EmployerDashboardLayout>
  );
}
