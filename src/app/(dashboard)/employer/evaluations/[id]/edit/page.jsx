// src/app/(dashboard)/employer/evaluations/[id]/edit/page.jsx

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import Button from "/src/components/ui/Button.jsx";
import Input from "/src/components/ui/Input.jsx";
import Textarea from "/src/components/ui/Textarea.jsx";

import { useEvaluation } from "/src/features/evaluations/hooks/useEvaluation.js";
import { useUpdateEvaluation } from "/src/features/evaluations/hooks/useUpdateEvaluation.js";

export default function EmployerEditEvaluationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { evaluation, loading, error } = useEvaluation(id);
  const { update, updating } = useUpdateEvaluation();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updated = {
      employeeId: Number(formData.get("employeeId")),
      employerId: evaluation.employerId,
      score: Number(formData.get("score")),
      starRating: Number(formData.get("starRating")),
      referenceContact: formData.get("referenceContact"),
      comments: formData.get("comments"),
      date: formData.get("date"),
    };

    try {
      await update(id, updated);
      toast.success("Evaluation updated successfully!");
      navigate("/employer/evaluations");
    } catch (err) {
      toast.error("Failed to update evaluation");
      console.error(err);
    }
  }

  if (loading) {
    return (
      <EmployerDashboardLayout>
        <p className="text-neutral-500">Loading evaluation...</p>
      </EmployerDashboardLayout>
    );
  }

  if (error || !evaluation) {
    return (
      <EmployerDashboardLayout>
        <p className="text-red-600">Evaluation not found.</p>
      </EmployerDashboardLayout>
    );
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-neutral-900">
            Edit Evaluation
          </h1>

          <Button
            variant="outline"
            onClick={() => navigate("/employer/evaluations")}
          >
            Back
          </Button>
        </div>

        {/* Form */}
        <Card className="p-8 space-y-8 border border-neutral-200 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Employee ID
              </label>
              <Input
                type="number"
                name="employeeId"
                defaultValue={evaluation.employeeId}
                required
              />
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Score (0–100)
              </label>
              <Input
                type="number"
                name="score"
                min="0"
                max="100"
                defaultValue={evaluation.score}
                required
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Star Rating (1–5)
              </label>
              <Input
                type="number"
                name="starRating"
                min="1"
                max="5"
                defaultValue={evaluation.starRating}
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Date
              </label>
              <Input
                type="date"
                name="date"
                defaultValue={evaluation.date}
              />
            </div>

            {/* Reference Contact */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Reference Contact
              </label>
              <Input
                name="referenceContact"
                defaultValue={evaluation.referenceContact}
                placeholder="e.g. John Smith, HR Manager"
              />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Comments
              </label>
              <Textarea
                name="comments"
                rows={4}
                defaultValue={evaluation.comments}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
