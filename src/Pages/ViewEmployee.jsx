import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Star, Mail, Phone, FileText, ArrowLeft } from "lucide-react";
import { createPageUrl } from "../utils";

export default function ViewEmployee() {
  const navigate = useNavigate();

  // MOCK employee data (substitui Base44)
  const employee = {
    id: 1,
    full_name: "John Doe",
    position: "Software Developer",
    personal_email: "john.doe@gmail.com",
    work_email: "john.doe@company.com",
    phone_country_code: "+1",
    phone_number: "613-555-1234",
    employee_id: "EMP-001",
    employee_registration_number: "REG-2024-001",
    sin: "123-456-789",
    profile_completed: true,
    company_id: 10,
  };

  // MOCK evaluations
  const evaluations = [
    {
      id: 1,
      created_date: "2024-11-15",
      evaluator_name: "Sarah Miller",
      quality_productivity: 4,
      knowledge_skills: 5,
      goal_achievement: 4,
      teamwork_collaboration: 5,
      initiative_proactivity: 4,
      self_management: 5,
      communication_interpersonal: 4,
      comments: "Excellent performance and strong collaboration skills.",
    },
  ];

  const getAverageRating = (evaluation) => {
    const ratings = [
      evaluation.quality_productivity,
      evaluation.knowledge_skills,
      evaluation.goal_achievement,
      evaluation.teamwork_collaboration,
      evaluation.initiative_proactivity,
      evaluation.self_management,
      evaluation.communication_interpersonal,
    ];

    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate(createPageUrl("CompanyDashboard"))}
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        {/* Header */}
        <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{employee.full_name}</h1>
                <p className="text-slate-600">{employee.position}</p>
                <Badge className="mt-2 bg-green-500">Profile Complete</Badge>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() =>
                  navigate(createPageUrl(`CreateEvaluation?employeeId=${employee.id}`))
                }
              >
                Create Evaluation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Employee Info */}
        <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem icon={<Mail />} label="Personal Email" value={employee.personal_email} />
            <InfoItem icon={<Mail />} label="Work Email" value={employee.work_email} />
            <InfoItem
              icon={<Phone />}
              label="Phone"
              value={`${employee.phone_country_code} ${employee.phone_number}`}
            />
            <InfoItem icon={<FileText />} label="Employee ID" value={employee.employee_id} />
            <InfoItem
              icon={<FileText />}
              label="Registration #"
              value={employee.employee_registration_number}
            />
            <InfoItem icon={<FileText />} label="SIN" value={employee.sin} />
          </CardContent>
        </Card>

        {/* Evaluations */}
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Evaluations ({evaluations.length})
        </h2>

        {evaluations.map((evaluation) => (
          <Card key={evaluation.id} className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-slate-900">{evaluation.evaluator_name}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(evaluation.created_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-lg">{getAverageRating(evaluation)}</span>
                </div>
              </div>

              {evaluation.comments && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">Comments</p>
                  <p className="text-slate-700">{evaluation.comments}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-2 text-slate-500 mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
}
