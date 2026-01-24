import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotificationsCenter() {
  // MOCK notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Evaluation Completed",
      message: "Sarah Miller completed an evaluation for John Doe.",
      date: "2024-11-20",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Pending Evaluation",
      message: "Carlos Silva has an evaluation overdue by 3 days.",
      date: "2024-11-18",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Profile Update",
      message: "Maria Santos updated her employee profile.",
      date: "2024-11-17",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-600" />;
      case "warning":
        return <AlertTriangle className="text-yellow-600" />;
      default:
        return <Info className="text-blue-600" />;
    }
  };

  return (
    <CompanyLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={markAllAsRead}
        >
          Mark All as Read
        </Button>
      </div>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Bell className="text-blue-600" /> Notification Center
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition ${
                n.read ? "bg-slate-100 border-slate-200" : "bg-white border-blue-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getIcon(n.type)}</div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">{n.title}</p>
                  <p className="text-slate-600">{n.message}</p>
                  <p className="text-slate-400 text-sm mt-1">{n.date}</p>
                </div>
              </div>

              {!n.read && (
                <Button
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-100"
                  onClick={() => markAsRead(n.id)}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
