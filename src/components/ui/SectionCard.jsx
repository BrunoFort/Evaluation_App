export default function SectionCard({
  title,
  icon,
  right,
  padding = "md",
  shadow = "sm",
  children,
  className = "",
}) {
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
  };

  return (
    <div
      className={`
        bg-white border border-neutral-300 rounded-xl
        ${paddings[padding]}
        ${shadows[shadow]}
        space-y-4
        ${className}
      `}
    >
      {(title || right) && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-purple-600">{icon}</span>}
            {title && (
              <h2 className="text-lg font-semibold text-neutral-900">
                {title}
              </h2>
            )}
          </div>

          {right && <div>{right}</div>}
        </div>
      )}

      {children}
    </div>
  );
}
