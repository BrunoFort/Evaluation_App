import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Star } from "lucide-react";

export default function EvaluationDetails() {
  // MOCK evaluation data
  const evaluation = {
    id: 1,
    employeeName: "John Doe",
    evaluatorName: "Sarah Miller",
    date: "2024-11-15",
    comments:
      "John consistently delivers high-quality work and collaborates effectively with the team.",
    ratings: {
      quality_productivity: 4,
      knowledge_skills: 5,
      goal_achievement: 4,
      teamwork_collaboration: 5,
      initiative_proactivity: 4,
      self_management: 5,
      communication_interpersonal: 4,
    },
  };

  const ratingLabels = {
    quality_productivity: "Quality & Productivity",
    knowledge_skills: "Knowledge & Skills",
    goal_achievement: "Goal Achievement",
    teamwork_collaboration: "Teamwork & Collaboration",
    initiative_proactivity: "Initiative & Proactivity",
    self_management: "Self-Management",
    communication_interpersonal: "Communication",
  };

  return (
    <CompanyLayout>
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-slate-900">
            Evaluation Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700">
            <strong>Employee:</strong> {evaluation.employeeName}
          </p>
          <p className="text-slate-700">
            <strong>Evaluator:</strong> {evaluation.evaluatorName}
          </p>
          <p className="text-slate-700">
            <strong>Date:</strong> {evaluation.date}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Ratings
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6">
          {Object.entries(evaluation.ratings).map(([key, value]) => (
            <div key={key}>
              <p className="font-medium text-slate-700 mb-1">
                {ratingLabels[key]}
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={22}
                    className={
                      n <= value
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-slate-300"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            {evaluation.comments}
          </p>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
