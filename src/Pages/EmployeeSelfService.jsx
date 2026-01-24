import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star, User, Bell } from "lucide-react";

export default function EmployeeSelfService() {
  // MOCK employee data
  const employee = {
    name: "John Doe",
    position: "Software Developer",
    email: "john.doe@company.com",
    phone: "+1 613-555-1234",
  };

  // MOCK evaluations
  const evaluations = [
    { id: 1, date: "2024-11-15", average: 4.5 },
    { id: 2, date: "2024-06-10", average: 4.2 },
    { id: 3, date: "2023-12-05", average: 4.7 },
  ];

  // MOCK notifications
  const notifications = [
    { id: 1, message: "Your new evaluation is available.", date: "2024-11-16" },
    { id: 2, message: "Profile updated successfully.", date: "2024-10-02" },
  ];

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Employee Self-Service
      </h1>

      {/* Profile Section */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <User className="text-blue-600" /> My Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-3">
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>

          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Bell className="text-blue-600" /> My Notifications
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm"
            >
              <p className="text-slate-900">{n.message}</p>
              <p className="text-slate-400 text-sm">{n.date}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Evaluations Section */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Star className="text-yellow-500" /> My Evaluations
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {evaluations.map((ev) => (
            <div
              key={ev.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-slate-900 font-semibold">{ev.date}</p>
                <p className="text-slate-600 text-sm">Evaluation #{ev.id}</p>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-lg">{ev.average}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
