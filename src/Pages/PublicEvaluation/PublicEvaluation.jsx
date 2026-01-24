import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star } from "lucide-react";
import { createPageUrl } from "../utils";

export default function PublicEvaluation() {
  const navigate = useNavigate();

  // MOCK evaluation data
  const evaluation = {
    employeeName: "John Doe",
    position: "Software Developer",
    date: "2024-11-15",
    rating: 4,
    comments:
      "John consistently delivers high-quality work and collaborates effectively with the team. He demonstrates strong problem-solving skills and takes initiative in complex tasks.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <Card className="w-full max-w-2xl shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
            Employee Evaluation
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Employee</span>
              <span className="text-slate-900">{evaluation.employeeName}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Position</span>
              <span className="text-slate-900">{evaluation.position}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Evaluation Date</span>
              <span className="text-slate-900">{evaluation.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Rating</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={22}
                    className={
                      n <= evaluation.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-slate-300"
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="font-medium text-slate-700 block mb-1">
                Comments
              </span>
              <p className="text-slate-900 leading-relaxed bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                {evaluation.comments}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate(createPageUrl("EmployeeProfile"))}
            >
              Back to Profile
            </Button>

            <Button
              variant="outline"
              className="w-full py-6 text-lg rounded-xl border-slate-300 hover:bg-slate-100 transition-all"
              onClick={() => navigate(createPageUrl("EmployeeLogin"))}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
