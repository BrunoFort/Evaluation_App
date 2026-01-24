export function createPageUrl(key, param = null) {
  const map = {
    Dashboard: "/dashboard",
    CompanyReports: "/reports",
    EvaluationList: "/evaluations",
    EvaluationDetails: (id) => `/evaluations/${id}`,
    AddEmployee: "/employees/add",
    EditEmployee: (id) => `/employees/edit/${id}`,
    CompanySettings: "/settings/company",
    ThemeCustomizer: "/settings/theme",
    AdminPanel: "/admin",
    RoleManagement: "/admin/roles",
    DepartmentManagement: "/admin/departments",
    AuditLogs: "/admin/audit-logs",
    NotificationsCenter: "/notifications",
    DocumentCenter: "/documents",
    EmployeeSelfService: "/me",
  };

  const route = map[key];
  return typeof route === "function" ? route(param) : route || "/";
}
