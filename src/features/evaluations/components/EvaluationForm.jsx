// src/features/evaluations/components/EvaluationForm.jsx

import { useForm } from "react-hook-form";
import Input from "/src/components/ui/Input.jsx";
import { Textarea } from "/src/components/ui/textarea.jsx";
import Button from "/src/components/ui/Button.jsx";

export function EvaluationForm({ employees, onSubmit, loading, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: defaultValues || {
      score: 80,
      starRating: 4,
    },
  });

  const score = watch("score");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-2xl bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm"
    >
      {/* Employee */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700">
          Employee
        </label>

        <select
          className="border border-neutral-300 rounded-lg p-2 w-full"
          {...register("employeeId", { required: true })}
        >
          <option value="">Select an employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.fullName} — {emp.position}
            </option>
          ))}
        </select>

        {errors.employeeId && (
          <p className="text-red-600 text-xs">Please select an employee.</p>
        )}
      </div>

      {/* Score */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700">
          Overall Score (0–100) — current: {score}
        </label>

        <Input
          type="number"
          {...register("score", {
            required: true,
            min: 0,
            max: 100,
            valueAsNumber: true,
          })}
        />

        {errors.score && (
          <p className="text-red-600 text-xs">
            Score must be between 0 and 100.
          </p>
        )}
      </div>

      {/* Star rating */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700">
          Overall Rating (1–5 stars)
        </label>

        <select
          className="border border-neutral-300 rounded-lg p-2 w-full"
          {...register("starRating", {
            required: true,
            valueAsNumber: true,
          })}
        >
          <option value={1}>★☆☆☆☆ (1)</option>
          <option value={2}>★★☆☆☆ (2)</option>
          <option value={3}>★★★☆☆ (3)</option>
          <option value={4}>★★★★☆ (4)</option>
          <option value={5}>★★★★★ (5)</option>
        </select>
      </div>

      {/* Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["qualityProductivity", "Quality and Productivity"],
          ["knowledgeSkills", "Knowledge and Skills"],
          ["goalAchievement", "Goal Achievement"],
          ["teamworkCollaboration", "Teamwork and Collaboration"],
          ["initiativeProactivity", "Initiative and Proactivity"],
          ["selfManagement", "Self-Management"],
          ["communicationRelationships", "Communication and Relationships"],
        ].map(([field, label]) => (
          <div key={field} className="space-y-1">
            <label className="block text-sm font-medium text-neutral-700">
              {label} (1–5)
            </label>

            <Input
              type="number"
              {...register(field, {
                min: 1,
                max: 5,
                valueAsNumber: true,
              })}
            />
          </div>
        ))}
      </div>

      {/* Comments */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700">
          General comments
        </label>

        <Textarea rows={4} {...register("comments")} />
      </div>

      {/* Reference contact */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700">
          Reference contact (name and position)
        </label>

        <Input
          placeholder="e.g. John Smith, HR Manager"
          {...register("referenceContact")}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white w-full"
      >
        {loading ? "Saving..." : "Save evaluation"}
      </Button>
    </form>
  );
}
