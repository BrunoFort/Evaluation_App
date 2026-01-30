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
