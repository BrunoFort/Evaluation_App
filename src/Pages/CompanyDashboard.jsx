import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Users, ClipboardCheck, Plus, Star, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanyDashboard() {
  const [company, setCompany] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get('companyId');

  useEffect(() => {
    loadData();
  }, [companyId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (companyId) {
        const companyData = await base44.entities.Company.filter({ id: companyId });
        if (companyData.length > 0) {
          setCompany(companyData[0]);
        }

        const employeeData = await base44.entities.Employee.filter({ company_id: companyId });
        setEmployees(employeeData);

        const employeeIds = employeeData.map(e => e.id);
        if (employeeIds.length > 0) {
          const allEvaluations = await base44.entities.Evaluation.list();
          const companyEvaluations = allEvaluations.filter(e => employeeIds.includes(e.employee_id));
          setEvaluations(companyEvaluations);
        }
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

  const getEmployeeEvaluations = (employeeId) => {
    return evaluations.filter(e => e.employee_id === employeeId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{company?.company_name || 'Company Dashboard'}</h1>
                    <p className="text-blue-100">Business Number: {company?.business_number}</p>
                  </div>
                </div>
                <Link to={createPageUrl(`AddEmployee?companyId=${companyId}`)}>
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Employee
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Employees</p>
                    <p className="text-3xl font-bold text-slate-900">{employees.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Evaluations</p>
                    <p className="text-3xl font-bold text-slate-900">{evaluations.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Profile Completed</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {employees.filter(e => e.profile_completed).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Employees Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Registered Employees</CardTitle>
              <CardDescription>Manage your employees and their evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              {employees.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No Employees Yet</h3>
                  <p className="text-slate-500 mb-6">Start by adding your first employee</p>
                  <Link to={createPageUrl(`AddEmployee?companyId=${companyId}`)}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Profile Status</TableHead>
                        <TableHead>Evaluations</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => {
                        const empEvals = getEmployeeEvaluations(employee.id);
                        const avgRating = empEvals.length > 0 
                          ? (empEvals.map(e => parseFloat(getAverageRating(e))).reduce((a, b) => a + b, 0) / empEvals.length).toFixed(1)
                          : null;

                        return (
                          <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.full_name}</TableCell>
                            <TableCell>{employee.position_custom || employee.position || '-'}</TableCell>
                            <TableCell>{employee.personal_email}</TableCell>
                            <TableCell>
                              <Badge className={employee.profile_completed 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-amber-100 text-amber-700'
                              }>
                                {employee.profile_completed ? 'Complete' : 'Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{empEvals.length}</span>
                                {avgRating && (
                                  <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="w-4 h-4 fill-amber-400" />
                                    <span className="text-sm">{avgRating}</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Link to={createPageUrl(`CreateEvaluation?employeeId=${employee.id}&companyId=${companyId}`)}>
                                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                    <ClipboardCheck className="w-4 h-4 mr-1" />
                                    Evaluate
                                  </Button>
                                </Link>
                                <Link to={createPageUrl(`ViewEmployee?employeeId=${employee.id}`)}>
                                  <Button size="sm" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
