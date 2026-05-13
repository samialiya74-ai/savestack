// frontend/src/services/api.js
// Central place for all backend API calls.
// Set VITE_API_URL in your frontend/.env file.

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ── Subscriptions ──────────────────────────────────────────────

/** Fetch all subscriptions */
export const getSubscriptions = () =>
  api.get('/subscriptions').then((res) => res.data)

/** Add a new subscription */
export const addSubscription = (data) =>
  api.post('/subscriptions', data).then((res) => res.data)

/** Delete a subscription by ID */
export const deleteSubscription = (id) =>
  api.delete(`/subscriptions/${id}`).then((res) => res.data)

export default api
