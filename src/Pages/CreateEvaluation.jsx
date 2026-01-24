import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Star } from "lucide-react";

export default function CreateEvaluation() {
  const [comments, setComments] = useState("");

  return (
    <CompanyLayout>
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Create Evaluation
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-8">
          <Textarea
            placeholder="Write your comments here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="bg-white"
          />

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl mt-6">
            Submit Evaluation
          </Button>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
