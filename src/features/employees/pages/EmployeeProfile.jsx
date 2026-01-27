import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";
import { useEmployee } from "../hooks/useEmployee";
import { useEmployeeEvaluations } from "../../evaluations/hooks/useEmployeeEvaluations";
import EmployeeEvaluationsTab from "../components/EmployeeEvaluationsTab";
import { useAuth } from "../../auth/useAuth";

import {
  User,
  FileText,
  History,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Pencil,
} from "lucide-react";

export default function EmployeeProfile() {
  const { id } = useParams();
  const { employee, loading } = useEmployee(id);
  const { user } = useAuth();
  const employerId = user?.id;

  const {
    evaluations,
    loading: loadingEvaluations,
  } = useEmployeeEvaluations(id, employerId);

  const [activeTab, setActiveTab] = useState("overview");
  const [openAccordion, setOpenAccordion] = useState(null);

  function toggleAccordion(section) {
    setOpenAccordion(openAccordion === section ? null : section);
  }

  if (loading) {
    return (
      <CompanyLayout>
        <p className="text-slate-500">Loading employee...</p>
      </CompanyLayout>
    );
  }

  if (!employee) {
    return (
      <CompanyLayout>
        <p className="text-red-600">Employee not found.</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="space-y-10">

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {employee.name}
              </h1>
              <p className="text-slate-600">{employee.email}</p>
            </div>
          </div>

          <Link
            to={`/employees/${employee.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit Employee
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-200">
          {[
            { key: "overview", label: "Overview" },
            { key: "evaluations", label: "Evaluations" },
            { key: "documents", label: "Documents" },
            { key: "history", label: "History" },
            { key: "kpis", label: "KPIs" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <AccordionSection
              title="Basic Information"
              icon={<User className="w-5 h-5" />}
              open={openAccordion === "basic"}
              onToggle={() => toggleAccordion("basic")}
            >
              <div className="space-y-2 text-slate-700">
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Role:</strong> {employee.role || "Not assigned"}</p>
                <p><strong>Department:</strong> {employee.department || "Not assigned"}</p>
                <p><strong>Status:</strong> {employee.status}</p>
              </div>
            </AccordionSection>
          </div>
        )}

        {activeTab === "evaluations" && (
          <div>
            {loadingEvaluations ? (
              <p className="text-slate-500">Loading evaluations...</p>
            ) : (
              <EmployeeEvaluationsTab
                evaluations={evaluations}
                employeeId={employee.id}
              />
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <AccordionSection
            title="Documents"
            icon={<FileText className="w-5 h-5" />}
            open={true}
            onToggle={() => {}}
          >
            <p className="text-slate-600">Document upload and list will go here.</p>
          </AccordionSection>
        )}

        {activeTab === "history" && (
          <AccordionSection
            title="History"
            icon={<History className="w-5 h-5" />}
            open={true}
            onToggle={() => {}}
          >
            <p className="text-slate-600">Employee history will be displayed here.</p>
          </AccordionSection>
        )}

        {activeTab === "kpis" && (
          <AccordionSection
            title="KPIs"
            icon={<BarChart3 className="w-5 h-5" />}
            open={true}
            onToggle={() => {}}
          >
            <p className="text-slate-600">Performance charts and KPIs will go here.</p>
          </AccordionSection>
        )}
      </div>
    </CompanyLayout>
  );
}

/* Reusable Accordion Component */
function AccordionSection({ title, icon, open, onToggle, children }) {
  return (
    <div className="border border-slate-200 rounded-lg bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2 text-slate-800 font-medium">
          {icon}
          {title}
        </div>

        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>

      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

