export default function Card({
  children,
  padding = "md",
  shadow = "sm",
  interactive = false,
  className = "",
  ...props
}) {
  const base =
    "bg-white border border-slate-200 rounded-xl transition";

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const hover =
    interactive ? "hover:shadow-md hover:border-slate-300 cursor-pointer" : "";

  return (
    <div
      {...props}
      className={`
        ${base}
        ${paddings[padding]}
        ${shadows[shadow]}
        ${hover}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
