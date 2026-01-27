export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      {title && (
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      )}
      {children}
    </div>
  );
}
