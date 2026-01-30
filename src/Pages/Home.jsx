import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from "/src/components/ui/Button.jsx";
import Input from "/src/components/ui/input.jsx";
import Card from "/src/components/ui/card.jsx";

import {
  Building2,
  UserCheck,
  ClipboardCheck,
  Shield,
  ArrowRight,
  Star,
  User,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useEmployerAuth } from "@/features/auth/employer/useEmployerAuth";
import { useEmployeeAuth } from "@/features/auth/employee/useEmployeeAuth";


// ---------------------------------------------------------
// Back Button (universal, discreto, moderno)
// ---------------------------------------------------------
function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
}


// ---------------------------------------------------------
// Dashboard Shortcut (se já estiver logado)
// ---------------------------------------------------------
function DashboardShortcut() {
  const { employer } = useEmployerAuth();
  const { employee } = useEmployeeAuth();

  if (employer) {
    return (
      <div className="flex justify-center mb-8">
        <Link to="/employer">
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Go to Employer Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (employee) {
    return (
      <div className="flex justify-center mb-8">
        <Link to="/employee">
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Go to Employee Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return null;
}


// ---------------------------------------------------------
// View Evaluation Section
// ---------------------------------------------------------
function ViewEvaluationSection() {
  const navigate = useNavigate();
  const [evaluationLink, setEvaluationLink] = useState('');

  const handleViewEvaluation = (e) => {
    e.preventDefault();
    if (!evaluationLink) return;

    let token = evaluationLink;
    try {
      if (evaluationLink.includes('token=')) {
        const url = new URL(evaluationLink);
        token = url.searchParams.get('token');
      } else if (evaluationLink.includes('/')) {
        const params = new URLSearchParams(evaluationLink.split('?')[1]);
        token = params.get('token');
      }
    } catch (e) {
      token = evaluationLink;
    }

    if (token) {
      navigate(`/reference/public?token=${token}`);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              View Employee Evaluation
            </h3>
          </div>

          <p className="text-sm text-slate-600 mb-4">
            Have a candidate's evaluation link? View their professional references without registration.
          </p>

          <form onSubmit={handleViewEvaluation} className="flex gap-2">
            <Input
              value={evaluationLink}
              onChange={(e) => setEvaluationLink(e.target.value)}
              placeholder="Paste evaluation link or token here..."
              className="flex-1 bg-white border-slate-200"
            />
            <Button 
              type="submit" 
              disabled={!evaluationLink}
              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
            >
              View Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}


// ---------------------------------------------------------
// HOME PAGE
// ---------------------------------------------------------
export default function Home() {
  const features = [
    {
      icon: Building2,
      title: "Company Registration",
      description: "Register your company with validated business number verification"
    },
    {
      icon: UserCheck,
      title: "Employee Management",
      description: "Add and manage your employees with complete professional profiles"
    },
    {
      icon: ClipboardCheck,
      title: "Professional Evaluations",
      description: "Create detailed performance evaluations with multiple criteria"
    },
    {
      icon: Shield,
      title: "Secure Sharing",
      description: "Share employee references securely during the hiring process"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">

      {/* Back Button */}
      <BackButton />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20" />
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl">
                  <Star className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
              Professional Employee
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Reference Platform
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-semibold text-slate-800 max-w-3xl mx-auto mb-4">
              "Build trust, save time, hire with confidence"
            </p>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10">
              Evaluate your employees and access verified professional references from past employers. 
              Make informed hiring decisions with comprehensive performance assessments.
            </p>

            {/* Dashboard Shortcut (if logged in) */}
            <DashboardShortcut />

            {/* Modern CTA Grid */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">

              {/* Register Company */}
              <Link to="/employer/signup">
                <Card className="p-6 shadow-lg hover:shadow-xl transition bg-white/80 backdrop-blur rounded-xl text-center">
                  <Building2 className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">Register Company</h3>
                  <p className="text-sm text-slate-600 mb-4">Create your employer account</p>
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Start
                  </Button>
                </Card>
              </Link>

              {/* Company Login */}
              <Link to="/employer/login">
                <Card className="p-6 shadow-lg hover:shadow-xl transition bg-white/80 backdrop-blur rounded-xl text-center">
                  <Building2 className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">Company Sign-In</h3>
                  <p className="text-sm text-slate-600 mb-4">Access your employer dashboard</p>
                  <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50">
                    Sign In
                  </Button>
                </Card>
              </Link>

              {/* Employee Login */}
              <Link to="/employee/login">
                <Card className="p-6 shadow-lg hover:shadow-xl transition bg-white/80 backdrop-blur rounded-xl text-center">
                  <User className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">Employee Sign-In</h3>
                  <p className="text-sm text-slate-600 mb-4">Access your employee profile</p>
                  <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50">
                    Sign In
                  </Button>
                </Card>
              </Link>

            </div>

            <ViewEvaluationSection />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Complete Reference Management
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to manage employee evaluations and professional references in one platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Register your company today and start building a verified reference database for your employees.
          </p>
          <Link to="/employer/signup">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl">
              Start Registration
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Star className="w-6 h-6 text-blue-500" />
              <span className="text-white font-semibold">ProRef</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Professional Reference Platform. Built for Canadian Businesses.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
