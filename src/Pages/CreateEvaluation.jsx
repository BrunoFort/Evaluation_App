import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const createPageUrl = (path) => `/${path}`;
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardCheck, Loader2, AlertCircle, ArrowLeft, User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from '@/components/ui/StarRating';

export default function CreateEvaluation() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get('employeeId');
  const companyId = urlParams.get('companyId');

  const [formData, setFormData] = useState({
    quality_productivity: 0,
    knowledge_skills: 0,
    goal_achievement: 0,
    teamwork_collaboration: 0,
    initiative_proactivity: 0,
    self_management: 0,
    communication_interpersonal: 0,
    comments: '',
    evaluator_name: '',
    employment_start_date: '',
    employment_end_date: ''
  });

  useEffect(() => {
    loadData();
  }, [employeeId, companyId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (employeeId) {
        const employees = await base44.entities.Employee.filter({ id: employeeId });
        if (employees.length > 0) {
          setEmployee(employees[0]);
        }
      }
      if (companyId) {
        const companies = await base44.entities.Company.filter({ id: companyId });
        if (companies.length > 0) {
          setCompany(companies[0]);
          setFormData(prev => ({ ...prev, evaluator_name: companies[0].full_name }));
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const ratingCriteria = [
    {
      key: 'quality_productivity',
      label: 'Quality and Productivity',
      tooltip: 'Efficiency, accuracy, and volume of deliverables'
    },
    {
      key: 'knowledge_skills',
      label: 'Knowledge and Skills',
      tooltip: 'Mastery of the technical (hard skills) and behavioral (soft skills) required for the role'
    },
    {
      key: 'goal_achievement',
      label: 'Goal Achievement',
      tooltip: 'Achieving or exceeding established objectives'
    },
    {
      key: 'teamwork_collaboration',
      label: 'Teamwork and Collaboration',
      tooltip: 'Ability to interact and cooperate with colleagues and leaders'
    },
    {
      key: 'initiative_proactivity',
      label: 'Initiative and Proactivity',
      tooltip: 'Presenting ideas, solving problems, and seeking improvements'
    },
    {
      key: 'self_management',
      label: 'Self-Management',
      tooltip: 'Ability to self-manage with little or no supervision'
    },
    {
      key: 'communication_interpersonal',
      label: 'Communication and Interpersonal Relationships',
      tooltip: 'Clarity in communication and good relationships with the team'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Check all ratings are provided
    ratingCriteria.forEach(criterion => {
      if (!formData[criterion.key] || formData[criterion.key] === 0) {
        newErrors[criterion.key] = 'Please provide a rating';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      await base44.entities.Evaluation.create({
        ...formData,
        employee_id: employeeId,
        evaluator_company_id: companyId,
        evaluation_date: new Date().toISOString().split('T')[0]
      });

      navigate(createPageUrl(`CompanyDashboard?companyId=${companyId}`));
    } catch (error) {
      setErrors({ submit: 'Failed to save evaluation. Please try again.' });
    }
    setIsSaving(false);
  };

  const updateRating = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          to={createPageUrl(`CompanyDashboard?companyId=${companyId}`)} 
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Create Evaluation</h1>
                  <p className="text-green-100">Professional performance assessment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Employee Info */}
        {employee && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Evaluating Employee</p>
                    <p className="text-lg font-semibold text-slate-900">{employee.full_name}</p>
                    <p className="text-sm text-slate-600">{employee.position_custom || employee.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Evaluation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Performance Ratings</CardTitle>
              <CardDescription>
                Hover over each criterion to see the description. Rate each area on a 1-5 scale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Rating Criteria */}
                <div className="grid gap-6">
                  {ratingCriteria.map((criterion) => (
                    <div 
                      key={criterion.key}
                      className={`p-4 rounded-xl transition-all ${
                        errors[criterion.key] 
                          ? 'bg-red-50 border border-red-200' 
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <StarRating
                        value={formData[criterion.key]}
                        onChange={(val) => updateRating(criterion.key, val)}
                        label={criterion.label}
                        tooltip={criterion.tooltip}
                        size="lg"
                      />
                      {errors[criterion.key] && (
                        <p className="text-red-500 text-sm mt-2">{errors[criterion.key]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold text-slate-900">Additional Information</h3>
                  
                  <div>
                    <Label className="text-slate-700 font-medium">Evaluator Name</Label>
                    <Input
                      value={formData.evaluator_name}
                      onChange={(e) => setFormData({ ...formData, evaluator_name: e.target.value })}
                      placeholder="Your name"
                      className="mt-1 bg-white border-slate-200"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-700 font-medium">Employment Start Date</Label>
                      <Input
                        type="date"
                        value={formData.employment_start_date}
                        onChange={(e) => setFormData({ ...formData, employment_start_date: e.target.value })}
                        className="mt-1 bg-white border-slate-200"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 font-medium">Employment End Date</Label>
                      <Input
                        type="date"
                        value={formData.employment_end_date}
                        onChange={(e) => setFormData({ ...formData, employment_end_date: e.target.value })}
                        className="mt-1 bg-white border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Comments</Label>
                    <Textarea
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      placeholder="Additional comments about the employee's performance..."
                      className="mt-1 bg-white border-slate-200 min-h-[120px]"
                    />
                  </div>
                </div>

                {errors.submit && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-red-700">{errors.submit}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving Evaluation...
                    </>
                  ) : (
                    'Submit Evaluation'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
