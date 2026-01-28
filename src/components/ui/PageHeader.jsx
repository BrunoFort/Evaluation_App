export default function PageHeader({
  title,
  subtitle,
  description,
  right,
  align = "between", // "left", "center", "between"
  size = "md", // "sm", "md", "lg"
  className = "",
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const alignment = {
    left: "flex-col items-start gap-2",
    center: "flex-col items-center text-center gap-2",
    between: "flex-row items-center justify-between",
  };

  return (
    <div className={`mb-8 flex ${alignment[align]} ${className}`}>
      <div className={align === "between" ? "flex-1" : ""}>
        <h1 className={`${sizes[size]} font-bold text-slate-900`}>
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-500 text-sm mt-1">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {right && (
        <div className={align === "between" ? "" : "mt-3"}>
          {right}
        </div>
      )}
    </div>
  );
}
