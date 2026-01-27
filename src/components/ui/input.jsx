export default function Input({ label, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full border border-slate-300 rounded-lg px-3 py-2 ${className}`}
      />
    </div>
  );
}
