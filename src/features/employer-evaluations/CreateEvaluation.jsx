import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployerDashboardLayout from "@/layouts/EmployerDashboardLayout";
import Card from "@/components/ui/Card.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import Textarea from "@/components/ui/Textarea.jsx";

export default function CreateEvaluation() {
  const navigate = useNavigate();

  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [score, setScore] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK — integração real virá depois
    if (employeeName && position && score && summary) {
      navigate("/employer/evaluations");
    }
  };

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 mb-10">
          Create Evaluation
        </h1>

        <Card className="p-8 shadow-xl border border-neutral-200 bg-white rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Employee Name
              </label>
              <Input
                placeholder="Enter employee name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Position
              </label>
              <Input
                placeholder="Enter employee position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Score (0–5)
              </label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Summary
              </label>
              <Textarea
                placeholder="Write a brief evaluation summary..."
                rows={5}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                onClick={() => navigate("/employer/evaluations")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Save Evaluation
              </Button>
            </div>

          </form>
        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
