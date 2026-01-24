import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Shield, Users, Activity, Settings, Server, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { createPageUrl } from "../utils";

export default function AdminPanel() {
  // MOCK system metrics
  const metrics = {
    totalUsers: 42,
    activeSessions: 7,
    systemHealth: "Operational",
    lastBackup: "2024-11-20 03:15 AM",
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Admin Panel
      </h1>

      {/* System Overview */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Shield className="text-blue-600" /> System Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Metric label="Total Users" value={metrics.totalUsers} icon={<Users />} />
          <Metric label="Active Sessions" value={metrics.activeSessions} icon={<Activity />} />
          <Metric label="System Health" value={metrics.systemHealth} icon={<Server />} />
          <Metric label="Last Backup" value={metrics.lastBackup} icon={<Lock />} />
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Settings className="text-blue-600" /> Administrative Actions
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminAction
            title="Manage Roles"
            description="Control user permissions and access levels."
            onClick={() => (window.location.href = createPageUrl("RoleManagement"))}
          />

          <AdminAction
            title="View Audit Logs"
            description="Track system activity and user actions."
            onClick={() => (window.location.href = createPageUrl("AuditLogs"))}
          />

          <AdminAction
            title="Department Management"
            description="Organize and structure company departments."
            onClick={() => (window.location.href = createPageUrl("DepartmentManagement"))}
          />

          <AdminAction
            title="System Settings"
            description="Configure advanced system preferences."
            onClick={() => (window.location.href = createPageUrl("CompanySettings"))}
          />
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}

function Metric({ label, value, icon }) {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex items-center gap-4">
      <div className="text-3xl text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function AdminAction({ title, description, onClick }) {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex flex-col gap-3">
      <p className="text-lg font-semibold text-slate-900">{title}</p>
      <p className="text-slate-600 text-sm">{description}</p>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white"
        onClick={onClick}
      >
        Open
      </Button>
    </div>
  );
}
