// src/features/evaluations/components/EvaluationForm.jsx
import React from "react";
import { useForm } from "react-hook-form";

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
      className="space-y-4 max-w-xl bg-white p-4 rounded shadow"
    >
      {/* Employee */}
      <div>
        <label className="block text-sm mb-1">Employee</label>
        <select
          className="border p-2 w-full"
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
          <p className="text-red-500 text-xs mt-1">
            Please select an employee.
          </p>
        )}
      </div>

      {/* Score */}
      <div>
        <label className="block text-sm mb-1">
          Overall Score (0–100) — current: {score}
        </label>
        <input
          type="number"
          className="border p-2 w-full"
          {...register("score", {
            required: true,
            min: 0,
            max: 100,
            valueAsNumber: true,
          })}
        />
        {errors.score && (
          <p className="text-red-500 text-xs mt-1">
            Score must be between 0 and 100.
          </p>
        )}
      </div>

      {/* Star rating */}
      <div>
        <label className="block text-sm mb-1">Overall Rating (1–5 stars)</label>
        <select
          className="border p-2 w-full"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">
            Quality and Productivity (1–5)
          </label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("qualityProductivity", {
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Knowledge and Skills (1–5)
          </label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("knowledgeSkills", {
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Goal Achievement (1–5)
          </label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("goalAchievement", {
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Teamwork and Collaboration (1–5)
          </label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("teamworkCollaboration", {
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Initiative and Proactivity (1–5)
          </label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("initiativeProactivity", {
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Self-Management (1–5)</label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("selfManagement", {
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Communication and Relationships (1–5)
          </label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("communicationRelationships", {
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {/* Comments */}
      <div>
        <label className="block text-sm mb-1">General comments</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          {...register("comments")}
        />
      </div>

      {/* Reference contact */}
      <div>
        <label className="block text-sm mb-1">
          Reference contact (name and position)
        </label>
        <input
          className="border p-2 w-full"
          {...register("referenceContact")}
          placeholder="e.g. John Smith, HR Manager"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save evaluation"}
      </button>
    </form>
  );
}
