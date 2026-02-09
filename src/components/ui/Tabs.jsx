export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-4 border-b border-neutral-300">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-2 text-sm font-medium transition-colors ${
            active === tab
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-neutral-600 hover:text-neutral-800 hover:border-b-2 hover:border-neutral-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
