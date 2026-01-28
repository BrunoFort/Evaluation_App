export default function Input({
  label,
  error,
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const sizes = {
    sm: "text-sm py-1.5",
    md: "text-sm py-2",
    lg: "text-base py-3",
  };

  const borderColor = error
    ? "border-red-500"
    : "border-slate-300 focus:border-blue-500";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`${base} ${sizes[size]} ${borderColor} ${className}`}
      />

      {error && (
        <p className="text-xs text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
