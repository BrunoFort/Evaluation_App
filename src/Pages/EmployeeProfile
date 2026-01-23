import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, Loader2, AlertCircle, CheckCircle2, Copy, Send, Star, 
  Briefcase, Calendar, MapPin, Phone, Mail, FileText, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import WorkPermitInput from '@/components/ui/WorkPermitInput';
import StarRating from '@/components/ui/StarRating';

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [company, setCompany] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [interviewerEmail, setInterviewerEmail] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get('employeeId');

  const [formData, setFormData] = useState({
    work_permit: '',
    work_permit_expiry: '',
    address: ''
  });

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
          setFormData({
            work_permit: emp.work_permit || '',
            work_permit_expiry: emp.work_permit_expiry || '',
            address: emp.address || ''
          });

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

  const handleSave = async () => {
    const newErrors = {};
    
    // Validate work permit if SIN starts with 9
    if (employee?.sin?.startsWith('9') && !formData.work_permit) {
      newErrors.work_permit = 'Work permit is required for temporary workers';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      await base44.entities.Employee.update(employeeId, {
        ...formData,
        profile_completed: true
      });
      setEmployee({ ...employee, ...formData, profile_completed: true });
    } catch (error) {
      console.error('Error saving:', error);
    }
    setIsSaving(false);
  };

  const copyProfileLink = () => {
    const link = `${window.location.origin}${createPageUrl(`PublicEvaluation?token=${employee?.share_token}`)}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEvaluationLink = async () => {
    if (!interviewerEmail || !interviewerEmail.includes('@')) {
      return;
    }

    setIsSendingLink(true);
    try {
      const link = `${window.location.origin}${createPageUrl(`PublicEvaluation?token=${employee?.share_token}`)}`;
      
      await base44.integrations.Core.SendEmail({
        to: interviewerEmail,
        subject: `Professional Reference - ${employee.full_name}`,
        body: `
Dear Hiring Manager,

${employee.full_name} has shared their professional reference profile with you.

You can view their complete professional evaluations and references by clicking the link below:

${link}

This profile includes verified evaluations from their previous employers covering various professional competencies.

Best regards,
Professional Reference Platform
        `
      });

      setSendSuccess(true);
      setTimeout(() => {
        setShowSendDialog(false);
        setSendSuccess(false);
        setInterviewerEmail('');
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
    }
    setIsSendingLink(false);
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
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
            <p className="text-slate-500 mb-6">We couldn't find your profile.</p>
            <Link to={createPageUrl('EmployeeLogin')}>
              <Button>Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const needsWorkPermit = employee.sin?.startsWith('9');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to={createPageUrl('EmployeeLogin')} className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
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
                    {company && (
                      <p className="text-blue-200 text-sm mt-1">{company.company_name}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="secondary" 
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                    onClick={copyProfileLink}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Profile Link
                      </>
                    )}
                  </Button>
                  
                  <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        <Send className="w-4 h-4 mr-2" />
                        Send to Interviewer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Evaluation Link</DialogTitle>
                        <DialogDescription>
                          Enter the interviewer's email to share your professional references
                        </DialogDescription>
                      </DialogHeader>
                      
                      {sendSuccess ? (
                        <div className="py-8 text-center">
                          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <p className="text-lg font-medium text-slate-900">Link Sent Successfully!</p>
                        </div>
                      ) : (
                        <div className="space-y-4 py-4">
                          <div>
                            <Label>Interviewer's Email</Label>
                            <Input
                              type="email"
                              value={interviewerEmail}
                              onChange={(e) => setInterviewerEmail(e.target.value)}
                              placeholder="interviewer@company.com"
                              className="mt-2"
                            />
                          </div>
                          <Button 
                            onClick={sendEvaluationLink}
                            disabled={isSendingLink || !interviewerEmail}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            {isSendingLink ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Send Link
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white shadow-lg border-0 p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              My Profile
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Evaluations ({evaluations.length})
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Read-only fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Email</span>
                      </div>
                      <p className="font-medium">{employee.personal_email}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">Phone</span>
                      </div>
                      <p className="font-medium">
                        {employee.phone_country_code} {employee.phone_number || 'Not provided'}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm">Position</span>
                      </div>
                      <p className="font-medium">{employee.position_custom || employee.position || 'Not set'}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Employee ID</span>
                      </div>
                      <p className="font-medium">{employee.employee_id || 'Not provided'}</p>
                    </div>
                  </div>

                  {/* Editable fields */}
                  <div className="border-t pt-6 space-y-4">
                    <h3 className="font-semibold text-slate-900">Complete Your Profile</h3>

                    {needsWorkPermit && (
                      <>
                        <WorkPermitInput
                          value={formData.work_permit}
                          onChange={(val) => setFormData({ ...formData, work_permit: val })}
                        />
                        {errors.work_permit && (
                          <p className="text-red-500 text-sm">{errors.work_permit}</p>
                        )}

                        <div>
                          <Label className="text-slate-700 font-medium">Work Permit Expiry Date</Label>
                          <Input
                            type="date"
                            value={formData.work_permit_expiry}
                            onChange={(e) => setFormData({ ...formData, work_permit_expiry: e.target.value })}
                            className="mt-1 bg-white border-slate-200"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <Label className="text-slate-700 font-medium">Address</Label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Enter your address"
                        className="mt-1 bg-white border-slate-200"
                      />
                    </div>

                    <Button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {evaluations.length === 0 ? (
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-12 text-center">
                    <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No Evaluations Yet</h3>
                    <p className="text-slate-500">Your evaluations will appear here once your employer submits them.</p>
                  </CardContent>
                </Card>
              ) : (
                evaluations.map((evaluation, index) => (
                  <Card key={evaluation.id} className="border-0 shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-900">Evaluation #{index + 1}</p>
                          <p className="text-sm text-slate-500">
                            {evaluation.evaluator_name && `By ${evaluation.evaluator_name} • `}
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
                ))
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
