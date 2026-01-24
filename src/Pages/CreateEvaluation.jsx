import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { createPageUrl } from "../utils";
import { Star } from "lucide-react";

export default function CreateEvaluation() {
  const navigate = useNavigate();

  // MOCK employee (substitui Base44)
  const employee = {
    id: 1,
    full_name: "John Doe",
    position: "Software Developer",
  };

  // Evaluation state
  const [ratings, setRatings] = useState({
    quality_productivity: 0,
    knowledge_skills: 0,
    goal_achievement: 0,
    teamwork_collaboration: 0,
    initiative_proactivity: 0,
    self_management: 0,
    communication_interpersonal: 0,
  });

  const [comments, setComments] = useState("");

  const handleRating = (field, value) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK submit
    console.log("Evaluation submitted:", { ratings, comments });

    navigate(createPageUrl("ViewEmployee"));
  };

  const ratingFields = [
    { key: "quality_productivity", label: "Quality & Productivity" },
    { key: "knowledge_skills", label: "Knowledge & Skills" },
    { key: "goal_achievement", label: "Goal Achievement" },
    { key: "teamwork_collaboration", label: "Teamwork & Collaboration" },
    { key: "initiative_proactivity", label: "Initiative & Proactivity" },
    { key: "self_management", label: "Self-Management" },
    { key: "communication_interpersonal", label: "Communication" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Create Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">
              Evaluating: <span className="font-semibold">{employee.full_name}</span>  
              <span className="text-slate-500"> ({employee.position})</span>
            </p>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Rating fields */}
              <div className="space-y-6">
                {ratingFields.map((field) => (
                  <div key={field.key}>
                    <p className="font-medium text-slate-700 mb-2">{field.label}</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={28}
                          className={`cursor-pointer transition ${
                            n <= ratings[field.key]
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-slate-300"
                          }`}
                          onClick={() => handleRating(field.key, n)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comments */}
              <div>
                <p className="font-medium text-slate-700 mb-2">Comments</p>
                <Textarea
                  placeholder="Write your comments here..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="bg-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Submit Evaluation
                </Button>

                <Button
                  variant="outline"
                  className="w-full py-6 text-lg rounded-xl border-slate-300 hover:bg-slate-100 transition-all"
                  onClick={() => navigate(createPageUrl("ViewEmployee"))}
                >
                  Cancel
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

