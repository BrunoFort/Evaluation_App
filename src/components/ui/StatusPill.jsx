// src/components/ui/StatusPill.jsx

export default function StatusPill({ status }) {
  const map = {
    approved: {
      label: "Approved",
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
    },
    pending: {
      label: "Pending",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
    },
    rejected: {
      label: "Rejected",
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
    },
    default: {
      label: "Unknown",
      bg: "bg-neutral-100",
      text: "text-neutral-700",
      border: "border-neutral-300",
    },
  };

  const style = map[status] || map.default;

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${style.bg} ${style.text} ${style.border}`}
    >
      {style.label}
    </span>
  );
}

