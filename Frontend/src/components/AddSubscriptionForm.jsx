// frontend/src/components/AddSubscriptionForm.jsx
// Modal form for adding a new subscription.
// Props:
//   onAdd(formData) — called when form is submitted
//   onClose()       — called when modal should close

import { useState } from 'react'

const COLORS = [
  '#6366f1', '#ec4899', '#14b8a6', '#f59e0b',
  '#10b981', '#3b82f6', '#8b5cf6', '#f97316',
]

const CATEGORIES = [
  'Entertainment', 'Productivity', 'Health', 'Finance',
  'Education', 'Shopping', 'Music', 'Cloud', 'Other',
]

const defaultForm = {
  name: '',
  price: '',
  billing_cycle: 'monthly',
  next_payment_date: '',
  category: 'Other',
  color: COLORS[0],
}

function AddSubscriptionForm({ onAdd, onClose }) {
  const [form, setForm] = useState(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.price || !form.next_payment_date) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      setSubmitting(true)
      await onAdd({ ...form, price: parseFloat(form.price) })
      onClose()
    } catch {
      setError('Failed to add subscription. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass rounded-2xl w-full max-w-md p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-white">
            Add Subscription
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Service Name */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
              Service Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Netflix, Spotify"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors text-sm"
            />
          </div>

          {/* Price + Billing Cycle */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                Price *
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="9.99"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                Billing Cycle
              </label>
              <select
                name="billing_cycle"
                value={form.billing_cycle}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors text-sm"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Next Payment Date */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
              Next Payment Date *
            </label>
            <input
              name="next_payment_date"
              type="date"
              value={form.next_payment_date}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors text-sm [color-scheme:dark]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors text-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wide">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, color: c })}
                  className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                  style={{
                    background: c,
                    outline: form.color === c ? `2px solid white` : 'none',
                    outlineOffset: '2px',
                  }}
                />
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Adding…' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSubscriptionForm
