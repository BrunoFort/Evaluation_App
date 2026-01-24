import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const createPageUrl = (path) => `/${path}`;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Loader2, AlertCircle, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanyLogin() {
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
      const companies = await base44.entities.Company.filter({ contact_email: email });
      
      if (companies.length > 0) {
        const company = companies[0];
        navigate(createPageUrl(`CompanyDashboard?companyId=${company.id}`));
      } else {
        setError('No company found with this email. Please check your email or register your company.');
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
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Company Sign-In
              </CardTitle>
              <CardDescription>
                Access your company dashboard and manage evaluations
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <Label className="text-slate-700 font-medium">Company Contact Email</Label>
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
                    Use the email you registered your company with
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
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Access Dashboard
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-500 mb-4">
                  Don't have a company account yet?
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
