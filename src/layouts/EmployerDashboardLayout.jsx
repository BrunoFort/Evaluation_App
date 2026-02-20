import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { SHIME_LOGO_BLACK } from "@/lib/branding";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import Avatar from "/src/components/ui/Avatar.jsx";
import { loadAuthAvatar } from "/src/features/shared-photo/supabasePhotoStorage";
import { getEmployerById } from "/src/features/employers/api/employersApi";

export default function EmployerDashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { employer, logout } = useEmployerAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [displayName, setDisplayName] = useState("");

  const fallbackName = useMemo(() => {
    const email = employer?.email || "";
    return email ? email.split("@")[0] : "Profile";
  }, [employer?.email]);

  useEffect(() => {
    let isMounted = true;
    async function loadAvatar() {
      try {
        const metadata = await loadAuthAvatar();
        console.log("📸 Dashboard: loaded avatar metadata:", metadata);
        if (isMounted) {
          setAvatarUrl(metadata?.avatar_url || null);
          console.log("📸 Dashboard: avatar URL set to:", metadata?.avatar_url || "null");
        }
      } catch (err) {
        console.error("Failed to load avatar:", err);
      }
    }

    async function loadEmployerName() {
      if (!employer?.employerId) return;
      try {
        const data = await getEmployerById(employer.employerId);
        const fullName = [data?.firstName, data?.lastName].filter(Boolean).join(" ");
        console.log("👤 Dashboard: loaded employer name:", fullName || data?.companyName || "no name");
        if (isMounted) {
          setDisplayName(fullName || data?.companyName || "");
        }
      } catch (err) {
        console.error("Failed to load employer name:", err);
      }
    }

    loadAvatar();
    loadEmployerName();

    return () => {
      isMounted = false;
    };
  }, [location.pathname, employer?.employerId]);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/employer" },
    { label: "Employees", icon: Users, path: "/employer/employees" },
    { label: "Evaluations", icon: ClipboardList, path: "/employer/evaluations" },
    { label: "Analytics", icon: BarChart3, path: "/employer/analytics" },
    { label: "Settings", icon: Settings, path: "/employer/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white flex flex-col py-8 px-6">

        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img
            src={SHIME_LOGO_BLACK}
            alt="Shime Logo"
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item, i) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition
                  ${active ? "bg-white text-neutral-900 shadow-md" : "text-white hover:bg-white/20"}
                `}
              >
                <Icon
                  className={`w-5 h-5 ${active ? "text-neutral-900" : "text-white"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          className="mt-2 flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-white/20 transition"
          onClick={async () => {
            await logout();
            navigate("/employer/login");
          }}
        >
          <LogOut className="w-5 h-5 text-white" />
          Logout
        </button>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="w-full bg-white border-b border-neutral-200 py-4 px-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Employer Dashboard
          </h1>

          {/* PROFILE AREA */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/employer/settings")}
          >
            <Avatar src={avatarUrl} alt="Profile" size={48} />

            <span className="text-neutral-700 font-medium">
              {displayName || fallbackName}
            </span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
