// frontend/src/components/SubscriptionCard.jsx
// Shows details for a single subscription and a delete button.

function SubscriptionCard({ subscription, onDelete }) {
  const { id, name, price, billing_cycle, next_payment_date, category, color } =
    subscription

  const cycleLabel = {
    monthly: '/mo',
    yearly: '/yr',
    weekly: '/wk',
  }[billing_cycle] || '/mo'

  const formattedDate = new Date(next_payment_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Days until next payment
  const daysLeft = Math.ceil(
    (new Date(next_payment_date) - new Date()) / (1000 * 60 * 60 * 24)
  )
  const isUrgent = daysLeft <= 7 && daysLeft >= 0

  return (
    <div className="glass glass-hover rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group">
      {/* Colored accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: color || '#6366f1' }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Color dot / icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
            style={{ background: color || '#6366f1', opacity: 0.9 }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-white text-base leading-tight">
              {name}
            </h3>
            <span className="text-xs text-slate-500 capitalize">{category}</span>
          </div>
        </div>

        {/* Delete button — visible on hover */}
        <button
          onClick={() => onDelete(id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-400 text-lg leading-none p-1 rounded-lg hover:bg-red-400/10"
          title="Delete subscription"
          aria-label={`Delete ${name}`}
        >
          ×
        </button>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl font-bold text-white">
          ${Number(price).toFixed(2)}
        </span>
        <span className="text-slate-500 text-sm">{cycleLabel}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">Next payment</span>
        <span
          className={`font-medium ${
            isUrgent ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          {isUrgent && '⚡ '}
          {formattedDate}
        </span>
      </div>
    </div>
  )
}

export default SubscriptionCard
