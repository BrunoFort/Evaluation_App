import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function EmployeeProfile() {
  return (
    <CompanyLayout>
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Employee Profile
          </h1>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View Evaluation
          </Button>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
