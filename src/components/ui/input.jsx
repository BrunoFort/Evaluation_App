export default function Input({
  label,
  error,
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "w-full border rounded-md px-3 bg-background text-neutral-900 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-600 transition";

  const sizes = {
    sm: "text-sm py-1.5",
    md: "text-sm py-2",
    lg: "text-base py-3",
  };

  const borderColor = error
    ? "border-destructive"
    : "border-neutral-300 focus:border-purple-600";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`${base} ${sizes[size]} ${borderColor} ${className}`}
      />

      {error && (
        <p className="text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
