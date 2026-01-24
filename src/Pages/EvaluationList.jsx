import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star } from "lucide-react";
import { createPageUrl } from "../utils";

export default function EvaluationList() {
  // MOCK evaluations (substituir quando conectar backend)
  const evaluations = [
    {
      id: 1,
      employeeName: "John Doe",
      evaluatorName: "Sarah Miller",
      date: "2024-11-15",
      average: 4.5,
    },
    {
      id: 2,
      employeeName: "Carlos Silva",
      evaluatorName: "Maria Santos",
      date: "2024-10-02",
      average: 3.8,
    },
    {
      id: 3,
      employeeName: "Sarah Miller",
      evaluatorName: "John Doe",
      date: "2024-09-20",
      average: 4.9,
    },
  ];

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        All Evaluations
      </h1>

      <div className="space-y-6">
        {evaluations.map((evaluation) => (
          <Card
            key={evaluation.id}
            className="shadow-lg border-2 border-blue-100 bg-white/80 backdrop-blur hover:shadow-xl transition-all"
          >
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {evaluation.employeeName}
                </h2>
                <p className="text-slate-600">
                  Evaluated by: {evaluation.evaluatorName}
                </p>
                <p className="text-slate-500 text-sm">{evaluation.date}</p>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-lg">{evaluation.average}</span>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() =>
                  (window.location.href = createPageUrl(
                    `EvaluationDetails?id=${evaluation.id}`
                  ))
                }
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </CompanyLayout>
  );
}
