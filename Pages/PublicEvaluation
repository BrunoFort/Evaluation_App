import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, Star, Briefcase, Calendar, MapPin, Phone, Mail, 
  Building2, FileText, ShieldCheck, AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from '@/components/ui/StarRating';

export default function PublicEvaluation() {
  const [employee, setEmployee] = useState(null);
  const [company, setCompany] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  useEffect(() => {
    loadData();
  }, [token]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (token) {
        const employees = await base44.entities.Employee.filter({ share_token: token });
        
        if (employees.length > 0) {
          const emp = employees[0];
          setEmployee(emp);

          if (emp.company_id) {
            const companies = await base44.entities.Company.filter({ id: emp.company_id });
            if (companies.length > 0) {
              setCompany(companies[0]);
            }
          }

          const evals = await base44.entities.Evaluation.filter({ employee_id: emp.id });
          setEvaluations(evals);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setNotFound(true);
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

  const getOverallAverage = () => {
    if (evaluations.length === 0) return 0;
    const sum = evaluations.reduce((acc, e) => acc + parseFloat(getAverageRating(e)), 0);
    return (sum / evaluations.length).toFixed(1);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
            <p className="text-slate-500">
              This evaluation link is invalid or has expired. Please request a new link from the candidate.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Verification Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Verified Professional Reference
          </Badge>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-8 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-bold">
                  {employee.full_name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{employee.full_name}</h1>
                  <p className="text-blue-100 text-lg mb-4">
                    {employee.position_custom || employee.position || 'Professional'}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                    {company && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {company.company_name}
                      </div>
                    )}
                    {employee.personal_email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {employee.personal_email}
                      </div>
                    )}
                    {employee.phone_number && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {employee.phone_country_code} {employee.phone_number}
                      </div>
                    )}
                  </div>
                </div>
                
                {evaluations.length > 0 && (
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
                      <span className="text-4xl font-bold">{getOverallAverage()}</span>
                    </div>
                    <p className="text-blue-100 text-sm">Overall Rating</p>
                    <p className="text-blue-200 text-xs mt-1">
                      {evaluations.length} evaluation{evaluations.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">Position</span>
                  </div>
                  <p className="font-medium">{employee.position_custom || employee.position || '-'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Employee ID</span>
                  </div>
                  <p className="font-medium">{employee.employee_id || '-'}</p>
                </div>
                {employee.address && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Location</span>
                    </div>
                    <p className="font-medium">{employee.address}</p>
                  </div>
                )}
                {employee.work_permit && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-sm">Work Permit</span>
                    </div>
                    <p className="font-medium font-mono">{employee.work_permit}</p>
                    {employee.work_permit_expiry && (
                      <p className="text-sm text-slate-500 mt-1">
                        Expires: {new Date(employee.work_permit_expiry).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500" />
            Professional Evaluations
          </h2>

          {evaluations.length === 0 ? (
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Evaluations Available</h3>
                <p className="text-slate-500">This candidate doesn't have any evaluations yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {evaluations.map((evaluation, index) => (
                <motion.div
                  key={evaluation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="border-0 shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          <p className="font-semibold text-slate-900">
                            {evaluation.evaluator_name || 'Employer Evaluation'}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          {evaluation.evaluation_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(evaluation.evaluation_date).toLocaleDateString()}
                            </span>
                          )}
                          {evaluation.employment_start_date && evaluation.employment_end_date && (
                            <span>
                              {new Date(evaluation.employment_start_date).toLocaleDateString()} - {' '}
                              {new Date(evaluation.employment_end_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-lg">{getAverageRating(evaluation)}</span>
                        <span className="text-slate-400 text-sm">/5</span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        {ratingCriteria.map((criterion) => (
                          <div key={criterion.key} className="bg-slate-50 rounded-lg p-4">
                            <StarRating
                              value={evaluation[criterion.key]}
                              label={criterion.label}
                              tooltip={criterion.tooltip}
                              readonly
                              size="md"
                            />
                          </div>
                        ))}
                      </div>
                      
                      {evaluation.comments && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-sm font-medium text-blue-800 mb-2">Evaluator Comments</p>
                          <p className="text-slate-700">{evaluation.comments}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>This reference has been verified through the Professional Reference Platform</p>
          <p className="mt-1">© {new Date().getFullYear()} ProRef - Built for Canadian Businesses</p>
        </div>
      </div>
    </div>
  );
}
