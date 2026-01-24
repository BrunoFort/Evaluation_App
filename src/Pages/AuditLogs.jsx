import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";
import { Activity } from "lucide-react";

export default function AuditLogs() {
  // MOCK logs — substituir quando conectar backend
  const logs = [
    {
      id: 1,
      user: "Sarah Miller",
      action: "Created evaluation for John Doe",
      type: "evaluation",
      date: "2024-11-20 14:32",
    },
    {
      id: 2,
      user: "Carlos Silva",
      action: "Updated employee profile: Maria Santos",
      type: "employee",
      date: "2024-11-19 10:15",
    },
    {
      id: 3,
      user: "Admin",
      action: "Changed company settings",
      type: "settings",
      date: "2024-11-18 09:02",
    },
    {
      id: 4,
      user: "John Doe",
      action: "Logged into the system",
      type: "auth",
      date: "2024-11-17 08:45",
    },
    {
      id: 5,
      user: "Sarah Miller",
      action: "Edited department: Engineering",
      type: "department",
      date: "2024-11-16 16:20",
    },
  ];

  const typeColors = {
    evaluation: "bg-blue-600",
    employee: "bg-green-600",
    settings: "bg-purple-600",
    auth: "bg-slate-600",
    department: "bg-orange-600",
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Audit Logs
      </h1>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Activity className="text-blue-600" /> System Activity
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-6">
            <div className="space-y-6">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {log.user}
                    </p>
                    <p className="text-slate-600">{log.action}</p>
                    <p className="text-slate-400 text-sm mt-1">{log.date}</p>
                  </div>

                  <Badge className={`${typeColors[log.type]} text-white`}>
                    {log.type.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
