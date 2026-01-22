import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, Star, Briefcase, Phone, Mail, ArrowLeft, 
  ClipboardCheck, Calendar, Building2, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from '@/components/ui/StarRating';

export default function ViewEmployee() {
  const [employee, setEmployee] = useState(null);
  const [company, setCompany] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get('employeeId');

  useEffect(() => {
    loadData();
  }, [employeeId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (employeeId) {
        const employees = await base44.entities.Employee.filter({ id: employeeId });
        if (employees.length > 0) {
          const emp = employees[0];
          setEmployee(emp);

          if (emp.company_id) {
            const companies = await base44.entities.Company.filter({ id: emp.company_id });
            if (companies.length > 0) {
              setCompany(companies[0]);
            }
          }
        }

        const evals = await base44.entities.Evaluation.filter({ employee_id: employeeId });
        setEvaluations(evals);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const getAverageRating = (evaluation) => {
    const ratings = [
      evaluation.quality_productivity,
      evaluation.knowledge_skills,
      evaluation.goal_achievement,
      evaluation.teamwork_collaboration,
      evaluation.initiative_proactivity,
      evaluation.self_management,
      evaluation.communication_interpersonal
    ].filter(r => r);
    
    if (ratings.length === 0) return 0;
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Employee Not Found</h2>
            <Link to={createPageUrl('Home')}>
              <Button>Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to={createPageUrl(`CompanyDashboard?companyId=${employee.company_id}`)} 
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-8 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold">
                    {employee.full_name?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{employee.full_name}</h1>
                    <p className="text-blue-100">{employee.position_custom || employee.position || 'Position not set'}</p>
                    <Badge className={`mt-2 ${employee.profile_completed ? 'bg-green-500' : 'bg-amber-500'}`}>
                      {employee.profile_completed ? 'Profile Complete' : 'Profile Pending'}
                    </Badge>
                  </div>
                </div>
                
                <Link to={createPageUrl(`CreateEvaluation?employeeId=${employee.id}&companyId=${employee.company_id}`)}>
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Create Evaluation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Employee Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Personal Email</span>
                  </div>
                  <p className="font-medium">{employee.personal_email}</p>
                </div>
                {employee.work_email && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Work Email</span>
                    </div>
                    <p className="font-medium">{employee.work_email}</p>
                  </div>
                )}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <p className="font-medium">
                    {employee.phone_number ? `${employee.phone_country_code} ${employee.phone_number}` : 'Not provided'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Employee ID</span>
                  </div>
                  <p className="font-medium">{employee.employee_id || '-'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Registration #</span>
                  </div>
                  <p className="font-medium">{employee.employee_registration_number || '-'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">SIN</span>
                  </div>
                  <p className="font-medium font-mono">{employee.sin}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Evaluations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Evaluations ({evaluations.length})
          </h2>

          {evaluations.length === 0 ? (
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No Evaluations Yet</h3>
                <p className="text-slate-500 mb-6">Create the first evaluation for this employee</p>
                <Link to={createPageUrl(`CreateEvaluation?employeeId=${employee.id}&companyId=${employee.company_id}`)}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Create Evaluation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {evaluations.map((evaluation) => (
                <Card key={evaluation.id} className="border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-900">{evaluation.evaluator_name || 'Evaluation'}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(evaluation.created_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-lg">{getAverageRating(evaluation)}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <StarRating 
                        value={evaluation.quality_productivity} 
                        label="Quality and Productivity"
                        readonly
                        size="sm"
                      />
                      <StarRating 
                        value={evaluation.knowledge_skills} 
                        label="Knowledge and Skills"
                        readonly
                        size="sm"
                      />
                      <StarRating 
                        value={evaluation.goal_achievement} 
                        label="Goal Achievement"
                        readonly
                        size="sm"
                      />
                      <StarRating 
                        value={evaluation.teamwork_collaboration} 
                        label="Teamwork and Collaboration"
                        readonly
                        size="sm"
                      />
                      <StarRating 
                        value={evaluation.initiative_proactivity} 
                        label="Initiative and Proactivity"
                        readonly
                        size="sm"
                      />
                      <StarRating 
                        value={evaluation.self_management} 
                        label="Self-Management"
                        readonly
                        size="sm"
                      />
                      <StarRating 
                        value={evaluation.communication_interpersonal} 
                        label="Communication"
                        readonly
                        size="sm"
                      />
                    </div>
                    {evaluation.comments && (
                      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-500 mb-1">Comments</p>
                        <p className="text-slate-700">{evaluation.comments}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
