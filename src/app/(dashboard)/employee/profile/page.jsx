import { useEffect, useState } from "react";
import { useEmployeeAuth } from "/src/features/auth/employee/hooks/useEmployeeAuth";
import { useEmployeeConsolidated } from "/src/features/evaluations/hooks/useEmployeeConsolidated.js";
import ProfilePhotoUploader from "/src/features/shared-photo/ProfilePhotoUploader";
import {
  loadPhoto,
  removePhoto,
  savePhoto,
  readFileAsDataUrl,
} from "/src/features/shared-photo/photoStorage";

export default function EmployeeProfilePage() {
  const { employee } = useEmployeeAuth();
  const employeeId = employee?.employeeId;
  const { summary, loading, error } = useEmployeeConsolidated(employeeId);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (!employeeId) return;
    setPhotoUrl(loadPhoto(`employee-photo-${employeeId}`));
  }, [employeeId]);

  async function handlePhotoUpload(file) {
    if (!employeeId) return;
    const dataUrl = await readFileAsDataUrl(file);
    setPhotoUrl(dataUrl);
    savePhoto(`employee-photo-${employeeId}`, dataUrl);
  }

  function handlePhotoDelete() {
    if (!employeeId) return;
    setPhotoUrl(null);
    removePhoto(`employee-photo-${employeeId}`);
  }

  if (!employee || employee.role !== "employee") {
    return <p className="p-6 text-neutral-600">Unauthorized.</p>;
  }

  if (loading) {
    return <p className="p-6 text-neutral-600">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Failed to load summary.</p>;
  }

  const avgScore =
    summary?.avgScore !== null && summary?.avgScore !== undefined
      ? summary.avgScore.toFixed(1)
      : "N/A";
  const avgStars =
    summary?.avgStars !== null && summary?.avgStars !== undefined
      ? summary.avgStars.toFixed(1)
      : "N/A";
  const totalReviews = summary?.totalReviews ?? 0;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            {employee.fullName || employee.email || "Employee"}
          </h1>
          <p className="text-neutral-600">{employee.email}</p>
        </div>

        <ProfilePhotoUploader
          photoUrl={photoUrl}
          onUpload={handlePhotoUpload}
          onDelete={handlePhotoDelete}
        />
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <p className="text-sm text-neutral-500">Average Score</p>
          <p className="text-xl font-semibold text-neutral-900">{avgScore}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">Average Rating</p>
          <p className="text-xl font-semibold text-neutral-900">
            {avgStars === "N/A"
              ? "N/A"
              : "★".repeat(Math.round(Number(avgStars)))}
          </p>
        </div>
        <div>
          <p className="text-sm text-neutral-500">Total Reviews</p>
          <p className="text-xl font-semibold text-neutral-900">
            {totalReviews}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600">
        This is a consolidated view of your professional evaluations. Detailed
        reports are only available to registered employers.
      </p>
    </div>
  );
}
