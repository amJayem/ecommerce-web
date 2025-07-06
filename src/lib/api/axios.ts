// lib/api/axios.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000', // your NestJS URL
  withCredentials: true, // useful if dealing with cookies or auth
  timeout: 10000,
  headers: {
    // 'X-App-Token': process.env.NEXT_PUBLIC_APP_ACCESS_TOKEN
  }
})

// Add interceptors for auth, logging, etc.
api.interceptors.request.use((config) => {
  // Example: attach token
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Optionally log or transform errors globally
    console.error('API Error:', err)
    return Promise.reject(err)
  }
)

export default api
