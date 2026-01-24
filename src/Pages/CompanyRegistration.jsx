import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Loader2, CheckCircle2, AlertCircle, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PhoneInput from '@/components/ui/PhoneInput';
import NOCJobSelector from '@/components/ui/NOCJobSelector';

export default function CompanyRegistration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    full_name: '',
    employee_registration_number: '',
    business_number: '',
    company_name: '',
    job_title: '',
    job_title_custom: '',
    company_address: '',
    phone_country_code: '+1',
    phone_number: '',
    contact_email: '',
    contact_preference: 'both'
  });

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const validateBusinessNumber = (bn) => {
    return /^\d{9}$/.test(bn.replace(/\s/g, ''));
  };

  const handleBusinessNumberValidation = async () => {
    if (!validateBusinessNumber(formData.business_number)) {
      setErrors({ ...errors, business_number: 'Business number must be 9 digits' });
      return;
    }

    setIsValidating(true);
    setValidationStatus(null);
    
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Search for a Canadian business with Business Number: ${formData.business_number}. 
        This could be a federal corporation, Ontario business, or other Canadian business.
        Search using these official Canadian business registries:
        - ISED Federal Corporate Search
        - Ontario Business Registry
        - Canada Business Registries
        
        Return the company name if found, or indicate if not found.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            found: { type: "boolean" },
            company_name: { type: "string" },
            business_type: { type: "string" },
            status: { type: "string" }
          }
        }
      });

      if (result.found && result.company_name) {
        setFormData({ ...formData, company_name: result.company_name });
        setValidationStatus({ success: true, message: `Found: ${result.company_name}` });
      } else {
        setValidationStatus({ 
          success: false, 
          message: 'Business number not found in Canadian registries. You can enter the company name manually.' 
        });
      }
    } catch (error) {
      setValidationStatus({ 
        success: false, 
        message: 'Unable to validate. Please enter company name manually.' 
      });
    }
    
    setIsValidating(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.full_name) newErrors.full_name = 'Full name is required';
    if (!validateBusinessNumber(formData.business_number)) {
      newErrors.business_number = 'Valid 9-digit business number is required';
    }
    if (!formData.company_name) newErrors.company_name = 'Company name is required';
    if (!validateEmail(formData.contact_email)) {
      newErrors.contact_email = 'Valid email with @ symbol is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const company = await base44.entities.Company.create({
        ...formData,
        job_title: formData.job_title_custom || formData.job_title,
        is_verified: validationStatus?.success || false
      });
      
      navigate(createPageUrl(`CompanyDashboard?companyId=${company.id}`));
    } catch (error) {
      setErrors({ submit: 'Failed to register. Please try again.' });
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
        <Link to={createPageUrl('Home')} className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Company Registration
              </CardTitle>
              <CardDescription>
                Register your company to evaluate and manage employee references
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Person */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Contact Person Information
                  </h3>
                  
                  <div>
                    <Label className="text-slate-700 font-medium">Full Name *</Label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`mt-1 bg-white border-slate-200 ${errors.full_name ? 'border-red-400' : ''}`}
                    />
                    {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Employee Registration Number</Label>
                    <Input
                      value={formData.employee_registration_number}
                      onChange={(e) => updateField('employee_registration_number', e.target.value)}
                      placeholder="Enter your registration number"
                      className="mt-1 bg-white border-slate-200"
                    />
                  </div>

                  <NOCJobSelector
                    value={formData.job_title}
                    onChange={(val) => updateField('job_title', val)}
                    customValue={formData.job_title_custom}
                    onCustomChange={(val) => updateField('job_title_custom', val)}
                    label="Your Job Title"
                  />
                </div>

                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                    Company Information
                  </h3>

                  <div>
                    <Label className="text-slate-700 font-medium">Business Number (9 digits) *</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={formData.business_number}
                        onChange={(e) => updateField('business_number', e.target.value.replace(/\D/g, '').slice(0, 9))}
                        placeholder="123456789"
                        className={`flex-1 bg-white border-slate-200 font-mono ${errors.business_number ? 'border-red-400' : ''}`}
                        maxLength={9}
                      />
                      <Button
                        type="button"
                        onClick={handleBusinessNumberValidation}
                        disabled={isValidating || formData.business_number.length !== 9}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isValidating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {errors.business_number && <p className="text-red-500 text-sm mt-1">{errors.business_number}</p>}
                    
                    {validationStatus && (
                      <Alert className={`mt-2 ${validationStatus.success ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
                        {validationStatus.success ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        )}
                        <AlertDescription className={validationStatus.success ? 'text-green-700' : 'text-amber-700'}>
                          {validationStatus.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Company Name *</Label>
                    <Input
                      value={formData.company_name}
                      onChange={(e) => updateField('company_name', e.target.value)}
                      placeholder="Company name"
                      className={`mt-1 bg-white border-slate-200 ${errors.company_name ? 'border-red-400' : ''}`}
                    />
                    {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Company Address</Label>
                    <Textarea
                      value={formData.company_address}
                      onChange={(e) => updateField('company_address', e.target.value)}
                      placeholder="Enter company address"
                      className="mt-1 bg-white border-slate-200 min-h-[80px]"
                    />
                  </div>
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
                    <Label className="text-slate-700 font-medium">Contact Email *</Label>
                    <Input
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => updateField('contact_email', e.target.value)}
                      placeholder="email@company.com"
                      className={`mt-1 bg-white border-slate-200 ${errors.contact_email ? 'border-red-400' : ''}`}
                    />
                    {errors.contact_email && <p className="text-red-500 text-sm mt-1">{errors.contact_email}</p>}
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium mb-3 block">Preferred Contact Method</Label>
                    <RadioGroup
                      value={formData.contact_preference}
                      onValueChange={(val) => updateField('contact_preference', val)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone" className="font-normal cursor-pointer">Phone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email" className="font-normal cursor-pointer">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="font-normal cursor-pointer">Both</Label>
                      </div>
                    </RadioGroup>
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
                      Registering...
                    </>
                  ) : (
                    'Complete Registration'
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
