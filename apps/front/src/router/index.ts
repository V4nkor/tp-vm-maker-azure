import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const baseUrl = import.meta.env.VITE_BASE_URL

export function setupRouter() {
  const router = createRouter({
    history: createWebHistory(baseUrl),
    routes,
  })
  return router
}