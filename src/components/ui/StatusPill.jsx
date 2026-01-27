export default function StatusPill({ status }) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";

  const variants = {
    completed: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    active: "bg-blue-50 text-blue-700",
    terminated: "bg-red-50 text-red-700",
    default: "bg-slate-50 text-slate-600",
  };

  const variant = variants[status] || variants.default;

  return <span className={`${base} ${variant}`}>{status}</span>;
}
