import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Loader2, AlertCircle, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const employees = await base44.entities.Employee.filter({ personal_email: email });
      
      if (employees.length > 0) {
        const employee = employees[0];
        navigate(createPageUrl(`EmployeeProfile?employeeId=${employee.id}`));
      } else {
        setError('No employee profile found with this email. Please contact your employer.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
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
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Employee Portal
              </CardTitle>
              <CardDescription>
                Access your professional reference profile
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <Label className="text-slate-700 font-medium">Your Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your registered email"
                    className="mt-2 bg-white border-slate-200"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Use the email your employer registered you with
                  </p>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
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
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Access My Profile
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-500 mb-4">
                  Are you an employer?
                </p>
                <Link to={createPageUrl('CompanyRegistration')}>
                  <Button variant="outline" className="w-full">
                    Register Your Company
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
