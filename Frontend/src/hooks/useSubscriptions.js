// frontend/src/hooks/useSubscriptions.js
// Encapsulates all subscription state + API calls.
// Use this hook inside any component that needs subscription data.

import { useState, useEffect, useCallback } from 'react'
import {
  getSubscriptions,
  addSubscription,
  deleteSubscription,
} from '../services/api'

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getSubscriptions()
      setSubscriptions(data)
    } catch (err) {
      console.error('Failed to fetch subscriptions:', err)
      setError('Could not load subscriptions. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  const handleAdd = async (formData) => {
    try {
      const newSub = await addSubscription(formData)
      setSubscriptions((prev) => [...prev, newSub])
    } catch (err) {
      console.error('Failed to add subscription:', err)
      throw err // let the form handle it
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id)
      setSubscriptions((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.error('Failed to delete subscription:', err)
    }
  }

  // Calculate total monthly spend (normalize yearly → monthly)
  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    if (sub.billing_cycle === 'yearly') return sum + sub.price / 12
    if (sub.billing_cycle === 'weekly') return sum + sub.price * 4.33
    return sum + sub.price
  }, 0)

  return {
    subscriptions,
    loading,
    error,
    monthlyTotal,
    handleAdd,
    handleDelete,
    refetch: fetchSubscriptions,
  }
}
