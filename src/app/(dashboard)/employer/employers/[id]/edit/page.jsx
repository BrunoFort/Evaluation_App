// src/app/(dashboard)/employer/employers/[id]/edit/page.jsx

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import { EmployerForm } from "/src/features/employers/components/EmployerForm.jsx";
import { useEmployer } from "/src/features/employers/hooks/useEmployer.js";
import { useUpdateEmployer } from "/src/features/employers/hooks/useUpdateEmployer.js";

export default function EmployerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { employer, loading, error } = useEmployer(id);
  const { update, loading: updating } = useUpdateEmployer();

  async function handleUpdate(data) {
    try {
      await update(id, data);
      toast.success("Employer updated successfully!");
      navigate("/employer/employers");
    } catch (err) {
      toast.error("Failed to update employer");
      console.error(err);
    }
  }

  if (loading) {
    return (
      <EmployerDashboardLayout>
        <p className="text-neutral-600 text-center py-10">Loading...</p>
      </EmployerDashboardLayout>
    );
  }

  if (error || !employer) {
    return (
      <EmployerDashboardLayout>
        <p className="text-neutral-600 text-center py-10">Employer not found.</p>
      </EmployerDashboardLayout>
    );
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-2xl mx-auto space-y-10">

        <h1 className="text-4xl font-bold text-neutral-900">
          Edit Employer
        </h1>

        <EmployerForm
          defaultValues={{
            companyName: employer.companyName,
            businessNumber: employer.businessNumber,
            evaluatorName: employer.evaluatorName,
            evaluatorPosition: employer.evaluatorPosition,
            email: employer.email,
            phone: employer.phone,
          }}
          onSubmit={handleUpdate}
          isSubmitting={updating}
        />

      </div>
    </EmployerDashboardLayout>
  );
}
