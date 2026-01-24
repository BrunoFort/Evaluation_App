import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent } from "../components/ui/card";
import { Star } from "lucide-react";

export default function PublicEvaluation() {
  return (
    <CompanyLayout>
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Employee Evaluation
          </h1>

          <div className="flex items-center gap-2">
            <Star className="text-yellow-500 fill-yellow-500" />
            <span className="text-xl font-bold">4.5</span>
          </div>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
