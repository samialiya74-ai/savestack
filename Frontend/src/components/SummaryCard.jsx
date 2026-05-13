// frontend/src/components/SummaryCard.jsx
// Displays a single stat (e.g. "Monthly Total" or "Active Subs").

function SummaryCard({ label, value, sub, icon }) {
  return (
    <div className="glass glass-hover rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm font-medium tracking-wide uppercase">
          {label}
        </span>
        {icon && (
          <span className="text-2xl opacity-60">{icon}</span>
        )}
      </div>
      <div className="font-display text-3xl font-bold text-white">
        {value}
      </div>
      {sub && (
        <p className="text-slate-500 text-xs">{sub}</p>
      )}
    </div>
  )
}

export default SummaryCard
