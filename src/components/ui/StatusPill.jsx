import { CheckCircle, Clock, UserCheck, XCircle, Minus } from "lucide-react";

export default function StatusPill({
  status = "default",
  size = "md",
  showIcon = true,
  className = "",
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full font-medium capitalize";

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-3 py-1",
  };

  const variants = {
    completed: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    active: "bg-blue-50 text-blue-700",
    terminated: "bg-red-50 text-red-700",
    default: "bg-slate-50 text-slate-600",
  };

  const icons = {
    completed: <CheckCircle className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />,
    active: <UserCheck className="w-3 h-3" />,
    terminated: <XCircle className="w-3 h-3" />,
    default: <Minus className="w-3 h-3" />,
  };

  const variant = variants[status] || variants.default;
  const icon = icons[status] || icons.default;

  return (
    <span className={`${base} ${sizes[size]} ${variant} ${className}`}>
      {showIcon && icon}
      {status}
    </span>
  );
}
