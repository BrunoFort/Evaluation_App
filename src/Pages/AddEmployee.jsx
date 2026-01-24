import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const createPageUrl = (path) => `/${path}`;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, Loader2, AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import PhoneInput from '@/components/ui/PhoneInput';
import NOCJobSelector from '@/components/ui/NOCJobSelector';
import SINInput from '@/components/ui/SINInput';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [company, setCompany] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get('companyId');

  const [formData, setFormData] = useState({
    full_name: '',
    sin: '',
    employee_registration_number: '',
    employee_id: '',
    position: '',
    position_custom: '',
    phone_country_code: '+1',
    phone_number: '',
    personal_email: '',
    work_email: '',
    company_id: companyId
  });

  useEffect(() => {
    loadCompany();
  }, [companyId]);

  const loadCompany = async () => {
    if (companyId) {
      const companies = await base44.entities.Company.filter({ id: companyId });
      if (companies.length > 0) {
        setCompany(companies[0]);
      }
    }
  };

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const validateSIN = (sin) => {
    return sin && sin.replace(/-/g, '').length === 9;
  };

  const generateShareToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.full_name) newErrors.full_name = 'Full name is required';
    if (!validateSIN(formData.sin)) newErrors.sin = 'Valid 9-digit SIN is required';
    if (!validateEmail(formData.personal_email)) {
      newErrors.personal_email = 'Valid email with @ symbol is required';
    }
    if (formData.work_email && !validateEmail(formData.work_email)) {
      newErrors.work_email = 'Valid email with @ symbol is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const shareToken = generateShareToken();
      
      const employee = await base44.entities.Employee.create({
        ...formData,
        position: formData.position_custom || formData.position,
        share_token: shareToken,
        profile_completed: false
      });

      // Send email notification to employee
      await base44.integrations.Core.SendEmail({
        to: formData.personal_email,
        subject: 'Your Professional Profile Has Been Created',
        body: `
Dear ${formData.full_name},

Your professional reference profile has been created by ${company?.company_name || 'your employer'}.

You can now complete your profile by visiting our platform. Your login will be your email address: ${formData.personal_email}

Please visit the Employee Portal to:
1. Set up your password
2. Complete your profile with Work Permit information
3. Add your address

Once your profile is complete, you'll be able to share your professional references with prospective employers.

Best regards,
Professional Reference Platform
        `
      });

      navigate(createPageUrl(`CompanyDashboard?companyId=${companyId}`));
    } catch (error) {
      setErrors({ submit: 'Failed to add employee. Please try again.' });
    }

    setIsLoading(false);
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          to={createPageUrl(`CompanyDashboard?companyId=${companyId}`)} 
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Add New Employee
              </CardTitle>
              <CardDescription>
                Register an employee to create their professional reference profile
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <Alert className="mb-6 border-blue-200 bg-blue-50">
                <Mail className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  An email will be sent to the employee with instructions to complete their profile.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Employee Information
                  </h3>

                  <div>
                    <Label className="text-slate-700 font-medium">Full Name *</Label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      placeholder="Enter employee's full name"
                      className={`mt-1 bg-white border-slate-200 ${errors.full_name ? 'border-red-400' : ''}`}
                    />
                    {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                  </div>

                  <SINInput
                    value={formData.sin}
                    onChange={(val) => updateField('sin', val)}
                  />
                  {errors.sin && <p className="text-red-500 text-sm mt-1">{errors.sin}</p>}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-700 font-medium">Employee Registration #</Label>
                      <Input
                        value={formData.employee_registration_number}
                        onChange={(e) => updateField('employee_registration_number', e.target.value)}
                        placeholder="Registration number"
                        className="mt-1 bg-white border-slate-200"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 font-medium">Employee ID</Label>
                      <Input
                        value={formData.employee_id}
                        onChange={(e) => updateField('employee_id', e.target.value)}
                        placeholder="Employee ID"
                        className="mt-1 bg-white border-slate-200"
                      />
                    </div>
                  </div>

                  <NOCJobSelector
                    value={formData.position}
                    onChange={(val) => updateField('position', val)}
                    customValue={formData.position_custom}
                    onCustomChange={(val) => updateField('position_custom', val)}
                    label="Position"
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Contact Information
                  </h3>

                  <div>
                    <Label className="text-slate-700 font-medium mb-2 block">Phone Number</Label>
                    <PhoneInput
                      value={formData.phone_number}
                      onChange={(val) => updateField('phone_number', val)}
                      countryCode={formData.phone_country_code}
                      onCountryCodeChange={(val) => updateField('phone_country_code', val)}
                    />
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Personal Email *</Label>
                    <Input
                      type="email"
                      value={formData.personal_email}
                      onChange={(e) => updateField('personal_email', e.target.value)}
                      placeholder="personal@email.com"
                      className={`mt-1 bg-white border-slate-200 ${errors.personal_email ? 'border-red-400' : ''}`}
                    />
                    {errors.personal_email && <p className="text-red-500 text-sm mt-1">{errors.personal_email}</p>}
                    <p className="text-xs text-slate-500 mt-1">This will be used as the employee's login username</p>
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Work Email</Label>
                    <Input
                      type="email"
                      value={formData.work_email}
                      onChange={(e) => updateField('work_email', e.target.value)}
                      placeholder="employee@company.com"
                      className={`mt-1 bg-white border-slate-200 ${errors.work_email ? 'border-red-400' : ''}`}
                    />
                    {errors.work_email && <p className="text-red-500 text-sm mt-1">{errors.work_email}</p>}
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
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Adding Employee...
                    </>
                  ) : (
                    'Add Employee & Send Invitation'
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
