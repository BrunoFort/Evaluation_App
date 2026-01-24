import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../utils";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function CompanyLayout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "CompanyDashboard" },
    { label: "Employees", icon: <Users />, path: "ViewEmployee" },
    { label: "Add Employee", icon: <UserPlus />, path: "AddEmployee" },
    { label: "Evaluations", icon: <FileText />, path: "PublicEvaluation" },
    { label: "Settings", icon: <Settings />, path: "CompanySettings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r shadow-sm transition-all duration-300",
          open ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className={cn("text-xl font-bold text-blue-600", !open && "hidden")}>
            Company Panel
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="text-slate-600"
          >
            <Menu />
          </Button>
        </div>

        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(`/${item.path}`)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition",
                !open && "justify-center"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              {open && <span className="font-medium">{item.label}</span>}
            </button>
          ))}

          <button
            onClick={() => navigate("/CompanyLogin")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition mt-4",
              !open && "justify-center"
            )}
          >
            <LogOut className="text-xl" />
            {open && <span className="font-medium">Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
