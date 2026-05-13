// frontend/src/pages/Dashboard.jsx
// Main page. Fetches subscriptions, shows summary stats + card grid.

import { useState } from 'react'
import { useSubscriptions } from '../hooks/useSubscriptions'
import SummaryCard from '../components/SummaryCard'
import SubscriptionCard from '../components/SubscriptionCard'
import AddSubscriptionForm from '../components/AddSubscriptionForm'

function Dashboard() {
  const {
    subscriptions,
    loading,
    error,
    monthlyTotal,
    handleAdd,
    handleDelete,
  } = useSubscriptions()

  const [showForm, setShowForm] = useState(false)

  // Annual spend = sum of actual yearly costs
  const yearlyTotal = subscriptions.reduce((sum, sub) => {
    if (sub.billing_cycle === 'yearly') return sum + sub.price
    if (sub.billing_cycle === 'weekly') return sum + sub.price * 52
    return sum + sub.price * 12
  }, 0)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">S</span>
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              SaveStack
            </span>
          </div>

          {/* Add button */}
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            Add Subscription
          </button>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white">
            Your Dashboard
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Track and manage all your recurring subscriptions.
          </p>
        </div>

        {/* ── Summary Cards ──────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <SummaryCard
            label="Monthly Total"
            value={`$${monthlyTotal.toFixed(2)}`}
            sub="Estimated monthly spend"
            icon="💳"
          />
          <SummaryCard
            label="Active Subscriptions"
            value={subscriptions.length}
            sub={subscriptions.length === 1 ? '1 service tracked' : `${subscriptions.length} services tracked`}
            icon="📦"
          />
          <SummaryCard
            label="Annual Spend"
            value={`$${yearlyTotal.toFixed(2)}`}
            sub="Projected yearly total"
            icon="📅"
          />
        </div>

        {/* ── Error State ────────────────────────────────── */}
        {error && (
          <div className="glass rounded-2xl p-4 mb-6 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* ── Loading State ──────────────────────────────── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-2xl h-40 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ── Empty State ────────────────────────────────── */}
        {!loading && !error && subscriptions.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              No subscriptions yet
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Add your first subscription to start tracking your spending.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              + Add Your First Subscription
            </button>
          </div>
        )}

        {/* ── Subscription Grid ──────────────────────────── */}
        {!loading && subscriptions.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white">
                All Subscriptions
              </h2>
              <span className="text-slate-600 text-sm">
                {subscriptions.length} total
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* ── Add Subscription Modal ────────────────────────── */}
      {showForm && (
        <AddSubscriptionForm
          onAdd={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
