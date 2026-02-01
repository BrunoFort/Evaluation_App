// src/app/(dashboard)/company/employees/[id]/page.jsx

import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import CompanyLayout from "/src/layouts/CompanyLayout.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import Card from "/src/components/ui/Card.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";

import { useEmployee } from "/src/features/employees/hooks/useEmployee.js";
import { useEmployeeEvaluations } from "/src/features/evaluations/hooks/useEmployeeEvaluations.js";
import EmployeeEvaluationsTab from "/src/features/employees/components/EmployeeEvaluationsTab.jsx";

import { useEmployerAuth } from "/src/features/auth/employer/useEmployerAuth.js";

import {
  User,
  FileText,
  History,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Pencil,
} from "lucide-react";

export default function EmployeeProfileAdminPage() {
  const { id } = useParams();
  const { employee, loading } = useEmployee(id);

  const { employer } = useEmployerAuth();
  const employerId = employer?.employerId;

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
        <p className="text-neutral-500 p-6">Loading employee...</p>
      </CompanyLayout>
    );
  }

  if (!employee) {
    return (
      <CompanyLayout>
        <p className="text-red-600 p-6">Employee not found.</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="max-w-4xl mx-auto space-y-10">

        <PageHeader
          title={employee.name}
          subtitle={employee.email}
          right={
            <Link
              to={`/employees/${employee.id}/edit`}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition"
            >
              <Pencil className="w-4 h-4" />
              Edit Employee
            </Link>
          }
        />

        {/* Tabs */}
        <div className="flex gap-6 border-b border-neutral-200">
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
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-neutral-600 hover:text-neutral-800"
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
              <div className="space-y-2 text-neutral-700">
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
          <SectionCard title="Evaluations">
            {loadingEvaluations ? (
              <p className="text-neutral-500">Loading evaluations...</p>
            ) : (
              <EmployeeEvaluationsTab
                evaluations={evaluations}
                employeeId={employee.id}
              />
            )}
          </SectionCard>
        )}

        {activeTab === "documents" && (
          <SectionCard title="Documents">
            <p className="text-neutral-600">Document upload and list will go here.</p>
          </SectionCard>
        )}

        {activeTab === "history" && (
          <SectionCard title="History">
            <p className="text-neutral-600">Employee history will be displayed here.</p>
          </SectionCard>
        )}

        {activeTab === "kpis" && (
          <SectionCard title="KPIs">
            <p className="text-neutral-600">Performance charts and KPIs will go here.</p>
          </SectionCard>
        )}
      </div>
    </CompanyLayout>
  );
}

/* Reusable Accordion Component */
function AccordionSection({ title, icon, open, onToggle, children }) {
  return (
    <Card className="p-0 border border-neutral-200 rounded-xl shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2 text-neutral-800 font-medium">
          {icon}
          {title}
        </div>

        {open ? (
          <ChevronUp className="w-5 h-5 text-neutral-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-500" />
        )}
      </button>

      {open && <div className="px-4 pb-4">{children}</div>}
    </Card>
  );
}

